import chai from "chai";
import path from "path";
import { F1Field, Scalar } from "ffjavascript";

export const p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(p);

const assert = chai.assert;

const wasm_tester = require("circom_tester").wasm;

const fs = require('fs');

describe("Body Suffix Hasher", function () {
    jest.setTimeout(10 * 60 * 1000); // 10 minutes

    let cir;

    function textToAsciiArray(text: string): string[] {
        return Array.from(text).map(char => char.charCodeAt(0).toString());
    }

    function bytesToPacked(arr) {
        // Convert into bigint from string
        let arrInt = arr.map(BigInt);
        let n = arrInt.length;
        let out = BigInt(0);
        for (let k = 0; k < n; k++) {
            out += arrInt[k] * BigInt(2 ** (8 * k));  // little endian
        }
        return out;
    }

    function chunkArray(arr, chunkSize, length) {
        let chunks = [] as any[];
        for (let i = 0; i < length; i += chunkSize) {
            let chunk = arr.slice(i, i + chunkSize);
            if (chunk.length < chunkSize) {
                chunk = chunk.concat(new Array(chunkSize - chunk.length).fill('0'));
            }
            chunks.push(chunk);
        }
        return chunks;
    }

    function base64ToByteArray(base64String) {
        let binaryString = atob(base64String);
        let stringArray = new Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            stringArray[i] = binaryString.charCodeAt(i).toString();
        }

        return stringArray;
    }


    beforeAll(async () => {
        cir = await wasm_tester(
            path.join(__dirname, "./mocks/test_body_suffix_hasher.circom"),
            {
                include: path.join(__dirname, "../node_modules"),
                output: path.join(__dirname, "../build/test_body_suffix_hasher"),
                recompile: true,
                verbose: true,
            }
        );
    });

    it("Should generate witnesses", async () => {
        const input = {
            "intermediate_hash": ["163", "0", "85", "101", "126", "105", "88", "222", "225", "117", "247", "171", "171", "60", "248", "120", "123", "118", "154", "220", "154", "233", "231", "77", "116", "7", "2", "200", "78", "54", "132", "118"],
            "in_body_suffix_padded": [
                "49", "34", "32", "98", "111", "114", "100", "101", "114", "61", "34", "48", "34", "32", "47", "62",
                "13", "10", "13", "10", "60", "105", "109", "103", "32", "115", "114", "99", "61", "34", "104", "116",
                "116", "112", "58", "47", "47", "101", "109", "97", "105", "108", "98", "117", "108", "107", "114", "101",
                "97", "100", "114", "101", "99", "101", "105", "112", "116", "46", "103", "97", "114", "97", "110", "116",
                "105", "46", "99", "111", "109", "46", "116", "114", "47", "114", "101", "97", "100", "114", "101", "99",
                "101", "105", "112", "116", "47", "108", "105", "115", "116", "101", "110", "101", "114", "46", "97", "115",
                "112", "120", "63", "82", "101", "102", "61", "54", "101", "52", "48", "57", "52", "50", "97", "51",
                "48", "54", "97", "54", "56", "98", "50", "48", "51", "100", "101", "101", "57", "57", "53", "52",
                "48", "53", "55", "99", "50", "52", "54", "53", "53", "49", "100", "52", "54", "52", "100", "56",
                "97", "48", "98", "53", "100", "98", "54", "57", "55", "54", "97", "97", "51", "100", "102", "100",
                "53", "57", "53", "97", "50", "55", "54", "34", "32", "97", "108", "116", "61", "34", "34", "32",
                "119", "105", "100", "116", "104", "61", "34", "49", "34", "32", "104", "101", "105", "103", "104", "116",
                "61", "34", "49", "34", "32", "98", "111", "114", "100", "101", "114", "61", "34", "48", "34", "32", "47",
                "62", "13", "10", "60", "47", "98", "111", "100", "121", "62", "13", "10", "60", "47", "104", "116", "109",
                "108", "62", "13", "10", "128", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "2", "149", "48", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0"
            ],
            "in_body_suffix_len_padded_bytes": 256,
        };
        const witness = await cir.calculateWitness(
            input,
            true
        );

        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    });

    it("Should match pack precomputed SHA", async () => {
        const input = {
            "intermediate_hash": ["163", "0", "85", "101", "126", "105", "88", "222", "225", "117", "247", "171", "171", "60", "248", "120", "123", "118", "154", "220", "154", "233", "231", "77", "116", "7", "2", "200", "78", "54", "132", "118"],
            "in_body_suffix_padded": [
                "49", "34", "32", "98", "111", "114", "100", "101", "114", "61", "34", "48", "34", "32", "47", "62",
                "13", "10", "13", "10", "60", "105", "109", "103", "32", "115", "114", "99", "61", "34", "104", "116",
                "116", "112", "58", "47", "47", "101", "109", "97", "105", "108", "98", "117", "108", "107", "114", "101",
                "97", "100", "114", "101", "99", "101", "105", "112", "116", "46", "103", "97", "114", "97", "110", "116",
                "105", "46", "99", "111", "109", "46", "116", "114", "47", "114", "101", "97", "100", "114", "101", "99",
                "101", "105", "112", "116", "47", "108", "105", "115", "116", "101", "110", "101", "114", "46", "97", "115",
                "112", "120", "63", "82", "101", "102", "61", "54", "101", "52", "48", "57", "52", "50", "97", "51",
                "48", "54", "97", "54", "56", "98", "50", "48", "51", "100", "101", "101", "57", "57", "53", "52",
                "48", "53", "55", "99", "50", "52", "54", "53", "53", "49", "100", "52", "54", "52", "100", "56",
                "97", "48", "98", "53", "100", "98", "54", "57", "55", "54", "97", "97", "51", "100", "102", "100",
                "53", "57", "53", "97", "50", "55", "54", "34", "32", "97", "108", "116", "61", "34", "34", "32",
                "119", "105", "100", "116", "104", "61", "34", "49", "34", "32", "104", "101", "105", "103", "104", "116",
                "61", "34", "49", "34", "32", "98", "111", "114", "100", "101", "114", "61", "34", "48", "34", "32", "47",
                "62", "13", "10", "60", "47", "98", "111", "100", "121", "62", "13", "10", "60", "47", "104", "116", "109",
                "108", "62", "13", "10", "128", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "2", "149", "48", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0"
            ],
            "in_body_suffix_len_padded_bytes": 256,
        };
        const witness = await cir.calculateWitness(
            input,
            true
        );

        const expectedIntermediateHashPacked = chunkArray(input.intermediate_hash, 16, 32);
        const expectedFirst = bytesToPacked(expectedIntermediateHashPacked[0]);
        const expectedSecond = bytesToPacked(expectedIntermediateHashPacked[1]);

        assert.equal(witness[1], expectedFirst);
        assert.equal(witness[2], expectedSecond);
    });

    it("Should output the correct packed body hash SHA", async () => {
        const input = {
            "intermediate_hash": ["163", "0", "85", "101", "126", "105", "88", "222", "225", "117", "247", "171", "171", "60", "248", "120", "123", "118", "154", "220", "154", "233", "231", "77", "116", "7", "2", "200", "78", "54", "132", "118"],
            "in_body_suffix_padded": [
                "49", "34", "32", "98", "111", "114", "100", "101", "114", "61", "34", "48", "34", "32", "47", "62",
                "13", "10", "13", "10", "60", "105", "109", "103", "32", "115", "114", "99", "61", "34", "104", "116",
                "116", "112", "58", "47", "47", "101", "109", "97", "105", "108", "98", "117", "108", "107", "114", "101",
                "97", "100", "114", "101", "99", "101", "105", "112", "116", "46", "103", "97", "114", "97", "110", "116",
                "105", "46", "99", "111", "109", "46", "116", "114", "47", "114", "101", "97", "100", "114", "101", "99",
                "101", "105", "112", "116", "47", "108", "105", "115", "116", "101", "110", "101", "114", "46", "97", "115",
                "112", "120", "63", "82", "101", "102", "61", "54", "101", "52", "48", "57", "52", "50", "97", "51",
                "48", "54", "97", "54", "56", "98", "50", "48", "51", "100", "101", "101", "57", "57", "53", "52",
                "48", "53", "55", "99", "50", "52", "54", "53", "53", "49", "100", "52", "54", "52", "100", "56",
                "97", "48", "98", "53", "100", "98", "54", "57", "55", "54", "97", "97", "51", "100", "102", "100",
                "53", "57", "53", "97", "50", "55", "54", "34", "32", "97", "108", "116", "61", "34", "34", "32",
                "119", "105", "100", "116", "104", "61", "34", "49", "34", "32", "104", "101", "105", "103", "104", "116",
                "61", "34", "49", "34", "32", "98", "111", "114", "100", "101", "114", "61", "34", "48", "34", "32", "47",
                "62", "13", "10", "60", "47", "98", "111", "100", "121", "62", "13", "10", "60", "47", "104", "116", "109",
                "108", "62", "13", "10", "128", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "2", "149", "48", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                "0", "0", "0", "0", "0"
            ],
            "in_body_suffix_len_padded_bytes": 256,
        };
        const witness = await cir.calculateWitness(
            input,
            true
        );

        const expectedBodyHash = base64ToByteArray("gmhfwkcqvc0+z9C9jn4s7JtbkCL8Bc6ysyMgln+cHH0=");
        const expectedBodyHashPacked = chunkArray(expectedBodyHash, 16, 32);
        const expectedFirst = bytesToPacked(expectedBodyHashPacked[0]);
        const expectedSecond = bytesToPacked(expectedBodyHashPacked[1]);

        assert.equal(witness[3], expectedFirst);
        assert.equal(witness[4], expectedSecond);
    });
});
import "module-alias/register";

import { ethers } from "hardhat";
import { BigNumber } from "ethers";

import { Account } from "@utils/test/types";
import { ManagedKeyHashAdapter, NullifierRegistry, HDFCSendProcessor } from "@utils/contracts";
import DeployHelper from "@utils/deploys";
import { GrothProof } from "@utils/types";

import {
  getWaffleExpect,
  getAccounts
} from "@utils/test/index";
import { usdc } from "@utils/common";
import { ZERO_BYTES32 } from "@utils/constants";

const expect = getWaffleExpect();

const rawSignals = ["0x06b0ad846d386f60e777f1d11b82922c6bb694216eed9c23535796ac404a7dfa","0x0000000000000000000000000000000000000000000000000040737472656c61","0x000000000000000000000000000000000000000000000000006e616263666468","0x00000000000000000000000000000000000000000000000000000074656e2e6b","0x0000000000000000000000000000000000000000000000000000000030302e32","0x0000000000000000000000000000000000000000000000000000000000000000","0x000000000000000000000000000000000000000000000000003132202c657554","0x00000000000000000000000000000000000000000000000000303220766f4e20","0x00000000000000000000000000000000000000000000000000353a3131203332","0x00000000000000000000000000000000000000000000000000302b2038303a38","0x0000000000000000000000000000000000000000000000000000000000303335","0x2282c0b9cd1bedb8f14f72c2c434886a10b0c539ad1a5d62041c4bfa3ef5c7c7","0x2e77b67e4f7d868c763d4539ca8483672e522d3aafb015f27aef9090f6790a18","0x048bfa6c4c589d9ac6c3d8769de76ee3ac53cd51e426d4e8065701600bce3918","0x0bd3bb4a2060e5b6d300226add771815983afad1c596b4cf191639ccd74874a9","0x0000000000000000000000000000000000000000000000000000000000003039"];

describe("HDFCSendProcessor", () => {
  let owner: Account;
  let attacker: Account;
  let ramp: Account;

  let keyHashAdapter: ManagedKeyHashAdapter;
  let nullifierRegistry: NullifierRegistry;
  let sendProcessor: HDFCSendProcessor;

  let deployer: DeployHelper;

  beforeEach(async () => {
    [
      owner,
      attacker,
      ramp
    ] = await getAccounts();

    deployer = new DeployHelper(owner.wallet);

    keyHashAdapter = await deployer.deployManagedKeyHashAdapter(rawSignals[0]);
    nullifierRegistry = await deployer.deployNullifierRegistry();
    sendProcessor = await deployer.deployHDFCSendProcessor(
      ramp.address,
      keyHashAdapter.address,
      nullifierRegistry.address,
      "alerts@hdfcbank.net"
    );

    await nullifierRegistry.connect(owner.wallet).addWritePermission(sendProcessor.address);
  });

  describe("#constructor", async () => {
    it("should set the correct state", async () => {
      const rampAddress = await sendProcessor.ramp();
      const venmoKeyHashAdapter = await sendProcessor.mailserverKeyHashAdapter();
      const emailFromAddress = await sendProcessor.getEmailFromAddress();

      expect(rampAddress).to.eq(ramp.address);
      expect(venmoKeyHashAdapter).to.deep.equal(keyHashAdapter.address);
      expect(ethers.utils.toUtf8Bytes("alerts@hdfcbank.net")).to.deep.equal(ethers.utils.arrayify(emailFromAddress));
    });
  });

  describe("#processProof", async () => {
    let subjectProof: GrothProof;
    let subjectCaller: Account;

    beforeEach(async () => {
      const a: [BigNumber, BigNumber] = [BigNumber.from("0x12b5fd38df7697277e725bb4b2881252e3fcd08c38948412bb0f3088062bf8eb"), BigNumber.from("0x24b4aa76a002db095654d4468157bc22279a1ba6c9e2994db758996fbba439f3")]
      const b: [[BigNumber, BigNumber],[BigNumber, BigNumber]] = [
        [BigNumber.from("0x0e9b02f42ee02ecd0e5408d70fdfc15420dc97165d6f0bc0420f88fc0efe916e"), BigNumber.from("0x19c311db3c9c92e38c4d1f59cd030d97cd3169d15205100ee3301c74cff8707b")],
        [BigNumber.from("0x0ca30948a7963112eb5a2614521517c8bbf6ed20cda1b3f0033eb514e1a267a0"), BigNumber.from("0x260d9eabda2be2c69d39c4ced7dbcf936e169425d706c043dd6f7226c48dbfb5")]
      ];
      const c: [BigNumber, BigNumber] = [BigNumber.from("0x2a01fa972364cfce58c13d205cfabcc5648dabc16705997ce0544b4d4a24eb60"), BigNumber.from("0x02b55d970f92e4313643b5f72d7cb65fedbbec8f74a9dbd970ad5017609d2a57")];
      const signals: BigNumber[] = rawSignals.map((signal) => BigNumber.from(signal));

      subjectProof = {
        a,
        b,
        c,
        signals
      };

      subjectCaller = ramp;
    });

    async function subject(): Promise<any> {
      return await sendProcessor.connect(subjectCaller.wallet).processProof(subjectProof);
    }

    async function subjectCallStatic(): Promise<any> {
      return await sendProcessor.connect(subjectCaller.wallet).callStatic.processProof(subjectProof);
    }

    it("should process the proof", async () => {
      const {
        amount,
        timestamp,
        offRamperIdHash,
        intentHash
      } = await subjectCallStatic();
      
      expect(amount).to.eq(usdc(2));
      expect(timestamp).to.eq(BigNumber.from(1700548088));
      expect(offRamperIdHash).to.eq(rawSignals[11]);
      expect(intentHash).to.eq(rawSignals[13]);
    });

    it("should add the email to the nullifier mapping", async () => {
      await subject();

      const isNullified = await nullifierRegistry.isNullified(subjectProof.signals[12].toHexString());

      expect(isNullified).to.be.true;
    });

    describe("when the proof is invalid", async () => {
      beforeEach(async () => {
        subjectProof.signals[0] = BigNumber.from("0x0000000000000000000000000000000000000000000000000076406f6d6e6476");
      });

      it("should revert", async () => {
        await expect(subject()).to.be.revertedWith("Invalid Proof");
      });
    });

    describe("when the email is from an invalid venmo address", async () => {
      beforeEach(async () => {
        await sendProcessor.setEmailFromAddress("bad-venmo@venmo.com".padEnd(21, "\0"));
      });

      it("should revert", async () => {
        await expect(subject()).to.be.revertedWith("Invalid email from address");
      });
    });

    describe("when the rsa modulus doesn't match", async () => {
      beforeEach(async () => {
        await keyHashAdapter.setMailserverKeyHash(ZERO_BYTES32);
      });

      it("should revert", async () => {
        await expect(subject()).to.be.revertedWith("Invalid mailserver key hash");
      });
    });

    describe("when the e-mail was used previously", async () => {
      beforeEach(async () => {
        await subject();
      });

      it("should revert", async () => {
        await expect(subject()).to.be.revertedWith("Nullifier has already been used");
      });
    });

    describe("when the caller is not the Ramp", async () => {
      beforeEach(async () => {
        subjectCaller = owner;
      });

      it("should revert", async () => {
        await expect(subject()).to.be.revertedWith("Only Ramp can call this function");
      });
    });
  });

  describe("#setMailserverKeyHashAdapter", async () => {
    let subjectVenmoMailserverKeyHashAdapter: string;
    let subjectCaller: Account;

    beforeEach(async () => {
      subjectCaller = owner;

      subjectVenmoMailserverKeyHashAdapter = attacker.address;
    });

    async function subject(): Promise<any> {
      return await sendProcessor.connect(subjectCaller.wallet).setMailserverKeyHashAdapter(subjectVenmoMailserverKeyHashAdapter);
    }

    it("should set the correct venmo keys", async () => {
      await subject();

      const venmoKeyHashAdapter = await sendProcessor.mailserverKeyHashAdapter();
      expect(venmoKeyHashAdapter).to.equal(subjectVenmoMailserverKeyHashAdapter);
    });

    describe("when the caller is not the owner", async () => {
      beforeEach(async () => {
        subjectCaller = attacker;
      });

      it("should revert", async () => {
        await expect(subject()).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });
  });

  describe("#setEmailFromAddress", async () => {
    let subjectEmailFromAddress: string;
    let subjectCaller: Account;

    beforeEach(async () => {
      subjectCaller = owner;

      subjectEmailFromAddress = "new-venmo@venmo.com".padEnd(21, "\0");
    });

    async function subject(): Promise<any> {
      return await sendProcessor.connect(subjectCaller.wallet).setEmailFromAddress(subjectEmailFromAddress);
    }

    it("should set the correct venmo address", async () => {
      await subject();

      const emailFromAddress = await sendProcessor.getEmailFromAddress();

      expect(ethers.utils.toUtf8Bytes("new-venmo@venmo.com".padEnd(21, "\0"))).to.deep.equal(ethers.utils.arrayify(emailFromAddress));
    });

    describe("when the caller is not the owner", async () => {
      beforeEach(async () => {
        subjectCaller = attacker;
      });

      it("should revert", async () => {
        await expect(subject()).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });
  });
});
import { BigNumber, ethers } from "ethers";


const abiCoder = new ethers.utils.AbiCoder();

export const keccak256 = (inputString: string): string => {
  return ethers.utils.solidityKeccak256(["string"], [inputString]);
};

export const sha256 = (inputString: string): string => {
  return ethers.utils.soliditySha256(["string"], [inputString]);
};

export const calculateRevolutTagHash = (revTag: string): string => {
  return BigNumber.from(ethers.utils.keccak256(abiCoder.encode(["string"], [revTag]))).toHexString();
};

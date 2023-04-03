import * as secp from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex } from "ethereum-cryptography/utils.js";

export interface PKPair {
	pk: Uint8Array;
	hex: string;
}

export const generatePrivateKey = (): PKPair => {
	const pk = secp.utils.randomPrivateKey();
	return { pk, hex: toHex(pk) };
};

export const generateAddress = (privateKey: Uint8Array) => {
	const publicKey = secp.getPublicKey(privateKey);
	const publicKeyHash = keccak256(publicKey.slice(1));
	return "0x" + toHex(publicKeyHash.slice(-20));
};

import { type NextRequest, NextResponse } from "next/server";
// secp256k1 elliptic curve operations
import secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
// utilities
import { toHex } from "ethereum-cryptography/utils";

const pubKeyToAddress = (publicKey: Uint8Array) => {
	const hash = keccak256(publicKey.slice(1));
	return toHex(hash.slice(-20)).toUpperCase();
};

export async function POST(request: NextRequest) {
	const body = request.body;
	console.log(body);
	const privateKey = secp.utils.randomPrivateKey();
	const publicKey = secp.getPublicKey(privateKey);
	console.log("private key: ", toHex(privateKey));
	console.log("public key: ", publicKey);
	console.log("address: ", pubKeyToAddress(publicKey));

	return NextResponse.json({ address: pubKeyToAddress(publicKey) });
}

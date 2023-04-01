import { NextResponse } from "next/server";
import DB from "app/db";

const db = new DB();

function validateAddress(address: string) {
		if(!address || !String(address)) {
		return new Response("Address is required", { status: 400 });
	}
}

export function GET(
	request: Request,
	{ params }: { params: { address: string } }
) {
	const address = params.address;
	validateAddress(address)
	const balance = db.balances.getByAddress(address) || 0;
	return NextResponse.json({ balance });
}

export async function DELETE(
	request: Request,
	{ params }: { params: { address: string } }
) {
	const address = params.address;
	validateAddress(address)
	await db.balances.delete(address);
	return NextResponse.json({ ok: true });
}

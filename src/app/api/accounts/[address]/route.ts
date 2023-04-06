import { NextResponse } from "next/server";
import { getAccount, updateAccount, deleteAccount } from "app/lib/deta";

type AddressParams = { params: { address: string } };

function validateAddress(address: string) {
	if (!address || !String(address)) {
		return new Response("address is required", { status: 400 });
	}
}

export async function GET(_: any, { params }: AddressParams) {
	validateAddress(params.address);
	let account = await getAccount(params.address);
	return NextResponse.json(account);
}

export async function PUT(request: Request, { params }: AddressParams) {
	validateAddress(params.address);
	const body = (await request.json()) as AccountUpdateParams;
	await updateAccount(params.address, body);
	return NextResponse.json({ ok: true });
}

export async function DELETE(_: any, { params }: AddressParams) {
	validateAddress(params.address);
	await deleteAccount(params.address);
	return NextResponse.json({ ok: true });
}

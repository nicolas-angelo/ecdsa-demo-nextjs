import { NextResponse } from "next/server";
import { searchAccount, getAllAccounts, createAccount } from "app/lib/deta";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	if (searchParams.get("username")) {
		let account = await searchAccount(String(searchParams.get("username")));
		return NextResponse.json(account);
	}
	let accounts = await getAllAccounts();
	return NextResponse.json(accounts);
}

export async function POST(request: Request) {
	const body = await request.json();
	console.log(body);
	let exists = await searchAccount(body.username);
	if (exists) {
		return NextResponse.json({ error: "username already exists" });
	}
	let account = await createAccount(body.username);
	return NextResponse.json(account);
}

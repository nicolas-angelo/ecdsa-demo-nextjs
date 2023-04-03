import { NextResponse } from "next/server";
import AccountClient from "./helpers";

const db = new AccountClient("alchemy");

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	if (searchParams.get("username")) {
		let account = await db.searchAccount(searchParams.get("username"));
		return NextResponse.json(account);
	}
	let accounts = await db.getAllAccounts();
	return NextResponse.json(accounts);
}

export async function POST(request: Request) {
	const body = await request.json();
	console.log(body);
	let account = await db.createAccount(body.username);
	return NextResponse.json(account);
}

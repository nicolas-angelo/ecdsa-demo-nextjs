import { NextResponse } from "next/server";
import DB from "app/db";

const db = new DB();

export async function GET() {
	let balances = db.balances.getAll()
	console.log(db.balances.getByAddress("0x1"))
	// console.log(await db.balances.delete("0x3"))
	return NextResponse.json(balances);
}

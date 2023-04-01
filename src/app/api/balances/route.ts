import { NextResponse } from "next/server";
import DB from "app/db";

const db = new DB();

export async function GET() {
	let balances = db.balances.getAll() || {};
	return NextResponse.json(balances);
}

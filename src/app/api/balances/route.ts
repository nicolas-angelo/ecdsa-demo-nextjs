import { NextRequest, NextResponse } from 'next/server';
// import DB from 'app/db';

// const db = new DB();

export function GET() {
  // let balances = db.balances.getAll() || {};
  return NextResponse.json({ balances: 0 });
}

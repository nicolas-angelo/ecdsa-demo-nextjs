import { NextResponse } from 'next/server';
import DB from 'app/db';

const db = new DB();

export function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const address = params.address;
  const balance = db.balances.getByAddress(address) || 0;
  return NextResponse.json({ balance });
}

export function DELETE(
  request: Request,
  { params }: { params: { address: string } }
) {
  const address = params.address;
  db.balances.delete(address);
  return NextResponse.json({ ok: true });
}

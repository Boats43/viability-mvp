import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Viability Oracle',
    version: '1.0.0',
    law: 'necessary-only',
    engine: 'deterministic',
    api: '/api/viability',
    status: 'frozen'
  });
}

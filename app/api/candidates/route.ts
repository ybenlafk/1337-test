import { NextResponse } from "next/server";
import prisma from "../../lib/db";
export const dynamic = 'force-dynamic';

// GET /api/candidates
export async function GET() {
  const candidates = await prisma.candidate.findMany();
  return NextResponse.json(candidates);
}

// POST /api/candidates
export async function POST(request: Request) {
  const { name, email } = await request.json();
  const newCandidate = await prisma.candidate.create({
    data: { name, email },
  });
  return NextResponse.json(newCandidate);
}

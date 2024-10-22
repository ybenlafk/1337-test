import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

// GET /api/candidates/count
export async function GET() {
  const candidates = await prisma.candidate.findMany();
  const lastWeekCandidates = await prisma.candidate.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });
  return NextResponse.json({
    total: candidates.length,
    new: lastWeekCandidates.length,
  });
}

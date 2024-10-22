import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

// GET /api/candidates/recent (recent candidates)
export async function GET() {
  const recentCandidates = await prisma.candidate.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(recentCandidates);
}
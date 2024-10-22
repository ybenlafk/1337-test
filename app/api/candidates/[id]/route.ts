import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

// PUT /api/candidates/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, email } = await request.json();

  const updatedCandidate = await prisma.candidate.update({
    where: { id },
    data: { name, email },
  });
  return NextResponse.json(updatedCandidate);
}

// DELETE /api/candidates/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await prisma.candidate.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Candidate deleted" });
}

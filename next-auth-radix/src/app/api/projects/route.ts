import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const data = await req.json();

  const session = await getServerSession(authOptions)
  console.log(session)

  const newProject = await prisma.project.create({ data });

  return NextResponse.json(newProject,{
    status: 201,
  });
}

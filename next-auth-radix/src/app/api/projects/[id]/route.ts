import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { parse } from "path";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleteProject = await prisma.project.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json(deleteProject);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }){
  const project = await prisma.project.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })
  
  if(!project){
    return NextResponse.json({error: 'Project not found'}, {status: 404})
  }

  return NextResponse.json(project)
}

export async function PUT(req: Request, { params }: { params: { id: string } }){

  const data = await req.json()
  const projectUpdated = await prisma.project.update({
    where: {
      id: parseInt(params.id)
    },
    data

  })
  return NextResponse.json(projectUpdated)
}
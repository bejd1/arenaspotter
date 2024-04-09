"use server";

import { ReportT } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getReport(): Promise<ReportT[]> {
  const reports = await prisma.reportArena.findMany();

  return reports.map((report) => ({
    id: report.id,
    name: report.name,
    arenaId: report.arenaId,
    email: report.email,
    title: report.title,
    message: report.message,
  }));
}

export async function createReport(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const arenaId = formData.get("arenaId") as string;
    const email = formData.get("email") as string;
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;

    await prisma.reportArena.create({
      data: {
        name: name,
        arenaId: arenaId,
        email: email,
        title: title,
        message: message,
      },
    });

    revalidatePath("/arena");
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function deleteReport(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    await prisma.reportArena.delete({ where: { id: id } });

    revalidatePath("/reports");
  } catch (error) {
    console.error(error);
  }
  console.log("Delete post");
}

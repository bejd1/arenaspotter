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

export async function createReport(
  formData: FormData,
  arenaId: string,
  name: string,
  email: string
) {
  try {
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;

    await prisma.reportArena.create({
      data: {
        name,
        arenaId,
        email,
        title,
        message,
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

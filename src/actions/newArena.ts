"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getArenaByStatus(status: string) {
  const posts = await prisma.post.findMany({
    where: {
      status: status,
    },
  });
  return posts;
}

export async function editStatusArena(formData: FormData) {
  try {
    const id = formData.get("inputId") as string;
    const status = formData.get("status") as string;

    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    revalidatePath("/arena");
  } catch (error) {
    console.error("Error while editing the product:", error);
  }
}

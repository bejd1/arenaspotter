"use server";

import { PostT } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function getData(): Promise<PostT[]> {
  const data = await prisma.post.findMany();

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
  }));
}

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    await prisma.post.create({
      data: {
        title: title,
        body: body,
      },
    });
    revalidatePath("/arena");
  } catch (error) {}
  console.log("Create post");
}

export async function deletePost(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    await prisma.post.delete({ where: { id: id } });

    revalidatePath("/arena");
  } catch (error) {
    console.error(error);
  }
  console.log("Delete post");
}

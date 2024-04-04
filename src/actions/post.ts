"use server";

import { PostT } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getData(): Promise<PostT[]> {
  const data = await prisma.post.findMany();

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    city: item.city,
    address: item.address,
    email: item.email,
    image: item.image,
    image2: item.image2,
    image3: item.image3,
    payment: item.payment,
    people: item.people,
    football: item.football,
    basketball: item.basketball,
    netball: item.netball,
    cost: item.cost || 0,
  }));
}

export async function createPost(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const address = formData.get("address") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as string;
    const image2 = formData.get("image2") as string;
    const image3 = formData.get("image3") as string;
    const payment = formData.get("payment") as string;
    const people = parseInt(formData.get("people") as string);
    const cost = parseInt(formData.get("cost") as string);
    // Assuming 'terms' checkbox values are boolean indicating whether selected or not
    const football = formData.has("football");
    const basketball = formData.has("basketball");
    const netball = formData.has("netball");

    await prisma.post.create({
      data: {
        name: name,
        city: city,
        address: address,
        email: email,
        image: image,
        image2: image2,
        image3: image3,
        payment: payment,
        people: people,
        cost: cost,
        football: football,
        basketball: basketball,
        netball: netball,
      },
    });

    // Assuming revalidatePath is correct, although typically used with Next.js ISR
    revalidatePath("/");
  } catch (error) {
    // Handle errors appropriately, for example logging or throwing
    console.error("Error creating post:", error);
    throw error;
  }
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

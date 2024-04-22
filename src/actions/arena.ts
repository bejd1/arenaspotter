"use server";

import { PostT } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getArena(
  sortByCost: string,
  sortByPeople: string,
  category: string | null
) {
  let orderBy: any = {};

  // Sortowanie wg kategorii
  if (category) {
    orderBy = { [category]: "asc" };
  }

  const data: PostT[] = await prisma.post.findMany({
    orderBy,
  });

  // Jeśli wybrano sortowanie wg kosztu lub liczby osób, dodaj odpowiednie sortowanie
  if (sortByCost) {
    orderBy = { cost: sortByCost === "asc" ? "asc" : "desc" };
    data.sort((a, b) =>
      sortByCost === "asc" ? a.cost - b.cost : b.cost - a.cost
    );
  } else if (sortByPeople) {
    orderBy = { people: sortByPeople === "asc" ? "asc" : "desc" };
    data.sort((a, b) =>
      sortByPeople === "asc" ? a.people - b.people : b.people - a.people
    );
  }

  return data.map((item: PostT) => ({
    id: item.id,
    name: item.name,
    city: item.city,
    address: item.address,
    email: item.email,
    author: item.author,
    image: item.image,
    image2: item.image2,
    image3: item.image3,
    people: item.people,
    cost: item.cost,
    football: item.football,
    basketball: item.basketball,
    netball: item.netball,
    status: item.status,
  }));
}

export async function getArenaById(myId: string): Promise<PostT | null> {
  const post = await prisma.post.findUnique({
    where: {
      id: myId,
    },
  });
  return post;
}

export async function getArenaByAuthor(id: string) {
  const posts = await prisma.post.findMany({
    where: {
      author: id,
    },
  });
  return posts;
}

export async function createArena(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const address = formData.get("address") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as string;
    const image2 = formData.get("image2") as string;
    const image3 = formData.get("image3") as string;
    const people = parseInt(formData.get("people") as string);
    const cost = parseInt(formData.get("cost") as string);
    const football = formData.get("football") as string;
    const basketball = formData.get("basketball") as string;
    const netball = formData.get("netball") as string;
    const author = formData.get("author") as string;
    const status = formData.get("status") as string;

    await prisma.post.create({
      data: {
        name: name,
        city: city,
        address: address,
        email: email,
        author: author,
        image: image,
        image2: image2,
        image3: image3,
        people: people,
        cost: cost,
        football: football,
        basketball: basketball,
        netball: netball,
        status: status,
      },
    });

    revalidatePath("/arena");
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
  return { success: "success" };
}

export async function edit(formData: FormData) {
  try {
    const id = formData.get("inputId") as string;
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const address = formData.get("address") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as string;
    const image2 = formData.get("image2") as string;
    const image3 = formData.get("image3") as string;
    const people = parseInt(formData.get("people") as string);
    const cost = parseInt(formData.get("cost") as string);
    const football = formData.get("football") as string;
    const basketball = formData.get("basketball") as string;
    const netball = formData.get("netball") as string;
    const author = formData.get("author") as string;
    const status = formData.get("status") as string;

    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        city: city,
        address: address,
        email: email,
        author: author,
        image: image,
        image2: image2,
        image3: image3,
        people: people,
        cost: cost,
        football: football,
        basketball: basketball,
        netball: netball,
        status: status,
      },
    });

    revalidatePath("/arena");
  } catch (error) {
    console.error("Error while editing the product:", error);
  }
}

export async function deleteArena(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    await prisma.post.delete({ where: { id: id } });

    revalidatePath("/arena");
  } catch (error) {
    console.error(error);
  }
  console.log("Delete post");
}

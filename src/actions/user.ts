"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export async function editUser(formData: FormData) {
  try {
    const id = formData.get("inputId") as string;
    const firstName = formData.get("firstName") as string;
    const email = formData.get("email") as string;

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: firstName,
        email: email,
      },
    });

    revalidatePath("/settings");
  } catch (error) {
    console.error("Error while editing the product:", error);
  }
}

export async function editUserImage(formData: FormData) {
  try {
    const id = formData.get("inputId") as string;
    const image = formData.get("image") as string;

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: image,
      },
    });

    revalidatePath("/settings");
  } catch (error) {
    console.error("Error while editing the product:", error);
  }
}

export async function deleteUser(formData: FormData) {
  try {
    const inputId = formData.get("inputId") as string;

    const existingProduct = await prisma.user.findUnique({
      where: {
        id: inputId,
      },
    });

    if (existingProduct) {
      await prisma.user.delete({
        where: {
          id: inputId,
        },
      });
      revalidatePath(`/`);
    } else {
      console.error(`User with ID ${inputId} not found`);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

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
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as string;

    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        image: image,
      },
    });

    revalidatePath("/arena");
  } catch (error) {
    console.error("Error while editing the product:", error);
  }
}

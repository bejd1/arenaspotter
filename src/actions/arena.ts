"use server";

import { PostT } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getArena(
  sortBy: string,
  sortOrder: string,
  category: any,
  city: any
) {
  const data: PostT[] = await prisma.post.findMany({});

  const myData = data
    .map((item: PostT) => ({
      id: item.id,
      author: item.author,
      name: item.name,
      city: item.city,
      zipOrPostalCode: item.zipOrPostalCode,
      street: item.street,
      email: item.email,
      phoneNumber: item.phoneNumber,
      people: item.people,
      cost: item.cost,
      status: item.status,
      football: item.football,
      basketball: item.basketball,
      netball: item.netball,
      size: item.size,
      surface: item.surface,
      toilet: item.toilet,
      parking: item.parking,
      showers: item.showers,
      dressingRoom: item.dressingRoom,
      lighting: item.lighting,
      openingMonday: item.openingMonday,
      openingHoursMonday: item.openingHoursMonday,
      openingTuesday: item.openingTuesday,
      openingHoursTuesday: item.openingHoursTuesday,
      openingWednesday: item.openingWednesday,
      openingHoursWednesday: item.openingHoursWednesday,
      openingThursday: item.openingThursday,
      openingHoursThursday: item.openingHoursThursday,
      openingFriday: item.openingFriday,
      openingHoursFriday: item.openingHoursFriday,
      openingSaturday: item.openingSaturday,
      openingHoursSaturday: item.openingHoursSaturday,
      openingSunday: item.openingSunday,
      openingHoursSunday: item.openingHoursSunday,
      description: item.description,
      instagram: item.instagram,
      facebook: item.facebook,
      website: item.website,
      image: item.image,
      premium: item.premium,
    }))
    .filter((item) => {
      if (category === null) {
        return true;
      } else if (category === "football") {
        return item.football;
      } else if (category === "basketball") {
        return item.basketball;
      } else if (category === "netball") {
        return item.netball;
      } else {
        return false;
      }
    });

  const filteredData = myData.filter((item) =>
    (item.city ?? "").toLowerCase().includes(city.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortBy === "cost") {
      if (sortOrder === "asc") {
        return a.cost - b.cost;
      } else {
        return b.cost - a.cost;
      }
    } else if (sortBy === "people") {
      if (sortOrder === "asc") {
        return a.people - b.people;
      } else {
        return b.people - a.people;
      }
    }

    return 0;
  });

  return sortedData;
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
    const author = formData.get("author") as string;
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const zipOrPostalCode = formData.get("zipOrPostalCode") as string;
    const street = formData.get("street") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const people = parseInt(formData.get("people") as string);
    const cost = parseInt(formData.get("cost") as string);
    const status = formData.get("status") as string;
    const football = formData.get("football") as string;
    const basketball = formData.get("basketball") as string;
    const netball = formData.get("netball") as string;
    const size = formData.get("size") as string;
    const surface = formData.get("surface") as string;
    const toilet = formData.get("toilet") as string;
    const parking = formData.get("parking") as string;
    const showers = formData.get("showers") as string;
    const dressingRoom = formData.get("dressingRoom") as string;
    const lighting = formData.get("lighting") as string;
    const openingMonday = formData.get("openingMonday") as string;
    const openingHoursMonday = formData.get("openingHoursMonday") as string;
    const openingTuesday = formData.get("openingTuesday") as string;
    const openingHoursTuesday = formData.get("openingHoursTuesday") as string;
    const openingWednesday = formData.get("openingWednesday") as string;
    const openingHoursWednesday = formData.get(
      "openingHoursWednesday"
    ) as string;
    const openingThursday = formData.get("openingThursday") as string;
    const openingHoursThursday = formData.get("openingHoursThursday") as string;
    const openingFriday = formData.get("openingFriday") as string;
    const openingHoursFriday = formData.get("openingHoursFriday") as string;
    const openingSaturday = formData.get("openingSaturday") as string;
    const openingHoursSaturday = formData.get("openingHoursSaturday") as string;
    const openingSunday = formData.get("openingSunday") as string;
    const openingHoursSunday = formData.get("openingHoursSunday") as string;
    const description = formData.get("description") as string;
    const instagram = formData.get("instagram") as string;
    const facebook = formData.get("facebook") as string;
    const website = formData.get("website") as string;
    const image = formData.get("image") as string;
    const premium = formData.get("premium") as string;

    await prisma.post.create({
      data: {
        author: author,
        name: name,
        city: city,
        zipOrPostalCode: zipOrPostalCode,
        street: street,
        email: email,
        phoneNumber: phoneNumber,
        people: people,
        cost: cost,
        status: status,
        football: football,
        basketball: basketball,
        netball: netball,
        size: size,
        surface: surface,
        toilet: toilet,
        parking: parking,
        showers: showers,
        dressingRoom: dressingRoom,
        lighting: lighting,
        openingMonday: openingMonday,
        openingHoursMonday: openingHoursMonday,
        openingTuesday: openingTuesday,
        openingHoursTuesday: openingHoursTuesday,
        openingWednesday: openingWednesday,
        openingHoursWednesday: openingHoursWednesday,
        openingThursday: openingThursday,
        openingHoursThursday: openingHoursThursday,
        openingFriday: openingFriday,
        openingHoursFriday: openingHoursFriday,
        openingSaturday: openingSaturday,
        openingHoursSaturday: openingHoursSaturday,
        openingSunday: openingSunday,
        openingHoursSunday: openingHoursSunday,
        description: description,
        instagram: instagram,
        facebook: facebook,
        website: website,
        image: image,
        premium: premium,
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
    const author = formData.get("author") as string;
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const zipOrPostalCode = formData.get("zipOrPostalCode") as string;
    const street = formData.get("street") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const people = parseInt(formData.get("people") as string);
    const cost = parseInt(formData.get("cost") as string);
    const status = formData.get("status") as string;
    const football = formData.get("football") as string;
    const basketball = formData.get("basketball") as string;
    const netball = formData.get("netball") as string;
    const size = formData.get("size") as string;
    const surface = formData.get("surface") as string;
    const toilet = formData.get("toilet") as string;
    const parking = formData.get("parking") as string;
    const showers = formData.get("showers") as string;
    const dressingRoom = formData.get("dressingRoom") as string;
    const lighting = formData.get("lighting") as string;
    const allTime = formData.get("allTime") as string;
    const openingMonday = formData.get("openingMonday") as string;
    const openingHoursMonday = formData.get("openingHoursMonday") as string;
    const openingTuesday = formData.get("openingTuesday") as string;
    const openingHoursTuesday = formData.get("openingHoursTuesday") as string;
    const openingWednesday = formData.get("openingWednesday") as string;
    const openingHoursWednesday = formData.get(
      "openingHoursWednesday"
    ) as string;
    const openingThursday = formData.get("openingThursday") as string;
    const openingHoursThursday = formData.get("openingHoursThursday") as string;
    const openingFriday = formData.get("openingFriday") as string;
    const openingHoursFriday = formData.get("openingHoursFriday") as string;
    const openingSaturday = formData.get("openingSaturday") as string;
    const openingHoursSaturday = formData.get("openingHoursSaturday") as string;
    const openingSunday = formData.get("openingSunday") as string;
    const openingHoursSunday = formData.get("openingHoursSunday") as string;
    const description = formData.get("description") as string;
    const instagram = formData.get("instagram") as string;
    const facebook = formData.get("facebook") as string;
    const website = formData.get("website") as string;
    const image = formData.get("image") as string;
    const premium = formData.get("premium") as string;

    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        author: author,
        name: name,
        city: city,
        zipOrPostalCode: zipOrPostalCode,
        street: street,
        email: email,
        phoneNumber: phoneNumber,
        people: people,
        cost: cost,
        status: status,
        football: football,
        basketball: basketball,
        netball: netball,
        size: size,
        surface: surface,
        toilet: toilet,
        parking: parking,
        showers: showers,
        dressingRoom: dressingRoom,
        lighting: lighting,
        openingMonday: openingMonday,
        openingHoursMonday: openingHoursMonday,
        openingTuesday: openingTuesday,
        openingHoursTuesday: openingHoursTuesday,
        openingWednesday: openingWednesday,
        openingHoursWednesday: openingHoursWednesday,
        openingThursday: openingThursday,
        openingHoursThursday: openingHoursThursday,
        openingFriday: openingFriday,
        openingHoursFriday: openingHoursFriday,
        openingSaturday: openingSaturday,
        openingHoursSaturday: openingHoursSaturday,
        openingSunday: openingSunday,
        openingHoursSunday: openingHoursSunday,
        description: description,
        instagram: instagram,
        facebook: facebook,
        website: website,
        image: image,
        premium: premium,
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

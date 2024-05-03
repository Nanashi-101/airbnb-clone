"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";

export async function selectHomeCategory({ userId }: { userId: string }) {
  let home = await prisma.home.findFirst({
    where: {
      usersId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (home === null) {
    home = await prisma.home.create({
      data: {
        usersId: userId,
      },
    });

    return redirect(`/createHome/${home.id}/structure`);
  } else if (
    !home.addedCategory &&
    !home.addedDescription &&
    !home.addedLocation
  ) {
    return redirect(`/createHome/${home.id}/structure`);
  } else if (home.addedCategory && !home.addedDescription) {
    return redirect(`/createHome/${home.id}/description`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const category = formData.get("category") as string;
  const homeId = formData.get("homeId") as string;
  const home = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: category,
      addedCategory: true,
    },
  });

  return redirect(`/createHome/${homeId}/description`);
}

export async function createDescriptionPage(formData: FormData) {
  const homeId = formData.get("homeId") as string;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string);
  const image = formData.get("image") as File;

  const guestNumber = formData.get("guests") as string;
  const bedroomNumber = formData.get("bedrooms") as string;
  const bathroomNumber = formData.get("bathrooms") as string;
  
  // Upload image to Supabase Storage by using supabase client
  const { data } = await supabase.storage
    .from("Airbnb-clone-images")
    .upload(`${image.name}-${new Date()}`, image, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const home = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: price,
      guests: guestNumber,
      bedrooms: bedroomNumber,
      bathrooms: bathroomNumber,
      addedDescription: true,
      photo: data?.path
    },
  });

  return redirect(`/createHome/${homeId}/location`);
}

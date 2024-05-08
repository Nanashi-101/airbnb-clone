"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";


// Select the home category {Beginnings of the home creation process}
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
  } else if (
    home.addedCategory &&
    home.addedDescription &&
    !home.addedLocation
  ) {
    return redirect(`/createHome/${home.id}/location`);
  } else if (
    home.addedCategory &&
    home.addedDescription &&
    home.addedLocation
  ) {
    home = await prisma.home.create({
      data: {
        usersId: userId,
      },
    });

    return redirect(`/createHome/${home.id}/structure`);
    // return redirect(`/createHome/${home.id}/choice`);
  }
}


// Add category data to the database
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


// Add description data to the database
export async function createDescriptionPage(formData: FormData) {
  const homeId = formData.get("homeId") as string;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const days = parseInt(formData.get("days") as string);
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
      availableFor: days,
      addedDescription: true,
      photo: data?.path,
    },
  });

  return redirect(`/createHome/${homeId}/location`);
}


// Add location data to the database
export async function createLocationPage(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const location = formData.get("location") as string;

  const home = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      country: location,
      addedLocation: true,
    },
  });

  return redirect(`/`);
}

// Add a home to the favorite list
export async function addToFavorite(formData: FormData ) {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const pathName = formData.get("pathName") as string;
  const favorite = await prisma.favorite.create({
    data: {
      usersId: userId,
      homeId: homeId,
    },
  });
  
  // Revalidate the path to update the UI
  revalidatePath(pathName)
}

// Delete a favorite from the database
export async function deleteFromFavorite(formData: FormData) {
  const userId = formData.get("userId") as string;
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;
  const favorite = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      usersId: userId,
    },
  });
  revalidatePath(pathName)
}

// Create a reservation
export async function createReservation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const bookedDatesNumber = parseInt(formData.get("bookedDatesNumber") as string);

  const reservation = await prisma.reservation.create({
    data: {
      usersId: userId,
      homeId: homeId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });

  const home = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      availableFor: bookedDatesNumber
    },
  })

  return redirect(`/`);
}

export async function updateHome(daysNumber: number, homeId: string){
  const home = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      availableFor: daysNumber
    },
  })
}
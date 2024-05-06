import React from "react";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoItems from "@/components/my_components/NoItems";
import { divIcon } from "leaflet";
import ListingCard from "@/components/my_components/ListingCard";

async function getData(userId: string) {
  const data = await prisma.favorite.findMany({
    where: {
      usersId: userId,
    },
    select: {
      id: true,
      Home: {
        select: {
          id: true,
          photo: true,
          price: true,
          description: true,
          country: true,
          Favorite: true,
        },
      },
    },
  });

  return data;
}

async function FavoriteRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  const favoriteData = await getData(user.id as string);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>
      {favoriteData.length === 0 ? (
        <NoItems mainText="Hey, you have no favorites..." subText="Please add listings to see your favorites"/>
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
          {favoriteData.map((item) => {
            return (
              <ListingCard
                key={item.Home?.id}
                params={{
                  imagePath: item.Home?.photo as string,
                  description: item.Home?.description as string,
                  country: item.Home?.country as string,
                  price: item.Home?.price as number,
                  userId: user.id,
                  homeId: item.Home?.id,
                  isAddedToFavorite: (item.Home?.Favorite.length as number) > 0,
                  favoriteId: item.Home?.Favorite[0]?.id,
                  pathName: "favorite",
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default FavoriteRoute;

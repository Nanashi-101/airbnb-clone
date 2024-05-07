import React from "react";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoItems from "@/components/my_components/NoItems";
import { divIcon } from "leaflet";
import ListingCard from "@/components/my_components/ListingCard";

async function getData(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      usersId: userId,
    },
    select: {
      id: true,
      photo: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          usersId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

async function ListingRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  const myHomeData = await getData(user.id as string);
  return (
    <section className="container mx-auto px-5 lg:px-10 my-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your listings</h2>
      {myHomeData.length === 0 ? (
        <NoItems
          mainText="You currently have no listings..."
          subText="Please add your home in Airbnb to see your listing here"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
          {myHomeData.map((item) => {
            return (
              <ListingCard
                key={item.id}
                params={{
                  imagePath: item.photo as string,
                  description: item.description as string,
                  country: item.country as string,
                  price: item.price as number,
                  userId: user.id,
                  homeId: item.id,
                  isAddedToFavorite: (item.Favorite.length as number) > 0,
                  favoriteId: item.Favorite[0]?.id,
                  pathName: "listing",
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ListingRoute;

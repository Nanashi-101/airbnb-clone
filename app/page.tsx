import prisma from "@/app/lib/db";
import FilterItems from "@/components/my_components/filterItems";
import ListingCard from "@/components/my_components/ListingCard";
import NoItems from "@/components/my_components/NoItems";
import SkeletonCard from "@/components/my_components/SkeletonCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import {unstable_noStore as noStore} from "next/cache"

const getData = async ({
  searchParams,
  userId,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
  userId?: string | undefined;
}) => {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guests ?? undefined,
      bedrooms: searchParams?.bedrooms ?? undefined,
      bathrooms: searchParams?.bathrooms ?? undefined,
    },
    select: {
      id: true,
      description: true,
      country: true,
      price: true,
      photo: true,
      Favorite: {
        where: {
          usersId: userId,
        },
      },
    },
  });

  return data;
};

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  return (
    <div className="container px-5 lg:px-10">
      <FilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <GetListingData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

//Function to get data from the database
async function GetListingData({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = (
    await getData({ searchParams: searchParams, userId: user?.id })
  ).sort();
  return (
    <>
      {data.length > 0 ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              params={{
                imagePath: item.photo as string,
                description: item.description as string,
                country: item.country as string,
                price: item.price as number,
                userId: user?.id,
                homeId: item.id as string,
                favoriteId: item.Favorite[0]?.id,
                isAddedToFavorite: item.Favorite.length > 0 ? true : false,
                pathName: "/",
              }}
            />
          ))}
        </div>
      ) : (
        <NoItems
          mainText="No listings of this category found..."
          subText="Please check other categories or create your own listing!"
        />
      )}
    </>
  );
}

// skeleton code
function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

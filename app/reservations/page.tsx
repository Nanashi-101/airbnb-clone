import ListingCard from "@/components/my_components/ListingCard";
import NoItems from "@/components/my_components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import {unstable_noStore as noStore} from "next/cache"

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
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
          Favorite: {
            where: {
              usersId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

async function ReservationRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  const myReservedHomeData = await getData(user.id as string);
  return (
    <section className="container mx-auto px-5 lg:px-10 my-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your listings</h2>
      {myReservedHomeData.length === 0 ? (
        <NoItems
          mainText="You have not made any reservations..."
          subText="Please make a reservation to see your reservation here"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
          {myReservedHomeData.map((item) => {
            return (
              <ListingCard
                key={item.id}
                params={{
                  imagePath: item.Home?.photo as string,
                  description: item.Home?.description as string,
                  country: item.Home?.country as string,
                  price: item.Home?.price as number,
                  userId: user.id,
                  homeId: item.Home?.id,
                  isAddedToFavorite: (item.Home?.Favorite.length as number) > 0,
                  favoriteId: item.Home?.Favorite[0]?.id,
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

export default ReservationRoute;

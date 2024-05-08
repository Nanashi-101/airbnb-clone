/* eslint-disable @next/next/no-img-element */
import { createReservation } from "@/app/action";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import CategoryProfile from "@/components/my_components/categoryProfile";
import HomeMap from "@/components/my_components/homeMap";
import { PendingButton2 } from "@/components/my_components/pendingStateBtn";
import SelectCalender from "@/components/my_components/SelectCalender";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { findFlagUrlByCountryName } from "country-flags-svg";
import Image from "next/image";

async function getHomeData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      title: true,
      description: true,
      country: true,
      categoryName: true,
      price: true,
      bedrooms: true,
      bathrooms: true,
      guests: true,
      availableFor: true,
      createdAt: true,
      Reservation:{
        where:{
          homeId: homeId
        }
      },
      users: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          profilePicture: true,
        },
      },
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  const homeData = await getHomeData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(homeData?.country as string);
  const flagUrl = findFlagUrlByCountryName(country?.label as string);
  const date = [
    homeData?.createdAt?.getDate(),
    homeData?.createdAt?.getMonth(),
    homeData?.createdAt?.getFullYear(),
  ];
  return (
    <div className="max-w-[75%] mx-auto my-10 mb-12">
      <h1 className="text-2xl mb-5 font-medium">{homeData?.title}</h1>
      <div className="relative h-[34.375rem]">
        <Image
          alt="home-img"
          src={`https://jfoxkltpglwmgpmnzmmy.supabase.co/storage/v1/object/public/Airbnb-clone-images/${homeData?.photo}`}
          style={{ objectFit: "cover" }}
          fill
          quality={100}
          loading="eager"
          className="rounded-sm shadow-2xl h-full w-full object-cover border border-white"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <div className="flex gap-2 items-center">
            <img
              src={flagUrl}
              alt={country?.label}
              className="w-10 h-10 rounded-sm object-cover object-center flex items-center justify-center shadow-md"
            />
            <h3 className="font-medium text-xl">
              {country?.label}
              {"/"}
              {country?.region}
            </h3>
          </div>
          <div className="flex gap-x-8 mt-4">
            <p className="text-muted-foreground font-medium">
              {homeData?.guests} guests · {homeData?.bedrooms} bedrooms ·{" "}
              {homeData?.bathrooms} bathrooms
            </p>
          </div>
          <div className="flex items-center mt-6">
            <img
              src={
                homeData?.users?.profilePicture
                  ? homeData?.users?.profilePicture
                  : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="user-img"
              className="w-16 h-16 rounded-full shadow-xl"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                Hosted by {homeData?.users?.firstName}
              </h3>
              <p>
                Post created at {date[0]}
                {"/"}
                {date[1]}
                {"/"}
                {date[2]}
              </p>
            </div>
          </div>

          <Separator className="my-7" />

          <CategoryProfile category={homeData?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-justify text-muted-foreground">
            {homeData?.description}
          </p>

          <Separator className="my-7" />

          <HomeMap locationValue={homeData?.country as string} />
        </div>
        <form className="flex flex-col items-center" action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalender availableDates={homeData?.availableFor as number} reservation={homeData?.Reservation}/>
          {
            user?.id ? (
              <PendingButton2 text="Make a reservation" />
            ) : (
              <Button className="w-full" asChild>
                <LoginLink>Login to book</LoginLink>
              </Button>
            )
          }
        </form>
      </div>
    </div>
  );
}

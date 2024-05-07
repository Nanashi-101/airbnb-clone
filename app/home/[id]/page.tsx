/* eslint-disable @next/next/no-img-element */
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
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
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const homeData = await getHomeData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(homeData?.country as string);
  const flagUrl = findFlagUrlByCountryName(country?.label as string);
  return (
    <div className="max-w-[75%] mx-auto my-10">
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
              className="w-10 h-10 rounded-sm object-cover object-center flex items-center justify-center"
            />
            <h3 className="font-medium text-xl">
              {country?.label}
              {"/"}
              {country?.region}
            </h3>
          </div>
          <div className="flex gap-x-8 mt-4">
            <p className="text-muted-foreground font-medium">
              {homeData?.guests} guests ·{" "} {homeData?.bedrooms} bedrooms ·{" "}
              {homeData?.bathrooms} bathrooms
            </p>            
          </div>
        </div>
      </div>
    </div>
  );
}

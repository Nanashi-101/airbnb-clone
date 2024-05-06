"use client";
/* eslint-disable @next/next/no-img-element */
import { addToFavorite, deleteFromFavorite } from "@/app/action";
import { findFlagUrlByCountryName } from "country-flags-svg";
import { HeartCrackIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddtoFavoriteBtn, DeleteFromFavoriteBtn } from "./pendingStateBtn";

interface ListingCardProps {
  imagePath: string;
  description: string;
  country: string;
  price: number;
  userId: string | undefined;
  homeId: string | undefined;
  isAddedToFavorite: boolean;
  favoriteId: string | undefined;
  pathName: string;
}

function ListingCard({ params }: { params: ListingCardProps }) {
  const flagUrl = findFlagUrlByCountryName(params.country);
  return (
    <div className="flex flex-col border rounded-lg p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02]">
      <div className="relative h-72">
        <Image
          src={`https://jfoxkltpglwmgpmnzmmy.supabase.co/storage/v1/object/public/Airbnb-clone-images/${params.imagePath}`}
          alt="home"
          fill
          className="rounded-lg h-full object-fill mb-3"
        />

        {params.userId && (
          <div className="z-10 absolute top-2 right-2 cursor-pointer">
            {params.isAddedToFavorite ? (
              <form action={deleteFromFavorite}>
                <input type="hidden" name="userId" value={params.userId} />
                <input type="hidden" name="favoriteId" value={params.favoriteId} />
                <input type="hidden" name="pathName" value={params.pathName} />
                <DeleteFromFavoriteBtn />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="userId" value={params.userId} />
                <input type="hidden" name="homeId" value={params.homeId} />
                <input type="hidden" name="pathName" value={params.pathName} />
                <AddtoFavoriteBtn />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href="/" className="mt-4">
        <div className="flex gap-2">
          <img
            src={flagUrl}
            alt={params.country}
            className="w-6 h-6 rounded-full object-cover object-center flex items-center justify-center"
          />
          <h3 className="font-medium text-lg">{params.country}</h3>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {params.description}
        </p>
        <p className="pt-2 text-muted-foreground text-lg">
          <span className="font-medium text-black">{params.price}zł</span> /
          Night
        </p>
      </Link>
    </div>
  );
}

export default ListingCard;

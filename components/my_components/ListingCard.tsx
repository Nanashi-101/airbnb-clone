/* eslint-disable @next/next/no-img-element */
import { findFlagUrlByCountryName } from "country-flags-svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ListingCardProps {
  imagePath: string;
  description: string;
  country: string;
  price: number;
}

function ListingCard({ params }: { params: ListingCardProps }) {
  const flagUrl = findFlagUrlByCountryName(params.country);
  return (
    <div className="flex flex-col border rounded-lg p-2 shadow-lg">
      <div className="relative h-72">
        <Image
          src={`https://jfoxkltpglwmgpmnzmmy.supabase.co/storage/v1/object/public/Airbnb-clone-images/${params.imagePath}`}
          alt="home"
          fill
          className="rounded-lg h-full object-fill mb-3"
        />
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
        <p className="text-muted-foreground text-sm line-clamp-2">{params.description}</p>
        <p className="pt-2 text-muted-foreground text-lg"><span className="font-medium text-black">{params.price}PLN</span> / Night</p>
      </Link>
    </div>
  );
}

export default ListingCard;

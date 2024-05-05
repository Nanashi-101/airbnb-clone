import Image from "next/image";
import React from "react";

interface ListingCardProps {
  imagePath: string;
  description: string;
  country: string;
  price: number;
}

function ListingCard({ params }: { params: ListingCardProps }) {
  return (
    <div className="flex flex-col ">
      <div className="relative h-72">
        <Image src={`https://jfoxkltpglwmgpmnzmmy.supabase.co/storage/v1/object/public/Airbnb-clone-images/${params.imagePath}`} alt="home" fill className="rounded-lg h-full object-fill mb-3" />
      </div>
    </div>
  );
}

export default ListingCard;

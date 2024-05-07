import { categoryItems } from "@/app/lib/data";
import Image from "next/image";
import React from "react";

function CategoryProfile({ category }: { category: string }) {
  const categoryData = categoryItems.find((item) => item.name === category);
  return (
    <div className="flex items-center">
      <Image
        src={categoryData?.imageUrl as string}
        alt={categoryData?.title as string}
        width={50}
        height={50}
      />

      <div className="ml-2">
        <h1 className="text-lg font-medium">{categoryData?.title}</h1>
        <p className="text-sm text-muted-foreground">{categoryData?.description}</p>
      </div>
    </div>
  );
}

export default CategoryProfile;

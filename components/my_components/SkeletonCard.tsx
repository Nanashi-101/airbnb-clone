import React from "react";
import { Skeleton } from "../ui/skeleton";

function SkeletonCard() {
  return (
    <div className="flex flex-col border rounded-lg p-2">
      <div className="relative h-72">
        <Skeleton className="rounded-lg h-full object-fill mb-3"/>
      </div>
      <div className="mt-4">
        <div className="flex gap-2 items-center mb-4">
          <Skeleton className="w-10 h-10 rounded-full object-cover object-center flex items-center justify-center" />
          <Skeleton className="font-medium text-lg w-32 h-6"/>
        </div>
        <Skeleton  className="mb-2 w-full h-4 text-muted-foreground text-lg"/>
        <Skeleton className="text-muted-foreground text-sm w-full h-8"/>
      </div>
    </div>
  );
}

export default SkeletonCard;

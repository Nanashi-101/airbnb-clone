"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";

function HomeMap({ locationValue, draggable }: { locationValue: string, draggable: boolean }) {
  const [locationName, setLocationName] = useState<string>("");
  const LazyMap = dynamic(() => import("@/components/my_components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full"/>,
  });
  return (
    <LazyMap locationValue={locationValue} setLocation={setLocationName} draggable={draggable}/>
  );
}

export default HomeMap;

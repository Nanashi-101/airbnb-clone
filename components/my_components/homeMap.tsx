"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";

function HomeMap({ locationValue }: { locationValue: string }) {
  const [locationName, setLocationName] = useState<string>("");
  const LazyMap = dynamic(() => import("@/components/my_components/Map"), {
    ssr: false,
    loading: () => <Skeleton />,
  });
  return (
    <LazyMap locationValue={locationValue} setLocation={setLocationName} />
  );
}

export default HomeMap;

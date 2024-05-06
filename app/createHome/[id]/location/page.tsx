"use client";

/* eslint-disable @next/next/no-img-element */
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import React, { use, useState } from "react";
import { useCountries } from "../../../lib/getCountries";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import CreateHomeFooter from "@/components/my_components/CreateHomeFooter";
import { createLocationPage } from "@/app/action";

function LocationRoute({params}: {params: {id: string}}) {
  const { getAllCountries } = useCountries();

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const LazyMap = dynamic(() => import("@/components/my_components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <div className="mb-28">
      <div className="sm:w-[60%] mx-auto px-6">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Where is your home located?
        </h2>
      </div>

      <form action={createLocationPage}>
        <input type="hidden" name="homeId" value={params.id}/>
        <input type="hidden" name="location" value={location}/>
        <div className="sm:w-[60%] mx-auto px-6">
          <div className="my-5">
            <Select name="location" required onValueChange={(value) => setSelectedLocation(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries:</SelectLabel>
                  {getAllCountries().map((item, index) => {
                    const flagUrl = findFlagUrlByIso2Code(item.value);
                    return (
                      <div className="flex" key={index}>
                        <img
                          src={flagUrl}
                          alt={item.label}
                          className="w-6 h-6 rounded-full object-cover object-center flex items-center justify-center ml-2"
                        />
                        <SelectItem value={item.value}>
                          {item.label}
                          {" / "}
                          {item.region}
                        </SelectItem>
                      </div>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={selectedLocation} setLocation={setLocation}/>
        </div>
        <CreateHomeFooter />
      </form>
    </div>
  );
}

export default LocationRoute;

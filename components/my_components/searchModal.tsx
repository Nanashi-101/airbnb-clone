/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { useCountries } from "@/app/lib/getCountries";
import HomeMap from "./homeMap";
import { Button } from "../ui/button";
import { PendingButton, PendingButton2 } from "./pendingStateBtn";
import { Card, CardHeader } from "../ui/card";
import Counter from "./counter";

function SearchModalComponent() {
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("Poland");
  const { getAllCountries, getCountryByIso2Code } = useCountries();
  const SubmitButtonLocal = () => {
    if (step === 1) {
      return (
        <Button
          onClick={() => setStep(step + 1)}
          type="button"
          className="w-full text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Next
        </Button>
      );
    } else if (step === 2) {
      return <PendingButton2 text="Submit" />;
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full mx-auto rounded-full py-3 px-5 text-sm md:text-xl hidden sm:flex items-center cursor-pointer border transition-all">
          <div className="hidden sm:flex h-full divide-x font-medium">
            <p className="px-4 transition-all">Anywhere</p>
            <p className="px-4">Any week</p>
            <p className="px-4">Add guests</p>
          </div>
          <Search
            size={24}
            className="hidden sm:block ml-4 bg-primary text-white h-10 w-10 p-2 rounded-full transition-all hover:scale-105"
          />
        </div>
        <div className="w-full mx-auto rounded-full py-3 px-5 flex items-center border justify-between sm:hidden h-full font-medium text-lg">
          <p className="px-4 transition-all">Where to?</p>
          <Search
            size={24}
            className="ml-4 bg-primary text-white h-10 w-10 p-2 rounded-full transition-all hover:scale-105"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] sm:max-w-[425px] rounded-xl">
        <form className="flex flex-col gap-4">
          <input type="hidden" name="country" value={selectedLocation} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a country</DialogTitle>
                <DialogDescription>
                  Select a country to search for listings
                </DialogDescription>
                <Select
                  name="location"
                  required
                  onValueChange={(value) =>
                    setSelectedLocation(
                      getCountryByIso2Code(value)?.label as string
                    )
                  }
                >
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
                <div className="pt-4">
                  <HomeMap locationValue={selectedLocation as string} draggable={true}/>
                </div>
              </DialogHeader>
              <DialogFooter>
                <SubmitButtonLocal />
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Enter all the info:</DialogTitle>
                <DialogDescription>
                  please fill all the important informations
                </DialogDescription>
                <Card>
                  <CardHeader className="flex flex-col gap-y-5">
                    <div className="flex item-center justify-between">
                      <div className="flex flex-col">
                        <h1 className="font-semibold text-base">Guests</h1>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          How many guests are allowed?
                        </p>
                      </div>
                      <Counter name="guests" />
                    </div>
                    <div className="flex item-center justify-between">
                      <div className="flex flex-col">
                        <h1 className="font-semibold text-base">Bedrooms</h1>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          How many bedrooms are there?
                        </p>
                      </div>
                      <Counter name="bedrooms" />
                    </div>
                    <div className="flex item-center justify-between">
                      <div className="flex flex-col">
                        <h1 className="font-semibold text-base">Bathrooms</h1>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          How many bathrooms are there?
                        </p>
                      </div>
                      <Counter name="bathrooms" />
                    </div>
                  </CardHeader>
                </Card>
              </DialogHeader>
              <DialogFooter>
                <SubmitButtonLocal />
              </DialogFooter>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SearchModalComponent;

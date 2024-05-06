"use client";

import { categoryItems } from "@/app/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 md:gap-8 mt-10 sm:w-[60%] mx-auto mb-36 px-6">
      <input type="hidden" name="category" value={selectedCategory as string} />
      {categoryItems.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelectedCategory(item.name)}
          className="cursor-pointer"
        >
          <Card
            className={cn(
              selectedCategory === item.name
                ? "border-2 border-primary hover:border-2 hover:border-primary"
                : "opacity-70",
              "hover:border hover:border-primary/60 hover:scale-105 transition-all shadow-md hover:opacity-90"
            )}
          >
            <CardHeader className="px-3 py-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={34}
                height={34}
                className="w-8 h-8"
              />
              <h2 className="font-medium text-[0.975rem] tracking-tight">{item.title}</h2>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}

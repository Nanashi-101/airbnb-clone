"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";

function ChoiceRoute({params}: {params: {id: string}}) {
  return (
    <div className="w-[70%] px-5 mx-auto flex flex-col items-center justify-center my-24">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors text-center">
          Welcome! to Airbnb Home
        </h2>
      <div className="flex gap-5 my-5 w-full mx-auto items-center justify-between">
        <Button
          variant={"outline"}
          className="flex items-center justify-center gap-3 text-4xl w-full px-auto h-[50vh] text-[#DC0D63] shadow-md hover:scale-[1.02] transition-all"
          onClick={() => redirect(`/createHome/${params.id}/structure`)}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/3771/3771037.png"
            width={70}
            height={70}
            alt="add"
          />
          Add new home
        </Button>
        <Button
          variant={"outline"}
          className="flex items-center justify-center gap-3 text-4xl w-full px-auto h-[50vh] text-[#DC0D63] shadow-md hover:scale-[1.02] transition-all"
        >
          <Image
            src="https://cdn-icons-png.freepik.com/512/4467/4467015.png"
            width={70}
            height={70}
            alt="add"
          />
          Your homes
        </Button>
      </div>
    </div>
  );
}

export default ChoiceRoute;

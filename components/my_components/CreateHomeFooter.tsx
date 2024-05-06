import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { PendingButton } from "./pendingStateBtn";

function CreateHomeFooter() {
  return (
    <div>
      <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
        <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
          <Button
            variant="secondary"
            size="lg"
            className="hover:scale-105 transition-all shadow-md"
            asChild
          >
            <Link href="/">Cancel</Link>
          </Button>
          <PendingButton />
        </div>
      </div>
    </div>
  );
}

export default CreateHomeFooter;

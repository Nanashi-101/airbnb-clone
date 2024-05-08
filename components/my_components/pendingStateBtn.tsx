"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";

export function PendingButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <Button type="submit" size="lg">
          <Loader2 className="h-5 w-5 animate-spin  mr-[1rem]" />
          Please wait...
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          className="hover:scale-105 transition-all shadow-md"
        >
          {text}
        </Button>
      )}
    </div>
  );
}

export function PendingButton2({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button type="submit" size="lg">
          <Loader2 className="h-5 w-5 animate-spin  mr-[1rem]" />
          Please wait...
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full hover:scale-[1.02] transition-all shadow-md"
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function AddtoFavoriteBtn() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="hover:scale-105 transition-all shadow-md bg-primary-foreground"
          type="submit"
        >
          <Heart className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteBtn() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="hover:scale-105 transition-all shadow-md bg-primary-foreground"
          type="submit"
        >
          <Heart className="h-6 w-6 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
}

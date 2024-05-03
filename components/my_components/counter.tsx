"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

function Counter({name}: {name: string}) {
  const [amount, setAmount] = useState<number>(1);
  return (
    <div className="flex gap-x-4 items-center justify-center">
      <input type="hidden" name={name} value={amount} />
      <Button variant="outline" size="icon" type="button" disabled={amount === 1?true:false} onClick={()=>{
        setAmount(amount-1);
      }}>
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <h1 className="font-semibold text-lg">{amount}</h1>
      <Button variant="outline" size="icon" type="button" disabled={amount === 5?true:false} onClick={()=>{
        setAmount(amount+1);
      }}>
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}

export default Counter;

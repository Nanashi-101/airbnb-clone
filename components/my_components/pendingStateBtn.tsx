"use client";
import React from 'react'
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

export function PendingButton() {
    const { pending } = useFormStatus()
    return (
        <div>
            {pending ? (
                <Button type='submit' size="lg">
                    <Loader2 className='h-5 w-5 animate-spin  mr-[1rem]' />
                    Please wait...
                </Button>
            ) : (<Button type='submit' size="lg" className='hover:scale-105 transition-all shadow-md'>Submit</Button>)}
        </div>
    )
}

export default PendingButton

"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react'
import { categoryItems } from '@/app/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

function FilterItems() {
    // The useSearchParams hook is used to get the query params from the URL
    const searchParams = useSearchParams();
    // The search variable is used to get the filter query from the URL
    const search = searchParams.get('filter');

    // The usePathname hook is used to get the current path name
    const pathName = usePathname();

    // This is the query that let's me update  the URL query params using the filters
    const createFilterQuery = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        }, [searchParams]
    )

    return (
        <div className='flex gap-x-10 mt-10 p-3 w-full overflow-x-scroll disable-scrollbar justify-center'>
            {
                categoryItems.map((item, index) => (
                    <Link key={index} href={
                        pathName + '?' + createFilterQuery('filter', item.name)
                    } className={cn(
                        search === item.name ? 'border-b-2 pb-2 border-black flex-shrink-0': 'opacity-60 flex-shrink-0', 'flex flex-col items-center justify-center gap-y-2 hover:border-b-2 hover:border-gray-600 hover:pb-2 transition-all hover:opacity-90 hover:scale-110'
                    )}>
                        <div className="relative w-6 h-6">
                            <Image src={item.imageUrl} alt='item-img' width={28} height={28} className='' />
                        </div>
                        <p className='text-xs font-medium'>{item.title}</p>
                    </Link>
                ))
            }
        </div>
    )
}

export default FilterItems

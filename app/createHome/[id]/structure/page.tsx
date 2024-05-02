import { createCategoryPage } from '@/app/action'
import PendingButton from '@/components/my_components/pendingStateBtn'
import SelectCategory from '@/components/my_components/selectCategory'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function StructureRoute({params}: {params: {id: string}}) {
    return (
        <>
            <div className='w-[50%] mx-auto'>
                <h2 className='text-3xl font-semibold tracking-tight transition-colors'>Which of these categories describe your home the best?</h2>
            </div>

            <form action={createCategoryPage}>
                <input type="hidden" name="homeId" value={params.id} />
                <SelectCategory />
                <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
                    <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
                        <Button variant="secondary" size="lg" className='hover:scale-105 transition-all shadow-md' asChild>
                            <Link href="/">
                                Cancel
                            </Link>
                        </Button>
                        <PendingButton />
                    </div>
                </div>
            </form>
        </>
    )
} export default StructureRoute

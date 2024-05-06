/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { Menu } from 'lucide-react'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { IoIosLogOut } from "react-icons/io";
import { selectHomeCategory } from '@/app/action';
import prisma from '@/app/lib/db';


export async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const createHomeWithUserId = selectHomeCategory.bind(null, {
        userId: user?.id as string
    })

    const getHome = async () => {
        const home = await prisma.home.findFirst({
            where: {
                usersId: user?.id as string
            },
        }
        );

        return home;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border p-2 lg:px-4 lg:py-2 flex items-center gap-x-2 hover:shadow-md  transition-all">
                    <Menu size={24} />
                    <img src={
                        user?.picture ??
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                        alt='user-img'
                        className='rounded-full h-8o w-8 hidden lg:block'
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
                {user
                    ? (
                        <React.Fragment>
                            <DropdownMenuItem>
                                <form className='w-full' action={createHomeWithUserId}>
                                    <button className='w-full font-medium text-start'>{getHome() === null ? 'Add your home':'Airbnb your home'}</button>
                                </form>
                            </DropdownMenuItem>
                            <DropdownMenuItem><Link href='/listing'>My Listings</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href='/favorite'>My Favorites</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href='/reservations'>My Reservations</Link></DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><LogoutLink className='flex gap-x-[0.3rem] items-center justify-center'>Log out<IoIosLogOut /></LogoutLink></DropdownMenuItem>
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <DropdownMenuItem><RegisterLink>Register</RegisterLink></DropdownMenuItem>
                            <DropdownMenuItem><LoginLink>Log in</LoginLink></DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                        </React.Fragment>
                    )
                }
            </DropdownMenuContent >
        </DropdownMenu >
    )
}


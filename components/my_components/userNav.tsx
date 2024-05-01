/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '../ui/dropdown-menu'
import { Menu } from 'lucide-react'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';


export async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border p-2 lg:px-4 lg:py-2 flex items-center gap-x-2">
                    <Menu size={24} />
                    <img src={
                        user?.picture ??
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                        alt='user-img'
                        className='rounded-full h-8 w-8 hidden lg:block'
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
                {user
                    ? (
                        <React.Fragment>
                            <DropdownMenuItem><LogoutLink>Log out</LogoutLink></DropdownMenuItem>
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


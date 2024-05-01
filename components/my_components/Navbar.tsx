import React from 'react'
import desktopLogo from '../../public/assets/airbnb-desktop.png'
import mobileLogo from '../../public/assets/airbnb-mobile.webp'
import Link from 'next/link'
import Image from 'next/image'
import { UserNav } from './userNav'

function Navbar() {
    return (
        <nav className='w-full border-b'>
            <div className='flex items-center justify-between mx-auto container px-5 lg:px-10 py-5'>
                <Link href='/'>
                    <Image src={desktopLogo} alt='airbnb logo' className='w-32 hidden lg:block' />
                    <Image src={mobileLogo} alt='airbnb logo' className='w-12 block lg:hidden' />
                </Link>
                <div className='rounded-full border px-5 py-2'>
                    <h1>
                        Hello!
                    </h1>
                </div>
                <UserNav />
            </div>
        </nav>
    )
}

export default Navbar

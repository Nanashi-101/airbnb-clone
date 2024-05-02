import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    const { getUser } = getKindeServerSession();
    
    const user = await getUser();

    if(!user || user === null || !user.id ){
        throw new Error('User not found');
    }

    let userDB = await prisma.users.findUnique({
        where: {
            id: user.id
        }
    });

    if(!userDB){
        userDB = await prisma.users.create({
            data: {
                id: user.id,
                email: user.email ?? '',
                firstName: user.given_name ?? '',
                lastName: user.family_name ?? '',
                profilePicture: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
        });
    }

    return NextResponse.redirect('http://localhost:3000/');
}
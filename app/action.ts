"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";

export async function selectHomeCategory({userId}:{userId: string}) {
    let home = await prisma.home.findFirst({
        where:{
            usersId: userId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    if(home === null){
        home = await prisma.home.create({
            data:{
                usersId: userId
            }
        });

        return redirect(`/createHome/${home.id}/structure`);
    }
    else if(!home.addedCategory && !home.addedDescription && !home.addedLocation){
        return redirect(`/createHome/${home.id}/structure`);
    }
    else if(home.addedCategory && !home.addedDescription){
        return redirect(`/createHome/${home.id}/description`);
    }
}

export async function createCategoryPage(formData: FormData){
    const category = formData.get('category') as string;
    const homeId = formData.get('homeId') as string;
    const home = await prisma.home.update({
        where:{
            id: homeId
        },
        data:{
            categoryName: category,
            addedCategory: true
        }
    });

    return redirect(`/createHome/${homeId}/description`);
}
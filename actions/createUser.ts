"use server"
import { getServerSession } from "next-auth";

import { cookies } from 'next/headers'
import prisma from "@/db";
export default async function createUser() {
    const session = await getServerSession();

    if (!session?.user?.email) {
        throw new Error("User is not authenticated.");
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })
    if (existingUser) {
        cookies().set("userId", existingUser.id);
        return
    }

    const newUser = await prisma.user.create({
        data: {
            name: session?.user?.name || "",
            email: session?.user?.email || ""
        }
    })
    if (newUser) {
        cookies().set("userId", newUser.id);
        return
    }

}
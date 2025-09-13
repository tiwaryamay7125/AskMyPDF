"use server"
import { getServerSession } from "next-auth/next";
import { cookies } from 'next/headers'
import prisma from '@/db';

export default async function fetchUserFiles() {
    const session = await getServerSession();

    if (!session?.user?.email) {
        throw new Error("User is not authenticated.");
    }
    const userId = cookies().get("userId")
    if (!userId) {
        throw new Error("User is not authenticated.");
    }
    const userFiles = await prisma.fileDetail.findMany({
        where: {
            userId: userId.value
        },
        select: {
            id: true,
            fileName: true,
            fileUrl: true,
            createdAt: true,
        },
    });

    return userFiles;
}

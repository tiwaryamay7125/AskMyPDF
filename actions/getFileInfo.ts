"use server"
import { cookies } from 'next/headers';
import prisma from '@/db';

export default async function getFileInfo(fileId: string) {
    const userIdCookie = cookies().get("userId");

    if (!userIdCookie) {
        throw new Error("User is not authenticated.");
    }

    const userId = userIdCookie.value;
    try {
        const fileExist = await prisma.fileDetail.findFirst({
            where: {
                userId: userId,
                id: fileId
            },
            select: {
                fileName: true,
                fileUrl: true,
            },
        });

        return fileExist;
    } catch {
        return null
    }


}


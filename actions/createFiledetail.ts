"use server"
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { cookies } from 'next/headers'


interface createFileDetail {
    fileName: string
    fileUrl: string
    createdAt: string
}
export default async function createFileDetail({ fileName, fileUrl, createdAt }: createFileDetail) {
    const session = await getServerSession();

    if (!session?.user?.email) {
        throw new Error("User is not authenticated.");
    }
    const userId = cookies().get("userId")
    if (!userId) {
        throw new Error("User is not authenticated.");
    }

    const fileDetail = await prisma.fileDetail.create({
        data: {
            userId: userId.value,
            fileName: fileName,
            fileUrl: fileUrl,
            createdAt: createdAt
        },
        select: {
            id: true, // Ensure you're selecting these fields
            fileName: true,
            fileUrl: true,
            createdAt: true,
        },
    });

    return fileDetail;
}
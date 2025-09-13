'use server'
import prisma from '@/db';

export default async function deleteFileDetail(id: string) {
    try {
        await prisma.fileDetail.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Error deleting file detail from Prisma:", error);
        throw error;
    }
}

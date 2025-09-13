import React, { useEffect, useState } from 'react';
import { FileText } from "lucide-react";
import { DocumentCard, LoadingComponent, NoDocumentsComponent } from './documentCards';
import { ProcessingDialog, UploadCard, UploadDialog } from './uploadDocument';
import { uploadBytes, getDownloadURL } from "firebase/storage";
import createFileDetail from '@/actions/createFiledetail';
import { storage } from '@/firebase';
import fetchUserFiles from '@/actions/fetchUserFiles';
import { deleteObject, ref } from "firebase/storage";
import deleteFileDetail from '@/actions/deleteFileDetail';
import { useRouter } from 'next/navigation';
import { storeEmbeddingsInPinecone } from '@/actions/storeEmbeddings';

type Document = {
    id: string;
    fileName: string;
    fileUrl: string;
    createdAt: string;
    userId: string;
};

export default function Document() {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [documents, setDocuments] = useState<{ id: string; fileName: string; fileUrl: string; createdAt: string; }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const getUserFiles = async () => {
            try {
                setIsLoading(true)
                const files = await fetchUserFiles();

                setDocuments(files);

            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        };

        getUserFiles();
    }, []);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpload = async (file: File) => {
        if (!file) return;

        const timestamp = new Date().toISOString().split('.')[0].replace('T', ' '); // For the date and time format
        const filesFolderRef = ref(storage, `pdf-upload/${file.name + " " + timestamp}`);

        try {
            setIsProcessing(true)
            await uploadBytes(filesFolderRef, file);
            const downloadUrl = await getDownloadURL(filesFolderRef);
            const newFileDetail = await createFileDetail({
                fileName: file.name,
                fileUrl: downloadUrl,
                createdAt: new Date().toISOString().split('T')[0],
            });
            storeEmbeddingsInPinecone(newFileDetail.id, downloadUrl)

            const newDoc = {
                id: newFileDetail.id,  // Use ID returned by Prisma
                fileName: newFileDetail.fileName,
                fileUrl: newFileDetail.fileUrl,
                createdAt: newFileDetail.createdAt,
            };
            setIsProcessing(false)
            setDocuments([...documents, newDoc]);

        } catch (err) {
            setIsProcessing(false)
            console.error(err);
        }

    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDelete = async (id: any, fileUrl: string) => {
        try {
            setIsDeleting(id)
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);

            await deleteFileDetail(id);

            setDocuments(documents.filter(doc => doc.id !== id));


        } catch (error) {
            console.error("Error deleting file:", error);
        } finally {
            setIsDeleting(null)
        }

    };

    const handlePreview = (url: string) => {
        window.open(url, '_blank');
    };
    const handleTalk = (id: string) => {
        router.push(`/file/${id}`)


    }

    return (
        <div className="min-h-screen bg-gray-900 p-6" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                .pixelated { image-rendering: pixelated; image-rendering: crisp-edges; }
                .pixel-border {
                    box-shadow: -2px 0 0 0 #000, 2px 0 0 0 #000, 0 -2px 0 0 #000, 0 2px 0 0 #000;
                }
            `}</style>

            <div className="max-w-6xl mx-auto">
                <header className="flex items-center mb-6">
                    <FileText className="h-8 w-8 text-red-500 mr-4" />
                    <h1 className="text-2xl font-bold text-white">My Documents</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <UploadCard onUpload={() => setIsUploadOpen(true)} />
                    {isLoading ? (
                        <LoadingComponent />
                    ) : (
                        <>

                            {documents.length === 0 ? (
                                <NoDocumentsComponent />
                            ) : (
                                documents.map((doc) => (
                                    <DocumentCard
                                        key={doc.id}
                                        title={doc.fileName}
                                        date={doc.createdAt}
                                        onDelete={() => handleDelete(doc.id, doc.fileUrl)}
                                        onPreview={() => handlePreview(doc.fileUrl)}
                                        onTalk={() => handleTalk(doc.id)}
                                        isDeleting={isDeleting === doc.id}
                                    />

                                ))
                            )}
                        </>
                    )}
                </div>

            </div>

            <UploadDialog
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUpload={handleUpload}
            />
            <ProcessingDialog isOpen={isProcessing} />
        </div>
    );
}

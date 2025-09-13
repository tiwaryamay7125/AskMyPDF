"use client";

import getFileInfo from "@/actions/getFileInfo";
import Navbar from "@/components/navbar";
import PdfTalk from "@/components/pdfTalk";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CenteredLoadingComponent } from "@/components/loadingComponent";
import { NoFilesFoundComponent } from "@/components/noFileComp";

const DocumentPreview: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fileExists, setFileExists] = useState(true);
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const pathname = usePathname();
    const id = pathname.split('/').filter(Boolean).pop() || "";

    useEffect(() => {
        async function fileData(fileId: string) {
            setIsLoading(true);
            try {
                const fileExist = await getFileInfo(fileId);

                if (!fileExist?.fileUrl) {
                    setFileExists(false);
                } else {
                    setFileExists(true);
                    setFileName(fileExist.fileName || "");
                    setFileUrl(fileExist.fileUrl || "");
                }
            } catch (error) {
                console.error("Error fetching file info:", error);
                setFileExists(false);
            } finally {
                setIsLoading(false);
            }
        }

        fileData(id);
    }, [id]);

    return (
        <div >
            <Navbar />
            {isLoading ? (
                <CenteredLoadingComponent />
            ) : (
                fileExists ? (
                    <PdfTalk fileName={fileName} fileUrl={fileUrl} />
                ) : (
                    <NoFilesFoundComponent />
                )
            )}
        </div>
    );
};

export default DocumentPreview;

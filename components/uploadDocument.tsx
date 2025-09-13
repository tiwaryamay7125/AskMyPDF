/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, Loader } from "lucide-react"

interface UploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
}
interface UploadCardProps {
    onUpload: () => void; // Assuming onUpload is a function triggered by a click event
}
interface ProcessingDialogProps {
    isOpen: boolean;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onUpload }) => (
    <Card className="bg-gray-700 text-white pixel-border cursor-pointer hover:bg-gray-600" onClick={onUpload}>
        <CardContent className="flex flex-col items-center justify-center h-full py-6">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm font-medium">Upload Document</p>
        </CardContent>
    </Card>
)


export const ProcessingDialog: React.FC<ProcessingDialogProps> = ({ isOpen }) => (
    <Dialog open={isOpen}>
        <DialogContent className="bg-gray-800 text-white pixel-border">
            <DialogHeader>
                <DialogTitle>Processing PDF</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-4">
                <Loader className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                <p className="text-sm">Please wait while we process your PDF...</p>
            </div>
        </DialogContent>
    </Dialog>
)

export const UploadDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose, onUpload }) => {
    const [dragActive, setDragActive] = useState(false)


    const handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {

            onUpload(e.dataTransfer.files[0])
            onClose()
        }
    }

    const handleChange = (e: any) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0])
            onClose()
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="bg-gray-800 text-white pixel-border">
                    <DialogHeader>
                        <DialogTitle>Upload Document</DialogTitle>
                    </DialogHeader>
                    <div
                        className={`mt-4 p-8 border-2 border-dashed rounded-lg text-center ${dragActive ? "border-blue-500 bg-blue-500 bg-opacity-10" : "border-gray-600"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm mb-2">Drag and drop your document here</p>
                        <p className="text-xs text-gray-400">or</p>
                        <label className="mt-4 inline-block">
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleChange}
                                accept=".pdf"
                            />
                            <span className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded pixel-border">
                                Select File
                            </span>
                        </label>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}
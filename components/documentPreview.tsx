"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DocumentPreview {
    fileName: string,
    fileUrl: string
}
export const DocumentPreview = ({ fileName, fileUrl }: DocumentPreview) => (
    <Card className="bg-gray-800 text-white h-full pixel-border flex flex-col">
        <CardHeader>
            <CardTitle className="text-lg truncate">{fileName}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
            <div className="w-full h-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <iframe
                    src={fileUrl}
                    width="100%"
                    height="100%"
                    title="Document Preview"
                    style={{
                        border: 'none',
                        minHeight: '500px',
                        maxHeight: '100vh',
                        overflow: 'auto'
                    }}
                />
            </div>
        </CardContent>


    </Card>
)
"use client"
import React from 'react'
import { File } from "lucide-react"
import { ChatInterface } from './chatInterface'
import { DocumentPreview } from './documentPreview'

interface pdfTalk {
    fileName: string,
    fileUrl: string
}
export default function PdfTalk({ fileName, fileUrl }: pdfTalk) {


    return (
        <div className="min-h-screen bg-gray-900 p-6 flex flex-col" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          .pixelated {
            image-rendering: pixelated;
            image-rendering: crisp-edges;
          }
          
          .pixel-border {
            box-shadow: 
              -2px 0 0 0 #000,
              2px 0 0 0 #000,
              0 -2px 0 0 #000,
              0 2px 0 0 #000;
          }
        `}</style>

            <div className="max-w-7xl w-full mx-auto flex-grow flex flex-col">
                <header className="flex items-center mb-6">
                    <File className="h-8 w-8 text-red-500 mr-4" />
                    <h1 className="text-2xl font-bold text-white truncate">Chat with your PDF...</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
                    <DocumentPreview fileName={fileName} fileUrl={fileUrl} />
                    <ChatInterface />
                </div>
            </div>
        </div>
    )
};
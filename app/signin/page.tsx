"use client"
import { signIn } from 'next-auth/react';

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Chrome, Github, FileText } from "lucide-react"

const PDFTalkLogo = () => (
    <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-red-500 mr-4 pixel-border flex items-center justify-center" style={{ boxShadow: 'inset 2px 2px 0 2px #000' }}>
            <FileText className="text-white w-8 h-8" />
        </div>
        <div className="text-3xl font-bold text-white">PDF TALK</div>
    </div>
)

export default function Signin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        
        .pixel-border {
          box-shadow: 
            -4px 0 0 0 #000,
            4px 0 0 0 #000,
            0 -4px 0 0 #000,
            0 4px 0 0 #000;
        }

        .leading-12 {
          line-height: 3rem;
        }
      `}</style>

            <Card className="w-full max-w-md bg-gray-700 pixel-border">
                <CardHeader>
                    <PDFTalkLogo />
                    <CardTitle className="text-2xl text-center text-white mb-2">Welcome Back 👋🏻</CardTitle>
                    <CardDescription className="text-center text-gray-300">
                        Sign in to your account to continue...
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        variant="outline"
                        className="w-full bg-white text-black border-4 border-black hover:bg-gray-200 pixel-border flex items-center justify-center"
                        onClick={async () => {
                            await signIn("google", { callbackUrl: "/dashboard" });
                        }}>
                        <Chrome className="mr-2 h-5 w-5" />
                        Sign in with Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full bg-white text-black border-4 border-black hover:bg-gray-200 pixel-border flex items-center justify-center"
                        onClick={async () => {
                            await signIn("github", { callbackUrl: "/dashboard" });
                        }}>
                        <Github className="mr-2 h-5 w-5" />
                        Sign in with GitHub
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/providers/sessionProvider";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Pdf Talk",
  description: "Upload and talk to your pdf",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">

      <body className="min-h-screen bg-gray-900" style={{ fontFamily: "'Press Start 2P', cursive" }}>

        <SessionProvider session={session}>
          {children}
          <Analytics />
        </SessionProvider>

      </body>

    </html>
  );
}

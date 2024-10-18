/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 01:04:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/clerk-react";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider >
  );
}
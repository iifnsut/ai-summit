import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const poppins = Poppins({ weight: "400", variable: "--font-poppins", subsets: ["latin"] });
import {ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "AI4Humanity Summit Delhi",
  description: "NSUT-IIF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${poppins.variable} font-poppins antialiased scroll-smooth`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ClerkProvider>
          {children}
          <Toaster />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

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
  openGraph: {
    title: "AI4Humanity Summit Delhi",
    description:
      "Step into the Delhi AI4Humanity Summit 2025, where NSUT IIF and the Embassy of Israel bring together innovators, thinkers, and changemakers to harness AI for a better world. Over a month of hackathons, competitions, and inspiring talks, explore how AI is revolutionizing healthcare, agriculture, and communities, creating a future that empowers all.",
    type: "website",
    url: "https://ai4humanitydelhi.in/",
    images: [
      {
        url: "https://ai4humanitydelhi.in/images/logo.png",
        width: 1200,
        height: 720,
        alt: "AI4Humanity Summit Delhi",
      },
    ],
  },
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

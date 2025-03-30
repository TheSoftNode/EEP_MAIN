import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import ChatPanel from "@/components/chat/ChatPanel";
import { Toaster } from "@/components/ui/toaster";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EEP - Enterprise Empowerment Platform",
  description: "Accelerate your development journey with AI-assisted guidance and expert mentorship. Build, learn, and grow with structured project management and real-time support.",
  keywords: "developer platform, AI guidance, project management, mentorship, software development, learning platform",
  openGraph: {
    title: "EEP - Enterprise Empowerment Platform",
    description: "Accelerate your development journey with AI-assisted guidance and expert mentorship.",
    images: [
      {
        url: "/eep-logo2.png",
        width: 1200,
        height: 630,
        alt: "EEP Platform"
      }
    ],
    type: "website",
    siteName: "Enterprise Empowerment Platform"
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading....</div>}>

          <Navbar />
          {children}
          <Footer />
          <ChatPanel />
          <Toaster />
        </Suspense>

      </body>
    </html>
  );
}

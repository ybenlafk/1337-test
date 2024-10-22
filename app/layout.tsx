import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/app/context/ThemeContext";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex h-screen">
            <SideBar />
            <div className="flex-1 flex flex-col ml-64">
              <Header />
              <div className="flex-1 mt-16 p-4 md:p-8 overflow-auto">
                {children}
              </div>
            </div>
          </div>
          <Toaster />
        </body>
      </html>
    </ThemeProvider>
  );
}
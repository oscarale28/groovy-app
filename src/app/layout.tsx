import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";

const figtree = Figtree({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Groovy App",
  description: "Music app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.className} dark`}
      >
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}

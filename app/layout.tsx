import type { Metadata } from "next";
import { Roboto, Mulish } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOTB Digitization Requests App",
  description: "The application to submit digitization requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} overflow-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}

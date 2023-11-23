import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./assets/globals.css";
import ProviderWeb3Modal from "./components/ProviderWeb3Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

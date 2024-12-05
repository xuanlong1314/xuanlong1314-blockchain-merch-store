import "./globals.css";
import localFont from "next/font/local";
import { WalletButton } from "@/components/WalletButton";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

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

export const metadata = {
  title: "Blockchain Game Merch Store",
  description: "Purchase merchandise using Solana tokens",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <Toaster />
        <WalletProvider>
          <div className="flex flex-col min-h-screen justify-between">
            <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
              <Link href={"/"}>
                <h1 className="text-2xl font-bold">
                  Blockchain Game Merch Store
                </h1>
              </Link>
              <WalletButton />
            </header>
            <main className="container mx-auto p-4">{children}</main>
            <footer className="bg-gray-200 p-4 text-center">
              <p>&copy; 2023 Blockchain Game Merch Store</p>
            </footer>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}

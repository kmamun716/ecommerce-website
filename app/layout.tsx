import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/ui/Footer";
import NavbarWrapper from "@/ui/NavbarWrapper";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "KmrUniMart - Global Online Store",
  description: "E-Commerce with Next.js ",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`} >
        <Toaster />
        <NavbarWrapper >
          {children}
        </NavbarWrapper >
        <Footer />
      </body>
    </html>
  );
}

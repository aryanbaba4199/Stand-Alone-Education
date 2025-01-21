import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavMenu from "@/Components/NavMenu";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stand Alone",
  description: "NEET | MBBS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavMenu />
        <div className="mt-20">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}

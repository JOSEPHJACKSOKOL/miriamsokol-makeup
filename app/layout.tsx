import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miriam Sokol Makeup | Professional Makeup Artist",
  description: "Celebrity makeup artist in Los Angeles specializing in bridal, editorial, and personal beauty. Book your appointment today.",
  keywords: ["makeup artist", "bridal makeup", "Los Angeles", "celebrity makeup", "makeup lessons"],
  openGraph: {
    title: "Miriam Sokol Makeup",
    description: "Professional makeup artistry for your most beautiful moments",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

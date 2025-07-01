import { Inter } from "next/font/google";
import { Metadata } from "next";
import "@workspace/ui/globals.css";
import "./index.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/layouts/Navbar";
import AniCursor from "@/components/animations/AniCursor";
import { InteractiveBackground } from "@/components/InteractiveBackground";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "LiLsa | Fullstack Developer ",
  description:
    "A fullstack developer with a passion for building web and mobile applications. and a love for learning new technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <Providers>
          <InteractiveBackground />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

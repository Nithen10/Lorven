import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "./SmoothScroll";

export const metadata: Metadata = {
  title: "Lorven AI Studio",
  description: "Lorven AI Studio develops custom AI solutions for innovative companies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Orbitron-Medium.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ppneuemontreal-book.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

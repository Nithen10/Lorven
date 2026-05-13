import type { Metadata } from "next";
import "../styles.css";
import { SmoothScroll } from "./SmoothScroll";

export const metadata: Metadata = {
  title: "Lorven AI Studio",
  description: "Lorven AI Studio develops custom AI solutions for innovative companies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Big+Shoulders+Display:wght@900&family=IBM+Plex+Mono:wght@300&family=Inter+Tight:wght@500;700&family=Inter:wght@400;500;700&family=Source+Code+Pro:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

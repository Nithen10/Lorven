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
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

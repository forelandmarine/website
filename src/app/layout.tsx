import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Foreland Marine Consultancy Ltd",
    template: "%s | Foreland Marine",
  },
  description:
    "Foreland Marine provides Project Management, Representation and Consultancy services to some of the world's most famous yachts.",
  metadataBase: new URL("https://forelandmarine.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className="bg-bg1 text-white antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

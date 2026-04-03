import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollAnimator from "@/components/ScrollAnimator";

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
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Foreland Marine Consultancy",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Foreland Marine Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Foreland Marine Consultancy Ltd",
              url: "https://forelandmarine.com",
              logo: "https://forelandmarine.com/logos/foreland-marine-white.svg",
              email: "info@forelandmarine.com",
              sameAs: [
                "https://instagram.com/forelandmarine",
                "https://www.linkedin.com/company/foreland-marine-consultancy",
              ],
              description:
                "Foreland Marine provides Project Management, Representation and Consultancy services to some of the world's most famous yachts.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Antibes",
                addressCountry: "FR",
              },
            }),
          }}
        />
      </head>
      <body className="bg-bg1 text-white antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <ScrollAnimator />
      </body>
    </html>
  );
}

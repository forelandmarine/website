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
    default: "Yacht Management, New Build & Refit Consultancy | Foreland Marine",
    template: "%s | Foreland Marine",
  },
  description:
    "Foreland Marine provides Project Management, Representation and Consultancy services to some of the world's most famous yachts.",
  metadataBase: new URL("https://forelandmarine.com"),
  alternates: {
    canonical: "https://forelandmarine.com",
  },
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Foreland Marine",
                alternateName: "Foreland Marine Consultancy Ltd",
                url: "https://forelandmarine.com",
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Foreland Marine Consultancy Ltd",
                url: "https://forelandmarine.com",
                logo: "https://forelandmarine.com/logos/foreland-marine-white.svg",
                image: "https://forelandmarine.com/images/og-default.png",
                email: "info@forelandmarine.com",
                description:
                  "Independent yacht consultancy providing project management, owner's representation, technical consultancy and yacht management for sailing and motor yachts worldwide.",
                sameAs: [
                  "https://instagram.com/forelandmarine",
                  "https://www.linkedin.com/company/foreland-marine-consultancy",
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "7 Bell Yard",
                  addressLocality: "London",
                  postalCode: "WC2A 2JR",
                  addressCountry: "GB",
                },
                areaServed: "Worldwide",
                serviceType: [
                  "Yacht Management",
                  "New Build Owner's Representation",
                  "Yacht Refit Project Management",
                  "Marine Technical Consultancy",
                  "ISM Compliance",
                  "Performance Sailing Yacht Engineering",
                ],
                knowsAbout: [
                  "Superyacht Management",
                  "J Class Yachts",
                  "Yacht Refit",
                  "New Build Supervision",
                  "ISM Code Compliance",
                  "Performance Sailing",
                  "Naval Architecture",
                ],
              },
            ]),
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

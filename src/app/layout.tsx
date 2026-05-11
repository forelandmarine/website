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
    default: "Independent Superyacht Refit & New Build Consultancy | Foreland Marine",
    template: "%s | Foreland Marine",
  },
  description:
    "Independent superyacht consultancy for refit project management, new build owner's representation and yacht management. SYBAss-accredited, UK-based, acting for owners only.",
  metadataBase: new URL("https://forelandmarine.com"),
  alternates: {
    canonical: "https://forelandmarine.com",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Foreland Marine Consultancy",
    title: "Independent Superyacht Refit & New Build Consultancy",
    description:
      "Independent superyacht consultancy for refit project management, new build owner's representation and yacht management. SYBAss-accredited, UK-based, acting for owners only.",
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
    title: "Independent Superyacht Refit & New Build Consultancy",
    description:
      "Independent superyacht consultancy for refit project management, new build owner's representation and yacht management. SYBAss-accredited, UK-based.",
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
                inLanguage: "en-GB",
                publisher: { "@id": "https://forelandmarine.com/#organization" },
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://forelandmarine.com/#organization",
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
                founder: { "@id": "https://forelandmarine.com/#jack-macnally" },
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
                hasCredential: [
                  "SYBAss Accredited",
                  "Yacht Owner's Representative Register",
                  "British Marine Member",
                  "Superyacht UK Member",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://forelandmarine.com/#jack-macnally",
                name: "Jack MacNally",
                jobTitle: "Director",
                worksFor: { "@id": "https://forelandmarine.com/#organization" },
                url: "https://forelandmarine.com/about",
                sameAs: [
                  "https://www.linkedin.com/in/jmacnally/",
                ],
                knowsAbout: [
                  "Superyacht Management",
                  "Yacht Refit",
                  "New Build Owner's Representation",
                  "Performance Sailing Yacht Engineering",
                  "J Class Yachts",
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

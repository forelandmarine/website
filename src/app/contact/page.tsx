import { HorizonLine, SectionLabel } from "@/components/ui";
import ParallaxHero from "@/components/ParallaxHero";
import ContactPageForm from "@/components/ContactPageForm";

const contactDetails = [
  {
    label: "Email",
    href: "mailto:info@forelandmarine.com",
    text: "info@forelandmarine.com",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/forelandmarine",
    text: "@forelandmarine",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/forelandmarine",
    text: "Foreland Marine",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
              { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.forelandmarine.com/contact" },
            ],
          }),
        }}
      />

      {/* HERO */}
      <ParallaxHero
        imageSrc="/images/monaco-harbour-sunset.jpg"
        imageAlt="Monaco harbour at sunset"
        imageClassName="object-cover object-[center_75%] opacity-50 saturate-[1.15] scale-110"
      >
        <div className="max-w-2xl">
          <SectionLabel>Contact Us</SectionLabel>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-5 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Got a large project, maintenance period or big race coming up? We&apos;d love to hear from you.
          </p>
        </div>
      </ParallaxHero>

      <HorizonLine />

      {/* FORM + DETAILS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-bg2 border border-white/10 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl font-light text-white mb-6">Send us a message</h2>
              <ContactPageForm />
            </div>

            {/* Contact details */}
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-light text-white mb-6">Contact details</h2>
                <div className="space-y-6">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="border-l-2 border-accent/40 pl-4">
                      <p className="text-xs text-muted uppercase tracking-widest mb-1">{item.label}</p>
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="text-white hover:text-accent transition-colors"
                      >
                        {item.text}
                      </a>
                    </div>
                  ))}
                  <div className="border-l-2 border-accent/40 pl-4">
                    <p className="text-xs text-muted uppercase tracking-widest mb-1">Address</p>
                    <address className="text-white not-italic">7 Bell Yard, London<br />WC2A 2JR</address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

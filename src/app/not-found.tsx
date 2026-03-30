import Link from "next/link";
import { DotGrid, Glow, ButtonPrimary } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-bg1">
      <DotGrid />
      <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(30,155,255,0.15)" size={600} />
      <div className="relative z-10 text-center px-4">
        <div className="text-8xl font-black text-accent/30 mb-4 tracking-tight">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-muted mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ButtonPrimary href="/">Back to Home</ButtonPrimary>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-accent text-accent font-semibold text-sm px-6 py-3 rounded hover:bg-accent/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

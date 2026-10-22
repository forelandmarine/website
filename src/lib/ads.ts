// Google Ads "Enquiry form sent" conversion. The gtag base tag loads in app/layout.tsx.
export function trackEnquiry() {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", "conversion", { send_to: "AW-18530780689/R0drCI_f4qUdEJGMlYRF" });
}

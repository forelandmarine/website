import React from "react";
import Link from "next/link";

export function DotGrid({ className: _className = "" }: { className?: string }) { return null; }

export function Glow({ className = "", color = "rgba(30,155,255,0.15)", size = 600 }: { className?: string; color?: string; size?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  );
}

export function HorizonLine({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`w-full h-px bg-white/10 ${className}`} />;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
      {children}
    </span>
  );
}

export function ButtonPrimary({
  href, children, className = "", onClick, type = "button",
}: {
  href?: string; children: React.ReactNode; className?: string; onClick?: () => void; type?: "button" | "submit" | "reset";
}) {
  const cls = `inline-flex items-center justify-center bg-accent text-white font-semibold text-sm px-6 py-3 rounded hover:bg-accent/90 transition-colors ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

export function ButtonOutline({
  href, children, className = "", onClick,
}: {
  href?: string; children: React.ReactNode; className?: string; onClick?: () => void;
}) {
  const cls = `inline-flex items-center justify-center border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded hover:bg-white/10 transition-colors ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

export function ServiceCard({ title, description, href, ...rest }: { title: string; description: string; href?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const inner = (
    <div className="relative bg-bg2 border border-white/8 overflow-hidden h-full flex flex-col group hover:border-accent/30 transition-colors">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-70" />
      <div className="p-8 pl-9 flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-white mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed flex-1">{description}</p>
        {href && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-accent font-medium">
            Learn more
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (href) return <Link href={href} className="h-full block" {...(rest as any)}>{inner}</Link>;
  return <div className="h-full" {...rest}>{inner}</div>;
}

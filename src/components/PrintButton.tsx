"use client";

export function PrintButton({ label = "Download / print" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-700 print:hidden"
    >
      {label}
    </button>
  );
}

import type { ReactNode } from "react";

// Shared server-rendered form controls for admin create/edit forms. They use the
// .fm-fld / .fm-label classes defined in globals.css so a plain <form action>
// (server action) works without client JS.

export function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  placeholder,
  step,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number | null;
  placeholder?: string;
  step?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="fm-label">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        className="fm-fld"
        name={name}
        type={type}
        required={required}
        step={step}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  rows = 4,
  required = false,
  defaultValue,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  defaultValue?: string | null;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="fm-label">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <textarea
        className="fm-fld resize-y"
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
      />
    </label>
  );
}

export function SelectField({
  label,
  name,
  options,
  required = false,
  defaultValue,
  className = "",
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string | null;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="fm-label">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <select className="fm-fld" name={name} required={required} defaultValue={defaultValue ?? undefined}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FormGrid({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  const map = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };
  return <div className={`grid grid-cols-1 gap-4 ${map[cols]}`}>{children}</div>;
}

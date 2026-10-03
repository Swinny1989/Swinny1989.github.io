"use client";

import React from "react";

// ── Field wrapper ──────────────────────────────────────────────────────────────
export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#3D5A3E]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-[#8B7355]">{hint}</p>}
      {children}
    </div>
  );
}

// ── Text input ─────────────────────────────────────────────────────────────────
export function Input({
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  required,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      required={required}
      disabled={disabled}
      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-[#3D5A3E] placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#3D5A3E]/30 focus:border-[#3D5A3E] transition-colors text-base disabled:opacity-50"
    />
  );
}

// ── Textarea ───────────────────────────────────────────────────────────────────
export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-[#3D5A3E] placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#3D5A3E]/30 focus:border-[#3D5A3E] transition-colors text-base resize-none"
    />
  );
}

// ── Toggle button group (Yes / No / Sometimes) ─────────────────────────────────
export function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T | "";
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            value === opt
              ? "bg-[#3D5A3E] text-white border-[#3D5A3E]"
              : "bg-white text-[#6B6560] border-stone-200 hover:border-[#3D5A3E] hover:text-[#3D5A3E]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── Section heading ────────────────────────────────────────────────────────────
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl text-[#3D5A3E] border-b border-stone-100 pb-2 mt-6 mb-1 first:mt-0">
      {children}
    </h2>
  );
}

// ── Info banner ────────────────────────────────────────────────────────────────
export function InfoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-[#6B6560] leading-relaxed">
      {children}
    </div>
  );
}

// ── Consent checkbox row ───────────────────────────────────────────────────────
export function ConsentRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex gap-3 items-start cursor-pointer group">
      <div className="mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            checked
              ? "bg-[#3D5A3E] border-[#3D5A3E]"
              : "bg-white border-stone-300 group-hover:border-[#3D5A3E]"
          }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="1.5,6 4.5,9 10.5,3" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-[#6B6560] leading-relaxed">{children}</span>
    </label>
  );
}

// ── Navigation buttons ─────────────────────────────────────────────────────────
export function StepNav({
  onBack,
  onNext,
  isFirst,
  isLast,
  nextLabel,
  disabled,
}: {
  onBack: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  nextLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-between items-center pt-6 mt-6 border-t border-stone-100">
      {!isFirst ? (
        <button
          type="button"
          onClick={onBack}
          className="border-2 border-[#3D5A3E] text-[#3D5A3E] hover:bg-[#3D5A3E] hover:text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm"
        >
          ← Back
        </button>
      ) : (
        <div />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="bg-[#3D5A3E] hover:bg-[#2C4230] text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {nextLabel ?? (isLast ? "Submit" : "Continue →")}
      </button>
    </div>
  );
}

// ── Progress bar ───────────────────────────────────────────────────────────────
export function ProgressBar({
  current,
  total,
  stepLabel,
}: {
  current: number;
  total: number;
  stepLabel: string;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-[#8B7355]">
          Step {current} of {total}
        </span>
        <span className="text-xs text-[#8B7355]">{stepLabel}</span>
      </div>
      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3D5A3E] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Address block ──────────────────────────────────────────────────────────────
export function AddressBlock({
  addressLine1,
  addressLine2,
  town,
  postcode,
  onChange,
  autoCompletePrefix,
}: {
  addressLine1: string;
  addressLine2: string;
  town: string;
  postcode: string;
  onChange: (field: string, value: string) => void;
  autoCompletePrefix?: string;
}) {
  const pfx = autoCompletePrefix ?? "";
  return (
    <div className="flex flex-col gap-3">
      <Input
        value={addressLine1}
        onChange={(v) => onChange("addressLine1", v)}
        placeholder="Address line 1"
        autoComplete={`${pfx}address-line1`}
        required
      />
      <Input
        value={addressLine2}
        onChange={(v) => onChange("addressLine2", v)}
        placeholder="Address line 2 (optional)"
        autoComplete={`${pfx}address-line2`}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          value={town}
          onChange={(v) => onChange("town", v)}
          placeholder="Town / City"
          autoComplete={`${pfx}address-level2`}
        />
        <Input
          value={postcode}
          onChange={(v) => onChange("postcode", v)}
          placeholder="Postcode"
          autoComplete={`${pfx}postal-code`}
        />
      </div>
    </div>
  );
}

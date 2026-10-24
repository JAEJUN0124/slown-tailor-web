"use client";

import { Check, Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import type { FieldProps } from "@/lib/useValidation";
import { cn } from "@/lib/utils";

// Form pieces in the reference's underline style: a small label over a field
// with a 1px bottom rule. Errors appear under the field once it has been left
// and clear as soon as the value is fixed (see lib/useValidation).

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "onBlur" | "id">;

export function FieldError({ id, error }: { id: string; error: string | null }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-[12px] leading-[1.5] text-[#c0392b]">
      {error}
    </p>
  );
}

/** Label above, underline input below (reference: join / order forms). */
export function LineField({
  label,
  field,
  hint,
  className,
  password,
  ...rest
}: { label: string; field: FieldProps; hint?: string; className?: string; password?: boolean } & InputProps) {
  const [show, setShow] = useState(false);
  return (
    <div className={className}>
      <label htmlFor={field.id} className="block text-[11px] font-medium leading-[1.6] text-st-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={field.id}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
          aria-invalid={field.error ? true : undefined}
          aria-describedby={cn(field.error && `${field.id}-error`, hint && `${field.id}-hint`) || undefined}
          type={password ? (show ? "text" : "password") : rest.type}
          {...rest}
          className={cn(
            "h-[38px] w-full border-b bg-transparent px-0 text-[14px] text-st-ink outline-none placeholder:text-st-faint focus:bg-st-field",
            field.error ? "border-[#c0392b]" : "border-st-ink",
            password && "pr-9",
          )}
        />
        {password && (
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "비밀번호 숨기기" : "비밀번호 표시"} className="absolute right-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-st-ink">
            {show ? <Eye className="size-[18px]" strokeWidth={1.2} /> : <EyeOff className="size-[18px]" strokeWidth={1.2} />}
          </button>
        )}
      </div>
      {hint && (
        <p id={`${field.id}-hint`} className="mt-1.5 text-[11px] leading-[1.5] text-st-mute">
          {hint}
        </p>
      )}
      <FieldError id={field.id} error={field.error} />
    </div>
  );
}

/**
 * Phone number as prefix select + two parts (reference: 010 - ____ - ____).
 * The three parts are kept in one field value, "010-1234-5678".
 */
export function PhoneField({ label, field, prefixes = ["010", "011", "016", "017", "018", "019"] }: { label: string; field: FieldProps; prefixes?: string[] }) {
  const [a = prefixes[0], b = "", c = ""] = field.value ? field.value.split("-") : [];
  const set = (i: number, v: string) => {
    const parts = [a, b, c];
    parts[i] = v.replace(/\D/g, "").slice(0, 4);
    field.onChange(parts.join("-"));
  };
  const part = "h-[30px] w-[50px] border-b border-st-ink bg-transparent text-center text-[13px] outline-none focus:bg-st-field";
  return (
    <fieldset aria-describedby={field.error ? `${field.id}-error` : undefined}>
      <legend className="text-[11px] font-medium leading-[1.6] text-st-ink">{label}</legend>
      <div className="mt-1 flex items-center gap-1.5 text-[13px]">
        <select aria-label={`${label} 앞자리`} value={a} onChange={(e) => set(0, e.target.value)} className="h-[38px] w-[60px] border border-st-ink bg-white px-2 text-[13px]">
          {prefixes.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        -
        <input id={field.id} aria-label={`${label} 가운데 자리`} inputMode="numeric" value={b} onChange={(e) => set(1, e.target.value)} onBlur={field.onBlur} className={part} />
        -
        <input aria-label={`${label} 끝자리`} inputMode="numeric" value={c} onChange={(e) => set(2, e.target.value)} onBlur={field.onBlur} className={part} />
      </div>
      <FieldError id={field.id} error={field.error} />
    </fieldset>
  );
}

/** Square tick used for the reference's checkbox-looking radios and checkboxes. */
export function Tick({
  type = "checkbox",
  name,
  checked,
  onChange,
  children,
}: {
  type?: "checkbox" | "radio";
  name?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-1.5 text-[12px] leading-[1.6] text-st-ink">
      <span className="relative inline-flex size-[18px] items-center justify-center border border-st-ink bg-white">
        <input type={type} name={name} checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer absolute inset-0 cursor-pointer opacity-0" />
        {checked && <Check className="size-3.5" strokeWidth={1.6} aria-hidden="true" />}
        <span className="pointer-events-none absolute -inset-1 hidden outline-2 outline-st-ink peer-focus-visible:block" />
      </span>
      {children}
    </label>
  );
}

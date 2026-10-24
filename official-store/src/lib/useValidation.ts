import { useState, type FormEvent } from "react";

/** Returns an error message, or null when the value is fine. */
export type Rule = (value: string) => string | null;

/** 을 or 를 after a word, by whether its last syllable ends in a consonant. */
export function objectParticle(word: string) {
  const c = word.charCodeAt(word.length - 1) - 0xac00;
  if (c < 0 || c > 11171) return "을(를)";
  return c % 28 ? "을" : "를";
}

export const required =
  (label: string, verb = "입력해"): Rule =>
  (v) =>
    v.trim() ? null : `${label}${objectParticle(label)} ${verb} 주세요.`;

export const emailRule: Rule = (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "이메일 주소를 다시 확인해 주세요. 예: name@example.com");

export const phoneRule: Rule = (v) => (/^\d{9,11}$/.test(v.replace(/\D/g, "")) ? null : "휴대폰 번호를 숫자만 9~11자리로 입력해 주세요.");

export const all =
  (...rules: Rule[]): Rule =>
  (v) => {
    for (const r of rules) {
      const e = r(v);
      if (e) return e;
    }
    return null;
  };

/**
 * Blur-first validation: a field shows its error once it has been left (or on
 * submit), and the error goes away as soon as the value is fixed. On a failed
 * submit the first field with an error gets focus.
 */
export function useValidation(idPrefix: string, rules: Record<string, Rule>, initial: Record<string, string> = {}) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errorOf = (name: string) => rules[name]?.(values[name] ?? "") ?? null;

  const field = (name: string) => ({
    id: `${idPrefix}-${name}`,
    value: values[name] ?? "",
    error: touched[name] ? errorOf(name) : null,
    onChange: (v: string) => setValues((s) => ({ ...s, [name]: v })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
  });

  const submit = (onValid: (values: Record<string, string>) => void) => (e: FormEvent) => {
    e.preventDefault();
    const names = Object.keys(rules);
    setTouched(Object.fromEntries(names.map((n) => [n, true])));
    const bad = names.find((n) => errorOf(n));
    if (bad) document.getElementById(`${idPrefix}-${bad}`)?.focus();
    else onValid(values);
  };

  return { values, field, submit, set: (name: string, v: string) => setValues((s) => ({ ...s, [name]: v })) };
}

export type FieldProps = ReturnType<ReturnType<typeof useValidation>["field"]>;

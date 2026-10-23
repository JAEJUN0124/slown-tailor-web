"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { COUNTRY_CODES, PRIVACY_CONSENT, type Field, type FormSection } from "@/content/help";
import { toast } from "@/lib/store";
import { all, emailRule, phoneRule, required, useValidation, type FieldProps, type Rule } from "@/lib/useValidation";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui";

const MAX_FILE = 10 * 1024 * 1024;

function ruleFor(f: Field): Rule | null {
  switch (f.type) {
    case "email":
      return all(required(f.label), emailRule);
    case "tel":
      return all(required(f.label), phoneRule);
    case "number":
      return all(required(f.label), (v) => (Number(v) > 0 ? null : `${f.label}은 1 이상으로 입력해 주세요.`));
    case "date":
    case "radio":
    case "checks":
      return f.required ? required(f.label, "선택해") : null;
    case "file":
      return f.required ? required(f.label, "첨부해") : null;
    case "textarea":
      return f.required ? (v) => (v.trim() && v.trim() !== (f.template ?? "").trim() ? null : `${f.label}을 입력해 주세요.`) : null;
    default:
      if (f.name === "bizNo") return all(required(f.label), (v) => (/^\d{10}$/.test(v.replace(/\D/g, "")) ? null : "사업자등록번호 10자리를 숫자로 입력해 주세요."));
      return f.required ? required(f.label) : null;
  }
}

const line = "h-[45px] w-full min-w-0 border-b bg-transparent text-[15px] outline-none transition-colors placeholder:text-shop-500";
const lineState = (p: FieldProps) => (p.error ? "border-shop-like" : "border-shop-250 focus:border-shop-900");

function Dot() {
  return <span aria-hidden="true" className="ml-1 inline-block size-1 -translate-y-1 rounded-full bg-shop-accent align-middle" />;
}

function Control({ f, p, set }: { f: Field; p: FieldProps; set: (v: string) => void }) {
  const describedBy = p.error ? `${p.id}-error` : f.hint ? `${p.id}-hint` : undefined;
  const common = { "aria-invalid": p.error ? true : undefined, "aria-describedby": describedBy, onBlur: p.onBlur };

  switch (f.type) {
    case "textarea":
      return (
        <textarea
          id={p.id}
          value={p.value}
          placeholder={f.placeholder}
          onChange={(e) => p.onChange(e.target.value)}
          {...common}
          className={cn("h-[200px] w-full resize-y border bg-white p-5 text-[14px] leading-[22px] outline-none placeholder:text-shop-500", p.error ? "border-shop-like" : "border-shop-250 focus:border-shop-900")}
        />
      );
    case "file":
      return (
        <div className="flex items-end gap-2">
          <span className={cn(line, lineState(p), "flex items-center truncate text-shop-600")} aria-hidden="true">
            {p.value || "선택한 파일 없음"}
          </span>
          <label className="flex h-9 shrink-0 cursor-pointer items-center rounded border border-shop-250 px-4 text-[13px] transition-colors hover:border-shop-900 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-shop-900">
            파일 첨부
            <input
              id={p.id}
              type="file"
              accept=".gif,.png,.jpg,.jpeg,.pdf"
              className="sr-only"
              {...common}
              onChange={(e) => {
                const file = e.target.files?.[0];
                p.onBlur();
                if (file && file.size > MAX_FILE) {
                  e.target.value = "";
                  set("");
                  toast("10MB 이하 파일만 첨부할 수 있습니다. 용량을 줄여 다시 골라 주세요.");
                } else set(file?.name ?? "");
              }}
            />
          </label>
        </div>
      );
    case "radio":
      return (
        <div role="radiogroup" aria-labelledby={`${p.id}-label`} aria-describedby={describedBy} className="flex min-h-[45px] flex-wrap items-center gap-x-8 gap-y-2">
          {f.options!.map((o, i) => (
            <label key={o} className="inline-flex cursor-pointer items-center gap-2 text-[15px]">
              <input
                type="radio"
                id={i === 0 ? p.id : undefined}
                name={p.id}
                checked={p.value === o}
                onChange={() => set(o)}
                onBlur={p.onBlur}
                className="size-5 accent-[var(--color-shop-accent)]"
              />
              {o}
            </label>
          ))}
        </div>
      );
    case "checks": {
      const picked = p.value ? p.value.split(",") : [];
      return (
        <div role="group" aria-labelledby={`${p.id}-label`} className="grid min-h-[45px] grid-cols-2 items-center gap-3 py-2 sm:grid-cols-3">
          {f.options!.map((o, i) => (
            <Checkbox
              key={o}
              id={i === 0 ? p.id : undefined}
              describedBy={i === 0 ? describedBy : undefined}
              checked={picked.includes(o)}
              onChange={(on) => {
                set((on ? [...picked, o] : picked.filter((x) => x !== o)).join(","));
                p.onBlur();
              }}
            >
              {o}
            </Checkbox>
          ))}
        </div>
      );
    }
    default:
      return (
        <input
          id={p.id}
          type={f.type ?? "text"}
          value={p.value}
          placeholder={f.placeholder}
          inputMode={f.type === "tel" || f.type === "number" || f.name === "bizNo" ? "numeric" : undefined}
          onChange={(e) => p.onChange(e.target.value)}
          {...common}
          className={cn(line, lineState(p))}
        />
      );
  }
}

function FieldRow({ f, p, set }: { f: Field; p: FieldProps; set: (v: string) => void }) {
  const [country, setCountry] = useState(COUNTRY_CODES[0]);
  const [sms, setSms] = useState(false);
  const labelled = f.type === "radio" || f.type === "checks";
  const Label = labelled ? "p" : "label";
  return (
    <div className="grid gap-1 py-1.5 md:grid-cols-[140px_1fr] md:items-start md:gap-0">
      <Label id={`${p.id}-label`} {...(labelled ? {} : { htmlFor: p.id })} className="pt-3 text-[15px] leading-[21px] text-shop-600">
        {f.label}
        {f.required && <Dot />}
        {f.required && <span className="sr-only"> (필수)</span>}
      </Label>
      <div className="min-w-0">
        {f.type === "tel" ? (
          <>
            <div className="flex gap-6">
              <div className="relative w-[120px] shrink-0">
                <select aria-label="국가 번호" value={country} onChange={(e) => setCountry(e.target.value)} className={cn(line, "appearance-none border-shop-250 pr-6 focus:border-shop-900")}>
                  {COUNTRY_CODES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2" strokeWidth={1.4} aria-hidden="true" />
              </div>
              <Control f={f} p={p} set={set} />
            </div>
            <Checkbox checked={sms} onChange={setSms} className="mt-3 text-[14px]">
              답변이 등록되면 알림톡·문자로 받기
            </Checkbox>
          </>
        ) : (
          <Control f={f} p={p} set={set} />
        )}
        {p.error ? (
          <p id={`${p.id}-error`} className="mt-1.5 text-[13px] leading-[19px] text-shop-like">
            {p.error}
          </p>
        ) : (
          f.hint && (
            <p id={`${p.id}-hint`} className="mt-1.5 text-[13px] leading-[19px] text-shop-500">
              {f.hint}
            </p>
          )
        )}
      </div>
    </div>
  );
}

/**
 * Help desk request form (reference: 단체주문 · 제휴문의 · 입점신청): 140px
 * grey labels with accent dots for required fields, underlined inputs, the
 * privacy consent box and 취소 / 등록. Errors appear once a field is left and
 * clear as soon as it is fixed. Nothing is sent.
 */
export function InquiryForm({ sections, idPrefix }: { sections: FormSection[]; idPrefix: string }) {
  const fields = sections.flatMap((s) => s.fields);
  const rules: Record<string, Rule> = {};
  for (const f of fields) {
    const r = ruleFor(f);
    if (r) rules[f.name] = r;
  }
  rules.agree = (v) => (v ? null : "개인정보 수집 및 이용에 동의해 주세요.");
  const initial = Object.fromEntries(fields.filter((f) => f.template).map((f) => [f.name, f.template!]));
  const { field, submit, set } = useValidation(idPrefix, rules, initial);
  const [done, setDone] = useState(false);
  const agree = field("agree");

  if (done) {
    return (
      <div role="status" className="border-t border-shop-900 px-5 py-20 text-center">
        <p className="text-[20px] font-bold leading-[28px]">입력하신 내용을 확인했습니다.</p>
        <p className="mt-2 text-[15px] leading-[22px] text-shop-600">데모 화면이라 실제로 접수되지는 않습니다.</p>
        <div className="mt-8 flex justify-center gap-2">
          <button type="button" onClick={() => setDone(false)} className="h-[50px] w-[180px] rounded border border-shop-900 text-[15px] hover:bg-shop-100">
            다시 작성하기
          </button>
          <Link href="/help/" className="flex h-[50px] w-[180px] items-center justify-center rounded bg-shop-900 text-[15px] text-white hover:bg-black">
            고객센터로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit(() => setDone(true))} className="max-w-[670px]">
      <p className="mb-2 text-right text-[13px] leading-[19px] text-shop-600">
        <Dot /> 필수입력사항
      </p>
      {sections.map((s, i) => (
        <fieldset key={s.title ?? i} className={cn(s.title && "mt-10 first:mt-0")}>
          {s.title && <legend className="mb-2 border-b border-shop-900 pb-3 text-[20px] font-bold leading-[28px] md:w-[670px]">{s.title}</legend>}
          {s.fields.map((f) => (
            <FieldRow key={f.name} f={f} p={field(f.name)} set={(v) => set(f.name, v)} />
          ))}
        </fieldset>
      ))}
      <section className="mt-10 bg-shop-100 p-6 text-[13px] leading-[20px]">
        <h3 className="text-[15px] font-bold">{PRIVACY_CONSENT.title}</h3>
        <table className="mt-3 w-full border-collapse bg-white">
          <tbody>
            {PRIVACY_CONSENT.rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row" className="w-[110px] border border-shop-250 px-3 py-2 text-left font-normal text-shop-600">
                  {k}
                </th>
                <td className="border border-shop-250 px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-shop-600">{PRIVACY_CONSENT.note}</p>
        <Checkbox id={agree.id} describedBy={agree.error ? `${agree.id}-error` : undefined} checked={!!agree.value} onChange={(v) => set("agree", v ? "yes" : "")} className="mt-4 text-[14px]">
          {PRIVACY_CONSENT.agree}
        </Checkbox>
        {agree.error && (
          <p id={`${agree.id}-error`} className="mt-1.5 text-[13px] text-shop-like">
            {agree.error}
          </p>
        )}
      </section>
      <div className="mt-10 flex justify-center gap-2">
        <Link href="/help/" className="flex h-[60px] w-full max-w-[256px] items-center justify-center rounded border border-shop-900 text-[16px] transition-colors hover:bg-shop-100">
          취소
        </Link>
        <button type="submit" className="h-[60px] w-full max-w-[256px] rounded bg-shop-900 text-[16px] font-bold text-white transition-colors hover:bg-black">
          등록
        </button>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { Eye, EyeOff, Globe, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT } from "@/content/help";
import { DEMO_ONLY, toast } from "@/lib/store";
import { all, phoneRule, required, useValidation, type FieldProps, type Rule } from "@/lib/useValidation";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui";

// Sign-in and account recovery (reference: `/public/member/login`,
// `/public/member/searchMbrId`). Nothing is sent: a valid form only shows the
// demo notice.

/** Two half-width tabs over a 4px rule; the current one turns black. */
function UnderTabs({ tabs, active, onChange, label }: { tabs: string[]; active: number; onChange: (i: number) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="flex">
      {tabs.map((t, i) => (
        <button
          key={t}
          type="button"
          role="tab"
          aria-selected={i === active}
          onClick={() => onChange(i)}
          className={cn(
            "h-[50px] flex-1 border-b-4 text-[17px] leading-[23px] transition-colors",
            i === active ? "border-shop-900 font-bold text-shop-900" : "border-shop-250 text-shop-900 hover:border-shop-450",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/**
 * 50px boxed field. The label sits where the reference puts its placeholder
 * and moves up once the field is focused or filled, so it never disappears.
 */
function BoxField({ label, field, type = "text", hint, inputMode, autoComplete, end }: {
  label: string;
  field: FieldProps;
  type?: string;
  hint?: string;
  inputMode?: "numeric" | "email" | "tel" | "text";
  autoComplete?: string;
  end?: React.ReactNode;
}) {
  const errorId = `${field.id}-error`;
  return (
    <div>
      <div className={cn("relative h-[50px] border bg-white", field.error ? "border-shop-like" : "border-shop-250 focus-within:border-shop-900")}>
        <input
          id={field.id}
          type={type}
          value={field.value}
          placeholder=" "
          inputMode={inputMode}
          autoComplete={autoComplete}
          aria-invalid={field.error ? true : undefined}
          aria-describedby={field.error ? errorId : undefined}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
          className="peer h-full w-full bg-transparent pl-5 pr-12 pt-3.5 text-[15px] outline-none"
        />
        <label
          htmlFor={field.id}
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[14px] text-shop-600 transition-all peer-focus:top-[13px] peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-[13px] peer-[:not(:placeholder-shown)]:text-[11px]"
        >
          {label}
          {hint && <span className="ml-1 text-shop-500">{hint}</span>}
        </label>
        {end}
      </div>
      {field.error && (
        <p id={errorId} className="mt-1.5 text-[13px] leading-[19px] text-shop-like">
          {field.error}
        </p>
      )}
    </div>
  );
}

function PasswordField({ field }: { field: FieldProps }) {
  const [shown, setShown] = useState(false);
  return (
    <BoxField
      label="비밀번호"
      field={field}
      type={shown ? "text" : "password"}
      autoComplete="current-password"
      end={
        <button
          type="button"
          aria-label={shown ? "비밀번호 숨기기" : "비밀번호 보기"}
          aria-pressed={shown}
          onClick={() => setShown((v) => !v)}
          className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-shop-600 hover:text-shop-900"
        >
          {shown ? <Eye className="size-5" strokeWidth={1.4} /> : <EyeOff className="size-5" strokeWidth={1.4} />}
        </button>
      }
    />
  );
}

/** Fields on the left, the tall black 138×110 button on the right. */
function FormRow({ children, button }: { children: React.ReactNode; button: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
      <div className="min-w-0 flex-1 space-y-2.5">{children}</div>
      <button type="submit" className="h-[50px] shrink-0 bg-shop-900 text-[16px] font-bold text-white transition-colors hover:bg-black sm:h-[110px] sm:w-[138px]">
        {button}
      </button>
    </div>
  );
}

const ID_RULE: Rule = required("아이디");

function MemberLogin() {
  const [saveId, setSaveId] = useState(true);
  const { field, submit } = useValidation("login", { id: ID_RULE, pw: required("비밀번호") });
  return (
    <form noValidate onSubmit={submit(() => toast(DEMO_ONLY))} className="mt-[60px]">
      <FormRow button="로그인">
        <BoxField label="아이디" field={field("id")} autoComplete="username" />
        <PasswordField field={field("pw")} />
      </FormRow>
      <Checkbox checked={saveId} onChange={setSaveId} className="mt-4">
        아이디 저장
      </Checkbox>
      <ul className="mt-[30px] flex flex-wrap items-center justify-center gap-x-[60px] gap-y-2 bg-shop-150 px-5 py-7 text-[14px] leading-[20px]">
        <li>
          <Link href="/login/find/" className="hover:underline">
            아이디 찾기
          </Link>
        </li>
        <li>
          <Link href="/login/find/#password" className="hover:underline">
            비밀번호 찾기
          </Link>
        </li>
        <li>
          <button type="button" onClick={() => toast(DEMO_ONLY)} className="hover:underline">
            회원가입
          </button>
        </li>
      </ul>
      <p className="mt-[60px] flex items-center gap-5 text-[17px] leading-[23px] before:h-px before:flex-1 before:bg-shop-250 after:h-px after:flex-1 after:bg-shop-250">
        간편 계정으로 로그인
      </p>
      <div className="mt-10 flex justify-center gap-14">
        {[
          { label: "메신저 계정 로그인", icon: MessageCircle, color: "bg-[#ffd84d] text-shop-900" },
          { label: "포털 계정 로그인", icon: Globe, color: "bg-[#2fb36b] text-white" },
        ].map((s) => (
          <button key={s.label} type="button" onClick={() => toast(DEMO_ONLY)} className="flex items-center gap-2.5 text-[13px] font-bold">
            <span className={cn("flex size-8 items-center justify-center", s.color)} aria-hidden="true">
              <s.icon className="size-[18px]" strokeWidth={1.8} />
            </span>
            {s.label}
          </button>
        ))}
      </div>
    </form>
  );
}

function GuestOrder() {
  const { field, submit } = useValidation("guest", { name: required("주문자 이름"), order: all(required("주문번호"), (v) => (/^\d{6,}$/.test(v.trim()) ? null : "주문번호는 숫자 6자리 이상입니다.")) });
  return (
    <form noValidate onSubmit={submit(() => toast(DEMO_ONLY))} className="mt-[60px]">
      <FormRow button="주문조회">
        <BoxField label="주문자 이름" field={field("name")} autoComplete="name" />
        <BoxField label="주문번호" hint="(숫자만)" field={field("order")} inputMode="numeric" />
      </FormRow>
      <p className="mt-5 text-[13px] leading-[20px] text-shop-600">주문번호는 주문 완료 후 받은 문자나 이메일에서 확인할 수 있습니다.</p>
    </form>
  );
}

/** Opens on the tab the address asks for (#guest / #password), as the side menu links do. */
function useHashTab(hash: string) {
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const sync = () => setTab(window.location.hash === `#${hash}` ? 1 : 0);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [hash]);
  return [tab, setTab] as const;
}

export function LoginView() {
  const [tab, setTab] = useHashTab("guest");
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <UnderTabs tabs={["회원", "비회원 (주문조회)"]} active={tab} onChange={setTab} label="로그인 종류" />
      {tab === 0 ? <MemberLogin /> : <GuestOrder />}
    </div>
  );
}

const contactRule: Rule = (v) => {
  const t = v.trim();
  if (!t) return "휴대폰 번호나 이메일을 입력해 주세요.";
  return t.includes("@") ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) ? null : "이메일 주소를 다시 확인해 주세요.") : phoneRule(t);
};

function FindForm({ withId }: { withId: boolean }) {
  const rules: Record<string, Rule> = withId ? { id: ID_RULE, name: required("이름"), contact: contactRule } : { name: required("이름"), contact: contactRule };
  const { field, submit } = useValidation(withId ? "find-pw" : "find-id", rules);
  return (
    <form noValidate onSubmit={submit(() => toast(DEMO_ONLY))} className="mt-[60px]">
      <FormRow button="확인">
        {withId && <BoxField label="아이디" field={field("id")} autoComplete="username" />}
        <BoxField label="이름" field={field("name")} autoComplete="name" />
        <BoxField label="휴대폰 번호 또는 이메일" hint="('-' 없이)" field={field("contact")} />
      </FormRow>
      <p className="my-10 flex items-center gap-3 text-[15px] text-shop-600 before:h-px before:flex-1 before:bg-shop-250 after:h-px after:flex-1 after:bg-shop-250">OR</p>
      <button type="button" onClick={() => toast(DEMO_ONLY)} className="h-[60px] w-full bg-shop-250 text-[16px] transition-colors hover:bg-shop-400">
        휴대폰 인증으로 찾기
      </button>
    </form>
  );
}

export function FindAccount() {
  const [tab, setTab] = useHashTab("password");
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <UnderTabs tabs={["아이디 찾기", "비밀번호 찾기"]} active={tab} onChange={setTab} label="찾을 정보" />
      <FindForm key={tab} withId={tab === 1} />
      <p className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 bg-shop-150 px-5 py-6 text-[14px] leading-[20px] text-shop-700">
        <span className="flex items-center gap-1.5">
          <Phone className="size-4" strokeWidth={1.4} aria-hidden="true" />
          {CONTACT.phone}
        </span>
        <span>
          {CONTACT.hours} ({CONTACT.closed})
        </span>
      </p>
    </div>
  );
}

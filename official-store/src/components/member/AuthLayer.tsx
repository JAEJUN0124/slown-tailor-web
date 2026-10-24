"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Eye, EyeOff, Home, Medal, MessageCircle, PackageCheck, Ticket, Zap } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Wordmark } from "@/components/layout/SiteHeader";
import { BRAND } from "@/content/site";
import { DEMO_ONLY, toast } from "@/lib/store";
import { required, useValidation, type FieldProps } from "@/lib/useValidation";
import { cn } from "@/lib/utils";

// Sign-in and sign-up as a full-screen layer over the page (reference: a
// one-tap sign-up service covers the store's own login and join screens with
// its own white layer, back and home buttons). The messenger brand is left
// out: the one-tap button keeps its place, colour and wording without a logo.

function Layer({ children }: { children: ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      root.style.overflow = prev;
    };
  }, []);
  return (
    <div ref={ref} tabIndex={-1} className="fixed inset-0 z-[350] overflow-y-auto bg-white outline-none">
      <div className="mx-auto max-w-[420px] px-5 pb-16">
        <div className="flex h-[50px] items-center justify-between">
          <button type="button" aria-label="뒤로" onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))} className="-ml-1.5 flex size-8 items-center justify-center">
            <ArrowLeft className="size-5" strokeWidth={1.3} />
          </button>
          <Link href="/" aria-label="홈" className="-mr-1.5 flex size-8 items-center justify-center">
            <Home className="size-[18px]" strokeWidth={1.3} />
          </Link>
        </div>
        <div className="mt-7 flex justify-center">
          <Wordmark className="text-[22px]" />
        </div>
        {children}
        <div className="mt-[60px] text-[12px] leading-[1.6] text-st-ink">
          <p className="flex items-center gap-1">
            첫 구매가 빨라지는 <b>1초 회원가입</b> <Zap className="size-3 fill-[#ff7a45] text-[#ff7a45]" strokeWidth={0} aria-hidden="true" />
          </p>
          <p>살까 말까 고민하던 고객까지 막힘없이</p>
          <p className="mt-6 text-st-mute">
            {BRAND.name}도 이미 <b>1초 회원가입</b> 사용 중
          </p>
        </div>
      </div>
    </div>
  );
}

function OneTap({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => toast(`간편 로그인은 ${DEMO_ONLY}`)} className="relative mt-8 flex h-[54px] w-full items-center justify-center rounded-md bg-st-key text-[16px] font-semibold text-[#191919]">
      <MessageCircle className="absolute left-5 size-5 fill-[#191919]" strokeWidth={0} aria-hidden="true" />
      {label}
    </button>
  );
}

const Or = () => (
  <p className="my-6 flex items-center gap-3 text-[11px] text-st-faint before:h-px before:flex-1 before:bg-[#eee] after:h-px after:flex-1 after:bg-[#eee]">또는</p>
);

const softButton = "flex h-[54px] w-full items-center justify-center rounded-md bg-[#f5f6f7] text-[16px] font-medium text-[#191919]";

function SoftField({ field, label, password, ...rest }: { field: FieldProps; label: string; password?: boolean; autoComplete?: string; inputMode?: "numeric" }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="relative">
        <label htmlFor={field.id} className="sr-only">
          {label}
        </label>
        <input
          id={field.id}
          placeholder={label}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
          aria-invalid={field.error ? true : undefined}
          aria-describedby={field.error ? `${field.id}-error` : undefined}
          type={password && !show ? "password" : "text"}
          {...rest}
          className={cn("h-[60px] w-full border-b bg-transparent text-[15px] text-[#191919] outline-none placeholder:text-[#8b8b8b]", field.error ? "border-[#e5484d]" : "border-[#e5e5e5] focus:border-[#191919]", password && "pr-10")}
        />
        {password && (
          <button type="button" aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"} onClick={() => setShow((s) => !s)} className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-[#b0b0b0]">
            {show ? <Eye className="size-[18px]" strokeWidth={1.3} /> : <EyeOff className="size-[18px]" strokeWidth={1.3} />}
          </button>
        )}
      </div>
      {field.error && (
        <p id={`${field.id}-error`} className="mt-1.5 text-[12px] text-[#e5484d]">
          {field.error}
        </p>
      )}
    </div>
  );
}

/** Reads ?tab=guest and whether the visitor came here from an order (bag or buy now). */
function useLoginQuery() {
  const [q, setQ] = useState({ guest: false, ordering: false });
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setQ({ guest: p.get("tab") === "guest", ordering: !!p.get("from") || p.has("noMember") });
  }, []);
  return q;
}

export function LoginLayer() {
  const { guest, ordering } = useLoginQuery();
  const [tab, setTab] = useState<"member" | "guest">("member");
  useEffect(() => setTab(guest ? "guest" : "member"), [guest]);

  const member = useValidation("login", { id: required("아이디"), pw: required("비밀번호") });
  const order = useValidation("guest", {
    name: required("주문자명"),
    no: (v) => (/^\d{8}-\d{7}$/.test(v.trim()) ? null : "주문번호를 - 포함해서 입력해 주세요. 예: 20261024-0000001"),
    pw: required("비회원주문 비밀번호"),
  });

  return (
    <Layer>
      <h1 className="mt-[58px] text-[24px] font-bold leading-[1.4] text-[#191919]">로그인</h1>
      <p className="mt-3 text-[14px] leading-[1.6] text-[#191919]">
        아이디와 비밀번호 입력하기 귀찮으시죠?
        <br />
        1초 회원가입으로 입력없이 간편하게 로그인 하세요.
      </p>
      <OneTap label="1초 간편 로그인/회원가입" />
      <Or />
      <div role="tablist" aria-label="로그인 방법" className="flex h-10 rounded-full bg-[#f5f6f7] p-[3px]">
        {(
          [
            ["member", "기존 회원이세요?"],
            ["guest", "비회원 배송조회"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn("flex-1 rounded-full text-[14px]", tab === key ? "bg-[#222] font-semibold text-white" : "text-[#8b8b8b]")}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "member" ? (
        <form noValidate onSubmit={member.submit(() => toast(`로그인은 ${DEMO_ONLY}`))} className="mt-2">
          <SoftField label="아이디" field={member.field("id")} autoComplete="username" />
          <SoftField label="비밀번호" field={member.field("pw")} password autoComplete="current-password" />
          <button type="submit" className={cn(softButton, "mt-4")}>
            기존 회원 로그인
          </button>
          {ordering && (
            <Link href="/order/" className="mt-2.5 flex h-[54px] w-full items-center justify-center rounded-md border border-[#e5e5e5] bg-white text-[16px] font-medium text-[#191919]">
              비회원 구매
            </Link>
          )}
          <div className="mt-6 flex items-center justify-between text-[14px]">
            <p className="flex items-center gap-2.5 text-[#8b8b8b]">
              <Link href="/member/find-id/">아이디 찾기</Link>
              <span className="h-3 w-px bg-[#e5e5e5]" aria-hidden="true" />
              <Link href="/member/find-password/">비밀번호 찾기</Link>
            </p>
            <Link href="/member/join/" className="text-[#191919]">
              회원가입
            </Link>
          </div>
        </form>
      ) : (
        <form noValidate onSubmit={order.submit(() => toast(`주문 조회는 ${DEMO_ONLY}`))} className="mt-2">
          <SoftField label="주문자명" field={order.field("name")} autoComplete="name" />
          <SoftField label="주문번호 (-) 포함" field={order.field("no")} />
          <SoftField label="비회원주문 비밀번호" field={order.field("pw")} password />
          <button type="submit" className={cn(softButton, "mt-4")}>
            비회원 배송조회
          </button>
        </form>
      )}
    </Layer>
  );
}

const BENEFITS = [
  { icon: Medal, text: ["SLOWN CLUB 등급별", "최대 15% 할인 + 5% 적립"] },
  { icon: Camera, text: ["포토리뷰 5,000원", "적립금 지급"] },
  { icon: Ticket, text: ["10% 신규 가입 쿠폰", "채널 추가 5,000원 혜택"] },
  { icon: PackageCheck, text: ["무료 교환/반품", "무료 수선 혜택까지"] },
];

/** Sign-up gate; "ID/PW 입력이 필요한 회원가입" lifts it and shows the full form under it. */
export function JoinLayer({ onForm }: { onForm: () => void }) {
  return (
    <Layer>
      <h1 className="mt-[58px] text-[24px] font-bold leading-[1.4] text-[#191919]">회원가입</h1>
      <p className="mt-3 text-[14px] leading-[1.6] text-[#191919]">
        아이디와 비밀번호 입력하기 귀찮으시죠?
        <br />
        1초 회원가입으로 입력없이 간편하게 회원가입 하세요.
      </p>
      <OneTap label="1초 간편 회원가입" />
      <ul className="mt-[30px] grid grid-cols-2 rounded-lg bg-[#f8f9fa] px-[22px] py-[22px]">
        {BENEFITS.map((b, i) => (
          <li key={b.text[0]} className={cn("flex flex-col items-center gap-3 px-2 py-5 text-center text-[11px] font-bold leading-[1.5] text-[#333]", i % 2 === 0 && "border-r border-[#e5e5e5]", i < 2 && "border-b border-[#e5e5e5]")}>
            <b.icon className="size-9" strokeWidth={1} aria-hidden="true" />
            <span>
              {b.text[0]}
              <br />
              {b.text[1]}
            </span>
          </li>
        ))}
      </ul>
      <Or />
      <button type="button" onClick={onForm} className={softButton}>
        ID/PW 입력이 필요한 회원가입
      </button>
    </Layer>
  );
}

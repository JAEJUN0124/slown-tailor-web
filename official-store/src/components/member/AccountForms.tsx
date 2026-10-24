"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { LineField, PhoneField, Tick } from "@/components/forms/Fields";
import { PRIVACY, TERMS, type PolicyDoc } from "@/content/policy";
import { DEMO_ONLY, toast } from "@/lib/store";
import { all, emailRule, phoneRule, required, useValidation, type Rule } from "@/lib/useValidation";
import { cn } from "@/lib/utils";

// Store-side account forms (reference: the store's own join / find screens):
// a large two-line title on the left, the form on the right half.

function TitledForm({ title, children }: { title: [string, string]; children: ReactNode }) {
  return (
    <div className="px-[18px] pb-24 pt-10 xl:flex xl:min-h-[calc(100vh-39px)] xl:px-7 xl:pt-0">
      <h1 className="mb-10 text-[56px] font-normal leading-[0.95] tracking-[-0.03em] text-st-text xl:sticky xl:top-[39px] xl:mb-0 xl:flex xl:h-[calc(100vh-39px)] xl:w-1/2 xl:flex-col xl:justify-center xl:text-[104px]">
        <span className="block">{title[0]}</span>{" "}
        <span className="block">{title[1]}</span>
      </h1>
      <div className="xl:w-1/2 xl:pl-[13px] xl:pt-[44px]">{children}</div>
    </div>
  );
}

const idRule: Rule = (v) => (/^[a-z0-9]{4,16}$/.test(v) ? null : "아이디는 영문 소문자와 숫자로 4~16자 입력해 주세요.");
const pwRule: Rule = (v) => {
  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z0-9]/].filter((r) => r.test(v)).length;
  return v.length >= 8 && v.length <= 16 && kinds >= 3 ? null : "영문 대소문자, 숫자, 특수문자 중 3가지 이상을 섞어 8~16자로 입력해 주세요.";
};
const mobileRule: Rule = (v) => (/^\d{3}-\d{3,4}-\d{4}$/.test(v) ? null : "휴대전화 번호를 끝까지 입력해 주세요.");

function Agreement({ doc, label, checked, onChange, error }: { doc: PolicyDoc; label: string; checked: boolean; onChange: (v: boolean) => void; error?: string | null }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-st-ink py-[18px]">
      <div className="flex items-center justify-between text-[12px]">
        <span>{doc === TERMS ? "이용약관" : "개인정보처리방침"}</span>
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="text-[11px]">
          {open ? "접기" : "내용 보기"}
        </button>
      </div>
      {open && (
        <div className="mt-3 max-h-[180px] overflow-y-auto border border-st-line p-3 text-[11px] leading-[1.6] text-st-text">
          {doc.articles.map((a) => (
            <p key={a.title || a.body[0]}>
              {a.title} {a.body.join(" ")}
            </p>
          ))}
        </div>
      )}
      <div className="mt-5 flex justify-end">
        <Tick checked={checked} onChange={onChange}>
          {label}
        </Tick>
      </div>
      {error && <p className="mt-1 text-right text-[12px] text-[#c0392b]">{error}</p>}
    </div>
  );
}

export function JoinForm() {
  const [sex, setSex] = useState<"남자" | "여자" | null>(null);
  const [agree, setAgree] = useState({ terms: false, privacy: false, sms: false, mail: false });
  const [tried, setTried] = useState(false);
  const { field, submit, values } = useValidation(
    "join",
    {
      id: idRule,
      pw: pwRule,
      pw2: (v) => (!v ? "비밀번호를 한 번 더 입력해 주세요." : v === values.pw ? null : "비밀번호가 서로 다릅니다. 다시 확인해 주세요."),
      name: required("이름"),
      mobile: mobileRule,
      email: all(required("이메일"), emailRule),
    },
    { mobile: "010--", phone: "02--" },
  );
  const termsMissing = tried && !agree.terms ? "이용약관에 동의해 주세요." : null;
  const privacyMissing = tried && !agree.privacy ? "개인정보 수집 및 이용에 동의해 주세요." : null;

  return (
    <TitledForm title={["Create", "Account"]}>
      <form
        noValidate
        onSubmit={(e) => {
          setTried(true);
          submit(() => {
            if (!agree.terms || !agree.privacy) return;
            toast(`회원가입은 ${DEMO_ONLY}`);
          })(e);
        }}
        className="space-y-6 text-st-ink"
      >
        <div className="border-b border-st-line pb-[30px]">
          <button type="button" onClick={() => toast(`휴대폰 인증은 ${DEMO_ONLY}`)} className="text-[11px] font-medium">
            ▯ 휴대폰 인증하기
          </button>
        </div>
        <LineField label="아이디" field={field("id")} autoComplete="username" className="max-w-[480px]" />
        <LineField label="비밀번호" field={field("pw")} password autoComplete="new-password" hint="(영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)" className="max-w-[480px]" />
        <LineField label="비밀번호 확인" field={field("pw2")} password autoComplete="new-password" className="max-w-[480px]" />
        <LineField label="이름" field={field("name")} autoComplete="name" className="max-w-[480px]" />
        <div className="max-w-[656px]">
          <span className="block text-[11px] font-medium leading-[1.6]">우편번호</span>
          <div className="flex items-end gap-1">
            <input aria-label="우편번호" inputMode="numeric" className="h-[38px] w-[100px] border-b border-st-ink bg-transparent text-[14px] outline-none focus:bg-st-field" />
            <button type="button" onClick={() => toast(`우편번호 검색은 ${DEMO_ONLY}`)} className="h-[30px] text-[12px]">
              우편번호 검색
            </button>
          </div>
          <span className="mt-5 block text-[11px] font-medium leading-[1.6]">주소</span>
          <input aria-label="기본 주소" className="h-[38px] w-full border-b border-st-ink bg-transparent text-[14px] outline-none focus:bg-st-field" />
          <input aria-label="상세 주소" className="mt-2 h-[38px] w-full border-b border-st-ink bg-transparent text-[14px] outline-none focus:bg-st-field" />
        </div>
        <PhoneField label="전화" field={{ ...field("phone"), error: null }} prefixes={["02", "031", "032", "033", "041", "042", "043", "051", "052", "053"]} />
        <PhoneField label="휴대전화" field={field("mobile")} />
        <LineField label="이메일" field={field("email")} type="email" autoComplete="email" className="max-w-[656px]" />
        <fieldset>
          <legend className="sr-only">성별</legend>
          <div className="flex items-center gap-5">
            <span className="text-[11px] font-medium">성별</span>
            {(["남자", "여자"] as const).map((s) => (
              <Tick key={s} type="radio" name="sex" checked={sex === s} onChange={() => setSex(s)}>
                {s}
              </Tick>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-[11px] font-medium leading-[1.6]">생년월일</legend>
          <div className="mt-1 flex items-center gap-2 text-[12px]">
            {[
              ["년", "w-[60px]"],
              ["월", "w-[40px]"],
              ["일", "w-[40px]"],
            ].map(([u, w]) => (
              <span key={u} className="flex items-center gap-1">
                <input aria-label={`생년월일 ${u}`} inputMode="numeric" className={cn("h-[30px] border-b border-st-ink bg-transparent text-center outline-none focus:bg-st-field", w)} />
                {u}
              </span>
            ))}
          </div>
        </fieldset>

        <div className="pt-6">
          <Agreement doc={TERMS} label="이용약관에 동의하십니까?" checked={agree.terms} onChange={(v) => setAgree((a) => ({ ...a, terms: v }))} error={termsMissing} />
          <Agreement doc={PRIVACY} label="개인정보 수집 및 이용에 동의하십니까?" checked={agree.privacy} onChange={(v) => setAgree((a) => ({ ...a, privacy: v }))} error={privacyMissing} />
          <div className="border-y border-st-ink py-[18px] text-[12px]">
            <p>수신 동의 설정</p>
            <div className="mt-5 flex flex-col items-end gap-1.5">
              <Tick checked={agree.sms} onChange={(v) => setAgree((a) => ({ ...a, sms: v }))}>
                SMS(문자, 메신저 등) 수신을 동의하십니까?
              </Tick>
              <Tick checked={agree.mail} onChange={(v) => setAgree((a) => ({ ...a, mail: v }))}>
                이메일 수신을 동의하십니까?
              </Tick>
              <p className="mt-3 border-b border-st-line pb-0.5 text-[11px]">* 수신 동의 시, 회원가입 쿠폰을 제공해 드립니다.</p>
            </div>
          </div>
        </div>
        <button type="submit" className="text-[12px] font-medium">
          계정 생성하기
        </button>
      </form>
    </TitledForm>
  );
}

/** Find ID / Find password (reference: /member/id/find_id.html, /member/passwd/find_passwd_info.html). */
export function FindForm({ kind }: { kind: "id" | "password" }) {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const rules: Record<string, Rule> = {
    ...(kind === "password" ? { id: required("아이디") } : {}),
    name: required("이름"),
    ...(method === "email" ? { email: all(required("이메일"), emailRule) } : { phone: phoneRule }),
  };
  const { field, submit } = useValidation(`find-${kind}`, rules);
  const contact = method === "email" ? field("email") : field("phone");

  return (
    <TitledForm title={kind === "id" ? ["Find", "ID"] : ["Find", "Password"]}>
      <form noValidate onSubmit={submit(() => toast(`${kind === "id" ? "아이디" : "비밀번호"} 찾기는 ${DEMO_ONLY}`))} className="max-w-[656px] space-y-6 pt-[150px] text-st-ink xl:pt-[180px]">
        <div className="flex gap-4">
          <Tick type="radio" name="method" checked={method === "email"} onChange={() => setMethod("email")}>
            이메일
          </Tick>
          <Tick type="radio" name="method" checked={method === "phone"} onChange={() => setMethod("phone")}>
            휴대폰인증
          </Tick>
        </div>
        {kind === "password" && <LineField label="아이디" field={field("id")} autoComplete="username" />}
        <LineField label="이름" field={field("name")} autoComplete="name" />
        {method === "email" ? (
          <LineField key="email" label="이메일" field={contact} type="email" autoComplete="email" />
        ) : (
          <LineField key="phone" label="휴대폰 번호" field={contact} inputMode="numeric" placeholder="숫자만 입력" />
        )}
        <div className="flex items-center gap-6">
          <button type="submit" className="text-[12px] font-medium">
            {kind === "id" ? "아이디 찾기" : "비밀번호 찾기"}
          </button>
          <Link href="/member/login/" className="text-[12px] text-st-mute underline underline-offset-2">
            로그인으로 돌아가기
          </Link>
        </div>
      </form>
    </TitledForm>
  );
}

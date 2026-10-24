"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ProductArt } from "@/components/art/ProductArt";
import { FieldError, LineField, PhoneField, Tick } from "@/components/forms/Fields";
import { getProduct } from "@/content/catalog";
import { DEMO_ONLY, toast, useBag } from "@/lib/store";
import { all, emailRule, required, useValidation, type Rule } from "@/lib/useValidation";
import { cn, won } from "@/lib/utils";

const PAY_METHODS = ["무통장 입금", "간편결제 A", "간편결제 B", "간편결제 C", "휴대폰 결제", "카드 결제", "가상계좌", "실시간 계좌이체"];
const SHIP_MESSAGES = ["배송 메세지를 선택해주세요", "직접 입력", "부재 시 택배함에 넣어주세요.", "부재 시 집 앞에 놔주세요.", "부재 시 경비실에 맡겨주세요."];
const DOMAINS = ["naver.example", "mail.example", "post.example", "직접입력"];

const phone: Rule = (v) => (/^\d{3}-\d{3,4}-\d{4}$/.test(v) ? null : "휴대폰 번호를 끝까지 입력해 주세요.");
const password: Rule = (v) => (v.length >= 4 ? null : "주문 비밀번호를 4자 이상 입력해 주세요.");

function Section({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("border-t border-st-line py-6 first:border-t-0 first:pt-0 xl:py-[23px]", className)}>
      <h2 className="mb-6 text-[12px] font-bold leading-[18px] text-st-ink">{title}</h2>
      {children}
    </section>
  );
}

/**
 * Guest order form (reference: /order/orderform.html after "비회원 구매").
 * Validates on blur and on submit; a valid submit only shows the demo notice.
 */
export function OrderForm() {
  const bag = useBag();
  const items = bag.flatMap((i) => {
    const p = getProduct(i.id);
    return p ? [{ ...i, product: p }] : [];
  });
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [same, setSame] = useState(false);
  const [pay, setPay] = useState(PAY_METHODS[0]);
  const [msg, setMsg] = useState(SHIP_MESSAGES[0]);
  const [receipt, setReceipt] = useState(true);
  const [receiptType, setReceiptType] = useState<"개인" | "사업자">("개인");
  const total = items.reduce((n, i) => n + i.product.price * i.qty, 0);

  const { field, submit, values, set } = useValidation(
    "order",
    {
      name: required("이름"),
      phone,
      email: all(required("이메일"), emailRule),
      pw: password,
      pw2: (v) => (v === values.pw ? null : "주문 비밀번호가 서로 다릅니다. 다시 확인해 주세요."),
      rname: same ? () => null : required("받는 분 이름"),
      zip: required("우편번호"),
      addr1: required("주소"),
      rphone: same ? () => null : phone,
      payer: pay === "무통장 입금" ? required("입금자명") : () => null,
    },
    { phone: "010--", rphone: "010--" },
  );

  // "주문자 정보와 동일" copies the buyer's name and phone into the delivery block.
  const pickSame = (v: boolean) => {
    setSame(v);
    if (v) {
      set("rname", values.name ?? "");
      set("rphone", values.phone ?? "010--");
    }
  };

  const emailLocal = (values.email ?? "").split("@")[0] ?? "";
  const emailDomain = (values.email ?? "").split("@")[1] ?? "";
  const emailField = field("email");

  return (
    <div className="xl:flex xl:px-[30px] xl:pb-[86px] xl:pt-[30px]">
      <aside className="border-b border-st-line px-2.5 py-5 xl:w-[337px] xl:shrink-0 xl:border-b-0 xl:border-r xl:border-st-ink xl:px-0 xl:py-0 xl:pr-[30px]">
        <h1 className="text-[12px] font-bold leading-[15px] text-st-ink">제품 정보</h1>
        {ready && !items.length && (
          <p className="mt-6 text-[13px] text-st-ink">
            주문할 상품이 없습니다.{" "}
            <Link href="/shop/men/new/" className="underline underline-offset-2">
              상품 보러 가기
            </Link>
          </p>
        )}
        <ul className="mt-[42px] space-y-6">
          {items.map((i) => (
            <li key={i.key} className="flex gap-4 border-b border-st-line pb-6 text-[12px] leading-[18px]">
              <ProductArt art={i.product} className="aspect-[108/161] w-[108px] shrink-0" />
              <dl className="grid flex-1 grid-cols-2 content-start gap-x-4 gap-y-3">
                <div className="col-span-2">
                  <dt className="text-st-faint">제품명</dt>
                  <dd className="text-st-ink">
                    {i.product.name}_{i.product.colorName}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-st-faint">사이즈</dt>
                  <dd className="text-st-ink">{i.size}</dd>
                </div>
                <div>
                  <dt className="text-st-faint">수량</dt>
                  <dd className="text-st-ink">{i.qty}</dd>
                </div>
                <div>
                  <dt className="text-st-faint">가격</dt>
                  <dd className="text-st-ink">{won(i.product.price * i.qty)}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </aside>

      <form noValidate onSubmit={submit(() => toast(`주문이 접수되지 않았습니다. ${DEMO_ONLY}`))} className="min-w-0 flex-1 px-2.5 pt-6 xl:pl-[31px] xl:pr-0 xl:pt-0">
        <Section title="고객 정보">
          <div className="max-w-[700px] space-y-5">
            <LineField label="이름" field={field("name")} autoComplete="name" className="max-w-[160px]" />
            <PhoneField label="휴대폰 번호" field={field("phone")} />
            <div>
              <span className="block text-[11px] font-medium leading-[1.6] text-st-ink" id="order-email-label">
                이메일 주소
              </span>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <input
                  id={emailField.id}
                  aria-labelledby="order-email-label"
                  aria-invalid={emailField.error ? true : undefined}
                  value={emailLocal}
                  onChange={(e) => emailField.onChange(`${e.target.value}@${emailDomain}`)}
                  onBlur={emailField.onBlur}
                  className="h-[32px] w-[150px] border-b border-st-ink bg-transparent text-[13px] outline-none focus:bg-st-field"
                />
                <span>@</span>
                <input
                  aria-label="이메일 도메인"
                  value={emailDomain}
                  onChange={(e) => emailField.onChange(`${emailLocal}@${e.target.value}`)}
                  onBlur={emailField.onBlur}
                  className="h-[32px] w-[200px] border-b border-st-ink bg-transparent text-[13px] outline-none focus:bg-st-field"
                />
                <select
                  aria-label="이메일 도메인 고르기"
                  onChange={(e) => e.target.value !== "직접입력" && emailField.onChange(`${emailLocal}@${e.target.value}`)}
                  className="h-[32px] w-[274px] max-w-full border border-st-ink bg-white px-2.5 text-[13px] font-bold"
                  defaultValue="직접입력"
                >
                  {DOMAINS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <FieldError id={emailField.id} error={emailField.error} />
            </div>
          </div>
        </Section>

        <Section title="주문 비밀번호">
          <div className="max-w-[200px] space-y-5">
            <LineField label="비밀번호" field={field("pw")} password autoComplete="new-password" />
            <LineField label="비밀번호 다시입력" field={field("pw2")} password autoComplete="new-password" />
          </div>
        </Section>

        <Section title="배송 정보">
          <div className="max-w-[680px] space-y-5">
            <div className="flex gap-4">
              <Tick type="radio" name="sameaddr" checked={same} onChange={() => pickSame(true)}>
                주문자 정보와 동일
              </Tick>
              <Tick type="radio" name="sameaddr" checked={!same} onChange={() => pickSame(false)}>
                새로운 배송지
              </Tick>
            </div>
            <LineField label="이름" field={field("rname")} className="max-w-[160px]" />
            <div>
              <span className="block text-[11px] font-medium leading-[1.6] text-st-ink">배송지</span>
              <div className="mt-1 flex items-end gap-3">
                <LineField label="우편번호" field={field("zip")} inputMode="numeric" className="w-[100px] [&>label]:sr-only" />
                <button type="button" onClick={() => toast(`우편번호 검색은 ${DEMO_ONLY}`)} className="h-[30px] shrink-0 text-[12px] text-st-ink underline underline-offset-2">
                  우편번호 찾기
                </button>
              </div>
              <LineField label="주소" field={field("addr1")} className="mt-2 [&>label]:sr-only" placeholder="기본 주소" />
              <LineField label="상세 주소" field={{ ...field("addr2"), error: null }} className="mt-2 [&>label]:sr-only" placeholder="상세 주소" />
            </div>
            <PhoneField label="휴대폰 번호" field={field("rphone")} />
            <div>
              <label htmlFor="order-msg" className="block text-[11px] font-medium leading-[1.6] text-st-ink">
                배송 메세지 (*쇼핑백 요청 기능 / 배송 전 수선 요청 불가)
              </label>
              <select id="order-msg" value={msg} onChange={(e) => setMsg(e.target.value)} className="mt-1 h-[32px] w-full border border-st-ink bg-white px-2.5 text-[13px] font-bold">
                {SHIP_MESSAGES.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              {msg === "직접 입력" && (
                <textarea aria-label="배송 메세지 직접 입력" placeholder="배송 메세지를 입력해주세요" className="mt-4 h-[100px] w-full max-w-[680px] border border-st-ink p-2.5 text-[13px] outline-none placeholder:text-st-faint focus:bg-st-field" />
              )}
            </div>
          </div>
        </Section>

        <Section title="쿠폰">
          <button type="button" onClick={() => toast(`쿠폰 선택은 ${DEMO_ONLY}`)} className="text-[12px] text-st-ink">
            쿠폰선택하기
          </button>
        </Section>

        <Section title="결제 정보">
          <dl className="flex flex-wrap gap-x-[60px] gap-y-4 text-[12px] leading-[20px] text-st-ink">
            <div>
              <dt>합계 금액</dt>
              <dd>KRW {won(total)}</dd>
            </div>
            <div>
              <dt>총 할인 금액</dt>
              <dd>- 0</dd>
            </div>
            <div>
              <dt>배송비</dt>
              <dd>무료 배송</dd>
            </div>
            <div className="font-bold">
              <dt>결제 금액</dt>
              <dd>{won(total)}</dd>
            </div>
          </dl>
          <fieldset className="mt-10">
            <legend className="text-[11px] font-medium leading-[1.6] text-st-ink">결제 방법</legend>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {PAY_METHODS.map((m) => (
                <Tick key={m} type="radio" name="pay" checked={pay === m} onChange={() => setPay(m)}>
                  {m}
                </Tick>
              ))}
            </div>
          </fieldset>
          {pay === "무통장 입금" && (
            <div className="mt-8 max-w-[420px] space-y-5">
              <div>
                <label htmlFor="order-bank" className="block text-[11px] font-medium leading-[1.6] text-st-ink">
                  입금 계좌
                </label>
                <select id="order-bank" className="mt-1 h-[32px] w-full border border-st-ink bg-white px-2.5 text-[13px] font-bold">
                  <option>::: 선택해 주세요. :::</option>
                  <option>샘플은행 000-000000-00-000 (주)슬로운</option>
                </select>
              </div>
              <LineField label="입금자명" field={field("payer")} className="max-w-[150px]" />
              <div className="space-y-2">
                <span className="block text-[11px] font-medium leading-[1.6] text-st-ink">현금영수증 신청</span>
                <Tick checked={receipt} onChange={setReceipt}>
                  현금영수증 신청
                </Tick>
                {receipt && (
                  <div className="flex gap-4 pt-2">
                    {(["개인", "사업자"] as const).map((t) => (
                      <Tick key={t} type="radio" name="receipt-type" checked={receiptType === t} onChange={() => setReceiptType(t)}>
                        {t}
                      </Tick>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Section>

        <Section title="">
          <button type="submit" className="text-[12px] text-st-ink">
            지금 결제하기
          </button>
        </Section>
      </form>
    </div>
  );
}

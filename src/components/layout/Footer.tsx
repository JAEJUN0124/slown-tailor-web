import Link from "next/link";
import { FOOTER_MENU, SITE } from "@/content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

const linkClass = "text-[13px] text-mocha transition-colors duration-200 hover:text-espresso";

export function Footer() {
  const { contact } = SITE;
  return (
    // A short seam keeps the CTA colour from bleeding into the footer text.
    <footer data-paint="cream" data-paint-seam="40" className="relative border-t border-line/70">
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
          <div className="flex flex-col gap-5">
            <Wordmark className="text-[15px] text-coffee" />
            <div className="space-y-0.5">
              <p className="text-[13px] font-medium text-espresso">{SITE.tagline}</p>
              <p className="text-[13px] text-mocha">{SITE.taglineKo}</p>
            </div>
            <div className="space-y-0.5 text-[12px] text-mocha">
              <p>{SITE.company}</p>
              <p>{SITE.ceo}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-mocha/70">{SITE.copyright}</p>
              <p className="text-[11px] text-mocha/70">{SITE.demoDisclaimer}</p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-widest text-amber-deep">Menu</p>
            <ul className="space-y-2.5">
              {FOOTER_MENU.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-widest text-amber-deep">Contact</p>
            <div className="space-y-2.5">
              <a href={contact.phoneHref} className={cn(linkClass, "block")}>
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className={cn(linkClass, "block")}>
                {contact.email}
              </a>
              <p className="text-[13px] text-mocha">{contact.address}</p>
              <p className="text-[13px] text-mocha">
                {contact.hoursLabel} {contact.hours}
                {contact.hoursNote}
              </p>
              <a href={contact.instagramHref} className={cn(linkClass, "block")}>
                {contact.instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-5">
          <a href="#terms" className="text-[12px] text-mocha transition-colors duration-200 hover:text-espresso">
            이용약관
          </a>
          <a href="#privacy" className="text-[12px] font-medium text-mocha transition-colors duration-200 hover:text-espresso">
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  );
}

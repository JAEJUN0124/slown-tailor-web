import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** « ‹ 1 2 3 4 5 › » in blocks of five (reference: .new_paging). */
export function Pagination({ page, pages, onPage, className }: { page: number; pages: number; onPage: (p: number) => void; className?: string }) {
  const start = Math.floor((page - 1) / 5) * 5 + 1;
  const nums = Array.from({ length: Math.min(5, pages - start + 1) }, (_, i) => start + i);
  const arrow = "flex size-5 items-center justify-center text-st-ink disabled:text-st-faint xl:size-[11px]";
  return (
    <nav aria-label="페이지" className={cn("flex items-center justify-center", className)}>
      <button type="button" aria-label="처음 페이지" disabled={page === 1} onClick={() => onPage(1)} className={cn(arrow, "mr-2.5 xl:mr-5")}>
        <ChevronsLeft className="size-[14px]" strokeWidth={1.3} />
      </button>
      <button type="button" aria-label="이전 페이지" disabled={page === 1} onClick={() => onPage(page - 1)} className={arrow}>
        <ChevronLeft className="size-[14px]" strokeWidth={1.3} />
      </button>
      <ol className="mx-3 flex items-center xl:gap-1">
        {nums.map((n) => (
          <li key={n}>
            <button
              type="button"
              aria-current={n === page ? "page" : undefined}
              onClick={() => onPage(n)}
              className={cn("flex h-5 min-w-5 items-center justify-center text-[12px] leading-[1.6] xl:h-[11px] xl:min-w-[22px]", n === page ? "text-[#9f9f9f]" : "text-st-ink")}
            >
              {n}
            </button>
          </li>
        ))}
      </ol>
      <button type="button" aria-label="다음 페이지" disabled={page === pages} onClick={() => onPage(page + 1)} className={arrow}>
        <ChevronRight className="size-[14px]" strokeWidth={1.3} />
      </button>
      <button type="button" aria-label="마지막 페이지" disabled={page === pages} onClick={() => onPage(pages)} className={cn(arrow, "ml-2.5 xl:ml-5")}>
        <ChevronsRight className="size-[14px]" strokeWidth={1.3} />
      </button>
    </nav>
  );
}

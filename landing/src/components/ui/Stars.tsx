import { cn } from "@/lib/utils";

export function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label="별점 5점">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="text-xs text-amber-deep" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

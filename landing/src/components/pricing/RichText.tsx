import { Fragment } from "react";

/** Renders `**bold**` segments of price descriptions with an emphasis class. */
export function RichText({ text, emphasis = "font-medium text-coffee" }: { text: string; emphasis?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className={emphasis}>
            {part.slice(2, -2)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

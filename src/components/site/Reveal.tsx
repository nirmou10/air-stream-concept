import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll fade-in reveal. The hidden state is only applied after mount, so
 * content stays visible without JavaScript. Under prefers-reduced-motion the
 * element is never hidden and no transition runs.
 */
export function Reveal({
  as: Tag = "div",
  id,
  className,
  children,
}: {
  as?: "div" | "section";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [pending, setPending] = useState(false);
  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    setPending(true);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPending(false);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={setRef} id={id} className={cn("reveal", pending && "reveal-pending", className)}>
      {children}
    </Tag>
  );
}

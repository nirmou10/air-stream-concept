export function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center rounded-2xl border border-dashed border-steel/50 bg-steel/10 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 text-steel/60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-4.5-4.5L6 21" />
      </svg>
    </div>
  );
}

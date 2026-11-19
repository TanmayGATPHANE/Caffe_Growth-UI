import Link from "next/link";
import { ChevronRight, X } from "lucide-react";

export function ToolCard({
  icon: Icon, title, desc, href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  title: string;
  desc: string;
  href: string;
}) {
  const locked = href === "#";
  const body = (
    <div
      title={locked ? "Not available in this demo" : undefined}
      className={`group flex h-full items-start gap-3 rounded-lg border border-[#E8E4DB] bg-white p-4  ${
        locked
          ? "cursor-not-allowed"
          : "transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_10px_rgba(26,46,53,0.07)] hover:border-[#D6D1C4]"
      }`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#E4EEF0] text-[#0A6470]">
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1a2e35]">
          {title}
          {locked && <X size={13} className="shrink-0 text-[#8a8474]" />}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-snug text-[#8a8474]">{desc}</p>
      </div>
      {locked ? (
        <X size={14} className="mt-1 shrink-0 text-[#D0D5DD]" />
      ) : (
        <ChevronRight
          size={14}
          className="mt-1 shrink-0 text-[#D0D5DD] transition-transform group-hover:translate-x-0.5"
        />
      )}
    </div>
  );
  return locked ? <div>{body}</div> : <Link href={href}>{body}</Link>;
}

export function ToolGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

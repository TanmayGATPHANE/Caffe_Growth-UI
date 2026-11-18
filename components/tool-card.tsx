"use client";

import Link from "next/link";
import { ChevronRight, Hammer } from "lucide-react";

export function ToolCard({
  icon: Icon, title, desc, tag, href, status = "working" as "working" | "stub",
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  tag?: string;
  href: string;
  status?: "working" | "stub";
}) {
  const body = (
    <div className="group flex h-full items-start gap-3 rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb] p-4 shadow-[0_1px_2px_rgba(11,11,11,0.04)] transition-all enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_4px_12px_rgba(11,11,11,0.08)] hover:border-[#c3c2b7]">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#eaf2fc] text-[#184f95]">
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-[#0b0b0b]">
          {title}
          {status === "stub" && (
            <span className="rounded-full bg-[#f0efec] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#898781]">
              stub
            </span>
          )}
          {tag && (
            <span className="rounded-full bg-[#eaf7ea] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#006300]">
              {tag}
            </span>
          )}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-snug text-[#898781]">{desc}</p>
      </div>
      <ChevronRight
        size={14}
        className="mt-1 shrink-0 text-[#c3c2b7] transition-transform group-hover:translate-x-0.5"
      />
    </div>
  );
  return href.startsWith("#") ? <div className="opacity-55">{body}</div> : <Link href={href}>{body}</Link>;
}

export function ToolGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

import { context } from "@/lib/data";

export default function PageHeader({
  title, subtitle, children,
}: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-[#0b0b0b]">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[13px] text-[#52514e]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2.5">
        {children}
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e0d9] bg-white px-2.5 py-1.5 text-[11px] text-[#52514e]">
          NAV date · {context.navDate}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e0d9] bg-white px-2.5 py-1.5 text-[11px] text-[#52514e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0ca30c]" />
          Data as of {context.dataAsOf.split("·")[1]?.trim()}
        </span>
      </div>
    </header>
  );
}

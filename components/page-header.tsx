import { context } from "@/lib/data";

export default function PageHeader({
  title, subtitle, children,
}: { title: string; subtitle?: string; children?: React.ReactNode }) {
  const [navDate, stamp] = [context.navDate, context.dataAsOf.split(" · ")[1]];
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#E8E4DB] pb-4">
      <div>
        <h1 className="font-display text-[22px] font-medium leading-tight text-[#1A2E35]">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[12.5px] text-[#8A8474]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {children}
        <span className="text-[11px] text-[#8A8474]">
          NAV {navDate} — data through {stamp}
        </span>
      </div>
    </header>
  );
}

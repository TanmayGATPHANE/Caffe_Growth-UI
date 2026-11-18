"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Contact, Search, Shield, PieChart, ArrowLeftRight,
  Target, BarChart3, Gauge, Wallet, Database, Mail, LayoutGrid, Leaf,
} from "lucide-react";
import { sidebarGroups, user } from "@/lib/data";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  layout: LayoutDashboard, users: Users, contact: Contact, search: Search,
  shield: Shield, pie: PieChart, swap: ArrowLeftRight, target: Target,
  chart: BarChart3, gauge: Gauge, wallet: Wallet, database: Database,
  mail: Mail, grid: LayoutGrid,
};

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 flex-col bg-[#fcfcfb] lg:flex">
      <div className="flex items-center gap-2.5 px-5 pb-2 pt-5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-b from-[#143a6b] to-[#0f7a3d] text-white">
          <Leaf size={16} />
        </span>
        <div>
          <p className="text-[15px] font-semibold leading-tight text-[#0b0b0b]">GrowthCafe</p>
          <p className="text-[10px] text-[#898781]">MFD console · demo</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {sidebarGroups.map((g) => (
          <div key={g.group} className="mb-4">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-[#898781]">{g.group}</p>
            <ul className="space-y-0.5">
              {g.items.map((item) => {
                const Icon = icons[item.icon];
                const active = item.href === pathname;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                        active
                          ? "bg-[#eaf2fc] font-medium text-[#184f95]"
                          : "text-[#52514e] hover:bg-[#f0efec]"
                      }`}
                    >
                      {Icon && <Icon size={15} className={active ? "text-[#184f95]" : "text-[#898781]"} />}
                      <span className="flex-1">{item.label}</span>
                      {item.soon && (
                        <span className="rounded-full bg-[#f0efec] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-[#898781]">
                          soon
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mx-3 mb-4 rounded-xl border border-[#e1e0d9] bg-white p-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#143a6b] text-[11px] font-bold text-white">
            {user.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium text-[#0b0b0b]">{user.name}</p>
            <p className="text-[10px] text-[#898781]">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

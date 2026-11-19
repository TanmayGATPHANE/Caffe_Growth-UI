"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Contact, Search, Shield, PieChart, ArrowLeftRight,
  Target, BarChart3, Gauge, Wallet, Database, Mail, LayoutGrid, X, Leaf,
} from "lucide-react";
import { sidebarGroups, user } from "@/lib/data";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  layout: LayoutDashboard, users: Users, contact: Contact, search: Search,
  shield: Shield, pie: PieChart, swap: ArrowLeftRight, target: Target,
  chart: BarChart3, gauge: Gauge, wallet: Wallet, database: Database,
  mail: Mail, grid: LayoutGrid,
};

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-[#E8E4DB] bg-[#F4F2EC] lg:flex">
      <div className="border-b border-[#E8E4DB] px-5 pb-4 pt-6">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[#0A7E8A] text-white">
            <Leaf size={15} />
          </span>
          <div>
            <p className="font-display text-[17px] font-medium leading-none text-[#1A2E35]">GrowthCafe</p>
            <p className="mt-1 text-[10px] text-[#8A8474]">LLP · broker console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {sidebarGroups.map((g) => (
          <div key={g.group} className="mb-5">
            <p className="mb-1 px-2 text-[10.5px] font-medium text-[#8A8474]">{g.group}</p>
            <ul>
              {g.items.map((item) => {
                const Icon = icons[item.icon];
                const active = item.href === pathname;
                return (
                  <li key={item.label}>
                    {item.href === "#" ? (
                      <span
                        title="Not in this demo"
                        className="flex cursor-not-allowed items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] text-[#C9C2B2]"
                      >
                        {Icon && <Icon size={15} />}
                        <span className="flex-1">{item.label}</span>
                        <X size={12} />
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] ${
                          active
                            ? "bg-[#EDEBE1] font-medium text-[#1A2E35] before:absolute before:inset-y-1 before:left-0 before:w-[2.5px] before:rounded-full before:bg-[#0A7E8A]"
                            : "text-[#525148] hover:bg-[#EDEBE1]"
                        }`}
                      >
                        {Icon && <Icon size={15} className={active ? "text-[#0A7E8A]" : "text-[#8A8474]"} />}
                        <span className="flex-1">{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#E8E4DB] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1A2E35] text-[10.5px] font-medium text-white">
            {user.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-medium text-[#1A2E35]">{user.name}</p>
            <p className="text-[10.5px] text-[#8A8474]">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

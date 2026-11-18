"use client";

import {
  PieChart, ArrowLeftRight, Shield, TrendingUp, Target, UserRound,
  Flame, Plus, Repeat, CircleAlert, Scale, Search, Users, CalendarClock,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { ToolCard, ToolGrid } from "@/components/tool-card";
import { analyticsReports } from "@/lib/data";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  pie: PieChart, swap: ArrowLeftRight, shield: Shield, trending: TrendingUp,
  target: Target, user: UserRound, flame: Flame, plus: Plus, repeat: Repeat,
  alert: CircleAlert, scale: Scale, search: Search, users: Users, clock: CalendarClock,
};

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader
          title="Business Analytics"
          subtitle="16 parameter-driven reports over your book — every card opens a filter + results screen when the API lands."
        />
        <ToolGrid>
          {analyticsReports.map((r) => {
            const Icon = icons[r.icon] ?? PieChart;
            return (
              <ToolCard
                key={r.title}
                icon={Icon}
                title={r.title}
                desc={r.desc}
                href="#"
                status="stub"
              />
            );
          })}
        </ToolGrid>
        <p className="mt-4 text-center text-[11px] text-[#898781]">
          AUM Reports & Cash Flow were verified live in the original — their exact filters are in wiki §3.8.
        </p>
      </div>
    </div>
  );
}

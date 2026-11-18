"use client";

import {
  ShieldCheck, Undo2, Copy, Plus, Clock3,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { ToolCard, ToolGrid } from "@/components/tool-card";
import { dataMgmtTools } from "@/lib/data";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  check: ShieldCheck, undo: Undo2, copy: Copy, plus: Plus, clock: Clock3,
};

export default function DataManagementPage() {
  return (
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader
          title="Data Management"
          subtitle="Housekeeping tools — write actions are gated behind admin role + full audit logging."
        />
        <ToolGrid>
          {dataMgmtTools.map((t) => {
            const Icon = icons[t.icon] ?? ShieldCheck;
            return (
              <ToolCard
                key={t.title}
                icon={Icon}
                title={t.title}
                desc={t.desc}
                href="#"
                status="stub"
              />
            );
          })}
        </ToolGrid>
        <div className="mt-4 rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb] p-4 text-[11.5px] leading-relaxed text-[#898781]">
          <span className="font-semibold text-[#52514e]">Guardrails in the build:</span> duplicate merge and
          transaction edits run against the staging schema first, write to the tenant database only after
          control totals pass, and every mutation lands in <span className="font-medium text-[#52514e]">audit_log</span> (⚡
          in wiki §3.9).
        </div>
      </div>
    </div>
  );
}

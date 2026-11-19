import {
  ShieldCheck, Undo2, Copy, Plus, Clock3,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { ToolCard, ToolGrid } from "@/components/tool-card";
import { dataMgmtTools } from "@/lib/data";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  check: ShieldCheck, undo: Undo2, copy: Copy, plus: Plus, clock: Clock3,
};

export default function DataManagementPage() {
  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
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
              />
            );
          })}
        </ToolGrid>
      </div>
    </div>
  );
}

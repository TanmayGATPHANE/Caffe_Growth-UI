import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { ToolCard, ToolGrid } from "@/components/tool-card";
import { utilityTools } from "@/lib/data";
import {
  Flame, ListTodo, Target, Calculator, ClipboardList, Globe2, Scale, Filter, Tags,
} from "lucide-react";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  flame: Flame, list: ListTodo, target: Target, calc: Calculator,
  clipboard: ClipboardList, globe: Globe2, scale: Scale, filter: Filter, tags: Tags,
};

export default function UtilitiesPage() {
  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader
          title="Utilities"
          subtitle="Nine tools for day-to-day practice work."
        />
        <ToolGrid>
          {utilityTools.map((t) => {
            const Icon = icons[t.icon] ?? Calculator;
            return (
              <ToolCard
                key={t.title}
                icon={Icon}
                title={t.title}
                desc={t.desc}
                href={t.href}
              />
            );
          })}
        </ToolGrid>
      </div>
    </div>
  );
}

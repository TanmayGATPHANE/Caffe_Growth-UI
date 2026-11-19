import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import {
  StatTiles, LedgerHero, AssetMix, NetFlows, LedgerSideColumn,
} from "@/components/dashboard-cards";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:px-8">
        <PageHeader title="Dashboard" subtitle="November book and what needs you today." />

        <div className="space-y-8">
          <LedgerHero />
          <StatTiles />

          <div className="grid gap-px border border-[#E8E4DB] bg-[#E8E4DB] xl:grid-cols-12">
            <div className="bg-white xl:col-span-7"><AssetMix /></div>
            <div className="bg-white border-t xl:border-t-0 xl:border-l border-[#E8E4DB] xl:col-span-5"><LedgerSideColumn /></div>
          </div>
          <NetFlows />
        </div>
      </div>
    </div>
  );
}

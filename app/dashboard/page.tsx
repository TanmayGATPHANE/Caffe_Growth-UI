import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import {
  StatTiles, AssetMix, NetFlows, DataQuality, AlertsCard, QuickReport,
} from "@/components/dashboard-cards";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8" style={{ maxWidth: "calc(100% - 15rem)" }}>
        <PageHeader
          title="Good afternoon, Shubham"
          subtitle="Here's where your book stands right now."
        />

        <div className="space-y-4">
          <StatTiles />
          <QuickReport />

          <div className="grid gap-4 xl:grid-cols-12">
            <div className="xl:col-span-7"><AssetMix /></div>
            <div className="xl:col-span-5"><DataQuality /></div>
            <div className="xl:col-span-7"><NetFlows /></div>
            <div className="xl:col-span-5"><AlertsCard /></div>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-[#898781]">
          Static demo · mock data · charts follow a CVD-validated palette with direct labels
        </p>
      </div>
    </div>
  );
}

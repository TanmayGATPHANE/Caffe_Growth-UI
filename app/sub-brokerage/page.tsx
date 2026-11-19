import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { TrendingUp, Undo2, Wallet, Flame, Download, X } from "lucide-react";
import { brokerage } from "@/lib/data";

const tiles = [
  { icon: TrendingUp, label: "Earned (Nov MTD)", value: brokerage.earned },
  { icon: Undo2, label: "Clawbacks", value: brokerage.clawback },
  { icon: Wallet, label: "Net brokerage", value: brokerage.net },
  { icon: Flame, label: "Top earner", value: brokerage.topScheme },
];

const X_ = X;
export default function SubBrokeragePage() {
  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader title="Sub Brokerage" subtitle="Process month 11/2026 · demo figures">
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white px-3 py-2 text-[12px] text-[#525148] disabled:cursor-not-allowed disabled:bg-[#F1EEE7] disabled:text-[#8a8474]"
          >
            <Download size={13} /> Download PDF <X size={11} className="opacity-50" />
          </button>
        </PageHeader>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-lg border border-[#E8E4DB] bg-white p-4 ">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E4EEF0] text-[#0A6470]">
                <t.icon size={15} />
              </span>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-[#8a8474]">{t.label}</p>
              <p className="mt-0.5 text-[22px] font-semibold leading-none text-[#1a2e35]">{t.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-[#E8E4DB] bg-white">
          <div className="border-b border-[#E8E4DB] bg-[#FAF9F6] px-4 py-2.5 text-[12px] font-semibold text-[#1a2e35]">
            Scheme-wise brokerage
          </div>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#E8E4DB] text-left text-[11px] uppercase tracking-wide text-[#8a8474]">
                {["Scheme", "Gross", "Clawback", "Net", "Share"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 font-medium ${i === 4 ? "w-28" : i > 0 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec] bg-white">
              {brokerage.rows.map((r, i) => (
                <tr key={r.scheme} className={`hover:bg-[#F4F2EC] ${i % 2 ? "bg-[#F4F2EC]/60" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[#1a2e35]">{r.scheme}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#525148]">{r.gross}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#525148]">{r.claw}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-[#1a2e35]">{r.net}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 flex-1 rounded-full bg-[#F4F2EC]">
                        <span className="block h-full rounded-full" style={{ width: `${r.share}%`, background: "#0588A3" }} />
                      </span>
                      <span className="w-9 text-right text-[11px] text-[#8a8474] tabular-nums">{r.share}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

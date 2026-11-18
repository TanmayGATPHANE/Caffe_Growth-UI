"use client";

import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { TrendingUp, Undo2, Wallet, Flame, Download } from "lucide-react";
import { brokerage } from "@/lib/data";

const tiles = [
  { icon: TrendingUp, label: "Earned (Nov MTD)", value: brokerage.earned },
  { icon: Undo2, label: "Clawbacks", value: brokerage.clawback },
  { icon: Wallet, label: "Net brokerage", value: brokerage.net },
  { icon: Flame, label: "Top earner", value: brokerage.topScheme },
];

export default function SubBrokeragePage() {
  return (
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader title="Sub Brokerage" subtitle="Process month 11/2026 · demo figures">
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2 text-[12px] text-[#52514e] disabled:opacity-45"
          >
            <Download size={13} /> Download PDF · soon
          </button>
        </PageHeader>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb] p-4 shadow-[0_1px_2px_rgba(11,11,11,0.04)]">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf2fc] text-[#184f95]">
                <t.icon size={15} />
              </span>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-[#898781]">{t.label}</p>
              <p className="mt-0.5 text-[22px] font-semibold leading-none text-[#0b0b0b]">{t.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb]">
          <div className="border-b border-[#e1e0d9] bg-[#f9f9f7] px-4 py-2.5 text-[12px] font-semibold text-[#0b0b0b]">
            Scheme-wise brokerage
          </div>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#e1e0d9] text-left text-[11px] uppercase tracking-wide text-[#898781]">
                {["Scheme", "Gross", "Clawback", "Net", "Share"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 font-medium ${i === 4 ? "w-28" : i > 0 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec] bg-white">
              {brokerage.rows.map((r, i) => (
                <tr key={r.scheme} className={`hover:bg-[#faf9f5] ${i % 2 ? "bg-[#faf9f5]/60" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[#0b0b0b]">{r.scheme}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#52514e]">{r.gross}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#52514e]">{r.claw}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-[#0b0b0b]">{r.net}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 flex-1 rounded-full bg-[#f0efec]">
                        <span className="block h-full rounded-full" style={{ width: `${r.share}%`, background: "#2a78d6" }} />
                      </span>
                      <span className="w-9 text-right text-[11px] text-[#898781] tabular-nums">{r.share}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-[#898781]">
          Report types (fund / scheme / category / transaction / family head / client) and the clawback filter ship with the API — wiki §3.12.
        </p>
      </div>
    </div>
  );
}

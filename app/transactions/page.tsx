"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { Download, Search } from "lucide-react";
import { transactions, categoryColors } from "@/lib/data";

const types = ["All", "Purchase", "SIP", "Redemption", "Switch In", "Dividend"];

export default function TransactionsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const rows = useMemo(
    () =>
      transactions.filter(
        (t) =>
          (type === "All" || t.type === type) &&
          (t.investor + t.scheme + t.type).toLowerCase().includes(q.toLowerCase()),
      ),
    [q, type],
  );

  return (
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader title="Transactions" subtitle="Every transaction in your book · demo data">
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2 text-[12px] text-[#52514e] disabled:opacity-45"
          >
            <Download size={13} /> Export XLS · soon
          </button>
        </PageHeader>

        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2">
            <Search size={13} className="text-[#898781]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search investor, scheme…"
              className="w-52 bg-transparent text-[12px] outline-none placeholder:text-[#898781]"
            />
          </span>
          <div className="flex gap-1 rounded-lg border border-[#e1e0d9] bg-white p-1">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-md px-2.5 py-1.5 text-[11.5px] font-medium transition-colors ${
                  type === t ? "bg-[#eaf2fc] text-[#184f95]" : "text-[#52514e] hover:bg-[#f0efec]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="ml-auto text-[11px] text-[#898781]">{rows.length} of {transactions.length} transactions</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb]">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#e1e0d9] bg-[#f9f9f7] text-left text-[11px] uppercase tracking-wide text-[#898781]">
                {["Date", "Investor", "Scheme", "Category", "Type", "Units", "Amount"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 font-medium ${i === 6 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec]">
              {rows.map((t, i) => (
                <tr key={i} className="bg-white hover:bg-[#faf9f5]">
                  <td className="whitespace-nowrap px-4 py-3 text-[#898781]">{t.date}</td>
                  <td className="px-4 py-3 font-medium text-[#0b0b0b]">{t.investor}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-[#52514e]">{t.scheme}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[#52514e]">
                      <span className="h-2 w-2 rounded-full" style={{ background: categoryColors[t.category] }} />
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#f0efec] px-2 py-0.5 text-[10.5px] text-[#52514e]">{t.type}</span>
                  </td>
                  <td className={`px-4 py-3 text-right tabular-nums ${t.units < 0 ? "text-[#a02625]" : "text-[#52514e]"}`}>
                    {t.units !== 0 ? Math.abs(t.units).toFixed(2) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[#0b0b0b] tabular-nums">
                    ₹ {t.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p className="px-4 py-10 text-center text-[12.5px] text-[#898781]">No transactions match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

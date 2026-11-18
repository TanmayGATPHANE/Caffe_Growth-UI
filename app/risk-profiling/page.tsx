"use client";

import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { Send, FileSpreadsheet } from "lucide-react";
import { riskPipeline, riskSubmissions } from "@/lib/data";

export default function RiskProfilingPage(){
  return (
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader title="Risk Profiling" subtitle="Questionnaire pipelines & submissions (demo data)">
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2 text-[12px] text-[#52514e] disabled:opacity-45"
          >
            <FileSpreadsheet size={13} /> Export XLS · soon
          </button>
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#143a6b] px-3 py-2 text-[12px] font-medium text-white disabled:opacity-40"
          >
            <Send size={13} /> Send link
          </button>
        </PageHeader>

        {/* pipeline */}
        <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {riskPipeline.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb] p-4 shadow-[0_1px_2px_rgba(11,11,11,0.04)]"
              style={p.state === "good" ? { borderColor: "#bfe5bf" } : p.state === "info" ? { borderColor: "#b7d3f6" } : undefined}
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#898781]">{p.label}</p>
              <p className="mt-1 text-[28px] font-semibold leading-none text-[#0b0b0b] tabular-nums">{p.count}</p>
            </div>
          ))}
        </div>

        {/* submissions */}
        <div className="overflow-hidden rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb]">
          <div className="border-b border-[#e1e0d9] bg-[#f9f9f7] px-4 py-2.5 text-[12px] font-semibold text-[#0b0b0b]">
            Submissions
          </div>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#e1e0d9] text-left text-[11px] uppercase tracking-wide text-[#898781]">
                {["Date of submission", "Investor", "Risk category", "Suggested", "Valid until", "AUM"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 font-medium ${i === 5 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec] bg-white">
              {riskSubmissions.map((s, i) => (
                <tr key={i} className="hover:bg-[#faf9f5]">
                  <td className="px-4 py-3 text-[#898781]">{s.date}</td>
                  <td className="px-4 py-3 font-medium text-[#0b0b0b]">{s.investor}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#eaf2fc] px-2 py-0.5 text-[10.5px] font-medium text-[#184f95]">{s.category}</span>
                  </td>
                  <td className="px-4 py-3 text-[#52514e]">{s.suggested}</td>
                  <td className="px-4 py-3 text-[#52514e]">{s.validTill}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-[#0b0b0b]">
                    ₹ {s.aum.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-[#898781]">
          “Send link” emails a public questionnaire (tokenized, expires); responses land via the scoring engine — wiki §3.11.
        </p>
      </div>
    </div>
  );
}

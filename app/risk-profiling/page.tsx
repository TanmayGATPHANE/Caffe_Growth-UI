import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { Send, FileSpreadsheet, X } from "lucide-react";
import { riskPipeline, riskSubmissions } from "@/lib/data";

export default function RiskProfilingPage(){
  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader title="Risk Profiling" subtitle="Questionnaire pipelines & submissions (demo data)">
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white px-3 py-2 text-[12px] text-[#525148] disabled:cursor-not-allowed disabled:bg-[#F1EEE7] disabled:text-[#8a8474]"
          >
            <FileSpreadsheet size={13} /> Export XLS <X size={11} className="opacity-50" />
          </button>
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A7E8A] px-3 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:bg-[#F1EEE7] disabled:text-[#8a8474]"
          >
            <Send size={13} /> Send link <X size={11} className="opacity-50" />
          </button>
        </PageHeader>

        {/* pipeline */}
        <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {riskPipeline.map((p) => (
            <div
              key={p.label}
              className="rounded-lg border border-[#E8E4DB] bg-white p-4 "
              style={p.state === "good" ? { borderColor: "#bfe5bf" } : p.state === "info" ? { borderColor: "#b7d3f6" } : undefined}
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a8474]">{p.label}</p>
              <p className="mt-1 text-[28px] font-semibold leading-none text-[#1a2e35] tabular-nums">{p.count}</p>
            </div>
          ))}
        </div>

        {/* submissions */}
        <div className="overflow-hidden rounded-lg border border-[#E8E4DB] bg-white">
          <div className="border-b border-[#E8E4DB] bg-[#FAF9F6] px-4 py-2.5 text-[12px] font-semibold text-[#1a2e35]">
            Submissions
          </div>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#E8E4DB] text-left text-[11px] uppercase tracking-wide text-[#8a8474]">
                {["Date of submission", "Investor", "Risk category", "Suggested", "Valid until", "AUM"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 font-medium ${i === 5 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec] bg-white">
              {riskSubmissions.map((s, i) => (
                <tr key={i} className="hover:bg-[#F4F2EC]">
                  <td className="px-4 py-3 text-[#8a8474]">{s.date}</td>
                  <td className="px-4 py-3 font-medium text-[#1a2e35]">{s.investor}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#E4EEF0] px-2 py-0.5 text-[10.5px] font-medium text-[#0A6470]">{s.category}</span>
                  </td>
                  <td className="px-4 py-3 text-[#525148]">{s.suggested}</td>
                  <td className="px-4 py-3 text-[#525148]">{s.validTill}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-[#1a2e35]">
                    ₹ {s.aum.toLocaleString("en-IN")}
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

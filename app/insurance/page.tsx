"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { ShieldCheck, Clock3, Upload, Plus, X } from "lucide-react";
import { policies } from "@/lib/data";

export default function InsurancePage() {
  const [tab, setTab] = useState<"life" | "general">("life");
  const rows = tab === "life" ? policies.life : policies.general;

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader title="Insurance" subtitle="Policies held by your investors (demo register)">
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white px-3 py-2 text-[12px] text-[#525148] disabled:cursor-not-allowed disabled:bg-[#F1EEE7] disabled:text-[#8a8474]"
          >
            <Upload size={13} /> Bulk upload <X size={11} className="opacity-50" />
          </button>
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A7E8A] px-3 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:bg-[#F1EEE7] disabled:text-[#8a8474]"
          >
            <Plus size={13} /> Add policy <X size={11} className="opacity-50" />
          </button>
        </PageHeader>

        <div className="mb-4 inline-flex gap-1 rounded-lg border border-[#E8E4DB] bg-white p-1">
          {([["life", "Life insurance", policies.life.length], ["general", "General insurance", policies.general.length]] as const).map(
            ([key, label, n]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-md px-3.5 py-1.5 text-[11.5px] font-medium ${
                  tab === key ? "bg-[#E4EEF0] text-[#0A6470]" : "text-[#525148] hover:bg-[#F4F2EC]"
                }`}
              >
                {label} <span className="tabular-nums text-[#8a8474]">· {n}</span>
              </button>
            ),
          )}
        </div>

        <div className="overflow-hidden rounded-lg border border-[#E8E4DB] bg-white">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#E8E4DB] bg-[#FAF9F6] text-left text-[11px] uppercase tracking-wide text-[#8a8474]">
                {["Policy holder", "Insurer", "Policy no.", "Premium", "Sum assured", "Next renewal", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec]">
              {rows.map((p, i) => (
                <tr key={i} className={`bg-white hover:bg-[#F4F2EC] ${i % 2 ? "bg-[#F4F2EC]/60" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[#1a2e35]">{p.holder}</td>
                  <td className="px-4 py-3 text-[#525148]">{p.insurer}</td>
                  <td className="px-4 py-3 tabular-nums text-[#525148]">{p.policy}</td>
                  <td className="px-4 py-3 tabular-nums text-[#525148]">{p.premium}</td>
                  <td className="px-4 py-3 tabular-nums text-[#1a2e35]">{p.assured}</td>
                  <td className="px-4 py-3 text-[#525148]">{p.renewal}</td>
                  <td className="px-4 py-3">
                    {p.status === "Active" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#ecf7ef] px-2 py-0.5 text-[10.5px] font-medium text-[#1B7A46]">
                        <ShieldCheck size={11} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#F7EFE2] px-2 py-0.5 text-[10.5px] font-medium text-[#8A6A2E]">
                        <Clock3 size={11} /> Renewal due
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p className="px-4 py-10 text-center text-[12.5px] text-[#8a8474]">No {tab} policies registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

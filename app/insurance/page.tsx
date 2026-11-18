"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { ShieldCheck, Clock3, Upload, Plus } from "lucide-react";
import { policies } from "@/lib/data";

export default function InsurancePage() {
  const [tab, setTab] = useState<"life" | "general">("life");
  const rows = tab === "life" ? policies.life : policies.general;

  return (
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader title="Insurance" subtitle="Policies held by your investors (demo register)">
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2 text-[12px] text-[#52514e] disabled:opacity-45"
          >
            <Upload size={13} /> Bulk upload · soon
          </button>
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#143a6b] px-3 py-2 text-[12px] font-medium text-white disabled:opacity-40"
          >
            <Plus size={13} /> Add policy
          </button>
        </PageHeader>

        <div className="mb-4 inline-flex gap-1 rounded-lg border border-[#e1e0d9] bg-white p-1">
          {([["life", "Life insurance", policies.life.length], ["general", "General insurance", policies.general.length]] as const).map(
            ([key, label, n]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-md px-3.5 py-1.5 text-[11.5px] font-medium ${
                  tab === key ? "bg-[#eaf2fc] text-[#184f95]" : "text-[#52514e] hover:bg-[#f0efec]"
                }`}
              >
                {label} <span className="tabular-nums text-[#898781]">· {n}</span>
              </button>
            ),
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb]">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#e1e0d9] bg-[#f9f9f7] text-left text-[11px] uppercase tracking-wide text-[#898781]">
                {["Policy holder", "Insurer", "Policy no.", "Premium", "Sum assured", "Next renewal", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec]">
              {rows.map((p, i) => (
                <tr key={i} className={`bg-white hover:bg-[#faf9f5] ${i % 2 ? "bg-[#faf9f5]/60" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[#0b0b0b]">{p.holder}</td>
                  <td className="px-4 py-3 text-[#52514e]">{p.insurer}</td>
                  <td className="px-4 py-3 tabular-nums text-[#52514e]">{p.policy}</td>
                  <td className="px-4 py-3 tabular-nums text-[#52514e]">{p.premium}</td>
                  <td className="px-4 py-3 tabular-nums text-[#0b0b0b]">{p.assured}</td>
                  <td className="px-4 py-3 text-[#52514e]">{p.renewal}</td>
                  <td className="px-4 py-3">
                    {p.status === "Active" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf7ea] px-2 py-0.5 text-[10.5px] font-medium text-[#006300]">
                        <ShieldCheck size={11} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#fdf3dc] px-2 py-0.5 text-[10.5px] font-medium text-[#86660a]">
                        <Clock3 size={11} /> Renewal due
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p className="px-4 py-10 text-center text-[12.5px] text-[#898781]">No {tab} policies registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { ShieldCheck, ChevronLeft, Search } from "lucide-react";
import { folios } from "@/lib/data";

export default function FolioLookupPage() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<"brief" | "detail">("brief");
  const rows = useMemo(
    () => folios.filter((f) => (f.folio + f.investor + f.scheme + f.fund).toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <Link href="/dashboard" className="mb-3 inline-flex items-center gap-1 text-[12px] text-[#898781] hover:text-[#184f95]">
          <ChevronLeft size={13} /> Dashboard
        </Link>
        <PageHeader title="Folio Lookup" subtitle="Search folios from RTA records (demo shows 3 of your 6 folios)" />

        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2">
            <Search size={13} className="text-[#898781]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Folio no, applicant, scheme…"
              className="w-64 bg-transparent text-[12px] outline-none placeholder:text-[#898781]"
            />
          </span>
          <div className="flex gap-1 rounded-lg border border-[#e1e0d9] bg-white p-1">
            {(["brief", "detail"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-3 py-1.5 text-[11.5px] font-medium capitalize ${
                  view === v ? "bg-[#eaf2fc] text-[#184f95]" : "text-[#52514e] hover:bg-[#f0efec]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb]">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#e1e0d9] bg-[#f9f9f7] text-left text-[11px] uppercase tracking-wide text-[#898781]">
                {["Folio no.", "Applicant", view === "detail" ? "Fund & scheme" : "Fund", "Units", "Value on NAV date", "Status"].map((h, i) => (
                  <th key={h} className={`px-4 py-3 font-medium ${i >= 3 && i <= 4 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec]">
              {rows.map((f) => (
                <tr key={f.folio} className="bg-white hover:bg-[#faf9f5]">
                  <td className="px-4 py-3 font-medium text-[#0b0b0b]">{f.folio}</td>
                  <td className="px-4 py-3 text-[#52514e]">{f.investor}</td>
                  <td className="px-4 py-3 text-[#52514e]">{view === "detail" ? `${f.fund} · ${f.scheme}` : f.fund}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#52514e]">{f.units.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-[#0b0b0b]">
                    ₹ {f.value.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf7ea] px-2 py-0.5 text-[10.5px] font-medium text-[#006300]">
                      <ShieldCheck size={11} /> {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p className="px-4 py-10 text-center text-[12.5px] text-[#898781]">No folios match “{q}”.</p>
          )}
        </div>
        <p className="mt-3 text-[11px] text-[#898781]">
          Detail view adds scheme rows per folio — same pattern as the wire-up spec in wiki §3.4.
        </p>
      </div>
    </div>
  );
}

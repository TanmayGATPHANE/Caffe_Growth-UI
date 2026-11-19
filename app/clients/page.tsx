"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { UserRoundPlus, Search, ShieldCheck, Clock3, X } from "lucide-react";
import { clients } from "@/lib/data";

const inr = (n: number) => n.toLocaleString("en-IN");

export default function ClientsPage() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => clients.filter((c) => (c.name + c.email + c.pan).toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  const totalAum = clients.reduce((s, c) => s + c.aum, 0);

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <PageHeader
          title="Clients"
          subtitle={`${clients.length} investors · total AUM ₹ ${inr(totalAum)} on the current NAV date`}
        >
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A7E8A] px-3 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:bg-[#F1EEE7] disabled:text-[#8a8474]"
          >
            <UserRoundPlus size={14} /> New investor <X size={11} className="opacity-50" />
          </button>
        </PageHeader>

        {/* chips + search row */}
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white px-2.5 py-1.5 text-[11.5px] text-[#525148]">
            All clients <span className="font-semibold text-[#1a2e35] tabular-nums">4</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white px-2.5 py-1.5 text-[11.5px] text-[#525148]">
            Family heads <span className="font-semibold text-[#1a2e35] tabular-nums">2</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white px-2.5 py-1.5 text-[11.5px] text-[#525148]">
            Invite pending <span className="font-semibold text-[#1a2e35] tabular-nums">2</span>
          </span>
          <span className="ml-auto inline-flex items-center gap-2 rounded-lg border border-[#E8E4DB] bg-white px-3 py-1.5">
            <Search size={13} className="text-[#8a8474]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, PAN, email…"
              className="w-56 bg-transparent text-[12px] outline-none placeholder:text-[#8a8474]"
            />
          </span>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-lg border border-[#E8E4DB] bg-white ">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#E8E4DB] bg-[#FAF9F6] text-left text-[11px] uppercase tracking-wide text-[#8a8474]">
                <th className="px-4 py-3 font-medium">Investor</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Family</th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">PAN</th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">Mobile</th>
                <th className="px-4 py-3 text-right font-medium">AUM</th>
                <th className="hidden px-4 py-3 font-medium xl:table-cell">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Invite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0efec]">
              {rows.map((c) => (
                <tr key={c.pan} className="group bg-white transition-colors hover:bg-[#F4F2EC]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E4EEF0] text-[10px] font-bold text-[#0A6470]">
                        {c.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-[#1a2e35]">{c.name}</p>
                        <p className="truncate text-[11px] text-[#8a8474]">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-[#525148] md:table-cell">{c.family}</td>
                  <td className="hidden px-4 py-3 text-[#525148] tabular-nums lg:table-cell">{c.pan}</td>
                  <td className="hidden px-4 py-3 text-[#525148] lg:table-cell">{c.mobile}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#1a2e35] tabular-nums">{inr(c.aum)}</td>
                  <td className="hidden px-4 py-3 xl:table-cell">
                    <span className="rounded-full bg-[#F4F2EC] px-2 py-0.5 text-[10.5px] text-[#525148]">{c.source}</span>
                  </td>
                  {/* status: icon + label, never color alone */}
                  <td className="px-4 py-3">
                    {c.status === "Active" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#ecf7ef] px-2 py-0.5 text-[10.5px] font-medium text-[#1B7A46]">
                        <ShieldCheck size={11} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#F7EFE2] px-2 py-0.5 text-[10.5px] font-medium text-[#8A6A2E]">
                        <Clock3 size={11} /> Invite pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      disabled={c.status === "Active"}
                      className="rounded-lg border border-[#E8E4DB] px-2.5 py-1.5 text-[11px] font-medium text-[#0A6470] enabled:hover:bg-[#E4EEF0] disabled:cursor-not-allowed disabled:border-[#E8E4DB] disabled:text-[#8a8474] disabled:bg-[#F4F2EC]"
                    >
                      {c.status === "Active" ? "Invited ✓" : "Send invite"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p className="px-4 py-10 text-center text-[12.5px] text-[#8a8474]">No investors match “{q}”.</p>
          )}
        </div>
      </div>
    </div>
  );
}

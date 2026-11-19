"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { FileText, Mail, MessageCircle, ChevronLeft, Check, GripVertical, X } from "lucide-react";

const sections = [
  "Executive Summary", "Asset Analysis", "Holding Analysis", "Investment Snapshot",
  "Portfolio Summary", "Unrealized Capital Gain", "Transaction Statement", "Folio Details",
];

export default function PortfolioPage() {
  const [byClient, setByClient] = useState(true); // false = family head
  const [selected, setSelected] = useState<string[]>(sections);
  const [products, setProducts] = useState<string[]>(["Mutual Fund", "Shares & Bonds", "Fixed Income", "Other Assets"]);

  const toggle = (list: string[], set: (v: string[]) => void, item: string) =>
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  const move = (i: number, dir: -1 | 1) => {
    const next = [...selected];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setSelected(next);
  };

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <Link href="/dashboard" className="mb-3 inline-flex items-center gap-1 text-[12px] text-[#8a8474] hover:text-[#0A6470]">
          <ChevronLeft size={13} /> Dashboard
        </Link>
        <PageHeader title="Comprehensive Portfolio" subtitle="Build the client-facing comprehensive report." />

        <div className="grid gap-4 xl:grid-cols-12">
          {/* configurator */}
          <div className="space-y-4 xl:col-span-7">
            <div className="rounded-lg border border-[#E8E4DB] bg-white p-5">
              <p className="text-[13px] font-semibold text-[#1a2e35]">1 · Whose portfolio?</p>
              <div className="mt-3 inline-flex gap-1 rounded-lg border border-[#E8E4DB] bg-white p-1">
                {([["client", "Client"], ["client", "Family head"]] as const).map(([, label], idx) => (
                  <button
                    key={label}
                    onClick={() => setByClient(idx === 0)}
                    className={`rounded-md px-3.5 py-1.5 text-[11.5px] font-medium ${
                      byClient === (idx === 0) ? "bg-[#E4EEF0] text-[#0A6470]" : "text-[#525148] hover:bg-[#F4F2EC]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 inline-flex w-full items-center gap-2 rounded-lg border border-[#E8E4DB] bg-white px-3 py-2 text-[12px] text-[#8a8474]">
                🔍 Select an investor (dropdown wired to /clients after API)
              </div>
              <p className="mt-3 text-[11.5px] text-[#8a8474]">As-on NAV date · pinned to latest NAV (16 Nov 2026)</p>
            </div>

            <div className="rounded-lg border border-[#E8E4DB] bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#1a2e35]">2 · Sections in the report</p>
                <span className="text-[11px] text-[#8a8474]">{selected.length} of 8 · drag order with arrows</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {selected.map((s, i) => (
                  <li key={s} className="flex items-center gap-2 rounded-lg border border-[#E8E4DB] bg-white px-3 py-2">
                    <GripVertical size={13} className="text-[#D0D5DD]" />
                    <span className="flex-1 text-[12.5px] text-[#1a2e35]"><span className="text-[#8a8474]">{i + 1} ·</span> {s}</span>
                    <div className="flex gap-1">
                      <button onClick={() => move(i, -1)} className="rounded border border-[#E8E4DB] px-1.5 text-[11px] text-[#525148] hover:bg-[#F4F2EC]">↑</button>
                      <button onClick={() => move(i, 1)} className="rounded border border-[#E8E4DB] px-1.5 text-[11px] text-[#525148] hover:bg-[#F4F2EC]">↓</button>
                      <button onClick={() => toggle(selected, setSelected, s)} className="rounded border border-[#E8E4DB] px-1.5 text-[11px] text-[#B02E2E] hover:bg-[#fdeeee]">✕</button>
                    </div>
                  </li>
                ))}
                {sections.filter((s) => !selected.includes(s)).map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => toggle(selected, setSelected, s)}
                      className="w-full rounded-lg border border-dashed border-[#D6D1C4] px-3 py-2 text-left text-[12px] text-[#8a8474] hover:bg-[#F4F2EC]"
                    >
                      + Add “{s}”
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[#E8E4DB] bg-white p-5">
              <p className="text-[13px] font-semibold text-[#1a2e35]">3 · Products</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {products.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EEF0] px-3 py-1.5 text-[11.5px] font-medium text-[#0A6470]">
                    <Check size={12} /> {p}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-1.5">
                {["Shares & Bonds", "Fixed Income", "Other Assets"].filter((p) => !products.includes(p)).map((p) => (
                  <button
                    key={p}
                    onClick={() => setProducts([...products, p])}
                    className="rounded-lg border border-dashed border-[#D6D1C4] px-2.5 py-1.5 text-[11px] text-[#8a8474] hover:bg-[#F4F2EC]"
                  >
                    + {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A7E8A]/40 px-4 py-2.5 text-[12.5px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#F1EEE7] disabled:text-[#8a8474]">
                <FileText size={14} /> Generate PDF <X size={11} className="opacity-50" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white px-3.5 py-2.5 text-[12px] text-[#8a8474]">
                <Mail size={13} /> Send on email <X size={11} className="opacity-50" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white px-3.5 py-2.5 text-[12px] text-[#8a8474]">
                <MessageCircle size={13} /> WhatsApp <X size={11} className="opacity-50" />
              </span>
            </div>
          </div>

          {/* preview panel */}
          <div className="xl:col-span-5">
            <div className="sticky top-6 rounded-lg border border-[#E8E4DB] bg-white p-6 ">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8a8474]">Report preview · section 1</p>
              <div className="mt-3 rounded-lg bg-gradient-to-b from-[#16324f] to-[#0d6b42] p-4 text-white">
                <p className="text-[10px] uppercase tracking-wider text-white/60">Executive summary</p>
                <p className="mt-1 text-lg font-semibold">₹ 11,45,142</p>
                <p className="text-[11px] text-white/70">Total AUM · 4 investors · NAV 16 Nov 2026</p>
              </div>
              <ul className="mt-3 space-y-2">
                {portfolioPreview.map((row) => (
                  <li key={row.k} className="flex justify-between border-b border-[#f0efec] pb-2 text-[12px] last:border-0">
                    <span className="text-[#525148]">{row.k}</span>
                    <span className="font-medium text-[#1a2e35] tabular-nums">{row.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const portfolioPreview = [
  { k: "Mutual funds", v: "₹ 9,80,000" },
  { k: "Shares & bonds", v: "₹ 80,000" },
  { k: "Fixed income", v: "₹ 35,000" },
  { k: "Other + foreign", v: "₹ 50,000" },
  { k: "Investments this month", v: "₹ 53,700" },
  { k: "Gains since inception", v: "+14.2%" },
];

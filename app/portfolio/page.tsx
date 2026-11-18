"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { FileText, Mail, MessageCircle, ChevronLeft, Check, GripVertical } from "lucide-react";

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
    <div className="flex min-h-screen bg-[#f9f9f7]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <Link href="/dashboard" className="mb-3 inline-flex items-center gap-1 text-[12px] text-[#898781] hover:text-[#184f95]">
          <ChevronLeft size={13} /> Dashboard
        </Link>
        <PageHeader title="Comprehensive Portfolio" subtitle="Configure the 8-section client report, then export — generation ships with the API." />

        <div className="grid gap-4 xl:grid-cols-12">
          {/* configurator */}
          <div className="space-y-4 xl:col-span-7">
            <div className="rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb] p-5">
              <p className="text-[13px] font-semibold text-[#0b0b0b]">1 · Whose portfolio?</p>
              <div className="mt-3 inline-flex gap-1 rounded-lg border border-[#e1e0d9] bg-white p-1">
                {([["client", "Client"], ["client", "Family head"]] as const).map(([, label], idx) => (
                  <button
                    key={label}
                    onClick={() => setByClient(idx === 0)}
                    className={`rounded-md px-3.5 py-1.5 text-[11.5px] font-medium ${
                      byClient === (idx === 0) ? "bg-[#eaf2fc] text-[#184f95]" : "text-[#52514e] hover:bg-[#f0efec]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 inline-flex w-full items-center gap-2 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2 text-[12px] text-[#898781]">
                🔍 Select an investor (dropdown wired to /clients after API)
              </div>
              <p className="mt-3 text-[11.5px] text-[#898781]">As-on NAV date · pinned to latest NAV (16 Nov 2026)</p>
            </div>

            <div className="rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb] p-5">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#0b0b0b]">2 · Sections in the report</p>
                <span className="text-[11px] text-[#898781]">{selected.length} of 8 · drag order with arrows</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {selected.map((s, i) => (
                  <li key={s} className="flex items-center gap-2 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2">
                    <GripVertical size={13} className="text-[#c3c2b7]" />
                    <span className="flex-1 text-[12.5px] text-[#0b0b0b]"><span className="text-[#898781]">{i + 1} ·</span> {s}</span>
                    <div className="flex gap-1">
                      <button onClick={() => move(i, -1)} className="rounded border border-[#e1e0d9] px-1.5 text-[11px] text-[#52514e] hover:bg-[#f0efec]">↑</button>
                      <button onClick={() => move(i, 1)} className="rounded border border-[#e1e0d9] px-1.5 text-[11px] text-[#52514e] hover:bg-[#f0efec]">↓</button>
                      <button onClick={() => toggle(selected, setSelected, s)} className="rounded border border-[#e1e0d9] px-1.5 text-[11px] text-[#a02625] hover:bg-[#fdeeee]">✕</button>
                    </div>
                  </li>
                ))}
                {sections.filter((s) => !selected.includes(s)).map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => toggle(selected, setSelected, s)}
                      className="w-full rounded-lg border border-dashed border-[#c3c2b7] px-3 py-2 text-left text-[12px] text-[#898781] hover:bg-[#f0efec]"
                    >
                      + Add “{s}”
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb] p-5">
              <p className="text-[13px] font-semibold text-[#0b0b0b]">3 · Products</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {products.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf2fc] px-3 py-1.5 text-[11.5px] font-medium text-[#184f95]">
                    <Check size={12} /> {p}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-1.5">
                {["Shares & Bonds", "Fixed Income", "Other Assets"].filter((p) => !products.includes(p)).map((p) => (
                  <button
                    key={p}
                    onClick={() => setProducts([...products, p])}
                    className="rounded-lg border border-dashed border-[#c3c2b7] px-2.5 py-1.5 text-[11px] text-[#898781] hover:bg-[#f0efec]"
                  >
                    + {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#143a6b]/40 px-4 py-2.5 text-[12.5px] font-semibold text-white disabled:opacity-40">
                <FileText size={14} /> Generate PDF · needs API
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-[12px] text-[#898781]">
                <Mail size={13} /> Send on email
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-[12px] text-[#898781]">
                <MessageCircle size={13} /> WhatsApp
              </span>
            </div>
          </div>

          {/* preview panel */}
          <div className="xl:col-span-5">
            <div className="sticky top-6 rounded-2xl border border-[#e1e0d9] bg-white p-6 shadow-[0_1px_2px_rgba(11,11,11,0.04)]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#898781]">Report preview · section 1</p>
              <div className="mt-3 rounded-xl bg-gradient-to-b from-[#143a6b] to-[#0f7a3d] p-4 text-white">
                <p className="text-[10px] uppercase tracking-wider text-white/60">Executive summary</p>
                <p className="mt-1 text-lg font-semibold">₹ 11,45,142</p>
                <p className="text-[11px] text-white/70">Total AUM · 4 investors · NAV 16 Nov 2026</p>
              </div>
              <ul className="mt-3 space-y-2">
                {portfolioPreview.map((row) => (
                  <li key={row.k} className="flex justify-between border-b border-[#f0efec] pb-2 text-[12px] last:border-0">
                    <span className="text-[#52514e]">{row.k}</span>
                    <span className="font-medium text-[#0b0b0b] tabular-nums">{row.v}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[10.5px] text-[#898781]">
                The generated PDF renders all selected sections with per-tenant branding (logo, watermark, colors) — see “Architecture & compliance”.
              </p>
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

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import PageHeader from "@/components/page-header";
import { ChevronLeft, RefreshCw } from "lucide-react";

// FV of a monthly SIP: P × ((1+i)^n − 1)/i × (1+i), i = r/12
function sipSeries(monthly: number, years: number, ratePct: number) {
  const i = ratePct / 12 / 100;
  const series: { year: number; invested: number; value: number }[] = [];
  let value = 0;
  for (let m = 1; m <= years * 12; m++) {
    value = (value + monthly) * (1 + i);
    if (m % 12 === 0) {
      series.push({
        year: m / 12,
        invested: monthly * m,
        value: Math.round(value),
      });
    }
  }
  return series;
}

const inr = (n: number) =>
  n >= 10000000
    ? `₹ ${(n / 10000000).toFixed(2)} cr`
    : n >= 100000
      ? `₹ ${(n / 100000).toFixed(2)} L`
      : `₹ ${Math.round(n).toLocaleString("en-IN")}`;

export default function CalculatorsPage() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const series = useMemo(() => sipSeries(monthly, years, rate), [monthly, years, rate]);
  const last = series[series.length - 1] ?? { invested: 0, value: 0, year: 0 };
  const gain = last.value - last.invested;
  const max = last.value || 1;

  const slider = "w-full cursor-pointer appearance-none h-1.5 rounded-full bg-[#e1e0d9] accent-[#2a78d6]";

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="min-w-0 flex-1 p-6 xl:p-8">
        <Link href="/utilities" className="mb-3 inline-flex items-center gap-1 text-[12px] text-[#8a8474] hover:text-[#0A6470]">
          <ChevronLeft size={13} /> Utilities
        </Link>
        <PageHeader
          title="SIP Calculator"
          subtitle="Adjust the three sliders — the projection recomputes instantly. Fully client-side: nothing is sent anywhere."
        />

        <div className="grid gap-4 xl:grid-cols-12">
          {/* inputs */}
          <div className="xl:col-span-5">
            <div className="space-y-5 rounded-lg border border-[#E8E4DB] bg-white p-5">
              {[
                { label: "Monthly investment (₹)", value: monthly, set: (v: number) => setMonthly(v), min: 500, max: 200000, step: 500, display: `₹ ${monthly.toLocaleString("en-IN")}` },
                { label: "Investment period (years)", value: years, set: (v: number) => setYears(v), min: 1, max: 30, step: 1, display: `${years} years` },
                { label: "Expected return (p.a.)", value: rate, set: (v: number) => setRate(v), min: 4, max: 30, step: 0.5, display: `${rate}%` },
              ].map((f) => (
                <div key={f.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-[12.5px] font-medium text-[#525148]">{f.label}</label>
                    <span className="rounded-lg bg-[#E4EEF0] px-2.5 py-1 text-[12px] font-semibold text-[#0A6470] tabular-nums">
                      {f.display}
                    </span>
                  </div>
                  <input
                    type="range" min={f.min} max={f.max} step={f.step} value={f.value}
                    onChange={(e) => f.set(Number(e.target.value))}
                    className={slider}
                  />
                </div>
              ))}

              <div className="grid grid-cols-3 gap-2 border-t border-[#E8E4DB] pt-4 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#8a8474]">Invested</p>
                  <p className="mt-0.5 text-[15px] font-semibold text-[#1a2e35]">{inr(last.invested)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#8a8474]">Est. returns</p>
                  <p className="mt-0.5 text-[15px] font-semibold text-[#1B7A46]">{inr(gain)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#8a8474]">Maturity</p>
                  <p className="mt-0.5 text-[15px] font-semibold text-[#0A6470]">{inr(last.value)}</p>
                </div>
              </div>

              <button
                onClick={() => { setMonthly(10000); setYears(10); setRate(12); }}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#E8E4DB] bg-white py-2 text-[12px] font-medium text-[#525148] hover:bg-[#F4F2EC]"
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>
          </div>

          {/* chart — value growth per year (single series → no legend, title names it) */}
          <div className="xl:col-span-7">
            <div className="rounded-lg border border-[#E8E4DB] bg-white p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[13px] font-semibold text-[#1a2e35]">Projected value by year</h3>
                <span className="text-[11px] text-[#8a8474]">
                  {inr(monthly)}/mo · {rate}% p.a. · {years} yr
                </span>
              </div>
              <div className="mt-4 flex h-56 items-end gap-[3px]" role="img" aria-label="SIP projection per year">
                {series.map((p) => {
                  const investedH = (p.invested / max) * 100;
                  const grownH = (p.value / max) * 100;
                  return (
                    <div key={p.year} className="group relative flex-1" title={`Year ${p.year}: value ${inr(p.value)} · invested ${inr(p.invested)}`}>
                      <div className="flex h-56 flex-col justify-end">
                        {/* grown portion on top of invested portion — single hue, two steps */}
                        <span
                          className="w-full rounded-t-[4px] transition-colors group-hover:opacity-80"
                          style={{ height: `${grownH - investedH}%`, background: "#6FABB6" }}
                        />
                        <span
                          className="w-full rounded-b-[4px]"
                          style={{ height: `${Math.max(0, investedH)}%`, background: "#0588A3" }}
                        />
                      </div>
                      {/* hover tooltip (hover layer) */}
                      <span className="pointer-events-none absolute -top-9 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0b0b0b] px-2 py-1 text-[10px] font-medium text-white group-hover:block">
                        Yr {p.year} · {inr(p.value)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-[#E8E4DB] pt-2 text-[10.5px] text-[#8a8474]">
                <span>Yr 1</span>
                <span>Yr {Math.round(years / 2)}</span>
                <span>
                  Yr {years} · <span className="font-semibold text-[#0A6470]">{inr(last.value)}</span>
                </span>
              </div>
              {/* legend: two encodings (invested vs returns) */}
              <div className="mt-3 flex items-center gap-4 text-[11px] text-[#525148]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-[3px] bg-[#2a78d6]" /> Amount invested</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-[3px] bg-[#86b6ef]" /> Estimated gains</span>
                <span className="ml-auto text-[#8a8474]">hover a bar for the exact figure</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { t: "SIP delay", d: "Cost of starting late" },
                { t: "SIP step-up", d: "Yearly hike effect" },
                { t: "SWP", d: "Withdrawal plans" },
                { t: "Goal planner", d: "Target-based view" },
              ].map((c) => (
                <div key={c.t} className="rounded-lg border border-dashed border-[#D6D1C4] p-3 text-center">
                  <p className="text-[11.5px] font-semibold text-[#525148]">{c.t}</p>
                  <p className="mt-0.5 text-[10px] text-[#8a8474]">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

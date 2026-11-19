"use client";

import {
  CircleAlert, CalendarClock, UserRoundSearch, Cake, CheckCircle2,
  Vault, Users, Repeat, TrendingUp,
} from "lucide-react";
import { portfolio, stats, flows, dataQuality, alerts, user } from "@/lib/data";
import { ledger, TONE, CREDIT, DEBIT } from "@/lib/theme";

const alertIcons: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  calendar: CalendarClock, review: UserRoundSearch, cake: Cake,
};

/* ---------- KPI tiles: serif figures + hairline sparkline (no skeleton bars) ---------- */
function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 130, h = 34, pad = 3;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / (max - min || 1)) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = `M ${pts.join(" L ")}`;
  return (
    <svg width="130" height="34" viewBox={`0 0 ${w} ${h}`} className="mt-3" aria-hidden>
      <path d={line} fill="none" stroke="#0588A3" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="2.3" fill="#0588A3" />
    </svg>
  );
}

export function StatTiles() {
  const icons: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
    vault: Vault, users: Users, repeat: Repeat, trending: TrendingUp,
  };
  return (
    <div className="grid grid-cols-2 gap-px border border-[#E8E4DB] bg-[#E8E4DB] xl:grid-cols-4">
      {stats.map((s) => {
        const Icon = icons[s.icon];
        return (
          <div key={s.key} className="bg-white p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11.5px] text-[#8A8474]">{s.label}</span>
              <span className={`text-[11px] font-medium ${s.up ? "text-[#1B7A46]" : "text-[#B02E2E]"}`}>
                {s.up ? "▲" : "▼"} {s.delta}
              </span>
            </div>
            <p className="font-display mt-1 text-[30px] font-medium leading-none text-[#1A2E35]">{s.value}</p>
            <Sparkline data={s.trend} />
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Ledger hero: the November book ---------- */
export function LedgerHero() {
  return (
    <section className="border border-[#E8E4DB] bg-white">
      <div className="grid grid-cols-1 divide-y border-b border-[#E8E4DB] md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="p-6 md:col-span-1">
          <p className="text-[11px] tracking-wide text-[#8A8474]">Book, November</p>
          <p className="font-display mt-2 text-[42px] font-medium leading-none text-[#1A2E35]">₹ 11,45,142</p>
          <p className="mt-2 text-[11.5px] text-[#8A8474]">
            <span className="text-[#1B7A46]">net ₹ 22.7 k received this month</span>
          </p>
        </div>
        <dl className="p-6">
          {[
            ["Investors on book", "4"],
            ["Active folios", "6"],
            ["SIP instalments due", "4, by 20 Nov"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between border-b border-[#F2EFE7] py-2 last:border-0">
              <dt className="text-[12px] text-[#8A8474]">{k}</dt>
              <dd className="text-[13px] font-medium text-[#1A2E35] tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <dl className="p-6">
          {[
            ["SIP book", "₹ 29.0 k"],
            ["Invested this month", "₹ 53.7 k"],
            ["Gaps to clean up", "4"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between border-b border-[#F2EFE7] py-2 last:border-0">
              <dt className="text-[12px] text-[#8A8474]">{k}</dt>
              <dd className="text-[13px] font-medium text-[#1A2E35] tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Asset mix: ordinal teal share bar + ruled rows ---------- */
export function AssetMix() {
  return (
    <section className="p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-display text-[15px] font-medium text-[#1A2E35]">Asset mix</h3>
        <span className="text-[11px] text-[#8A8474]">total ₹ 11.45 L</span>
      </div>
      <div className="flex h-6 gap-[2px]" role="img" aria-label="Asset mix by class">
        {portfolio.assetClasses.map((a, i) => (
          <div
            key={a.name}
            style={{ width: `${Math.max(a.pct, 2)}%`, background: TONE[i] }}
            title={`${a.name}: ${a.label} (${a.pct}%)`}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
        {portfolio.assetClasses.map((a, i) => (
          <li key={a.name} className="flex items-baseline justify-between border-b border-[#F2EFE7] py-2 text-[12.5px]">
            <span className="flex items-center gap-2 text-[#525148]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: TONE[i] }} />
              {a.name}
            </span>
            <span className="font-medium text-[#1A2E35] tabular-nums">{a.label} <span className="ml-2 text-[#8A8474]">{a.pct}%</span></span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between text-[12px]">
        <span className="text-[#8A8474]">Shares, deposits, equity and foreign holdings in this book are uploaded, not fed by RTA data yet</span>
      </div>
    </section>
  );
}

/* ---------- Net flows: credited / redeemed ledger rows ---------- */
export function NetFlows() {
  return (
    <section className="p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-display text-[15px] font-medium text-[#1A2E35]">Monthly flows</h3>
        <span className="flex items-center gap-4 text-[11px] text-[#8A8474]">
          <span className="flex items-center gap-1.5"><span className="h-[3px] w-3.5 rounded-full" style={{ background: CREDIT }} />credited</span>
          <span className="flex items-center gap-1.5"><span className="h-[3px] w-3.5 rounded-full" style={{ background: DEBIT }} />redeemed</span>
        </span>
      </div>
      <div className="border-b border-[#E8E4DB]">
        {flows.categories.map((cat, i) => {
          const inv = flows.invested[i], red = flows.redeemed[i];
          return (
            <div key={cat} className="grid grid-cols-[84px_1fr] items-center gap-3 border-b border-[#F2EFE7] py-2.5 last:border-0" title={`${cat}: credited ₹${inv}k, redeemed ₹${red}k`}>
              <span className="text-[12.5px] text-[#525148]">{cat}</span>
              <div className="flex flex-col gap-[3px]">
                <div className="flex h-[8px] items-center gap-2">
                  <span className="min-w-[1px] rounded-r-[2px]" style={{ width: `${(inv / flows.max) * 78}%`, height: "100%", background: CREDIT }} />
                  <span className="text-[10.5px] text-[#525148] tabular-nums">{inv ? `₹${inv}k` : ""}</span>
                </div>
                <div className="flex h-[8px] items-center gap-2">
                  <span className="min-w-[1px] rounded-r-[2px]" style={{ width: `${(red / flows.max) * 78}%`, height: "100%", background: DEBIT }} />
                  <span className="text-[10.5px] text-[#525148] tabular-nums">{red ? `₹${red}k` : ""}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-baseline justify-between text-[12.5px]">
        <span className="text-[#8A8474]">Net received</span>
        <span className="font-medium text-[#1B7A46] tabular-nums">₹ 22.7 k</span>
      </div>
    </section>
  );
}

/* ---------- Data quality + Alerts: ruled section ---------- */
export function LedgerSideColumn() {
  return (
    <>
      <section className="p-6">
        <h3 className="font-display mb-4 text-[15px] font-medium text-[#1A2E35]">Data quality</h3>
        <ul>
          {dataQuality.map((d) => (
            <li key={d.label} className="grid grid-cols-[1fr_42px_86px] items-center gap-3 border-b border-[#F2EFE7] py-2.5">
              <div>
                <p className="text-[12.5px] text-[#1A2E35]">{d.label}</p>
                <p className="text-[11px] text-[#8A8474]">{d.gaps}</p>
              </div>
              <p className="text-right text-[13px] font-medium text-[#1A2E35] tabular-nums">{d.coverage}%</p>
              <div className="flex items-center justify-end gap-2">
                <span className="h-1 w-14 overflow-hidden rounded-full bg-[#E8E4DB]">
                  <span className="block h-full rounded-full" style={{ width: `${d.coverage}%`, background: "#0A7E8A" }} />
                </span>
                {d.state === "good" ? (
                  <CheckCircle2 size={13} style={{ color: "#1B7A46" }} />
                ) : (
                  <CircleAlert size={13} style={{ color: "#B0752B" }} />
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11.5px] text-[#8A8474]">
          Overall coverage 95%. Four gaps to close before month-end.
        </p>
      </section>

      <section className="border-t border-[#E8E4DB] p-6">
        <h3 className="font-display mb-2 text-[15px] font-medium text-[#1A2E35]">Follow-ups</h3>
        <ul className="divide-y divide-[#F2EFE7]">
          {alerts.map((a) => {
            const Icon = alertIcons[a.icon];
            const tone = a.state === "serious" ? "#B02E2E" : a.state === "warning" ? "#B0752B" : "#0A7E8A";
            return (
              <li key={a.title} className="grid grid-cols-[28px_1fr] items-start gap-3 py-3">
                <Icon size={15} className="mt-0.5" style={{ color: tone }} />
                <div>
                  <p className="text-[12.5px] text-[#1A2E35]">{a.title}</p>
                  <p className="text-[11px] text-[#8A8474]">{a.meta} — {a.due}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-[12px] text-[#8A8474]">
          {user.name}, three of these close before 20 Nov.
        </p>
      </section>
    </>
  );
}

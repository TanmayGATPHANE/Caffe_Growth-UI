"use client";

import {
  Vault, Users, Repeat, TrendingUp, TrendingDown, CircleAlert,
  CalendarClock, UserRoundSearch, Cake, CheckCircle2, ArrowUpRight,
} from "lucide-react";
import { portfolio, stats, flows, dataQuality, alerts, user } from "@/lib/data";
import { ui, STATUS } from "@/lib/theme";

type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

const tileIcons: Record<string, IconType> = {
  vault: Vault, users: Users, repeat: Repeat, trending: TrendingUp,
};
const alertIcons: Record<string, IconType> = {
  calendar: CalendarClock, review: UserRoundSearch, cake: Cake,
};

const card = "rounded-2xl border border-[#e1e0d9] bg-[#fcfcfb] shadow-[0_1px_2px_rgba(11,11,11,0.04)]";

/* ---------- KPI stat tiles (hero numbers, no chart → no hover layer needed) ---------- */
export function StatTiles() {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((s) => {
        const Icon = tileIcons[s.icon];
        const max = Math.max(...s.trend);
        return (
          <div key={s.key} className={`${card} p-4`}>
            <div className="flex items-center justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf2fc] text-[#184f95]">
                {Icon && <Icon size={15} />}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10.5px] font-medium ${
                  s.up ? "bg-[#eaf7ea] text-[#006300]" : "bg-[#fdeeee] text-[#a02625]"
                }`}
              >
                <ArrowUpRight size={11} /> {s.delta}
              </span>
            </div>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-[#898781]">{s.label}</p>
            <p className="mt-0.5 text-[26px] font-semibold leading-none text-[#0b0b0b]">{s.value}</p>
            {/* 7-point mini trend — thin bars, 4px data-ends, 2px gaps */}
            <div className="mt-3 flex h-7 items-end gap-[2px]" aria-hidden>
              {s.trend.map((v, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[4px]"
                  style={{ height: `${Math.max(8, (v / max) * 100)}%`, background: i === s.trend.length - 1 ? "#2a78d6" : "#dedecb" }}
                  title={`t${i + 1}: ${v}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Asset mix — single stacked bar, 2px spacers, direct labels ---------- */
export function AssetMix() {
  return (
    <div className={`${card} p-5`}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-[13px] font-semibold text-[#0b0b0b]">Asset mix</h3>
        <p className="text-[11px] text-[#898781]">
          Total <span className="font-semibold text-[#0b0b0b]">{portfolio.aumLabel}</span>
        </p>
      </div>

      {/* stacked bar: 2px surface gaps between adjacent fills */}
      <div className="mt-4 flex h-9 gap-[2px]" role="img" aria-label="Asset mix by class">
        {portfolio.assetClasses.map((a, i) => (
          <div
            key={a.name}
            className="group relative rounded-[3px] first:rounded-l-[4px] last:rounded-r-[4px] opacity-95 hover:opacity-100"
            style={{ width: `${a.pct}%`, background: a.color }}
            title={`${a.name}: ${a.label} (${a.pct}%)`}
          >
            {a.pct >= 25 && (
              <span className="absolute inset-0 grid place-items-center text-[11px] font-semibold text-white">
                {a.pct}%
              </span>
            )}
          </div>
        ))}
      </div>

      {/* legend/value list — text ink, colored dot carries identity */}
      <ul className="mt-4 space-y-2.5">
        {portfolio.assetClasses.map((a) => (
          <li key={a.name} className="flex items-center gap-2.5 text-[12.5px]">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: a.color }} />
            <span className="flex-1 text-[#52514e]">{a.name}</span>
            <span className="text-right font-medium text-[#0b0b0b] tabular-nums">{a.label}</span>
            <span className="w-8 text-right text-[11px] text-[#898781] tabular-nums">{a.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Net flows — paired thin bars, two-series legend ---------- */
export function NetFlows() {
  return (
    <div className={`${card} p-5`}>
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-[#0b0b0b]">Net flows · Nov (MTD)</h3>
        {/* legend — 2 series → always present */}
        <div className="flex items-center gap-4">
          {flows.series.map((s) => (
            <span key={s.name} className="flex items-center gap-1.5 text-[11px] text-[#52514e]">
              <span className="h-2 w-2 rounded-[3px]" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {flows.categories.map((cat, i) => {
          const inv = flows.invested[i];
          const red = flows.redeemed[i];
          return (
            <li key={cat} className="grid grid-cols-[84px_1fr] items-center gap-3">
              <span className="text-[12px] text-[#52514e]">{cat}</span>
              <div className="flex flex-col gap-[3px]" title={`${cat} — Investment ₹${inv}k · Redemption ₹${red}k`}>
                <div className="flex h-2.5 items-center gap-2">
                  <span className="h-2.5 rounded-r-[4px]" style={{ width: `${(inv / flows.max) * 100 * 0.86}%`, background: "#2a78d6" }} />
                  <span className="text-[10px] font-medium text-[#52514e] tabular-nums">{inv ? `₹${inv}k` : "—"}</span>
                </div>
                <div className="flex h-2.5 items-center gap-2">
                  <span className="h-2.5 rounded-r-[4px]" style={{ width: `${(red / flows.max) * 100 * 0.86}%`, background: "#eb6834" }} />
                  <span className="text-[10px] font-medium text-[#52514e] tabular-nums">{red ? `₹${red}k` : "—"}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-[#e1e0d9] pt-3 text-[12px]">
        <span className="text-[#898781]">Net investment MTD</span>
        <span className="font-semibold text-[#006300] tabular-nums">₹ 22.7 k</span>
      </div>
    </div>
  );
}

/* ---------- Data quality (Compliance reinvented) ---------- */
export function DataQuality() {
  return (
    <div className={`${card} p-5`}>
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-[#0b0b0b]">Data quality</h3>
        <span className="text-[11px] text-[#898781]">{user.name}&apos;s book</span>
      </div>
      <ul className="mt-4 space-y-4">
        {dataQuality.map((d) => (
          <li key={d.label} className="grid grid-cols-[1fr_46px_110px] items-center gap-3">
            <div>
              <p className="text-[12.5px] text-[#0b0b0b]">{d.label}</p>
              <p className="text-[11px] text-[#898781]">{d.gaps}</p>
            </div>
            <span className="text-right text-[13px] font-semibold text-[#0b0b0b] tabular-nums">{d.coverage}%</span>
            {/* coverage bar: sequential blue; state via icon+label chip (status color never alone) */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f0efec]">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${d.coverage}%`, background: "#2a78d6" }}
                />
              </span>
              {d.state === "good" ? (
                <CheckCircle2 size={14} style={{ color: STATUS.good }} />
              ) : (
                <CircleAlert size={14} style={{ color: STATUS.warning }} />
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-[#e1e0d9] pt-3">
        <span className="text-[11px] text-[#898781]">Overall coverage</span>
        <span className="text-[12px] font-semibold text-[#0b0b0b] tabular-nums">95% · 4 gaps</span>
      </div>
    </div>
  );
}

/* ---------- Alerts — status icon + label, deadline chips ---------- */
export function AlertsCard() {
  return (
    <div className={`${card} p-5`}>
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-[#0b0b0b]">Alerts</h3>
        <span className="text-[11px] text-[#898781]">Next 7 days</span>
      </div>
      <ul className="mt-3 divide-y divide-[#e1e0d9]">
        {alerts.map((a) => {
          const Icon = alertIcons[a.icon];
          return (
            <li key={a.title} className="flex items-center gap-3 py-3">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                style={{
                  background: a.state === "warning" ? "#fdf3dc" : a.state === "serious" ? "#fdeee8" : "#eaf7ea",
                }}
              >
                {Icon && (
                  <Icon size={16} style={{ color: STATUS[a.state] }} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium text-[#0b0b0b]">{a.title}</p>
                <p className="text-[11px] text-[#898781]">{a.meta} · {a.due}</p>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  color: STATUS[a.state],
                  background:
                    a.state === "warning" ? "#fdf3dc" : a.state === "serious" ? "#fdeee8" : "#eaf7ea",
                }}
              >
                {a.state === "warning" ? "action" : a.state === "serious" ? "follow-up" : "fyi"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Quick report strip ---------- */
export function QuickReport() {
  return (
    <div className={`${card} flex flex-wrap items-center gap-3 p-4`}>
      <span className="inline-flex items-center gap-2 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2 text-[12px] text-[#898781]">
        <UserRoundSearch size={14} /> Find a client…
      </span>
      <span className="inline-flex items-center gap-2 rounded-lg border border-[#e1e0d9] bg-white px-3 py-2 text-[12px] text-[#52514e]">
        Portfolio Valuation
      </span>
      <span className="rounded-lg bg-[#f0efec] px-3 py-2 text-[12px] font-medium text-[#898781]">Generate report · soon</span>
      <span className="ml-auto text-[11px] text-[#898781]">
        Wire-up begins with the API — see <span className="font-medium text-[#184f95]">wiki §3</span>
      </span>
    </div>
  );
}

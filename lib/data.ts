// Static mock data for the UI demo (no backend calls yet).

export const user = { name: "Shubham", role: "Sub broker", initials: "SH" };

export const context = {
  navDate: "16 Nov 2026",
  dataAsOf: "17 Nov 2026 · 01:54 PM",
};

export interface AssetClass {
  name: string;
  value: number;   // ₹
  label: string;   // compact display
  color: string;   // validated series slot
  pct: number;     // share of total
}

export const portfolio = {
  aumLabel: "₹ 11.45 L",
  assetClasses: [
    { name: "Mutual Funds",   value: 9_80_000, label: "₹ 9.80 L", color: "#0588A3", pct: 86 },
    { name: "Shares & Bonds", value:   80_000, label: "₹ 0.80 L", color: "#eb6834", pct: 7 },
    { name: "Fixed Income",   value:   35_000, label: "₹ 0.35 L", color: "#1baf7a", pct: 3 },
    { name: "Other Assets",   value:   35_000, label: "₹ 0.35 L", color: "#eda100", pct: 3 },
    { name: "Foreign Assets", value:   15_000, label: "₹ 0.15 L", color: "#e87ba4", pct: 1 },
  ] as AssetClass[],
};

// Stat tiles: value + month-over-month delta + 7-point mini trend
export const stats = [
  { key: "aum", label: "AUM", value: "₹ 11.45 L", delta: "+6.2% MoM", up: true, trend: [7.9, 8.2, 8.6, 9.1, 10.2, 10.8, 11.45], icon: "vault" },
  { key: "investors", label: "Investors", value: "4", delta: "+1 this month", up: true, trend: [2, 2, 3, 3, 3, 4, 4], icon: "users" },
  { key: "sip", label: "SIP book", value: "₹ 29.0 k", delta: "+₹ 4.2 k MoM", up: true, trend: [14, 19, 22, 22, 25, 24, 29], icon: "repeat" },
  { key: "flows", label: "Net flows (MTD)", value: "₹ 22.7 k", delta: "+₹ 1.5 k vs Oct", up: true, trend: [4, 6, 5, 9, 12, 18, 22.7], icon: "trending" },
];

// Net flows — Invest vs Redeem per category (₹ '000, month-to-date)
export const flows = {
  categories: ["Equity", "Debt", "Liquid", "Arbitrage", "Hybrid", "Other"],
  invested:   [21.2, 4.2, 8.4, 1.2, 3.1, 0.9],
  redeemed:   [2.4,  1.8, 2.0, 0.0, 0.0, 0.3],
  series: [
    { name: "Investment", color: "#0588A3" },
    { name: "Redemption", color: "#eb6834" },
  ],
  max: 21.2,
};

// Data quality / compliance — coverage + gaps
export const dataQuality = [
  { label: "Email coverage",    coverage: 94, gaps: "1 investor missing", state: "good" as const },
  { label: "Mobile coverage",   coverage: 88, gaps: "2 investors missing", state: "good" as const },
  { label: "EUIN remediation",  coverage: 97, gaps: "1 declaration pending", state: "warning" as const },
  { label: "PAN completeness",  coverage: 100, gaps: "0 investors missing", state: "good" as const },
];

export const alerts = [
  { icon: "calendar", title: "SIP instalments due", meta: "4 SIPs", due: "by 20 Nov", state: "warning" as const },
  { icon: "review", title: "Portfolio reviews pending", meta: "2 investors", due: "this week", state: "serious" as const },
  { icon: "cake", title: "Birthdays & anniversaries", meta: "3 contacts", due: "next 7 days", state: "good" as const },
];

export const clients = [
  { name: "Ananya Verma", initials: "AV", family: "Ananya Verma", rm: "Shubham", aum: 594828, pan: "XXXXX1234X", mobile: "+91 98XXXXXX45", email: "ananya@example.com", status: "Active" as const, source: "IIN Creation", since: "Aug 2023" },
  { name: "Aditya N Salimath", initials: "AD", family: "Salimath household", rm: "Shubham", aum: 304445, pan: "XXXXX5133M", mobile: "85XXXXXXXX30", email: "aditya@example.com", status: "Active" as const, source: "Sync", since: "Jul 2024" },
  { name: "Ajay Mishra", initials: "AM", family: "—", rm: "Shubham", aum: 128636, pan: "XXXXX4267E", mobile: "+91 90XXXXXX93", email: "ajay@example.com", status: "Invite pending" as const, source: "Sync", since: "Feb 2023" },
  { name: "Demo Client", initials: "DC", family: "Demo household", rm: "Shubham", aum: 117233, pan: "XXXXX1234N", mobile: "+91 84XXXXXX38", email: "demo@example.com", status: "Invite pending" as const, source: "Clients menu", since: "Dec 2023" },
];

export const sidebarGroups = [
  { group: "Overview", items: [{ label: "Dashboard", href: "/dashboard", icon: "layout" }] },
  { group: "Clients & sales", items: [
    { label: "Clients", href: "/clients", icon: "users" },
    { label: "Folio Lookup", href: "/folio-lookup", icon: "search" },
    { label: "Insurance", href: "/insurance", icon: "shield" },
    { label: "CRM", href: "#", icon: "contact" },
  ]},
  { group: "Portfolio", items: [
    { label: "Comprehensive Portfolio", href: "/portfolio", icon: "pie" },
    { label: "Transactions", href: "/transactions", icon: "swap" },
    { label: "Model Portfolio", href: "#", icon: "target" },
  ]},
  { group: "Insights", items: [
    { label: "Business Analytics", href: "/analytics", icon: "chart" },
    { label: "Risk Profiling", href: "/risk-profiling", icon: "gauge" },
    { label: "Sub Brokerage", href: "/sub-brokerage", icon: "wallet" },
  ]},
  { group: "Operations", items: [
    { label: "Data Management", href: "/data-management", icon: "database" },
    { label: "Email Scheduler", href: "#", icon: "mail" },
    { label: "Utilities", href: "/utilities", icon: "grid" },
  ]},
];

// ---- transactions mock ----
export const categoryColors: Record<string, string> = {
  Equity: "#0588A3", Debt: "#eb6834", Liquid: "#1baf7a",
  Arbitrage: "#eda100", Hybrid: "#e87ba4", Other: "#6250d6",
};
export const transactions = [
  { date: "14 Nov 2026", investor: "Ananya Verma", scheme: "Axis Bluechip Fund — Direct Gr", category: "Equity", type: "Purchase", amount: 25000, units: 118.42 },
  { date: "12 Nov 2026", investor: "Ananya Verma", scheme: "HDFC Flexi Cap Fund — Dir Gr", category: "Equity", type: "SIP", amount: 10000, units: 41.07 },
  { date: "10 Nov 2026", investor: "Demo Client", scheme: "Parag Parikh Flexi Cap — Reg Gr", category: "Equity", type: "Purchase", amount: 50000, units: 302.16 },
  { date: "08 Nov 2026", investor: "Aditya N Salimath", scheme: "ICICI Pru Liquid — Direct Gr", category: "Liquid", type: "Redemption", amount: 20000, units: -35.61 },
  { date: "05 Nov 2026", investor: "Ajay Mishra", scheme: "SBI Debt Fund — Direct Gr", category: "Debt", type: "Purchase", amount: 15000, units: 121.33 },
  { date: "03 Nov 2026", investor: "Demo Client", scheme: "Nippon Arbitrage — Direct Gr", category: "Arbitrage", type: "SIP", amount: 4000, units: 39.88 },
  { date: "01 Nov 2026", investor: "Aditya N Salimath", scheme: "Kotak Hybrid Equity — Reg Gr", category: "Hybrid", type: "Switch In", amount: 9500, units: 82.2 },
  { date: "28 Oct 2026", investor: "Ajay Mishra", scheme: "Axis Bluechip Fund — Direct Gr", category: "Equity", type: "Dividend", amount: 620, units: 0 },
  { date: "25 Oct 2026", investor: "Ananya Verma", scheme: "HDFC Flexi Cap Fund — Dir Gr", category: "Equity", type: "SIP", amount: 10000, units: 40.61 },
  { date: "20 Oct 2026", investor: "Demo Client", scheme: "Parag Parikh Flexi Cap — Reg Gr", category: "Other", type: "Purchase", amount: 8000, units: 45.1 },
];

// ---- folio lookup mock ----
export const folios = [
  { folio: "91074452/10", investor: "Ananya Verma", fund: "Axis AMC", scheme: "Axis Bluechip Fund — Direct Gr", units: 512.44, value: 418231, status: "Active" as const },
  { folio: "4420/44", investor: "Aditya N Salimath", fund: "ICICI Prudential", scheme: "ICICI Pru Liquid — Direct Gr", units: 2100.5, value: 210440, status: "Active" as const },
  { folio: "882300456/1", investor: "Demo Client", fund: "Parag Parikh", scheme: "Flexi Cap — Reg Gr", units: 288.1, value: 109322, status: "Active" as const },
];

// ---- insurance mock ----
export const policies = {
  life: [
    { holder: "Ananya Verma", insurer: "LIC", policy: "9145-XXXX-21", premium: "₹ 62,400 /yr", assured: "₹ 50 L", renewal: "12 Feb 2027", status: "Active" as const },
    { holder: "Ajay Mishra", insurer: "HDFC Life", policy: "HSLI-8XXQ7", premium: "₹ 28,900 /yr", assured: "₹ 25 L", renewal: "30 Jan 2027", status: "Active" as const },
  ],
  general: [
    { holder: "Aditya N Salimath", insurer: "Bajaj Allianz", policy: "BAG-44XX1", premium: "₹ 15,800 /yr", assured: "₹ 10 L (health)", renewal: "05 Dec 2026", status: "Renewal due" as const },
  ],
};

// ---- risk profiling mock ----
export const riskPipeline = [
  { label: "Pending", count: 0, state: "muted" as const },
  { label: "Expired", count: 0, state: "muted" as const },
  { label: "Link sent", count: 2, state: "info" as const },
  { label: "Submitted", count: 2, state: "good" as const },
];
export const riskSubmissions = [
  { date: "28 Nov 2025", investor: "Aditya N Salimath", category: "Moderate", suggested: "—", validTill: "28 Nov 2125", aum: 304445 },
  { date: "11 Jul 2025", investor: "Ajay Mishra", category: "Aggressive", suggested: "Moderately Aggressive", validTill: "11 Jul 2125", aum: 128636 },
];

// ---- sub brokerage mock ----
export const brokerage = {
  earned: "₹ 8,440", clawback: "₹ 0", net: "₹ 8,440", topScheme: "Axis Bluechip — 41%",
  rows: [
    { scheme: "Axis Bluechip Fund — Direct Gr", gross: "₹ 4,180", claw: "₹ 0", net: "₹ 4,180", share: 41 },
    { scheme: "HDFC Flexi Cap Fund — Dir Gr", gross: "₹ 1,920", claw: "₹ 0", net: "₹ 1,920", share: 19 },
    { scheme: "Parag Parikh Flexi Cap — Reg Gr", gross: "₹ 1,340", claw: "₹ 0", net: "₹ 1,340", share: 13 },
    { scheme: "ICICI Pru Liquid — Direct Gr", gross: "₹ 5,110", claw: "₹ 0", net: "₹ 5,110", share: 27 },
  ],
};

// ---- utility tools ----
export const utilityTools = [
  { icon: "flame", title: "Top Schemes", desc: "Rank schemes by returns, AUM and ratings.", href: "#" },
  { icon: "list", title: "Task Manager", desc: "Assign follow-ups with due dates.", href: "#" },
  { icon: "target", title: "Goal Planner", desc: "Map goals to investments and coverage.", href: "#" },
  { icon: "calc", title: "Calculators", desc: "SIP, SWP, STP & goal projections — live demo inside.", href: "/utilities/calculators" },
  { icon: "clipboard", title: "Forms", desc: "Pre-filled form generator + downloads.", href: "#" },
  { icon: "globe", title: "Market Data", desc: "NAV history, gainers, NFO & FMP lists.", href: "#" },
  { icon: "scale", title: "Scheme Compare", desc: "Trailing / rolling / overlap / correlation.", href: "#" },
  { icon: "filter", title: "Fund Screener", desc: "12 filter criteria with saved lists.", href: "#" },
  { icon: "tags", title: "Label Maker", desc: "Mailing labels from your client book.", href: "#" },
];

export const analyticsReports = [
  { icon: "pie", title: "AUM Reports", desc: "Bifurcation across AMC, scheme, category, RM, ARN." },
  { icon: "swap", title: "Cash Flow", desc: "Inflow & outflow across AMC, RM, clients." },
  { icon: "shield", title: "Security Exposure", desc: "Client exposure to any single holding." },
  { icon: "trending", title: "AUM Growth", desc: "Market impact on AUM over a period." },
  { icon: "target", title: "Variance in Allocation", desc: "Target vs current allocation gaps." },
  { icon: "user", title: "Inactive Clients", desc: "Investors who didn't transact in a period." },
  { icon: "flame", title: "ELSS Procurement", desc: "ELSS investors in the last three years." },
  { icon: "plus", title: "Cross Sell", desc: "Product penetration across your book." },
  { icon: "repeat", title: "SIP Mining", desc: "Running, new, terminated or matured SIPs." },
  { icon: "alert", title: "Alert Reports", desc: "SIPs, FMP/FI maturity, renewals, birthdays." },
  { icon: "swap", title: "Change of Broker", desc: "Transactions received via CoB." },
  { icon: "trending", title: "SIP Business", desc: "Net SIP change across AMCs." },
  { icon: "scale", title: "Redemption Simulation", desc: "Portfolio value if no sell had occurred." },
  { icon: "search", title: "Missing SIP", desc: "Running SIPs without recent instalments." },
  { icon: "repeat", title: "SIP Procurement", desc: "SIP amount received across two periods." },
  { icon: "users", title: "Client Acquisition", desc: "New client flows over time." },
];

export const dataMgmtTools = [
  { icon: "check", title: "Compliance Report", desc: "PAN, email, KYC gaps; IIN & UCC mismatch." },
  { icon: "undo", title: "Transaction Reversals", desc: "Transactions reversed by the RTA." },
  { icon: "copy", title: "Duplicate Finder", desc: "Find & bulk-merge duplicate investors." },
  { icon: "plus", title: "Create Transaction", desc: "Add, modify or delete any transaction." },
  { icon: "clock", title: "Login History", desc: "Login log with IP of all user sessions." },
];

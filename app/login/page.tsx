import Link from "next/link";
import { Leaf, ShieldCheck, PieChart, FileText } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#143a6b] via-[#12466f] to-[#0f7a3d] p-10 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <Leaf size={18} />
          </span>
          <p className="text-[17px] font-semibold">GrowthCafe</p>
        </div>
        <div className="max-w-md">
          <h1 className="text-[30px] font-semibold leading-tight">Own your book of business — beautifully.</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-white/75">
            One console for your mutual-fund practice: live AUM, client intelligence and
            board-ready reports, in your brand.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: PieChart, title: "Consolidated AUM", sub: "Every asset class, every NAV date" },
              { icon: ShieldCheck, title: "Compliance without the chase", sub: "KYC & data-quality gaps surfaced daily" },
              { icon: FileText, title: "One-click reports", sub: "Comprehensive portfolios on WhatsApp or email" },
            ].map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10">
                  <f.icon size={15} />
                </span>
                <div>
                  <p className="text-[13.5px] font-medium">{f.title}</p>
                  <p className="text-[12px] text-white/65">{f.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[11px] text-white/50">Static demo · v0.1 · data is mocked</p>
      </div>

      {/* form panel */}
      <div className="grid place-items-center bg-[#f9f9f7] p-6">
        <div className="w-full max-w-[400px] rounded-2xl border border-[#e1e0d9] bg-white p-8 shadow-[0_1px_3px_rgba(11,11,11,0.06)]">
          <div className="mb-6 text-center lg:hidden">
            <p className="text-[15px] font-semibold text-[#0b0b0b]">GrowthCafe</p>
          </div>
          <h2 className="text-xl font-semibold text-[#0b0b0b]">Welcome back</h2>
          <p className="mt-1 text-[13px] text-[#52514e]">Sign in to your broker console.</p>

          <form className="mt-6 space-y-3.5">
            <div>
              <label className="mb-1 block text-[11.5px] font-medium text-[#52514e]">Username</label>
              <input
                disabled
                className="w-full rounded-lg border border-[#e1e0d9] px-3 py-2.5 text-[13px] outline-none placeholder:text-[#c3c2b7]"
                placeholder="you@firm.in"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11.5px] font-medium text-[#52514e]">Password</label>
              <input
                disabled
                type="password"
                className="w-full rounded-lg border border-[#e1e0d9] px-3 py-2.5 text-[13px] outline-none placeholder:text-[#c3c2b7]"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-[11.5px] text-[#52514e]">
              <label className="flex items-center gap-1.5">
                <input type="checkbox" disabled /> Keep me signed in
              </label>
              <span className="cursor-pointer text-[#184f95]">Forgot password?</span>
            </div>
            <Link
              href="/dashboard"
              className="block rounded-lg bg-[#143a6b] py-2.5 text-center text-[13px] font-semibold text-white hover:bg-[#0f2c52]"
            >
              Sign in
            </Link>
            <div className="flex items-center gap-3 py-1">
              <span className="h-px flex-1 bg-[#e1e0d9]" />
              <span className="text-[10px] uppercase tracking-wider text-[#898781]">or</span>
              <span className="h-px flex-1 bg-[#e1e0d9]" />
            </div>
            <Link
              href="/dashboard"
              className="block rounded-lg border border-[#e1e0d9] bg-white py-2.5 text-center text-[13px] font-medium text-[#0b0b0b] hover:bg-[#f9f9f7]"
            >
              ✉️ Continue with OTP
            </Link>
          </form>

          <p className="mt-6 text-center text-[10.5px] leading-relaxed text-[#898781]">
            By signing in you accept the Terms of Use.
            <br />
            Demo build — forms are inert, no data is sent anywhere.
          </p>
        </div>
      </div>
    </main>
  );
}

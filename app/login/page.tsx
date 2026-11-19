import Link from "next/link";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#FAF9F6] p-6">
      <div className="w-full max-w-[400px]">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-10 w-10 place-items-center rounded-md bg-[#0A7E8A] text-white">
            <Leaf size={17} />
          </span>
          <h1 className="font-display mt-3 text-[24px] font-medium text-[#1A2E35]">GrowthCafe</h1>
          <p className="mt-0.5 text-[12px] text-[#8A8474]">LLP, AMFI registered distributor</p>
        </div>

        <form className="space-y-4 border border-[#E8E4DB] bg-white p-7">
          <div>
            <label className="mb-1 block text-[11.5px] text-[#8A8474]">Username</label>
            <input
              disabled
              className="w-full rounded-md border border-[#E8E4DB] bg-[#FAF9F6] px-3 py-2.5 text-[13px] outline-none placeholder:text-[#C9C2B2]"
              placeholder="your ARN account"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11.5px] text-[#8A8474]">Password</label>
            <input
              disabled
              type="password"
              className="w-full rounded-md border border-[#E8E4DB] bg-[#FAF9F6] px-3 py-2.5 text-[13px] outline-none placeholder:text-[#C9C2B2]"
              placeholder="6 characters or more"
            />
          </div>
          <div className="flex items-center justify-between text-[11.5px] text-[#8A8474]">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" disabled /> Stay signed in
            </label>
            <span className="cursor-not-allowed text-[#0A6470]">Forgot password?</span>
          </div>
          <Link
            href="/dashboard"
            className="block rounded-md bg-[#0A7E8A] py-2.5 text-center text-[13px] font-medium text-white hover:bg-[#0A6470]"
          >
            Sign in
          </Link>
          <div className="relative py-1 text-center">
            <span className="absolute inset-x-0 top-1/2 h-px bg-[#E8E4DB]" />
            <span className="relative bg-white px-2 text-[10.5px] text-[#8A8474]">or</span>
          </div>
          <Link
            href="/dashboard"
            className="block rounded-md border border-[#E8E4DB] bg-white py-2.5 text-center text-[13px] text-[#1A2E35] hover:bg-[#FAF9F6]"
          >
            Sign in with a one-time code
          </Link>
        </form>

        <p className="mt-4 text-center text-[10.5px] leading-relaxed text-[#8A8474]">
          By signing in you accept the Terms of Use.
          <br />
          Demo build, forms are inert until the API is connected.
        </p>
      </div>
    </main>
  );
}

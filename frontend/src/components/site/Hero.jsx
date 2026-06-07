import { useEffect, useState } from "react";
import { api, fmt } from "@/lib/api";
import { Link } from "react-router-dom";

export const Hero = () => {
  const [top, setTop] = useState([]);
  useEffect(() => {
    api.get("/trends/all-time?limit=8").then((r) => setTop(r.data)).catch(() => {});
  }, []);

  return (
    <section data-testid="hero-section" className="relative border-b border-black">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 lg:py-16 grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-12 lg:col-span-8 stagger-in">
          <div className="overline text-[#52525b] mb-6">
            VOL. 01 — A LIVING INDEX OF HUMAN CURIOSITY
          </div>
          <h1 className="font-display font-extrabold tracking-tighter leading-[0.92] text-5xl sm:text-6xl lg:text-[112px]">
            What the world<br />
            is searching for<br />
            <span className="text-[#ff3b30]">right now.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base lg:text-lg text-[#52525b]">
            The Search Atlas is a quiet, obsessive ledger of the planet&apos;s
            most googled words — all-time icons, today&apos;s tremors, and the
            small things that nations type when they think no one is watching.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              data-testid="hero-cta-dashboard"
              className="hard-shadow border border-black bg-black text-white px-6 py-3 overline"
            >
              Open the Dashboard →
            </Link>
            <Link
              to="/game"
              data-testid="hero-cta-game"
              className="hard-shadow border border-black bg-white text-black px-6 py-3 overline"
            >
              Play Higher / Lower
            </Link>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4 border border-black p-6 stagger-in" style={{ animationDelay: "120ms" }}>
          <div className="flex items-baseline justify-between mb-4 border-b border-black/30 pb-3">
            <span className="overline">All-time top 8</span>
            <span className="font-mono text-xs text-[#52525b]">est. monthly searches</span>
          </div>
          <ol className="divide-y divide-black/15">
            {top.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-3" data-testid={`alltime-row-${t.rank}`}>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#52525b] w-6">
                    {String(t.rank).padStart(2, "0")}
                  </span>
                  <span className="font-display font-bold text-lg tracking-tight">{t.term}</span>
                </div>
                <span className="font-mono text-sm">{fmt(t.volume)}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
};

export default Hero;

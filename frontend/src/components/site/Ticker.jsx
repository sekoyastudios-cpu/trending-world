import { useEffect, useState } from "react";
import { api, fmt } from "@/lib/api";

export const Ticker = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/trends/ticker").then((r) => setItems(r.data)).catch(() => {});
  }, []);

  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <div
      data-testid="trends-ticker"
      className="bg-[#f4f4f5] border-y border-black overflow-hidden"
    >
      <div className="ticker-track py-2.5">
        {loop.map((t, i) => (
          <span key={i} className="font-mono text-xs uppercase tracking-[0.15em] px-6 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#ff3b30] inline-block" />
            {t.term}
            <span className="text-[#52525b]">/ {fmt(t.volume)}</span>
            <span className={t.delta >= 0 ? "text-[#ff3b30]" : "text-[#52525b]"}>
              {t.delta >= 0 ? "▲" : "▼"} {Math.abs(t.delta)}%
            </span>
            <span className="text-[#52525b] mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;

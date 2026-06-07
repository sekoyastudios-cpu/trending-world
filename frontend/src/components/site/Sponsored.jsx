import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export const Sponsored = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get("/sponsored").then((r) => setData(r.data)).catch(() => {});
  }, []);
  if (!data) return null;
  return (
    <section data-testid="sponsored-slot" className="border-b border-black">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-12 gap-0 border-l border-t border-black">
        <div className="md:col-span-7 border-r border-b border-black bg-black text-white p-8 lg:p-12 relative overflow-hidden">
          <div className="overline opacity-70 mb-4">{data.label}</div>
          <h3 className="font-display font-extrabold tracking-tighter text-4xl lg:text-6xl leading-[0.95]">
            {data.tagline}
          </h3>
          <p className="mt-6 max-w-md text-sm text-white/70">
            This week&apos;s Search Atlas is brought to you by {data.brand}. A single tasteful slot — that&apos;s all we sell.
          </p>
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            data-testid="sponsored-cta"
            className="inline-block mt-8 overline border border-white px-5 py-2.5 hover:bg-white hover:text-black transition-colors"
          >
            See the campaign →
          </a>
        </div>
        <div className="md:col-span-5 border-r border-b border-black">
          <img src={data.image} alt={data.brand} className="w-full h-full object-cover min-h-[260px]" />
        </div>
      </div>
    </section>
  );
};

export default Sponsored;

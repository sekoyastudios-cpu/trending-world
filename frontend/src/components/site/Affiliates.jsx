import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export const Affiliates = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/affiliates").then((r) => setItems(r.data)).catch(() => {});
  }, []);

  const handleClick = (id) => {
    // fire-and-forget — never block the navigation
    api.post("/affiliates/click", { affiliate_id: id }).catch(() => {});
  };

  return (
    <section data-testid="affiliates-section" className="border-b border-black">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="overline text-[#52525b]">Section 05 · The Shelf</div>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tighter">
              What people search, they also buy.
            </h2>
          </div>
          <span className="font-mono text-xs text-[#52525b] hidden md:block">Affiliate links · we may earn a commission</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-black">
          {items.map((a) => (
            <a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noreferrer noopener sponsored"
              onClick={() => handleClick(a.id)}
              data-testid={`affiliate-card-${a.id}`}
              className="block border-r border-b border-black p-5 hover:bg-[#fafafa] transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden border border-black mb-4 bg-black">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="overline text-[#52525b] mb-2">Trending product</div>
              <h3 className="font-display font-extrabold text-2xl tracking-tight">{a.title}</h3>
              <p className="text-sm text-[#52525b] mt-1">{a.subtitle}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-sm">{a.price}</span>
                <span className="overline text-[#ff3b30]">Shop →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Affiliates;

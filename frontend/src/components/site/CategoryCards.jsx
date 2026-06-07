import { useEffect, useState } from "react";
import { api, fmt } from "@/lib/api";

const CARDS = [
  { key: "People", image: "https://images.pexels.com/photos/17718209/pexels-photo-17718209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", note: "Faces the world types into the search bar." },
  { key: "Tech", image: "https://images.pexels.com/photos/30639091/pexels-photo-30639091.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", note: "Software, gadgets, and the prompts we share." },
  { key: "Places", image: "https://images.pexels.com/photos/37126955/pexels-photo-37126955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", note: "Where dreams, holidays, and breaking news collide." },
];

export const CategoryCards = () => {
  const [byCat, setByCat] = useState({});
  useEffect(() => {
    Promise.all(
      CARDS.map((c) =>
        api.get(`/trends/now?country=GLOBAL&category=${c.key}&limit=4`).then((r) => [c.key, r.data])
      )
    ).then((entries) => setByCat(Object.fromEntries(entries))).catch(() => {});
  }, []);

  return (
    <section data-testid="category-cards" className="border-b border-black">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="overline text-[#52525b]">Section 02</div>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tighter">
              The Three Obsessions
            </h2>
          </div>
          <span className="font-mono text-xs text-[#52525b] hidden md:block">people · tech · places</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-black">
          {CARDS.map((c, i) => (
            <article
              key={c.key}
              data-testid={`category-card-${c.key.toLowerCase()}`}
              className="border-r border-b border-black p-6 bg-white relative"
            >
              <div className="aspect-[4/3] overflow-hidden border border-black mb-5 bg-black">
                <img
                  src={c.image}
                  alt={c.key}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display font-extrabold text-2xl tracking-tight">{c.key}</h3>
                <span className="overline text-[#52525b]">CAT-{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-sm text-[#52525b] mt-2">{c.note}</p>
              <ul className="mt-5 divide-y divide-black/10 border-t border-black/15">
                {(byCat[c.key] || []).map((t) => (
                  <li key={t.id} className="flex justify-between py-2.5">
                    <span className="font-sans text-sm">{t.term}</span>
                    <span className="font-mono text-xs text-[#52525b]">{fmt(t.volume)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;

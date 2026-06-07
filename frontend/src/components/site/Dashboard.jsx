import { useEffect, useMemo, useState } from "react";
import { api, fmt } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [country, setCountry] = useState("GLOBAL");
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get("/trends/countries").then((r) => setCountries(r.data));
    api.get("/trends/categories").then((r) => setCategories(r.data));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams({ country, limit: "10" });
    if (category !== "All") params.append("category", category);
    api.get(`/trends/now?${params.toString()}`).then((r) => setItems(r.data));
  }, [country, category]);

  const filtered = useMemo(
    () => items.filter((t) => t.term.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  const chartData = filtered.map((t, i) => ({
    name: t.term,
    volume: t.volume,
    highlight: i === 0,
  }));

  const total = filtered.reduce((s, t) => s + t.volume, 0);

  return (
    <section data-testid="dashboard-section" className="border-b border-black">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <div className="overline text-[#52525b]">Section 03 · Control Room</div>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tighter">
              Trending right now
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              data-testid="dashboard-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter on this list…"
              className="border border-black px-3 py-2 font-mono text-xs uppercase tracking-widest bg-white focus:outline-none focus:ring-0 placeholder:text-[#a1a1aa] w-56"
            />
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger data-testid="country-select" className="rounded-none border-black w-44 font-mono text-xs uppercase">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black">
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.code} className="rounded-none font-mono text-xs uppercase">
                    {c.code} — {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-testid="category-select" className="rounded-none border-black w-40 font-mono text-xs uppercase">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black">
                {categories.map((c) => (
                  <SelectItem key={c} value={c} className="rounded-none font-mono text-xs uppercase">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-black">
          {/* Big number panel */}
          <div className="lg:col-span-4 border-r border-b border-black p-6">
            <div className="overline text-[#52525b]">Aggregate volume</div>
            <div className="mt-3 font-display font-extrabold tracking-tighter leading-none text-5xl lg:text-6xl">
              {fmt(total)}
            </div>
            <p className="mt-3 font-mono text-xs text-[#52525b]">
              Estimated monthly searches across the top {filtered.length} terms in {country}{category !== "All" ? ` · ${category}` : ""}.
            </p>
            <div className="mt-6 border-t border-black/15 pt-4">
              <div className="overline text-[#52525b] mb-3">Top 5</div>
              <ol className="space-y-2">
                {filtered.slice(0, 5).map((t, i) => (
                  <li key={t.id} className="flex justify-between font-mono text-xs">
                    <span>
                      <span className="text-[#52525b] mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {t.term}
                    </span>
                    <span className={t.delta >= 0 ? "text-[#ff3b30]" : "text-[#52525b]"}>
                      {t.delta >= 0 ? "▲" : "▼"} {Math.abs(t.delta)}%
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-8 border-r border-b border-black p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="overline text-[#52525b]">Volume distribution</div>
              <div className="font-mono text-xs text-[#52525b]">
                ▣ leader highlighted
              </div>
            </div>
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 40 }}>
                  <CartesianGrid stroke="#e4e4e7" strokeDasharray="2 2" vertical={false} />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                    height={70}
                    tick={{ fontFamily: "IBM Plex Mono", fontSize: 11, fill: "#52525b" }}
                    stroke="#0a0a0a"
                  />
                  <YAxis
                    tick={{ fontFamily: "IBM Plex Mono", fontSize: 11, fill: "#52525b" }}
                    tickFormatter={(v) => fmt(v)}
                    stroke="#0a0a0a"
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    contentStyle={{ borderRadius: 0, border: "1px solid #0a0a0a", fontFamily: "IBM Plex Mono", fontSize: 12 }}
                    formatter={(v) => fmt(v)}
                  />
                  <Bar dataKey="volume" isAnimationActive>
                    {chartData.map((d, i) => (
                      <Cell key={i} fill={d.highlight ? "#ff3b30" : "#0a0a0a"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Raw table */}
        <div className="border-l border-r border-b border-black overflow-x-auto">
          <table className="w-full" data-testid="trends-table">
            <thead className="bg-[#f4f4f5] border-b border-black">
              <tr className="overline text-left">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Term</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Volume</th>
                <th className="px-4 py-3 text-right">Δ Week</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id} className="border-b border-black/10 hover:bg-[#fafafa]" data-testid={`trend-row-${i + 1}`}>
                  <td className="px-4 py-3 font-mono text-xs text-[#52525b]">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-4 py-3 font-display font-semibold tracking-tight">{t.term}</td>
                  <td className="px-4 py-3 font-mono text-xs uppercase text-[#52525b]">{t.category}</td>
                  <td className="px-4 py-3 font-mono text-sm text-right">{fmt(t.volume)}</td>
                  <td className={`px-4 py-3 font-mono text-xs text-right ${t.delta >= 0 ? "text-[#ff3b30]" : "text-[#52525b]"}`}>
                    {t.delta >= 0 ? "▲" : "▼"} {Math.abs(t.delta)}%
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center font-mono text-xs text-[#52525b]">
                    No matches in the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

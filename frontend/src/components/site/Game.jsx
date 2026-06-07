import { useEffect, useState } from "react";
import { api, fmt } from "@/lib/api";
import { toast } from "sonner";

const Side = ({ side, trend, reveal, onPick, disabled }) => {
  const isRevealed = !!reveal;
  const isWinner = reveal?.winner === side;
  const wasPick = reveal?.pick === side;
  return (
    <button
      data-testid={`game-${side}-button`}
      onClick={() => onPick(side)}
      disabled={isRevealed || disabled}
      className={`group relative w-full text-left p-8 lg:p-12 border-r border-b border-black transition-colors duration-300 ${
        side === "right" ? "md:border-r-0" : ""
      } ${
        isRevealed
          ? isWinner
            ? "bg-[#ff3b30] text-white"
            : "bg-[#f4f4f5] text-[#52525b]"
          : "bg-white hover:bg-black hover:text-white"
      }`}
    >
      <div className="overline opacity-70 mb-6">
        {trend.country === "GLOBAL" ? "Global" : trend.country} · {trend.category}
      </div>
      <div className="font-display font-extrabold tracking-tighter leading-[0.95] text-4xl sm:text-5xl lg:text-7xl">
        {trend.term}
      </div>
      <div className="mt-10 overline opacity-70">
        {isRevealed ? "Monthly searches" : "Pick the more searched →"}
      </div>
      <div className="mt-2 font-mono text-2xl lg:text-3xl">
        {isRevealed ? fmt(side === "left" ? reveal.left_volume : reveal.right_volume) : "▓▓▓▓"}
      </div>
      {isRevealed && wasPick && (
        <div className="absolute top-4 right-4 overline border border-current px-2 py-1">
          Your pick
        </div>
      )}
    </button>
  );
};

export const Game = () => {
  const [pair, setPair] = useState(null);
  const [reveal, setReveal] = useState(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("sa.best") || 0));
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await api.get("/game/pair");
        if (alive) {
          setPair(data);
          setReveal(null);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [reloadKey]);

  const nextPair = () => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const guess = async (pick) => {
    if (!pair || reveal) return;
    const { data } = await api.post("/game/guess", {
      pair_id: pair.pair_id,
      pick,
      left_id: pair.left.id,
      right_id: pair.right.id,
    });
    setReveal({ ...data, pick });
    if (data.correct) {
      const next = score + 1;
      setScore(next);
      if (next > best) {
        setBest(next);
        localStorage.setItem("sa.best", String(next));
      }
      toast.success("Correct.", { description: `+1 — streak ${next}` });
    } else {
      toast.error("Wrong.", { description: `Streak ended at ${score}` });
      setScore(0);
    }
  };

  if (!pair) {
    return (
      <section data-testid="game-section" className="border-b border-black">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 text-center font-mono text-xs uppercase tracking-widest text-[#52525b]">
          Loading game…
        </div>
      </section>
    );
  }

  return (
    <section data-testid="game-section" className="border-b border-black">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <div className="overline text-[#52525b]">Section 04 · Game</div>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tighter">
              Higher / Lower
            </h2>
            <p className="text-sm text-[#52525b] mt-2 max-w-xl">
              Two terms. One is searched more than the other. Trust your gut.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <div className="overline text-[#52525b]">Streak</div>
              <div className="font-display font-extrabold text-3xl" data-testid="game-streak">{score}</div>
            </div>
            <div>
              <div className="overline text-[#52525b]">Best</div>
              <div className="font-display font-extrabold text-3xl" data-testid="game-best">{best}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-black">
          <Side side="left" trend={pair.left} reveal={reveal} onPick={guess} disabled={loading} />
          <Side side="right" trend={pair.right} reveal={reveal} onPick={guess} disabled={loading} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            data-testid="game-next-button"
            onClick={nextPair}
            disabled={loading}
            className="hard-shadow border border-black bg-black text-white px-5 py-2.5 overline disabled:opacity-50"
          >
            {reveal ? "Next round →" : "Skip"}
          </button>
          {reveal && (
            <span className="font-mono text-xs text-[#52525b]" data-testid="game-result-label">
              {reveal.correct ? "Correct. The world types more about your pick." : "Wrong. The other one wins."}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Game;

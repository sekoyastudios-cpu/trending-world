import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await api.post("/newsletter/subscribe", { email });
      toast.success("You're in.", { description: "We'll send Monday's index to your inbox." });
      setEmail("");
    } catch (err) {
      toast.error("Couldn't subscribe", { description: err?.response?.data?.detail || "Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section data-testid="newsletter-section" className="border-b border-black bg-[#f4f4f5]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="overline text-[#52525b] mb-4">The Monday Index</div>
          <h2 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tighter leading-[0.95]">
            One quiet email.<br />
            <span className="text-[#ff3b30]">A week of curiosity.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-[#52525b]">
            Every Monday at 8am — the 10 most surprising searches of the week, hand-picked.
            No tracking pixels. No 20-link digests. Unsubscribe with one click.
          </p>
        </div>
        <form onSubmit={submit} className="lg:col-span-5 flex flex-col justify-end" data-testid="newsletter-form">
          <label className="overline text-[#52525b] mb-3">Your email</label>
          <div className="flex border border-black bg-white">
            <input
              data-testid="newsletter-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@curious.world"
              className="flex-1 px-4 py-4 font-mono text-sm focus:outline-none"
            />
            <button
              data-testid="newsletter-submit-button"
              type="submit"
              disabled={busy}
              className="bg-black text-white px-6 overline hover:bg-[#ff3b30] transition-colors disabled:opacity-50"
            >
              {busy ? "Sending…" : "Subscribe →"}
            </button>
          </div>
          <p className="font-mono text-xs text-[#52525b] mt-3">
            Joined by 12,408 quietly curious people.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;

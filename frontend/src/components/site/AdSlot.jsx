import { useEffect, useRef } from "react";

/**
 * AdSlot
 * - If REACT_APP_ADSENSE_CLIENT and a `slot` are provided, renders a Google AdSense unit.
 * - Otherwise renders a tasteful, on-brand placeholder labeled "AD SPACE".
 *
 * To activate live ads:
 *   1. Add REACT_APP_ADSENSE_CLIENT="ca-pub-XXXXXXXX" to frontend/.env
 *   2. Add the AdSense script tag to public/index.html (see README).
 *   3. Pass per-placement `slot` IDs from your AdSense dashboard.
 */
export const AdSlot = ({
  slot,
  format = "auto",
  variant = "banner", // 'banner' | 'rectangle' | 'leaderboard'
  label = "AD",
  testId,
}) => {
  const client = process.env.REACT_APP_ADSENSE_CLIENT;
  const insRef = useRef(null);

  useEffect(() => {
    if (!client || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // adsbygoogle not loaded yet — silent
    }
  }, [client, slot]);

  const heights = {
    banner: "h-[120px] md:h-[120px]",
    leaderboard: "h-[90px] md:h-[120px]",
    rectangle: "h-[250px] md:h-[280px]",
  };

  if (!client || !slot) {
    return (
      <div data-testid={testId || "ad-slot-placeholder"} className="border-y border-black bg-[#f4f4f5]">
        <div className={`mx-auto max-w-[1400px] px-6 lg:px-10 ${heights[variant]} flex items-center justify-between`}>
          <span className="overline text-[#52525b]">{label} · Your ad here</span>
          <span className="font-mono text-xs text-[#52525b] hidden md:block">
            Set REACT_APP_ADSENSE_CLIENT to activate
          </span>
        </div>
      </div>
    );
  }

  return (
    <div data-testid={testId || "ad-slot-live"} className="border-y border-black bg-white">
      <div className={`mx-auto max-w-[1400px] px-6 lg:px-10 ${heights[variant]} flex items-center justify-center`}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AdSlot;

import Header from "@/components/site/Header";
import Ticker from "@/components/site/Ticker";
import Game from "@/components/site/Game";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";
import AdSlot from "@/components/site/AdSlot";

export default function GamePage() {
  return (
    <div data-testid="game-page" className="bg-white text-[#0a0a0a]">
      <Header />
      <Ticker />
      <Game />
      <AdSlot slot={process.env.REACT_APP_ADSENSE_SLOT_GAME} variant="banner" label="AD · Game" testId="ad-slot-game" />
      <Newsletter />
      <Footer />
    </div>
  );
}

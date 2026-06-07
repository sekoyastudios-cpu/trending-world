import Header from "@/components/site/Header";
import Ticker from "@/components/site/Ticker";
import Game from "@/components/site/Game";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";

export default function GamePage() {
  return (
    <div data-testid="game-page" className="bg-white text-[#0a0a0a]">
      <Header />
      <Ticker />
      <Game />
      <Newsletter />
      <Footer />
    </div>
  );
}

import Header from "@/components/site/Header";
import Ticker from "@/components/site/Ticker";
import Hero from "@/components/site/Hero";
import CategoryCards from "@/components/site/CategoryCards";
import Sponsored from "@/components/site/Sponsored";
import Affiliates from "@/components/site/Affiliates";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";
import AdSlot from "@/components/site/AdSlot";

export default function HomePage() {
  return (
    <div data-testid="home-page" className="bg-white text-[#0a0a0a]">
      <Header />
      <Ticker />
      <AdSlot slot={process.env.REACT_APP_ADSENSE_SLOT_TOP} variant="leaderboard" label="AD · Header" testId="ad-slot-top" />
      <Hero />
      <CategoryCards />
      <AdSlot slot={process.env.REACT_APP_ADSENSE_SLOT_MID} variant="rectangle" label="AD · Mid" testId="ad-slot-mid" />
      <Sponsored />
      <Affiliates />
      <AdSlot slot={process.env.REACT_APP_ADSENSE_SLOT_FOOTER} variant="banner" label="AD · Footer" testId="ad-slot-footer" />
      <Newsletter />
      <Footer />
    </div>
  );
}

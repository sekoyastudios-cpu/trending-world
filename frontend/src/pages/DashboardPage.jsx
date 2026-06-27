import Header from "@/components/site/Header";
import Ticker from "@/components/site/Ticker";
import Dashboard from "@/components/site/Dashboard";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";
import AdSlot from "@/components/site/AdSlot";

export default function DashboardPage() {
  return (
    <div data-testid="dashboard-page" className="bg-white text-[#0a0a0a]">
      <Header />
      <Ticker />
      <AdSlot slot={process.env.REACT_APP_ADSENSE_SLOT_TOP} variant="leaderboard" label="AD · Dashboard top" testId="ad-slot-dashboard-top" />
      <Dashboard />
      <Newsletter />
      <Footer />
    </div>
  );
}

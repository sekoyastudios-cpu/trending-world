import Header from "@/components/site/Header";
import Ticker from "@/components/site/Ticker";
import Dashboard from "@/components/site/Dashboard";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";

export default function DashboardPage() {
  return (
    <div data-testid="dashboard-page" className="bg-white text-[#0a0a0a]">
      <Header />
      <Ticker />
      <Dashboard />
      <Newsletter />
      <Footer />
    </div>
  );
}

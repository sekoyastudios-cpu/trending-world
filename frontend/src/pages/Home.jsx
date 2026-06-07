import Header from "@/components/site/Header";
import Ticker from "@/components/site/Ticker";
import Hero from "@/components/site/Hero";
import CategoryCards from "@/components/site/CategoryCards";
import Sponsored from "@/components/site/Sponsored";
import Affiliates from "@/components/site/Affiliates";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";

export default function HomePage() {
  return (
    <div data-testid="home-page" className="bg-white text-[#0a0a0a]">
      <Header />
      <Ticker />
      <Hero />
      <CategoryCards />
      <Sponsored />
      <Affiliates />
      <Newsletter />
      <Footer />
    </div>
  );
}

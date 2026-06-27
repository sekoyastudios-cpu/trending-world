import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "@/pages/Home";
import DashboardPage from "@/pages/DashboardPage";
import GamePage from "@/pages/GamePage";

// Stripe & AdSense env config
const STRIPE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
const ADSENSE_ID = process.env.REACT_APP_ADSENSE_CLIENT_ID || '';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" theme="light" />
    </div>
  );
}

export default App;

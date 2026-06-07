import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "Atlas", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Higher / Lower", to: "/game" },
];

export const Header = () => {
  const loc = useLocation();
  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50 bg-white border-b border-black"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center justify-between h-16">
        <Link to="/" data-testid="logo-link" className="flex items-center gap-3">
          <span className="w-3 h-3 bg-[#ff3b30] inline-block" />
          <span className="font-display font-extrabold text-xl tracking-tighter">
            THE SEARCH ATLAS
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => {
            const active = loc.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                data-testid={`nav-${n.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className={`overline px-4 py-2 border ${
                  active
                    ? "bg-black text-white border-black"
                    : "border-transparent hover:border-black"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <span className="overline text-[#52525b]">ISSUE</span>
          <span className="font-mono text-xs">№ {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

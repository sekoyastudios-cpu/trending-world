export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="font-display font-extrabold tracking-tighter text-3xl">THE SEARCH ATLAS</div>
          <p className="mt-3 text-sm text-white/60 max-w-sm">
            An editorial index of the world&apos;s most googled curiosities. Made for people who notice patterns.
          </p>
        </div>
        <div>
          <div className="overline text-white/50 mb-3">Sections</div>
          <ul className="space-y-2 text-sm">
            <li>Atlas</li>
            <li>Dashboard</li>
            <li>Higher / Lower</li>
            <li>The Shelf</li>
          </ul>
        </div>
        <div>
          <div className="overline text-white/50 mb-3">Colophon</div>
          <ul className="space-y-2 text-sm font-mono">
            <li>Set in Cabinet Grotesk</li>
            <li>& IBM Plex Mono</li>
            <li>© {new Date().getFullYear()} Search Atlas</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

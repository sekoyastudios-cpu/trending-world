import React, { useState, useEffect } from 'react';

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const translations = {
  en: {
    lang: 'EN', flag: '🇺🇸',
    nav_home: 'Home', nav_features: 'Features', nav_pricing: 'Pricing', nav_about: 'About',
    hero_badge: '🚀 Version 2.0 — AI Business OS',
    hero_title_1: 'UNIVERS',
    hero_title_2: 'TREND',
    hero_sub: 'Every Search. Every Trend. Every Opportunity.',
    hero_tagline: 'ENDLESS WAYS TO MAKE MONEY.',
    hero_desc: 'The world\'s first AI Business Operating System. Detect profitable opportunities before they go mainstream, and automatically build businesses around them.',
    hero_cta1: 'Start for Free',
    hero_cta2: 'Watch Demo',
    hero_stat1: 'Data Sources', hero_stat2: 'AI Modules', hero_stat3: 'Countries', hero_stat4: 'Time to Launch',
    hero_val1: '20+', hero_val2: '12', hero_val3: '195', hero_val4: '< 1hr',
    search_placeholder: 'Enter a keyword, industry or idea...',
    search_btn: 'Scan Opportunities',
    modules_title: 'Everything You Need to Build a Business',
    modules_sub: 'UniversTrend Version 2.0 — 12 AI Modules working together',
    vision_title: 'Our Vision',
    vision_desc: 'UniversTrend becomes the operating system for entrepreneurs, creators, startups, investors, agencies, and companies worldwide. A user can go from an idea to a fully operational business in less than one hour.',
    pricing_title: 'Simple Pricing',
    pricing_sub: 'Start free. Scale when you\'re ready.',
    free: 'Free', starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise',
    footer_copy: '© 2025 UniversTrend. All rights reserved.',
    footer_desc: 'The World\'s First AI Business Operating System.',
  },
  fr: {
    lang: 'FR', flag: '🇫🇷',
    nav_home: 'Accueil', nav_features: 'Fonctionnalités', nav_pricing: 'Tarifs', nav_about: 'À propos',
    hero_badge: '🚀 Version 2.0 — Système IA pour Entrepreneurs',
    hero_title_1: 'UNIVERS', hero_title_2: 'TREND',
    hero_sub: 'Chaque Recherche. Chaque Tendance. Chaque Opportunité.',
    hero_tagline: 'DES FAÇONS INFINIES DE GAGNER DE L\'ARGENT.',
    hero_desc: 'Le premier système d\'exploitation IA au monde pour les entrepreneurs. Détectez les opportunités rentables avant qu\'elles deviennent mainstream et construisez des entreprises automatiquement.',
    hero_cta1: 'Commencer Gratuitement', hero_cta2: 'Voir la Démo',
    hero_stat1: 'Sources de Données', hero_stat2: 'Modules IA', hero_stat3: 'Pays', hero_stat4: 'Temps de Lancement',
    hero_val1: '20+', hero_val2: '12', hero_val3: '195', hero_val4: '< 1h',
    search_placeholder: 'Entrez un mot-clé, secteur ou idée...',
    search_btn: 'Scanner les Opportunités',
    modules_title: 'Tout ce qu\'il faut pour Construire un Business',
    modules_sub: 'UniversTrend V2.0 — 12 Modules IA qui travaillent ensemble',
    vision_title: 'Notre Vision',
    vision_desc: 'UniversTrend devient le système d\'exploitation pour entrepreneurs, créateurs, startups, investisseurs, agences et entreprises du monde entier. Un utilisateur peut passer d\'une idée à une entreprise opérationnelle en moins d\'une heure.',
    pricing_title: 'Tarification Simple',
    pricing_sub: 'Commencez gratuitement. Évoluez quand vous êtes prêt.',
    free: 'Gratuit', starter: 'Starter', pro: 'Pro', enterprise: 'Entreprise',
    footer_copy: '© 2025 UniversTrend. Tous droits réservés.',
    footer_desc: 'Le Premier Système d\'Exploitation IA pour Entrepreneurs.',
  },
  zh: {
    lang: '中文', flag: '🇨🇳',
    nav_home: '首页', nav_features: '功能', nav_pricing: '定价', nav_about: '关于',
    hero_badge: '🚀 2.0版本 — AI商业操作系统',
    hero_title_1: 'UNIVERS', hero_title_2: 'TREND',
    hero_sub: '每次搜索。每个趋势。每个机会。',
    hero_tagline: '无限赚钱方式。',
    hero_desc: '全球首个AI商业操作系统。在机会成为主流之前发现它们，并自动围绕它们构建业务。',
    hero_cta1: '免费开始', hero_cta2: '观看演示',
    hero_stat1: '数据来源', hero_stat2: 'AI模块', hero_stat3: '国家', hero_stat4: '启动时间',
    hero_val1: '20+', hero_val2: '12', hero_val3: '195', hero_val4: '< 1小时',
    search_placeholder: '输入关键词、行业或想法...',
    search_btn: '扫描机会',
    modules_title: '构建业务所需的一切',
    modules_sub: 'UniversTrend 2.0版 — 12个AI模块协同工作',
    vision_title: '我们的愿景',
    vision_desc: 'UniversTrend成为全球企业家、创作者、初创企业、投资者、机构和公司的操作系统。用户可以在不到一小时内从想法到完全运营的业务。',
    pricing_title: '简单定价',
    pricing_sub: '免费开始。准备好后再扩展。',
    free: '免费', starter: '入门版', pro: '专业版', enterprise: '企业版',
    footer_copy: '© 2025 UniversTrend。保留所有权利。',
    footer_desc: '全球首个AI商业操作系统。',
  },
  ja: {
    lang: '日本語', flag: '🇯🇵',
    nav_home: 'ホーム', nav_features: '機能', nav_pricing: '料金', nav_about: '概要',
    hero_badge: '🚀 バージョン2.0 — AIビジネスOS',
    hero_title_1: 'UNIVERS', hero_title_2: 'TREND',
    hero_sub: 'すべての検索。すべてのトレンド。すべての機会。',
    hero_tagline: '無限のお金を稼ぐ方法。',
    hero_desc: '世界初のAIビジネスオペレーティングシステム。収益性の高い機会をメインストリームになる前に検出し、自動的にビジネスを構築します。',
    hero_cta1: '無料で始める', hero_cta2: 'デモを見る',
    hero_stat1: 'データソース', hero_stat2: 'AIモジュール', hero_stat3: '国', hero_stat4: '起動時間',
    hero_val1: '20+', hero_val2: '12', hero_val3: '195', hero_val4: '< 1時間',
    search_placeholder: 'キーワード、業界、またはアイデアを入力...',
    search_btn: 'チャンスをスキャン',
    modules_title: 'ビジネス構築に必要なすべて',
    modules_sub: 'UniversTrend V2.0 — 12のAIモジュールが連携',
    vision_title: '私たちのビジョン',
    vision_desc: 'UniversTrendは世界中の起業家、クリエイター、スタートアップ、投資家、代理店、企業のOSになります。ユーザーは1時間以内にアイデアから完全稼働のビジネスへ。',
    pricing_title: 'シンプルな料金体系',
    pricing_sub: '無料で始めましょう。準備ができたらスケールアップ。',
    free: '無料', starter: 'スターター', pro: 'プロ', enterprise: 'エンタープライズ',
    footer_copy: '© 2025 UniversTrend. All rights reserved.',
    footer_desc: '世界初のAIビジネスオペレーティングシステム。',
  },
  ko: {
    lang: '한국어', flag: '🇰🇷',
    nav_home: '홈', nav_features: '기능', nav_pricing: '요금', nav_about: '소개',
    hero_badge: '🚀 버전 2.0 — AI 비즈니스 OS',
    hero_title_1: 'UNIVERS', hero_title_2: 'TREND',
    hero_sub: '모든 검색. 모든 트렌드. 모든 기회.',
    hero_tagline: '돈을 버는 무한한 방법.',
    hero_desc: '세계 최초의 AI 비즈니스 운영 체제. 트렌드가 주류가 되기 전에 수익성 높은 기회를 발견하고 자동으로 비즈니스를 구축하세요.',
    hero_cta1: '무료로 시작', hero_cta2: '데모 보기',
    hero_stat1: '데이터 소스', hero_stat2: 'AI 모듈', hero_stat3: '국가', hero_stat4: '출시 시간',
    hero_val1: '20+', hero_val2: '12', hero_val3: '195', hero_val4: '< 1시간',
    search_btn: '기회 스캔',
    modules_title: '비즈니스 구축에 필요한 모든 것',
    modules_sub: 'UniversTrend V2.0 — 12개의 AI 모듈이 함께 작동',
    vision_title: '우리의 비전',
    vision_desc: 'UniversTrend는 전 세계 기업가, 크리에이터, 스타트업, 투자자, 에이전시, 기업의 운영 체제가 됩니다. 사용자는 1시간 이내에 아이디어에서 완전히 운영되는 비즈니스로 갈 수 있습니다.',
    pricing_title: '간단한 요금제',
    pricing_sub: '무료로 시작하세요. 준비가 되면 확장하세요.',
    free: '무료', starter: '스타터', pro: '프로', enterprise: '엔터프라이즈',
    footer_copy: '© 2025 UniversTrend. All rights reserved.',
    footer_desc: '세계 최초의 AI 비즈니스 운영 체제.',
  },
  ar: {
    lang: 'عربي', flag: '🇸🇦',
    nav_home: 'الرئيسية', nav_features: 'الميزات', nav_pricing: 'الأسعار', nav_about: 'عن المنصة',
    hero_badge: '🚀 الإصدار 2.0 — نظام تشغيل الأعمال بالذكاء الاصطناعي',
    hero_title_1: 'UNIVERS', hero_title_2: 'TREND',
    hero_sub: 'كل بحث. كل اتجاه. كل فرصة.',
    hero_tagline: 'طرق لا نهاية لها لكسب المال.',
    hero_desc: 'أول نظام تشغيل تجاري بالذكاء الاصطناعي في العالم. اكتشف الفرص المربحة قبل أن تصبح سائدة وابنِ الأعمال تلقائياً.',
    hero_cta1: 'ابدأ مجاناً', hero_cta2: 'شاهد العرض',
    hero_stat1: 'مصادر البيانات', hero_stat2: 'وحدات الذكاء الاصطناعي', hero_stat3: 'دولة', hero_stat4: 'وقت الإطلاق',
    hero_val1: '+20', hero_val2: '12', hero_val3: '195', hero_val4: '< ساعة',
    search_placeholder: 'أدخل كلمة مفتاحية أو صناعة أو فكرة...',
    search_btn: 'مسح الفرص',
    modules_title: 'كل ما تحتاجه لبناء عمل تجاري',
    modules_sub: 'UniversTrend V2.0 — 12 وحدة ذكاء اصطناعي تعمل معاً',
    vision_title: 'رؤيتنا',
    vision_desc: 'يصبح UniversTrend نظام التشغيل للرياديين والمبدعين والشركات الناشئة والمستثمرين والوكالات والشركات في جميع أنحاء العالم.',
    pricing_title: 'تسعير بسيط',
    pricing_sub: 'ابدأ مجاناً. وسّع عندما تكون مستعداً.',
    free: 'مجاني', starter: 'مبتدئ', pro: 'محترف', enterprise: 'مؤسسات',
    footer_copy: '© 2025 UniversTrend. جميع الحقوق محفوظة.',
    footer_desc: 'أول نظام تشغيل تجاري بالذكاء الاصطناعي في العالم.',
  },
};

// ─── AI MODULES DATA ─────────────────────────────────────────────────────────
const AI_MODULES = [
  { icon: '🌐', title: 'AI Global Scanner', color: '#00BFFF', desc: 'Scans 20+ platforms every hour: Google, Reddit, X, TikTok, YouTube, Amazon, LinkedIn, GitHub, App Store, Hacker News, Crunchbase, Patents & more.' },
  { icon: '💡', title: 'Opportunity Engine', color: '#00FF88', desc: 'Detects hidden markets, viral products, emerging startups, low-competition keywords. Generates an Opportunity Score 0–100.' },
  { icon: '🏗️', title: 'AI Business Builder', color: '#FFD700', desc: 'Auto-generates: Business Name, Domain, Logo, Brand Identity, Colors, Typography, Slogan, Mission, Vision, Elevator Pitch.' },
  { icon: '⚙️', title: 'AI Product Builder', color: '#FF6B6B', desc: 'Creates SaaS ideas, Mobile Apps, AI Agents, Chrome Extensions, APIs, Digital Products, Courses, Marketplaces, Communities.' },
  { icon: '🌍', title: 'AI Website Builder', color: '#A855F7', desc: 'Auto-generates Landing Page, Pricing, Features, Blog, FAQ, Contact, Privacy Policy, Terms, SEO Metadata — fully deployed.' },
  { icon: '📣', title: 'AI Marketing Machine', color: '#F97316', desc: 'Generates Google Ads, Facebook Ads, TikTok Campaigns, SEO Strategy, Email Marketing, Viral Campaigns, Influencer Strategy, Press Release.' },
  { icon: '💰', title: 'AI Sales Machine', color: '#EC4899', desc: 'Creates Sales Funnels, Cold Emails, CRM Pipeline, Sales Scripts, Follow-up Sequences, Lead Magnets.' },
  { icon: '📊', title: 'AI Finance', color: '#10B981', desc: 'Estimates Startup Cost, Revenue Forecast, Monthly/Yearly Profit, Break-even Point, CAC, LTV, ROI.' },
  { icon: '🔍', title: 'AI Competitor Intelligence', color: '#06B6D4', desc: 'Analyzes competitors: Weaknesses, Pricing, Traffic, Marketing Strategy, Keywords, Missing Features.' },
  { icon: '🤖', title: 'AI Automation', color: '#8B5CF6', desc: 'Auto-creates workflows using n8n, Make, Zapier, MCP Servers, APIs, Webhooks.' },
  { icon: '🚀', title: 'AI Launch', color: '#F59E0B', desc: 'Deploys Website, Database, Authentication, Stripe Payments, Analytics, SEO, Hosting on Vercel — all automated.' },
  { icon: '📈', title: 'AI Monitor & Coach', color: '#EF4444', desc: 'Tracks Revenue, Traffic, SEO Rankings, Competitors, New Trends. Daily personalized AI coaching for your business.' },
];

const DATA_SOURCES = [
  'Google Search', 'Google Trends', 'Reddit', 'X / Twitter', 'TikTok', 'YouTube',
  'Instagram', 'Facebook', 'LinkedIn', 'Amazon', 'Etsy', 'Shopify',
  'Product Hunt', 'GitHub', 'App Store', 'Google Play', 'Hacker News',
  'Crunchbase', 'News', 'Patents',
];

const PRICING_PLANS = [
  { key: 'free', price: '$0', period: '/mo', color: '#6B7280', features: ['5 Opportunity Scans/day', 'AI Business Builder', 'Basic Website Builder', 'Community Access'] },
  { key: 'starter', price: '$29', period: '/mo', color: '#00BFFF', features: ['100 Scans/day', 'All AI Modules', 'AI Marketing Machine', 'AI Sales Machine', 'Priority Support'] },
  { key: 'pro', price: '$79', period: '/mo', color: '#00FF88', popular: true, features: ['Unlimited Scans', 'AI Finance Module', 'Competitor Intelligence', 'AI Automation', 'AI Monitor & Coach', 'Custom Domain'] },
  { key: 'enterprise', price: 'Custom', period: '', color: '#FFD700', features: ['Market Intelligence', 'Consumer Trends', 'Innovation Reports', 'Predictive Analytics', 'Dedicated Manager', 'White Label'] },
];

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const handleScan = async () => {
    if (!searchVal.trim()) return;
    setScanning(true);
    setScanResult(null);
    await new Promise(r => setTimeout(r, 2000));
    setScanResult({
      score: Math.floor(Math.random() * 30) + 70,
      keyword: searchVal,
      trend: '+' + (Math.floor(Math.random() * 200) + 50) + '%',
      competition: ['Low', 'Medium'][Math.floor(Math.random() * 2)],
      markets: ['United States', 'Japan', 'South Korea', 'China', 'France', 'Brazil'].slice(0, 4),
      ideas: ['SaaS Platform', 'Mobile App', 'Chrome Extension', 'Digital Course', 'AI Agent'].slice(0, 3),
    });
    setScanning(false);
  };

  return (
    <div style={{ fontFamily: \"Inter, sans-serif\", background: '#000', color: '#fff', minHeight: '100vh', direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* ── NAVBAR ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid #1a1a1a', backdropFilter: 'blur(10px)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/universtrend-logo.png" alt="UniversTrend" style={{ height: 40, width: 40, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 20, background: 'linear-gradient(90deg, #00BFFF, #00FF88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>UNIVERSTREND</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {['home','features','pricing','about'].map(s => (
            <button key={s} onClick={() => setActiveSection(s)} style={{ background: 'none', border: 'none', color: activeSection === s ? '#00FF88' : '#aaa', cursor: 'pointer', fontSize: 14, fontWeight: 600, textTransform: 'capitalize' }}>
              {t['nav_' + s]}
            </button>
          ))}
          {/* Language Selector */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowLangMenu(!showLangMenu)} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              {translations[lang].flag} {translations[lang].lang} ▾
            </button>
            {showLangMenu && (
              <div style={{ position: 'absolute', top: 40, right: 0, background: '#111', border: '1px solid #333', borderRadius: 8, overflow: 'hidden', zIndex: 200, minWidth: 140 }}>
                {Object.entries(translations).map(([code, tr]) => (
                  <button key={code} onClick={() => { setLang(code); setShowLangMenu(false); }} style={{ display: 'block', width: '100%', padding: '10px 16px', background: lang === code ? '#1a1a1a' : 'transparent', border: 'none', color: lang === code ? '#00FF88' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 13 }}>
                    {tr.flag} {tr.lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button style={{ background: 'linear-gradient(90deg, #00BFFF, #00FF88)', border: 'none', color: '#000', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>{t.hero_cta1}</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,191,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ background: 'linear-gradient(90deg, #00BFFF22, #00FF8822)', border: '1px solid #00BFFF44', padding: '6px 20px', borderRadius: 100, fontSize: 13, color: '#00BFFF', marginBottom: 32, fontWeight: 600 }}>
          {t.hero_badge}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
          <img src="/universtrend-logo.png" alt="UniversTrend" style={{ height: 80, width: 80, objectFit: 'contain' }} />
        </div>

        <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, margin: '0 0 8px', lineHeight: 1 }}>
          <span style={{ color: '#fff' }}>{t.hero_title_1}</span>
          <span style={{ background: 'linear-gradient(90deg, #00BFFF, #00FF88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.hero_title_2}</span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: '#ccc', marginBottom: 8 }}>{t.hero_sub}</p>
        <p style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', color: '#00FF88', fontWeight: 700, letterSpacing: 2, marginBottom: 32 }}>— {t.hero_tagline} —</p>

        <p style={{ maxWidth: 680, fontSize: 16, color: '#888', lineHeight: 1.7, marginBottom: 48 }}>{t.hero_desc}</p>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 48, width: '100%', maxWidth: 640, flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleScan()}
            placeholder={t.search_placeholder}
            style={{ flex: 1, minWidth: 280, padding: '16px 20px', borderRadius: 12, border: '1px solid #333', background: '#111', color: '#fff', fontSize: 16, outline: 'none' }}
          />
          <button onClick={handleScan} disabled={scanning} style={{ padding: '16px 28px', borderRadius: 12, border: 'none', background: scanning ? '#333' : 'linear-gradient(90deg, #00BFFF, #00FF88)', color: '#000', fontWeight: 700, fontSize: 16, cursor: scanning ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
            {scanning ? '⏳ Scanning...' : t.search_btn}
          </button>
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div style={{ background: '#111', border: '1px solid #00FF8844', borderRadius: 16, padding: 32, maxWidth: 640, width: '100%', marginBottom: 48, textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: 18 }}>🎯 "{scanResult.keyword}"</h3>
              <div style={{ background: 'linear-gradient(90deg, #00BFFF, #00FF88)', borderRadius: 100, padding: '4px 16px', color: '#000', fontWeight: 900, fontSize: 20 }}>{scanResult.score}/100</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#1a1a1a', borderRadius: 8, padding: 12 }}><div style={{ color: '#666', fontSize: 12 }}>Trend Growth</div><div style={{ color: '#00FF88', fontWeight: 700, fontSize: 18 }}>{scanResult.trend}</div></div>
              <div style={{ background: '#1a1a1a', borderRadius: 8, padding: 12 }}><div style={{ color: '#666', fontSize: 12 }}>Competition</div><div style={{ color: '#FFD700', fontWeight: 700, fontSize: 18 }}>{scanResult.competition}</div></div>
            </div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#666', fontSize: 12 }}>Top Markets: </span>{scanResult.markets.map(m => <span key={m} style={{ background: '#222', borderRadius: 4, padding: '2px 8px', margin: '0 4px', fontSize: 12, color: '#00BFFF' }}>{m}</span>)}</div>
            <div><span style={{ color: '#666', fontSize: 12 }}>Business Ideas: </span>{scanResult.ideas.map(i => <span key={i} style={{ background: '#222', borderRadius: 4, padding: '2px 8px', margin: '0 4px', fontSize: 12, color: '#00FF88' }}>{i}</span>)}</div>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[{v: t.hero_val1, l: t.hero_stat1, c: '#00BFFF'}, {v: t.hero_val2, l: t.hero_stat2, c: '#00FF88'}, {v: t.hero_val3, l: t.hero_stat3, c: '#FFD700'}, {v: t.hero_val4, l: t.hero_stat4, c: '#FF6B6B'}].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 36, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ color: '#666', fontSize: 13, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DATA SOURCES TICKER ── */}
      <section style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '16px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 24, animation: 'scroll 30s linear infinite', whiteSpace: 'nowrap' }}>
          {[...DATA_SOURCES, ...DATA_SOURCES].map((s, i) => (
            <span key={i} style={{ color: '#555', fontSize: 13, padding: '0 8px', borderRight: '1px solid #222' }}>
              📡 {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── AI MODULES ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, marginBottom: 16 }}>
            <span style={{ background: 'linear-gradient(90deg, #00BFFF, #00FF88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.modules_title}</span>
          </h2>
          <p style={{ color: '#666', fontSize: 16 }}>{t.modules_sub}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {AI_MODULES.map((m, i) => (
            <div key={i} style={{ background: '#0d0d0d', border: `1px solid ${m.color}33`, borderRadius: 16, padding: 28, transition: 'transform 0.2s, border-color 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = m.color + '33'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{m.icon}</div>
              <h3 style={{ color: m.color, fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{m.title}</h3>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VISION ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a0a, #0d0d0d)', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🌍</div>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(24px, 3vw, 40px)', color: '#fff', marginBottom: 24 }}>{t.vision_title}</h2>
          <p style={{ fontSize: 18, color: '#888', lineHeight: 1.8, marginBottom: 40 }}>{t.vision_desc}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['🚀 Entrepreneurs', '🎨 Creators', '💡 Startups', '💼 Investors', '🏢 Agencies', '🌐 Companies'].map(tag => (
              <span key={tag} style={{ background: '#111', border: '1px solid #333', padding: '8px 20px', borderRadius: 100, color: '#ccc', fontSize: 14 }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>{t.pricing_title}</h2>
          <p style={{ color: '#666', fontSize: 16 }}>{t.pricing_sub}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
          {PRICING_PLANS.map(plan => (
            <div key={plan.key} style={{ background: plan.popular ? 'linear-gradient(135deg, #001a0a, #000a1a)' : '#0d0d0d', border: `2px solid ${plan.popular ? '#00FF88' : '#1a1a1a'}`, borderRadius: 20, padding: 32, position: 'relative' }}>
              {plan.popular && <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #00BFFF, #00FF88)', color: '#000', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>MOST POPULAR</div>}
              <div style={{ color: plan.color, fontSize: 14, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>{t[plan.key]}</div>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 42, fontWeight: 900, color: '#fff' }}>{plan.price}</span>
                <span style={{ color: '#666', fontSize: 14 }}>{plan.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map(f => <li key={f} style={{ color: '#888', fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 8 }}><span style={{ color: plan.color }}>✓</span>{f}</li>)}
              </ul>
              <button style={{ width: '100%', padding: '12px 0', borderRadius: 10, border: `1px solid ${plan.color}`, background: plan.popular ? `linear-gradient(90deg, #00BFFF, #00FF88)` : 'transparent', color: plan.popular ? '#000' : plan.color, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
                {plan.key === 'enterprise' ? 'Contact Us' : t.hero_cta1}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080808', borderTop: '1px solid #1a1a1a', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <img src="/universtrend-logo.png" alt="UniversTrend" style={{ height: 48, width: 48, objectFit: 'contain' }} />
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 24, background: 'linear-gradient(90deg, #00BFFF, #00FF88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>UNIVERSTREND</span>
          </div>
          <p style={{ textAlign: 'center', color: '#444', fontSize: 14, marginBottom: 8 }}>{t.footer_desc}</p>
          <p style={{ textAlign: 'center', color: '#333', fontSize: 13 }}>{t.footer_copy}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact', 'Blog', 'API'].map(l => (
              <a key={l} href="#" style={{ color: '#444', fontSize: 13, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #000; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>
    </div>
  );
            }

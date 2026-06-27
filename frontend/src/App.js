import React, { useState } from 'react';

const T = {
  en: { flag:'US', name:'English', hero:'Every Search. Every Trend. Every Opportunity.', tagline:'ENDLESS WAYS TO MAKE MONEY.', desc:'The world first AI Business Operating System. Detect profitable opportunities before they go mainstream and automatically build businesses around them.', cta:'Start Free', demo:'Watch Demo', scan:'Scan Opportunities', ph:'Enter a keyword, industry or idea...', mod:'Everything You Need to Build a Business', modsub:'UniversTrend V2.0 — 12 AI Modules working together', vision:'Our Vision', vdesc:'UniversTrend becomes the operating system for entrepreneurs, creators, startups, investors, agencies and companies worldwide. Go from idea to a fully operational business in less than 1 hour.', price:'Simple Pricing', pricesub:'Start free. Scale when ready.', copy:'2025 UniversTrend. All rights reserved.' },
  fr: { flag:'FR', name:'Francais', hero:'Chaque Recherche. Chaque Tendance. Chaque Opportunite.', tagline:'DES FACONS INFINIES DE GAGNER DE L ARGENT.', desc:'Le premier systeme d exploitation IA pour entrepreneurs. Detectez les opportunites rentables avant qu elles deviennent mainstream.', cta:'Commencer', demo:'Voir Demo', scan:'Scanner', ph:'Mot-cle, secteur ou idee...', mod:'Tout pour Construire un Business', modsub:'UniversTrend V2.0 — 12 Modules IA', vision:'Notre Vision', vdesc:'UniversTrend devient le systeme d exploitation pour entrepreneurs, createurs, startups, investisseurs, agences et entreprises du monde entier.', price:'Tarification', pricesub:'Commencez gratuitement.', copy:'2025 UniversTrend. Tous droits reserves.' },
  zh: { flag:'CN', name:'中文', hero:'每次搜索。每个趋势。每个机会。', tagline:'无限赚钱方式。', desc:'全球首个AI商业操作系统。在机会成为主流之前发现它们，并自动围绕它们构建业务。', cta:'免费开始', demo:'观看演示', scan:'扫描机会', ph:'输入关键词、行业或想法...', mod:'构建业务所需的一切', modsub:'UniversTrend 2.0版 — 12个AI模块', vision:'我们的愿景', vdesc:'UniversTrend成为全球企业家、创作者、初创企业、投资者的操作系统。', price:'定价', pricesub:'免费开始。', copy:'2025 UniversTrend 保留所有权利。' },
  ja: { flag:'JP', name:'日本語', hero:'すべての検索。すべてのトレンド。すべての機会。', tagline:'無限のお金を稼ぐ方法。', desc:'世界初のAIビジネスOSです。収益性の高い機会をメインストリームになる前に検出し、自動的にビジネスを構築します。', cta:'無料で始める', demo:'デモを見る', scan:'チャンスをスキャン', ph:'キーワード、業界、またはアイデアを入力...', mod:'ビジネス構築に必要なすべて', modsub:'UniversTrend V2.0 — 12のAIモジュール', vision:'私たちのビジョン', vdesc:'UniversTrendは世界中の起業家、クリエイター、スタートアップのOSになります。', price:'料金体系', pricesub:'無料で始めましょう。', copy:'2025 UniversTrend All rights reserved.' },
  ko: { flag:'KR', name:'한국어', hero:'모든 검색. 모든 트렌드. 모든 기회.', tagline:'돈을 버는 무한한 방법.', desc:'세계 최초의 AI 비즈니스 운영 체제. 트렌드가 주류가 되기 전에 수익성 높은 기회를 발견하세요.', cta:'무료로 시작', demo:'데모 보기', scan:'기회 스캔', ph:'키워드, 업계 또는 아이디어 입력...', mod:'비즈니스 구축에 필요한 모든 것', modsub:'UniversTrend V2.0 — 12개의 AI 모듈', vision:'우리의 비전', vdesc:'UniversTrend는 전 세계 기업가, 크리에이터, 스타트업의 운영 체제가 됩니다.', price:'요금제', pricesub:'무료로 시작하세요.', copy:'2025 UniversTrend All rights reserved.' },
  ar: { flag:'SA', name:'عربي', hero:'كل بحث. كل اتجاه. كل فرصة.', tagline:'طرق لا نهاية لها لكسب المال.', desc:'أول نظام تشغيل تجاري بالذكاء الاصطناعي في العالم. اكتشف الفرص المربحة قبل أن تصبح سائدة.', cta:'ابدأ مجانا', demo:'شاهد العرض', scan:'مسح الفرص', ph:'أدخل كلمة مفتاحية أو صناعة أو فكرة...', mod:'كل ما تحتاجه لبناء عمل تجاري', modsub:'UniversTrend V2.0 — 12 وحدة ذكاء اصطناعي', vision:'رؤيتنا', vdesc:'يصبح UniversTrend نظام التشغيل للرياديين والمبدعين والشركات الناشئة في جميع أنحاء العالم.', price:'الاسعار', pricesub:'ابدأ مجانا.', copy:'2025 UniversTrend جميع الحقوق محفوظة.' },
};

const MODULES = [
  {icon:'🌐',title:'AI Global Scanner',c:'#00BFFF',d:'Scans 20+ platforms: Google, Reddit, X, TikTok, YouTube, Amazon, LinkedIn, GitHub, App Store, Hacker News, Crunchbase, Patents and more — every hour.'},
  {icon:'💡',title:'Opportunity Engine',c:'#00FF88',d:'Detects hidden markets, viral products, emerging startups, low-competition keywords. Generates Opportunity Score 0-100.'},
  {icon:'🏗️',title:'AI Business Builder',c:'#FFD700',d:'Auto-generates Business Name, Domain, Logo, Brand Identity, Colors, Typography, Slogan, Mission, Vision, Elevator Pitch.'},
  {icon:'⚙️',title:'AI Product Builder',c:'#FF6B6B',d:'Creates SaaS ideas, Mobile Apps, AI Agents, Chrome Extensions, APIs, Digital Products, Courses, Marketplaces, Communities.'},
  {icon:'🌍',title:'AI Website Builder',c:'#A855F7',d:'Auto-generates Landing Page, Pricing, Features, Blog, FAQ, Contact, Privacy Policy, Terms, SEO Metadata.'},
  {icon:'📣',title:'AI Marketing Machine',c:'#F97316',d:'Generates Google Ads, Facebook Ads, TikTok Campaigns, SEO Strategy, Email Marketing, Viral Campaigns, Influencer Strategy, Press Release.'},
  {icon:'💰',title:'AI Sales Machine',c:'#EC4899',d:'Creates Sales Funnels, Cold Emails, CRM Pipeline, Sales Scripts, Follow-up Sequences, Lead Magnets.'},
  {icon:'📊',title:'AI Finance',c:'#10B981',d:'Estimates Startup Cost, Revenue Forecast, Monthly/Yearly Profit, Break-even Point, CAC, LTV, ROI.'},
  {icon:'🔍',title:'AI Competitor Intel',c:'#06B6D4',d:'Analyzes competitors: Weaknesses, Pricing, Traffic, Marketing Strategy, Keywords, Missing Features.'},
  {icon:'🤖',title:'AI Automation',c:'#8B5CF6',d:'Auto-creates workflows using n8n, Make, Zapier, MCP Servers, APIs, Webhooks.'},
  {icon:'🚀',title:'AI Launch',c:'#F59E0B',d:'Deploys Website, Database, Authentication, Stripe Payments, Analytics, SEO, Hosting on Vercel automatically.'},
  {icon:'📈',title:'AI Monitor + Coach',c:'#EF4444',d:'Tracks Revenue, Traffic, SEO Rankings, Competitors, New Trends. Daily personalized AI coaching for your business.'},
];

const PLANS = [
  {key:'Free',price:'$0',period:'/mo',c:'#6B7280',f:['5 Scans/day','AI Business Builder','Basic Website Builder','Community']},
  {key:'Starter',price:'$29',period:'/mo',c:'#00BFFF',f:['100 Scans/day','All AI Modules','Marketing Machine','Sales Machine','Priority Support']},
  {key:'Pro',price:'$79',period:'/mo',c:'#00FF88',pop:true,f:['Unlimited Scans','AI Finance','Competitor Intel','AI Automation','AI Coach','Custom Domain']},
  {key:'Enterprise',price:'Custom',period:'',c:'#FFD700',f:['Market Intelligence','Consumer Trends','Innovation Reports','Predictive Analytics','White Label']},
];

const gradText = {background:'linear-gradient(90deg,#00BFFF,#00FF88)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'};

export default function App() {
  const [lang, setLang] = useState('en');
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const t = T[lang];
  const rtl = lang === 'ar';

  const scan = async () => {
    if (!q.trim()) return;
    setScanning(true); setResult(null);
    await new Promise(r => setTimeout(r, 1800));
    setResult({ score: Math.floor(Math.random()*25)+75, kw: q, trend: '+' + (Math.floor(Math.random()*180)+60) + '%', comp: Math.random()>0.5?'Low':'Medium', markets: ['USA','Japan','South Korea','China','France'].slice(0,4), ideas: ['SaaS Platform','Mobile App','AI Agent','Digital Course'].slice(0,3) });
    setScanning(false);
  };

  return (
    <div style={{fontFamily:'Inter,sans-serif',background:'#000',color:'#fff',minHeight:'100vh',direction:rtl?'rtl':'ltr'}}>

      <style dangerouslySetInnerHTML={{__html:'@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}} @keyframes glow{0%,100%{opacity:.6}50%{opacity:1}} *{box-sizing:border-box} ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:#222;border-radius:3px}'}} />

      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(0,0,0,.96)',borderBottom:'1px solid #1a1a1a',backdropFilter:'blur(12px)',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <img src="/universtrend-logo.png" alt="logo" style={{height:38,width:38,objectFit:'contain'}}/>
          <span style={{...gradText,fontFamily:'Orbitron,sans-serif',fontWeight:900,fontSize:18}}>UNIVERSTREND</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <div style={{position:'relative'}}>
            <button onClick={()=>setMenu(!menu)} style={{background:'#111',border:'1px solid #333',color:'#fff',padding:'5px 12px',borderRadius:8,cursor:'pointer',fontSize:13}}>
              {t.flag} {t.name} ▾
            </button>
            {menu && (
              <div style={{position:'absolute',top:38,right:0,background:'#111',border:'1px solid #333',borderRadius:8,zIndex:999,minWidth:130,overflow:'hidden'}}>
                {Object.entries(T).map(([k,v])=>(
                  <button key={k} onClick={()=>{setLang(k);setMenu(false);}} style={{display:'block',width:'100%',padding:'9px 14px',background:lang===k?'#1a1a1a':'transparent',border:'none',color:lang===k?'#00FF88':'#ddd',cursor:'pointer',textAlign:'left',fontSize:13}}>
                    {v.flag} {v.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button style={{background:'linear-gradient(90deg,#00BFFF,#00FF88)',border:'none',color:'#000',padding:'8px 18px',borderRadius:8,cursor:'pointer',fontWeight:700,fontSize:14}}>{t.cta}</button>
        </div>
      </nav>

      <section style={{minHeight:'90vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'60px 24px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:600,height:600,background:'radial-gradient(circle,rgba(0,191,255,.07) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{background:'rgba(0,191,255,.08)',border:'1px solid rgba(0,191,255,.3)',padding:'5px 18px',borderRadius:100,fontSize:13,color:'#00BFFF',marginBottom:28,fontWeight:600}}>
          🚀 Version 2.0 — AI Business Operating System
        </div>
        <div style={{marginBottom:16}}>
          <img src="/universtrend-logo.png" alt="UniversTrend" style={{height:90,width:90,objectFit:'contain'}}/>
        </div>
        <h1 style={{fontFamily:'Orbitron,sans-serif',fontSize:'clamp(44px,8vw,88px)',fontWeight:900,margin:'0 0 8px',lineHeight:1}}>
          <span style={{color:'#fff'}}>UNIVERS</span>
          <span style={gradText}>TREND</span>
        </h1>
        <p style={{fontSize:'clamp(15px,2vw,20px)',color:'#bbb',marginBottom:8}}>{t.hero}</p>
        <p style={{fontSize:'clamp(13px,1.4vw,17px)',color:'#00FF88',fontWeight:700,letterSpacing:2,marginBottom:30}}>— {t.tagline} —</p>
        <p style={{maxWidth:660,fontSize:15,color:'#777',lineHeight:1.75,marginBottom:44}}>{t.desc}</p>

        <div style={{display:'flex',gap:10,marginBottom:44,width:'100%',maxWidth:620,flexWrap:'wrap',justifyContent:'center'}}>
          <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&scan()} placeholder={t.ph} style={{flex:1,minWidth:260,padding:'15px 18px',borderRadius:12,border:'1px solid #2a2a2a',background:'#0d0d0d',color:'#fff',fontSize:15,outline:'none'}}/>
          <button onClick={scan} disabled={scanning} style={{padding:'15px 26px',borderRadius:12,border:'none',background:scanning?'#222':'linear-gradient(90deg,#00BFFF,#00FF88)',color:scanning?'#666':'#000',fontWeight:700,fontSize:15,cursor:scanning?'not-allowed':'pointer',whiteSpace:'nowrap'}}>
            {scanning?'⏳ Scanning...':t.scan}
          </button>
        </div>

        {result && (
          <div style={{background:'#0d0d0d',border:'1px solid rgba(0,255,136,.25)',borderRadius:16,padding:28,maxWidth:620,width:'100%',marginBottom:44,textAlign:'left'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
              <h3 style={{margin:0,fontSize:16,color:'#ddd'}}>Results for: "{result.kw}"</h3>
              <div style={{background:'linear-gradient(90deg,#00BFFF,#00FF88)',borderRadius:100,padding:'3px 14px',color:'#000',fontWeight:900,fontSize:18}}>{result.score}/100</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
              <div style={{background:'#161616',borderRadius:8,padding:10}}><div style={{color:'#555',fontSize:11}}>Trend Growth</div><div style={{color:'#00FF88',fontWeight:700,fontSize:16}}>{result.trend}</div></div>
              <div style={{background:'#161616',borderRadius:8,padding:10}}><div style={{color:'#555',fontSize:11}}>Competition</div><div style={{color:'#FFD700',fontWeight:700,fontSize:16}}>{result.comp}</div></div>
            </div>
            <div style={{marginBottom:10}}><span style={{color:'#555',fontSize:11}}>Markets: </span>{result.markets.map(m=><span key={m} style={{background:'#1a1a1a',borderRadius:4,padding:'1px 7px',margin:'0 3px',fontSize:11,color:'#00BFFF'}}>{m}</span>)}</div>
            <div><span style={{color:'#555',fontSize:11}}>Ideas: </span>{result.ideas.map(i=><span key={i} style={{background:'#1a1a1a',borderRadius:4,padding:'1px 7px',margin:'0 3px',fontSize:11,color:'#00FF88'}}>{i}</span>)}</div>
          </div>
        )}

        <div style={{display:'flex',gap:44,flexWrap:'wrap',justifyContent:'center'}}>
          {[{v:'20+',l:'Data Sources',c:'#00BFFF'},{v:'12',l:'AI Modules',c:'#00FF88'},{v:'195',l:'Countries',c:'#FFD700'},{v:'< 1hr',l:'Time to Launch',c:'#FF6B6B'}].map(s=>(
            <div key={s.l} style={{textAlign:'center'}}>
              <div style={{fontFamily:'Orbitron,sans-serif',fontSize:34,fontWeight:900,color:s.c}}>{s.v}</div>
              <div style={{color:'#555',fontSize:12,marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:'#080808',borderTop:'1px solid #161616',borderBottom:'1px solid #161616',padding:'14px 0',overflow:'hidden'}}>
        <div style={{display:'flex',gap:20,animation:'ticker 28s linear infinite',whiteSpace:'nowrap'}}>
          {['Google Search','Google Trends','Reddit','X / Twitter','TikTok','YouTube','Instagram','Facebook','LinkedIn','Amazon','Etsy','Shopify','Product Hunt','GitHub','App Store','Hacker News','Crunchbase','News','Patents','Research Papers','Google Search','Google Trends','Reddit','X / Twitter','TikTok','YouTube','Instagram','Facebook','LinkedIn','Amazon','Etsy','Shopify','Product Hunt','GitHub','App Store','Hacker News','Crunchbase','News','Patents','Research Papers'].map((s,i)=>(
            <span key={i} style={{color:'#3a3a3a',fontSize:12,padding:'0 6px',borderRight:'1px solid #1a1a1a'}}>📡 {s}</span>
          ))}
        </div>
      </section>

      <section style={{padding:'72px 24px',maxWidth:1180,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <h2 style={{fontFamily:'Orbitron,sans-serif',fontSize:'clamp(24px,3.5vw,44px)',fontWeight:900,marginBottom:14}}>
            <span style={gradText}>{t.mod}</span>
          </h2>
          <p style={{color:'#555',fontSize:15}}>{t.modsub}</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(275px,1fr))',gap:20}}>
          {MODULES.map((m,i)=>(
            <div key={i} style={{background:'#0a0a0a',border:'1px solid ' + m.c + '28',borderRadius:14,padding:26,cursor:'default',transition:'all .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=m.c;e.currentTarget.style.transform='translateY(-3px)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=m.c+'28';e.currentTarget.style.transform='none';}}>
              <div style={{fontSize:36,marginBottom:14}}>{m.icon}</div>
              <h3 style={{color:m.c,fontSize:16,fontWeight:700,marginBottom:8}}>{m.title}</h3>
              <p style={{color:'#555',fontSize:13,lineHeight:1.65}}>{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:'#060606',borderTop:'1px solid #161616',borderBottom:'1px solid #161616',padding:'72px 24px'}}>
        <div style={{maxWidth:760,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:56,marginBottom:20}}>🌍</div>
          <h2 style={{fontFamily:'Orbitron,sans-serif',fontSize:'clamp(22px,3vw,38px)',color:'#fff',marginBottom:20}}>{t.vision}</h2>
          <p style={{fontSize:17,color:'#666',lineHeight:1.82,marginBottom:36}}>{t.vdesc}</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            {['🚀 Entrepreneurs','🎨 Creators','💡 Startups','💼 Investors','🏢 Agencies','🌐 Companies'].map(tag=>(
              <span key={tag} style={{background:'#111',border:'1px solid #2a2a2a',padding:'7px 18px',borderRadius:100,color:'#aaa',fontSize:13}}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'72px 24px',maxWidth:1060,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <h2 style={{fontFamily:'Orbitron,sans-serif',fontSize:'clamp(24px,3.5vw,44px)',fontWeight:900,color:'#fff',marginBottom:14}}>{t.price}</h2>
          <p style={{color:'#555',fontSize:15}}>{t.pricesub}</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:22}}>
          {PLANS.map(p=>(
            <div key={p.key} style={{background:p.pop?'#030d06':'#0a0a0a',border:'2px solid ' + (p.pop?'#00FF88':'#1a1a1a'),borderRadius:18,padding:28,position:'relative'}}>
              {p.pop && <div style={{position:'absolute',top:-13,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(90deg,#00BFFF,#00FF88)',color:'#000',padding:'3px 14px',borderRadius:100,fontSize:11,fontWeight:700,whiteSpace:'nowrap'}}>MOST POPULAR</div>}
              <div style={{color:p.c,fontSize:13,fontWeight:700,marginBottom:6,textTransform:'uppercase'}}>{p.key}</div>
              <div style={{marginBottom:22}}>
                <span style={{fontFamily:'Orbitron,sans-serif',fontSize:38,fontWeight:900,color:'#fff'}}>{p.price}</span>
                <span style={{color:'#555',fontSize:13}}>{p.period}</span>
              </div>
              <ul style={{listStyle:'none',padding:0,margin:'0 0 24px',display:'flex',flexDirection:'column',gap:9}}>
                {p.f.map(f=><li key={f} style={{color:'#777',fontSize:13,display:'flex',alignItems:'flex-start',gap:7}}><span style={{color:p.c}}>✓</span>{f}</li>)}
              </ul>
              <button style={{width:'100%',padding:'11px 0',borderRadius:9,border:'1px solid ' + p.c,background:p.pop?'linear-gradient(90deg,#00BFFF,#00FF88)':'transparent',color:p.pop?'#000':p.c,fontWeight:700,cursor:'pointer',fontSize:14}}>
                {p.key==='Enterprise'?'Contact Us':t.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer style={{background:'#050505',borderTop:'1px solid #151515',padding:'44px 24px 28px'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:14}}>
            <img src="/universtrend-logo.png" alt="UniversTrend" style={{height:44,width:44,objectFit:'contain'}}/>
            <span style={{...gradText,fontFamily:'Orbitron,sans-serif',fontWeight:900,fontSize:22}}>UNIVERSTREND</span>
          </div>
          <p style={{textAlign:'center',color:'#333',fontSize:12,marginBottom:6}}>The World First AI Business Operating System</p>
          <p style={{textAlign:'center',color:'#2a2a2a',fontSize:12}}>© {t.copy}</p>
          <div style={{display:'flex',justifyContent:'center',gap:20,marginTop:20,flexWrap:'wrap'}}>
            {['Privacy','Terms','Contact','Blog','API','Docs'].map(l=><a key={l} href="#" style={{color:'#333',fontSize:12,textDecoration:'none'}}>{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
                                                                         }

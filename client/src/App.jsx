import { useState, useEffect, useRef } from "react";
import HERO_IMG from "./assets/ecell-team.jpg";
import ECELL_LOGO from "./assets/ecell-logo.jpg";

const STATS = [
  { num: "500+", label: "Members", sub: "across departments" },
  { num: "30+", label: "Events", sub: "since inception" },
  { num: "15+", label: "Startups", sub: "incubated & launched" },
  { num: "50+", label: "Partners", sub: "industry & academia" },
];

const EVENTS = [
  {
    tag: "FLAGSHIP",
    tagType: "flagship",
    title: "Ignite 2.0",
    sub: "Startup Bootcamp for Changemakers",
    date: "Apr 20, 2025",
    venue: "MES Wadia Campus",
    featured: true,
    emoji: "🚀",
    prize: null,
  },
  {
    tag: "FLAGSHIP",
    tagType: "flagship",
    title: "InnovatExpo 2.0",
    sub: "MESWCOE's largest innovation expo — hardware, software, and startup ideas judged by industry experts from Sharkfit AI, PuneDAO & UIXPERTS Labs.",
    date: "Feb 20, 2026",
    venue: "MESWCOE Campus, Pune",
    featured: false,
    emoji: "🏆",
    prize: "Prize Pool ₹75,000+",
  },
  {
    tag: "WORKSHOP",
    tagType: "workshop",
    title: "Illuminate 2.0",
    sub: "A 6-hour entrepreneurship bootcamp in collaboration with E-Cell IIT Bombay. Business Model Canvas, pitching skills, and financial management — all in one day.",
    date: "Oct 8, 2025",
    venue: "Seminar Hall, MESWCOE",
    featured: false,
    emoji: "💡",
    prize: null,
  },
  {
    tag: "NATIONAL COMPETITION",
    tagType: "competition",
    title: "NEC Finals — IIT Bombay",
    sub: "Team VentureSphere represented MESWCOE at the National Entrepreneurship Challenge Grand Finale at IIT Bombay E-Summit 2025. Ranked AIR 16 nationally.",
    date: "Dec 9, 2025",
    venue: "IIT Bombay, E-Summit",
    featured: false,
    emoji: "🎯",
    prize: "AIR 16 Nationally",
  },
];

const INITIATIVES = [
  {
    num: "01",
    title: "InnovatExpo",
    tag: "Flagship",
    desc: "Annual innovation showcase uniting students, mentors & investors.",
    year: "2024 —",
  },
  {
    num: "02",
    title: "Startup Mentorship",
    tag: "Ongoing",
    desc: "One-on-one sessions with founders and successful alumni.",
    year: "Year-round",
  },
  {
    num: "03",
    title: "Ideation Workshops",
    tag: "Monthly",
    desc: "Design thinking & lean startup methodology sprints.",
    year: "Monthly",
  },
  {
    num: "04",
    title: "Guest Lecture Series",
    tag: "Bi-Monthly",
    desc: "Real-world talks from VCs, founders, and industry leaders.",
    year: "Bi-monthly",
  },
  {
    num: "05",
    title: "Community Support",
    tag: "Year-Round",
    desc: "A thriving peer network — connect, collaborate, and grow together.",
    year: "Always on",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const PILLARS = [
  { num: "01", tag: "Ideate", title: "Ideate", desc: "Hackathons & workshops to spark bold ideas across every engineering discipline." },
  { num: "02", tag: "Launch", title: "Launch", desc: "Competitions and expos to turn raw ideas into real, investable ventures." },
  { num: "03", tag: "Connect", title: "Connect", desc: "A live network of mentors, investors, and alumni who have built what you want to build." },
  { num: "04", tag: "Grow", title: "Grow", desc: "Incubation pathways and ecosystem access so your startup has room to scale." },
];

const PILLAR_CSS = `
  .pillar-row {
    position: relative;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
    cursor: default;
    transition: background 0.35s ease, padding-left 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .pillar-row::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: #f59e0b;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.42s cubic-bezier(0.22,1,0.36,1);
  }
  .pillar-row:hover { background: rgba(245,158,11,0.05); padding-left: 14px; }
  .pillar-row:hover::before { transform: scaleY(1); }

  .pillar-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 1px;
    background: #f59e0b;
    width: 0;
    transition: width 0s;
  }
  .pillar-row:hover .pillar-progress {
    width: 100%;
    transition: width 0.9s cubic-bezier(0.22,1,0.36,1);
  }

  .pillar-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 44px;
    line-height: 1;
    color: rgba(255,255,255,0.07);
    transition: color 0.3s ease, font-size 0.3s ease;
    flex-shrink: 0;
    width: 64px;
    text-align: center;
  }
  .pillar-row:hover .pillar-num {
    color: #f59e0b;
    font-size: 48px;
  }

  .pillar-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #f59e0b;
    margin-bottom: 3px;
    opacity: 0;
    transform: translateY(5px);
    transition: opacity 0.28s 0.06s ease, transform 0.28s 0.06s ease;
  }
  .pillar-row:hover .pillar-tag { opacity: 1; transform: translateY(0); }

  .pillar-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 0.03em;
    line-height: 1;
    color: rgba(240,235,224,0.55);
    transition: color 0.3s ease, font-size 0.3s ease;
  }
  .pillar-row:hover .pillar-title { color: #f0ebe0; font-size: 28px; }

  .pillar-desc {
    font-size: 13px;
    color: rgba(240,235,224,0);
    line-height: 1.65;
    max-height: 0;
    overflow: hidden;
    margin-top: 0;
    transition: color 0.3s 0.1s ease, max-height 0.42s cubic-bezier(0.22,1,0.36,1), margin-top 0.3s ease;
  }
  .pillar-row:hover .pillar-desc {
    color: rgba(240,235,224,0.45);
    max-height: 60px;
    margin-top: 5px;
  }

  .pillar-arrow {
    font-size: 17px;
    color: rgba(245,158,11,0.18);
    flex-shrink: 0;
    margin-right: 4px;
    transition: color 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .pillar-row:hover .pillar-arrow { color: #f59e0b; transform: translateX(6px); }
`;

function PillarList() {
  return (
    <>
      <style>{PILLAR_CSS}</style>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {PILLARS.map((p, i) => (
          <div key={i} className="pillar-row">
            <div className="pillar-progress" />
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 0" }}>
              <div className="pillar-num">{p.num}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="pillar-tag">{p.tag}</div>
                <div className="pillar-title">{p.title}</div>
                <div className="pillar-desc">{p.desc}</div>
              </div>
              <div className="pillar-arrow">→</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ECellLanding() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeInit, setActiveInit] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const onScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 50);
    };
    const onMouse = (e) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const parallax = scrollY * 0.3;
  const imgX = (mousePos.x - 0.5) * 14;
  const imgY = (mousePos.y - 0.5) * 8;

  return (
    <div style={{ background: "#080808", color: "#f0ebe0", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-track{background:#080808;}
        ::-webkit-scrollbar-thumb{background:#f59e0b;}

        .wipe{clip-path:inset(0 100% 0 0);transition:clip-path 1.2s cubic-bezier(0.77,0,0.18,1);}
        .wipe.on{clip-path:inset(0 0% 0 0);}

        .hline{display:block;overflow:hidden;line-height:0.9;}
        .hinner{display:block;transform:translateY(110%);transition:transform 1s cubic-bezier(0.77,0,0.18,1);}
        .hinner.up{transform:translateY(0);}

        .hfade{opacity:0;transform:translateY(18px);transition:opacity 0.7s ease,transform 0.7s ease;}
        .hfade.show{opacity:1;transform:translateY(0);}

        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%)}}
        .marquee{animation:marquee 30s linear infinite;}

        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin 20s linear infinite;}

        @keyframes float {
          0%,100%{transform:translateY(0px);}
          50%{transform:translateY(-8px);}
        }

        /* Grain overlay */
        .grain::before {
          content:'';
          position:fixed;inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity:0.045;
          pointer-events:none;
          z-index:9999;
          mix-blend-mode:overlay;
        }

        .scanlines::after{
          content:'';position:absolute;inset:0;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px);
          pointer-events:none;z-index:3;
        }

        .hover-amber:hover{color:#f59e0b!important;border-color:#f59e0b!important;}

        .btn-fill{
          background:#f59e0b;color:#080808;
          transition:background 0.2s,transform 0.15s,box-shadow 0.2s;
          box-shadow:0 0 0 0 rgba(245,158,11,0);
        }
        .btn-fill:hover{
          background:#fbbf24;
          transform:translateY(-2px);
          box-shadow:0 8px 28px rgba(245,158,11,0.28);
        }
        .btn-fill:active{transform:translateY(0) scale(0.98);}

        .btn-outline{
          border:1px solid rgba(240,235,224,0.18);
          color:rgba(240,235,224,0.65);
          transition:all 0.2s;
        }
        .btn-outline:hover{
          border-color:#f59e0b;
          color:#f59e0b;
          background:rgba(245,158,11,0.04);
        }
        .btn-outline:active{transform:scale(0.98);}

        /* Stat ticker */
        .stat-block{
          border-right:1px solid rgba(255,255,255,0.05);
          padding:22px 28px;
          transition:background 0.25s;
          cursor:default;
          position:relative;
          overflow:hidden;
        }
        .stat-block:last-child{border-right:none;}
        .stat-block::after{
          content:'';
          position:absolute;bottom:0;left:0;width:0;height:2px;
          background:#f59e0b;
          transition:width 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .stat-block:hover::after{width:100%;}
        .stat-block:hover{background:rgba(245,158,11,0.04);}

        /* Event row hover */
        .ev-row{
          display:grid;
          grid-template-columns:40px 1fr minmax(150px,auto);
          gap:28px;
          align-items:center;
          padding:32px 0;
          border-bottom:1px solid rgba(255,255,255,0.06);
          cursor:pointer;
          transition:background 0.2s,padding-left 0.3s cubic-bezier(0.22,1,0.36,1);
          position:relative;
        }
        .ev-row::before{
          content:'';position:absolute;left:0;top:0;bottom:0;width:2px;
          background:#f59e0b;
          transform:scaleY(0);
          transform-origin:bottom;
          transition:transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .ev-row:hover::before{transform:scaleY(1);}
        .ev-row:hover{background:rgba(245,158,11,0.025);padding-left:16px;}

        /* Init rows */
        .init-row{
          display:grid;
          grid-template-columns:80px 1fr auto;
          align-items:center;
          gap:clamp(16px,3vw,52px);
          padding:clamp(18px,2.5vw,28px) 0;
          border-bottom:1px solid rgba(255,255,255,0.06);
          transition:background 0.2s,padding-left 0.3s;
          cursor:default;
        }
        .init-row:hover{background:rgba(245,158,11,0.025);padding-left:12px;}
        .init-row:hover .init-num{color:#f59e0b!important;}
        .init-row:hover .init-title{color:#f59e0b!important;}

        /* Featured event */
        .feat-ev{position:relative;overflow:hidden;cursor:pointer;}
        .feat-ev img{transition:transform 0.9s cubic-bezier(0.22,1,0.36,1);}
        .feat-ev:hover img{transform:scale(1.04);}
        .feat-ev-overlay{
          position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(245,158,11,0) 0%,rgba(245,158,11,0.05) 100%);
          opacity:0;transition:opacity 0.4s;
        }
        .feat-ev:hover .feat-ev-overlay{opacity:1;}

        /* About image */
        .about-img img{transition:transform 0.7s ease;}
        .about-img:hover img{transform:scale(1.04);}

        /* CTA accent */
        @keyframes pulse-glow{
          0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,0);}
          50%{box-shadow:0 0 32px 6px rgba(245,158,11,0.22);}
        }
        .glow-pulse{animation:pulse-glow 3s ease-in-out infinite;}

        @media(max-width:768px){
          .hide-mob{display:none!important;}
          .show-mob{display:flex!important;}
          .outline-text{color:#f0ebe0!important;-webkit-text-stroke:0px transparent!important;opacity:0.6;}
          .hinner{font-size:clamp(42px,13vw,80px)!important;}
          .init-title{font-size:18px!important;}
          .init-num{font-size:32px!important;}
          .ev-row{grid-template-columns:36px 1fr;}
          .stat-block{border-right:none;border-bottom:1px solid rgba(255,255,255,0.05);}
        }
        @media(min-width:769px){.hide-mob{display:flex!important;}.show-mob{display:none!important;}}
      `}</style>

      {/* Grain overlay */}
      <div className="grain" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }} />

      {/* ══════════════════════════════ NAV ══════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,158,11,0.1)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="#" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: "0.14em", color: "#f59e0b", textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <img src={ECELL_LOGO} alt="E-Cell MESWCOE" style={{ height: 44, width: 44, objectFit: "cover", borderRadius: "50%", filter: "brightness(1.3) contrast(1.1)", border: "1.5px solid rgba(245,158,11,0.4)" }} />
          </a>
          <ul className="hide-mob" style={{ display: "flex", gap: 36, listStyle: "none", alignItems: "center" }}>
            {["About", "Events", "Initiatives", "Team", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover-amber" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a4a4a", textDecoration: "none", transition: "color 0.2s" }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="#login" className="btn-outline" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "10px 22px", textDecoration: "none", display: "inline-block" }}>
              Login
            </a>
            <button className="show-mob" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: "block", width: 22, height: 2, background: "#f0ebe0", transition: "all 0.3s", transform: menuOpen ? i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
              ))}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: "rgba(8,8,8,0.99)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
            {["About", "Events", "Initiatives", "Team", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#525252", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section id="home" style={{ position: "relative", minHeight: "100dvh", overflow: "hidden", background: "#080808" }}>
        {/* Full bleed BG */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img src={HERO_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", transform: `scale(1.1) translate(${imgX * 0.3}px,${imgY * 0.3}px) translateY(${parallax * 0.12}px)`, transition: "transform 0.1s linear", filter: "brightness(0.14) saturate(0.6)", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(8,8,8,0.99) 0%,rgba(8,8,8,0.7) 50%,rgba(8,8,8,0.15) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,8,8,1) 0%,transparent 55%)" }} />
        </div>

        {/* Sharp photo panel */}
        <div className={`wipe ${loaded ? "on" : ""}`} style={{ position: "absolute", top: 0, right: 0, width: "clamp(300px,46vw,700px)", height: "100%", zIndex: 2 }}>
          <div className="scanlines" style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
            <img src={HERO_IMG} alt="E-Cell MESWCOE Team" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%", transform: `scale(1.05) translate(${imgX * -0.5}px,${imgY * -0.35}px)`, transition: "transform 0.12s linear", display: "block", filter: "brightness(0.8) contrast(1.1) saturate(0.85)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(8,8,8,1) 0%,rgba(8,8,8,0.5) 18%,transparent 55%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,8,8,0.92) 0%,transparent 45%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%,rgba(245,158,11,0.07) 0%,transparent 65%)" }} />
            <div style={{ position: "absolute", top: "8%", right: 0, width: 2, height: "84%", background: "linear-gradient(to bottom,transparent,rgba(245,158,11,0.7),transparent)" }} />
          </div>
        </div>

        {/* Geometric corner */}
        <div style={{ position: "absolute", top: "14%", right: "clamp(280px,42vw,660px)", zIndex: 3, opacity: loaded ? 1 : 0, transition: "opacity 1.2s 0.9s" }}>
          <div style={{ width: 1, height: "clamp(70px,9vh,110px)", background: "linear-gradient(to bottom,transparent,#f59e0b)", margin: "0 auto" }} />
          <div style={{ width: "clamp(60px,7vw,90px)", height: 1, background: "linear-gradient(to right,#f59e0b,transparent)", marginTop: -1 }} />
        </div>

        {/* Spinning badge */}
        <div style={{ position: "absolute", bottom: "clamp(120px,18vh,180px)", right: "clamp(16px,calc(44vw - 90px),620px)", zIndex: 5, opacity: loaded ? 1 : 0, transition: "opacity 1s 1.3s" }}>
          <div style={{ position: "relative", width: 88, height: 88 }}>
            <svg className="spin" viewBox="0 0 88 88" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <defs><path id="cr" d="M 44,44 m -31,0 a 31,31 0 1,1 62,0 a 31,31 0 1,1 -62,0" /></defs>
              <text style={{ fontSize: 8.5, fill: "#f59e0b", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.2em" }}>
                <textPath href="#cr">MESWCOE · E-CELL · PUNE · 2024 ·</textPath>
              </text>
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: "0.1em", color: "#f59e0b", textAlign: "center", lineHeight: 1.3 }}>
              EST<br />2024
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 4, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "100dvh", padding: "clamp(80px,10vh,120px) clamp(20px,6vw,80px) clamp(36px,5vh,64px)" }}>
          {/* Overline */}
          <div className={`hfade ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.05s", display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <span style={{ display: "block", width: 28, height: 1, background: "#f59e0b", flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f59e0b" }}>
              Entrepreneurship Cell · MES Wadia College of Engineering
            </span>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: "clamp(18px,3vh,30px)" }}>
            {[
              { text: "INSPIRED", color: "#f0ebe0", delay: "0.12s", outline: false },
              { text: "BY LEGACY.", color: "#f59e0b", delay: "0.27s", outline: false },
              { text: "BUILT FOR", color: "transparent", stroke: "rgba(240,235,224,0.22)", delay: "0.42s", outline: true },
              { text: "THE FUTURE.", color: "transparent", stroke: "rgba(240,235,224,0.22)", delay: "0.56s", outline: true },
            ].map((l, i) => (
              <div key={i} className="hline">
                <span className={`hinner ${loaded ? "up" : ""} ${l.outline ? "outline-text" : ""}`} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(48px,9vw,138px)", lineHeight: 0.9, color: l.color, WebkitTextStroke: l.stroke ? `1.5px ${l.stroke}` : undefined, transitionDelay: l.delay, letterSpacing: "0.01em" }}>
                  {l.text}
                </span>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p className={`hfade ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.72s", fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(240,235,224,0.48)", fontStyle: "italic", lineHeight: 1.8, maxWidth: 430, marginBottom: "clamp(24px,4vh,40px)" }}>
            Fostering entrepreneurship and igniting innovation at MES Wadia — where the next generation of founders is forged.
          </p>

          {/* CTAs */}
          <div className={`hfade ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.88s", display: "flex", flexWrap: "wrap", gap: 12, marginBottom: "clamp(44px,6vh,64px)" }}>
            <a href="#events" className="btn-fill" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "14px 30px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Explore Events <span>→</span>
            </a>
            <a href="#about" className="btn-outline" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", padding: "14px 30px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Our Story
            </a>
          </div>

          {/* ── STATS: horizontal ticker-tape, not a grid ── */}
          <div className={`hfade ${loaded ? "show" : ""}`} style={{ transitionDelay: "1.05s", display: "flex", flexWrap: "wrap", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", maxWidth: 640 }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-block" style={{ flex: "1 1 120px" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(28px,3.5vw,44px)", color: "#f59e0b", lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f0ebe0", opacity: 0.7, marginTop: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#383838", marginTop: 2, fontStyle: "italic" }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className={`hfade ${loaded ? "show" : ""}`} style={{ transitionDelay: "1.4s", position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2e2e2e" }}>Scroll</span>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom,rgba(245,158,11,0.6),transparent)" }} />
        </div>
      </section>

      {/* ══════════════════════ MARQUEE ══════════════════════ */}
      <div style={{ background: "#f59e0b", overflow: "hidden", borderTop: "1px solid #d97706", borderBottom: "1px solid #d97706", padding: "13px 0" }}>
        <div className="marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {Array(4).fill(null).map((_, gi) => (
            <span key={gi} style={{ display: "flex", alignItems: "center" }}>
              {["IGNITE 2.0", "ENTREPRENEURSHIP", "INNOVATION HUB", "STARTUP CULTURE", "WADIA COLLEGE PUNE", "INSPIRED BY LEGACY", "BUILD FOR THE FUTURE", "PITCH · BUILD · LAUNCH"].map((t, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: "0.2em", color: "#080808", padding: "0 30px" }}>{t}</span>
                  <span style={{ color: "rgba(8,8,8,0.35)", fontSize: 16, fontWeight: 700 }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════ ABOUT ══════════════════════ */}
      <section id="about" style={{ padding: "clamp(72px,10vw,144px) clamp(20px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        {/* Ambient radial accent */}
        <div style={{ position: "absolute", top: "30%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          {/* Section header — offset, not centred */}
          <FadeUp>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ display: "block", width: 28, height: 1, background: "#f59e0b", flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b" }}>About E-Cell</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,7vw,96px)", lineHeight: 0.92, letterSpacing: "0.01em", marginBottom: "clamp(48px,7vw,80px)" }}>
              We Build <span style={{ color: "#f59e0b" }}>Founders,</span>
              <br />
              <span className="outline-text" style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(240,235,224,0.15)" }}>Not Just Engineers.</span>
            </h2>
          </FadeUp>

          {/* Asymmetric 60/40 layout instead of 50/50 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>

            {/* Left: image + floated label */}
            <FadeUp>
              <div style={{ position: "relative" }}>
                {/* Offset amber border frame */}
                <div style={{ position: "absolute", top: -12, left: -12, right: 12, bottom: 12, border: "1px solid rgba(245,158,11,0.18)", pointerEvents: "none", zIndex: 1 }} />
                <div className="about-img" style={{ position: "relative", overflow: "hidden", paddingBottom: "70%" }}>
                  <img src={HERO_IMG} alt="E-Cell Team" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block", filter: "brightness(0.8) contrast(1.06) saturate(0.88)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,8,8,0.5) 0%,transparent 60%)" }} />
                </div>
                <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 2, background: "rgba(8,8,8,0.93)", border: "1px solid rgba(255,255,255,0.07)", padding: "6px 14px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#f59e0b" }}>E-Cell MESWCOE · Pune</span>
                </div>
              </div>
            </FadeUp>

            {/* Right: copy + 2-col pillars */}
            <FadeUp delay={140}>
              <p style={{ fontSize: 14, color: "rgba(240,235,224,0.58)", lineHeight: 1.9, marginBottom: 14 }}>
                The <strong style={{ color: "#f0ebe0", fontWeight: 500 }}>Entrepreneurship Cell of MES Wadia College of Engineering</strong> is a student-led organisation cultivating an entrepreneurial mindset across campus and beyond.
              </p>
              <p style={{ fontSize: 14, color: "rgba(240,235,224,0.5)", lineHeight: 1.9, marginBottom: 40 }}>
                From ideation bootcamps to flagship expos, we provide the platform, mentorship, and community for the next wave of innovators.
              </p>

              {/* Pillars: animated accordion rows */}
              <PillarList />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════ EVENTS ══════════════════════ */}
      <section id="events" style={{ background: "#0c0c0c", padding: "clamp(72px,10vw,144px) clamp(20px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        {/* Subtle diagonal texture accent */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "repeating-linear-gradient(-60deg,transparent,transparent 48px,rgba(245,158,11,0.015) 48px,rgba(245,158,11,0.015) 49px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: "clamp(44px,6vw,72px)" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ display: "block", width: 28, height: 1, background: "#f59e0b" }} />
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b" }}>Events & Competitions</span>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,7.5vw,100px)", lineHeight: 0.92, letterSpacing: "0.01em" }}>
                  What's<br />
                  <span className="outline-text" style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(240,235,224,0.17)" }}>Happening</span>
                </h2>
              </div>
              <a href="#" className="btn-outline" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", padding: "12px 22px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                All Events →
              </a>
            </div>
          </FadeUp>

          {/* Featured event: full-width cinematic card */}
          {EVENTS.filter(ev => ev.featured).map((ev, i) => (
            <FadeUp key={i}>
              <div className="feat-ev" style={{ position: "relative", overflow: "hidden", minHeight: 480, marginBottom: 3 }}>
                <img src={HERO_IMG} alt={ev.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%", filter: "brightness(0.45) saturate(0.75)", display: "block" }} />
                <div className="feat-ev-overlay" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,8,8,0.98) 0%,rgba(8,8,8,0.35) 60%,transparent 100%)" }} />
                {/* Top-right index */}
                <div style={{ position: "absolute", top: 28, right: 28, fontFamily: "'Bebas Neue',sans-serif", fontSize: 80, color: "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none" }}>01</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(24px,4vw,44px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5c842", flexShrink: 0, boxShadow: "0 0 8px rgba(245,200,66,0.6)" }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f5c842" }}>{ev.tag}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#333", marginLeft: 8 }}>FEATURED</span>
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(36px,5vw,64px)", marginBottom: 10, letterSpacing: "0.02em" }}>{ev.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(240,235,224,0.55)", lineHeight: 1.65, marginBottom: 14, maxWidth: 520 }}>{ev.sub}</p>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#484848", marginBottom: 26 }}>{ev.date} · {ev.venue}</div>
                  <a href="#" className="btn-fill" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 26px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    Register →
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}

          {/* Non-featured events: horizontal rows, not 3-col grid */}
          <div style={{ marginTop: 3 }}>
            {EVENTS.filter(ev => !ev.featured).map((ev, i) => {
              const tagColor = ev.tagType === "flagship" ? "#f5c842" : ev.tagType === "workshop" ? "#60a5fa" : "#f59e0b";
              const isHovered = hoveredEvent === i;
              return (
                <FadeUp key={i} delay={i * 60}>
                  <div
                    className="ev-row"
                    style={{ paddingLeft: isHovered ? 16 : 0 }}
                    onMouseEnter={() => setHoveredEvent(i)}
                    onMouseLeave={() => setHoveredEvent(null)}
                  >
                    {/* Index number */}
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: isHovered ? tagColor : "rgba(255,255,255,0.07)", lineHeight: 1, transition: "color 0.25s", paddingTop: 2, flexShrink: 0 }}>
                      {String(i + 2).padStart(2, "0")}
                    </div>

                    {/* Main info */}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: tagColor, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: tagColor }}>{ev.tag}</span>
                        {ev.prize && (
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: tagColor, background: `${tagColor}18`, border: `1px solid ${tagColor}30`, padding: "2px 8px", letterSpacing: "0.08em" }}>{ev.prize}</span>
                        )}
                      </div>
                      <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "clamp(16px,1.8vw,22px)", marginBottom: 8, letterSpacing: "-0.01em", color: isHovered ? "#f0ebe0" : "rgba(240,235,224,0.75)", transition: "color 0.25s", lineHeight: 1.2 }}>
                        {ev.title}
                      </h3>
                      <p style={{ fontSize: 12, color: "rgba(240,235,224,0.35)", lineHeight: 1.7, maxWidth: 560 }}>{ev.sub}</p>
                    </div>

                    {/* Date + venue + arrow — stacked, no overlap */}
                    <div className="hide-mob" style={{ textAlign: "right", flexShrink: 0, minWidth: 130, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: tagColor, whiteSpace: "nowrap" }}>{ev.date}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(240,235,224,0.2)", whiteSpace: "nowrap", maxWidth: 160, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.venue}</div>
                      <span style={{ color: isHovered ? tagColor : "rgba(255,255,255,0.1)", fontSize: 18, transition: "color 0.25s,transform 0.25s", display: "inline-block", transform: isHovered ? "translateX(4px)" : "translateX(0)", marginTop: 4 }}>→</span>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════ INITIATIVES ══════════════════════ */}
      <section id="initiatives" style={{ padding: "clamp(72px,10vw,144px) clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: "clamp(44px,6vw,64px)" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ display: "block", width: 28, height: 1, background: "#f59e0b" }} />
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b" }}>What We Do</span>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,7.5vw,100px)", lineHeight: 0.92, letterSpacing: "0.01em" }}>
                  Our{" "}
                  <span className="outline-text" style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(240,235,224,0.2)" }}>Initiatives</span>
                </h2>
              </div>
              <p style={{ fontSize: 13, color: "#3a3a3a", maxWidth: 260, lineHeight: 1.75, fontStyle: "italic" }}>
                A year-round calendar designed to take you from idea to execution.
              </p>
            </div>
          </FadeUp>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {INITIATIVES.map((item, i) => (
              <FadeUp key={i} delay={i * 45}>
                <div
                  className="init-row"
                  onMouseEnter={() => setActiveInit(i)}
                  onMouseLeave={() => setActiveInit(null)}
                >
                  <div className="init-num" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(38px,4.5vw,56px)", lineHeight: 1, color: activeInit === i ? "#f59e0b" : "rgba(255,255,255,0.07)", transition: "color 0.25s" }}>
                    {item.num}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4 className="init-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(22px,2.8vw,34px)", marginBottom: 4, color: activeInit === i ? "#f59e0b" : "#f0ebe0", transition: "color 0.25s", letterSpacing: "0.02em" }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 13, color: "#3d3d3d", lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                  <div className="hide-mob" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", border: `1px solid ${activeInit === i ? "#f59e0b" : "rgba(255,255,255,0.08)"}`, color: activeInit === i ? "#f59e0b" : "#383838", padding: "6px 12px", whiteSpace: "nowrap", transition: "all 0.25s" }}>
                    {item.tag}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TEAM ══════════════════════ */}
      <section id="team" style={{ background: "#0c0c0c", padding: "clamp(72px,10vw,144px) clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(48px,7vw,100px)", alignItems: "center" }}>
          <FadeUp>
            <div style={{ position: "relative", overflow: "hidden", paddingBottom: "66%" }}>
              <img src={HERO_IMG} alt="E-Cell Team" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block", filter: "brightness(0.82) contrast(1.06)", transition: "transform 0.7s ease" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,8,8,0.5) 0%,transparent 55%)" }} />
            </div>
          </FadeUp>
          <FadeUp delay={140}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ display: "block", width: 28, height: 1, background: "#f59e0b" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b" }}>Our People</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(42px,5.5vw,70px)", lineHeight: 0.95, marginBottom: 22, letterSpacing: "0.01em" }}>
              Driven by <span style={{ color: "#f59e0b" }}>Passion.</span><br />Fueled by Purpose.
            </h2>
            <p style={{ fontSize: 14, color: "rgba(240,235,224,0.52)", lineHeight: 1.9, marginBottom: 14 }}>
              A diverse, passionate team from every department — united by one mission: to build the entrepreneurial fabric of Wadia College.
            </p>
            <p style={{ fontSize: 13, color: "#383838", lineHeight: 1.8, marginBottom: 36, fontStyle: "italic" }}>
              Faculty advisors, core team, department leads, and alumni mentors all come together to make E-Cell what it is.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#" className="btn-outline" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 22px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>Meet the Team →</a>
              <a href="#" className="btn-fill" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 22px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>Join Us →</a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════ CTA ══════════════════════ */}
      {/* Redesigned: left-aligned, not centred; large amber rule; tighter copy */}
      <section id="join" style={{ position: "relative", overflow: "hidden", padding: "clamp(88px,14vw,180px) clamp(20px,6vw,80px)", background: "#080808" }}>
        {/* Giant ghost text */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(90px,20vw,280px)", color: "rgba(255,255,255,0.018)", lineHeight: 1, letterSpacing: "0.06em", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>
          JOIN
        </div>
        {/* Amber horizontal rule accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right,#f59e0b,transparent)" }} />

        <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ display: "block", width: 28, height: 1, background: "#f59e0b" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b" }}>Ready to Build?</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,8.5vw,120px)", lineHeight: 0.92, marginBottom: 22, letterSpacing: "0.01em", maxWidth: 800 }}>
              Be Part of<br /><span style={{ color: "#f59e0b" }}>Something Big.</span>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(240,235,224,0.42)", fontStyle: "italic", lineHeight: 1.8, maxWidth: 380, marginBottom: 44 }}>
              Join E-Cell MESWCOE and become part of the movement shaping the entrepreneurial future of Wadia College.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#" className="btn-fill glow-pulse" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "16px 38px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
                Apply to Join E-Cell →
              </a>
              <a href="#events" className="btn-outline" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", padding: "16px 38px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
                Explore Events
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer id="contact" style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(48px,7vw,72px) clamp(20px,6vw,80px) 0" }}>

          {/* ── MAIN GRID: brand left, 3 cols right ── */}
          <div style={{ display: "grid", gridTemplateColumns: "clamp(220px,28%,340px) 1fr 1fr 1fr", gap: "clamp(32px,4vw,60px)", paddingBottom: "clamp(40px,5vw,56px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

            {/* Brand block */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: "0.1em", color: "#f59e0b", lineHeight: 1, marginBottom: 6 }}>
                  E<span style={{ color: "#f0ebe0" }}>—</span>CELL
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,235,224,0.22)", lineHeight: 1.6 }}>
                  Entrepreneurship Cell<br />MES Wadia College, Pune
                </div>
              </div>
              <p style={{ fontSize: 12, color: "rgba(240,235,224,0.35)", lineHeight: 1.75, fontStyle: "italic", maxWidth: 220 }}>
                Fostering the next wave of founders from Wadia College since 2024.
              </p>
              <a
                href="mailto:ecell@meswcoe.edu.in"
                style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.1em", color: "rgba(240,235,224,0.45)", textDecoration: "none", transition: "color 0.2s", display: "inline-block" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f59e0b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,235,224,0.45)")}
              >
                ecell@meswcoe.edu.in
              </a>

              {/* Social icons: small square buttons, amber on hover */}
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                {[
                  { abbr: "IG", label: "Instagram" },
                  { abbr: "LI", label: "LinkedIn" },
                  { abbr: "X", label: "Twitter" },
                  { abbr: "YT", label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.abbr}
                    href="#"
                    title={s.label}
                    style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.05em", color: "rgba(240,235,224,0.45)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s, background 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; e.currentTarget.style.color = "#f59e0b"; e.currentTarget.style.background = "rgba(245,158,11,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(240,235,224,0.45)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    {s.abbr}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {[
              { title: "Navigate", links: [{ label: "About", href: "#about" }, { label: "Events", href: "#events" }, { label: "Initiatives", href: "#initiatives" }, { label: "Team", href: "#team" }, { label: "Contact", href: "#contact" }] },
              { title: "Platform", links: [{ label: "Register", href: "#" }, { label: "Login", href: "#" }, { label: "Dashboard", href: "#" }, { label: "Admin", href: "#" }] },
              { title: "Connect", links: [{ label: "Instagram", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Twitter", href: "#" }, { label: "YouTube", href: "#" }] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b", marginBottom: 20 }}>
                  {col.title}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        style={{ fontSize: 13, color: "rgba(240,235,224,0.5)", textDecoration: "none", transition: "color 0.2s", display: "inline-block" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ebe0")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,235,224,0.5)")}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── BOTTOM BAR ── */}
          <div style={{ padding: "18px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "rgba(240,235,224,0.2)" }}>
                © 2025 E-Cell MESWCOE. All rights reserved.
              </span>
              {["Privacy", "Terms"].map((l) => (
                <a key={l} href="#"
                  style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "rgba(240,235,224,0.2)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,235,224,0.55)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,235,224,0.2)")}
                >
                  {l}
                </a>
              ))}
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "rgba(240,235,224,0.2)" }}>
              Developed by <span style={{ color: "#f59e0b" }}>XTN — Xplorevo Tech Network</span>
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}

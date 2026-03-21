import { useState, useEffect, useRef } from "react";
import HERO_IMG from "./assets/ecell-team.jpg";

const STATS = [
  { num: "500+", label: "Members" },
  { num: "30+", label: "Events" },
  { num: "15+", label: "Startups" },
  { num: "50+", label: "Partners" },
];

const EVENTS = [
  {
    tag: "FLAGSHIP",
    title: "Ignite 2.0",
    sub: "Startup Bootcamp for Changemakers",
    date: "Apr 20, 2025",
    venue: "MES Wadia Campus",
    featured: true,
    emoji: "🚀",
  },
  {
    tag: "COMPETITION",
    title: "PitchWars",
    sub: "Present your idea to real investors",
    date: "May 10, 2025",
    venue: "Innovation Lab",
    featured: false,
    emoji: "🎤",
  },
  {
    tag: "WORKSHOP",
    title: "FinModel Lab",
    sub: "Build investor-grade financial models",
    date: "Mar 28, 2025",
    venue: "Auditorium B",
    featured: false,
    emoji: "📊",
  },
];

const INITIATIVES = [
  {
    num: "01",
    title: "InnovatExpo",
    tag: "Flagship",
    desc: "Annual innovation showcase uniting students, mentors & investors.",
  },
  {
    num: "02",
    title: "Startup Mentorship",
    tag: "Ongoing",
    desc: "One-on-one sessions with founders and successful alumni.",
  },
  {
    num: "03",
    title: "Ideation Workshops",
    tag: "Monthly",
    desc: "Design thinking & lean startup methodology sprints.",
  },
  {
    num: "04",
    title: "Guest Lecture Series",
    tag: "Bi-Monthly",
    desc: "Real-world talks from VCs, founders, and industry leaders.",
  },
  {
    num: "05",
    title: "Incubation Support",
    tag: "Year-Round",
    desc: "Resources, workspace, and network for early-stage ventures.",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
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

export default function ECellLanding() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeInit, setActiveInit] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const onScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 50);
    };
    const onMouse = (e) =>
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
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
    <div
      style={{
        background: "#080808",
        color: "#f0ebe0",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:3px;}
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

        @keyframes pulse-glow {
          0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,0);}
          50%{box-shadow:0 0 28px 4px rgba(245,158,11,0.18);}
        }
        .glow-pulse{animation:pulse-glow 3s ease-in-out infinite;}

        @keyframes scanline{
          0%{transform:translateY(-100%);}
          100%{transform:translateY(100vh);}
        }

        .scanlines::after{
          content:'';position:absolute;inset:0;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px);
          pointer-events:none;z-index:3;
        }

        .hover-amber:hover{color:#f59e0b!important;border-color:#f59e0b!important;}
        .init-row:hover .init-num{color:#f59e0b!important;}
        .init-row:hover .init-title{color:#f59e0b!important;}

        .btn-fill{background:#f59e0b;color:#080808;transition:background 0.2s,transform 0.15s;}
        .btn-fill:hover{background:#fbbf24;transform:translateY(-1px);}
        .btn-outline{border:1px solid rgba(240,235,224,0.18);color:rgba(240,235,224,0.65);transition:all 0.2s;}
        .btn-outline:hover{border-color:#f59e0b;color:#f59e0b;}

        @media(max-width:768px){
          .hide-mob{display:none!important;}
          .show-mob{display:flex!important;}
          .outline-text{
            color:#f0ebe0 !important;
            -webkit-text-stroke:0px transparent !important;
            opacity:0.6;
          }
          .hinner{ font-size:clamp(42px,13vw,80px) !important; }
          .init-title{ font-size:18px !important; }
          .init-num{ font-size:32px !important; }
        }
        @media(min-width:769px){.hide-mob{display:flex!important;}.show-mob{display:none!important;}}
      `}</style>

      {/* ═══════════════════════════════ NAV ═══════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(8,8,8,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,158,11,0.12)" : "none",
          transition: "all 0.4s",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <a
            href="#"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 26,
              letterSpacing: "0.14em",
              color: "#f59e0b",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            E<span style={{ color: "#f0ebe0" }}>—</span>CELL
            <span
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                color: "#525252",
                letterSpacing: "0.12em",
                verticalAlign: "middle",
                marginLeft: 8,
              }}
            >
              MESWCOE
            </span>
          </a>
          <ul
            className="hide-mob"
            style={{
              display: "flex",
              gap: 36,
              listStyle: "none",
              alignItems: "center",
            }}
          >
            {["About", "Events", "Initiatives", "Team", "Contact"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="hover-amber"
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#525252",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a
              href="#events"
              className="btn-fill"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "10px 22px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Join Now
            </a>
            <button
              className="show-mob"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                display: "none",
                flexDirection: "column",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    background: "#f0ebe0",
                    transition: "all 0.3s",
                    transform: menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(5px,5px)"
                        : i === 2
                          ? "rotate(-45deg) translate(5px,-5px)"
                          : "none"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div
            style={{
              background: "rgba(8,8,8,0.99)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {["About", "Events", "Initiatives", "Team", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#525252",
                  textDecoration: "none",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          background: "#080808",
        }}
      >
        {/* ── FULL BLEED BG PHOTO (darkened) ── */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src={HERO_IMG}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              transform: `scale(1.1) translate(${imgX * 0.3}px,${imgY * 0.3}px) translateY(${parallax * 0.12}px)`,
              transition: "transform 0.1s linear",
              filter: "brightness(0.15) saturate(0.7)",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right,rgba(8,8,8,0.99) 0%,rgba(8,8,8,0.7) 50%,rgba(8,8,8,0.15) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top,rgba(8,8,8,1) 0%,transparent 55%)",
            }}
          />
        </div>

        {/* ── SHARP PHOTO PANEL right side ── */}
        <div
          className={`wipe ${loaded ? "on" : ""}`}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "clamp(300px,46vw,700px)",
            height: "100%",
            zIndex: 2,
          }}
        >
          <div
            className="scanlines"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <img
              src={HERO_IMG}
              alt="E-Cell MESWCOE Team"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 28%",
                transform: `scale(1.05) translate(${imgX * -0.5}px,${imgY * -0.35}px)`,
                transition: "transform 0.12s linear",
                display: "block",
                filter: "brightness(0.82) contrast(1.08) saturate(0.9)",
              }}
            />
            {/* left-side fade so text bleeds over naturally */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right,rgba(8,8,8,1) 0%,rgba(8,8,8,0.55) 18%,transparent 55%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top,rgba(8,8,8,0.9) 0%,transparent 45%)",
              }}
            />
            {/* amber tint edge */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 80% 50%,rgba(245,158,11,0.07) 0%,transparent 65%)",
              }}
            />
            {/* right accent line */}
            <div
              style={{
                position: "absolute",
                top: "8%",
                right: 0,
                width: 2,
                height: "84%",
                background:
                  "linear-gradient(to bottom,transparent,rgba(245,158,11,0.7),transparent)",
              }}
            />
          </div>
        </div>

        {/* ── GEOMETRIC CORNER ACCENT ── */}
        <div
          style={{
            position: "absolute",
            top: "14%",
            right: "clamp(280px,42vw,660px)",
            zIndex: 3,
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s 0.9s",
          }}
        >
          <div
            style={{
              width: 1,
              height: "clamp(70px,9vh,110px)",
              background: "linear-gradient(to bottom,transparent,#f59e0b)",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              width: "clamp(60px,7vw,90px)",
              height: 1,
              background: "linear-gradient(to right,#f59e0b,transparent)",
              marginTop: -1,
            }}
          />
        </div>

        {/* ── SPINNING BADGE ── */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(120px,18vh,180px)",
            right: "clamp(16px,calc(44vw - 90px),620px)",
            zIndex: 5,
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s 1.3s",
          }}
        >
          <div style={{ position: "relative", width: 88, height: 88 }}>
            <svg
              className="spin"
              viewBox="0 0 88 88"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <defs>
                <path
                  id="cr"
                  d="M 44,44 m -31,0 a 31,31 0 1,1 62,0 a 31,31 0 1,1 -62,0"
                />
              </defs>
              <text
                style={{
                  fontSize: 8.5,
                  fill: "#f59e0b",
                  fontFamily: "'JetBrains Mono',monospace",
                  letterSpacing: "0.2em",
                }}
              >
                <textPath href="#cr">MESWCOE · E-CELL · PUNE · 2025 ·</textPath>
              </text>
            </svg>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 13,
                letterSpacing: "0.1em",
                color: "#f59e0b",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              EST
              <br />
              2020
            </div>
          </div>
        </div>

        {/* ── HERO CONTENT ── */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: "100vh",
            padding:
              "clamp(80px,10vh,120px) clamp(20px,6vw,80px) clamp(36px,5vh,64px)",
          }}
        >
          {/* overline */}
          <div
            className={`hfade ${loaded ? "show" : ""}`}
            style={{
              transitionDelay: "0.05s",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 22,
            }}
          >
            <span
              style={{
                display: "block",
                width: 28,
                height: 1,
                background: "#f59e0b",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#f59e0b",
              }}
            >
              Entrepreneurship Cell · MES Wadia College of Engineering
            </span>
          </div>

          {/* KINETIC HEADLINE */}
          <div style={{ marginBottom: "clamp(18px,3vh,30px)" }}>
            {[
              {
                text: "INSPIRED",
                color: "#f0ebe0",
                delay: "0.12s",
                outline: false,
              },
              {
                text: "BY LEGACY.",
                color: "#f59e0b",
                delay: "0.27s",
                outline: false,
              },
              {
                text: "BUILT FOR",
                color: "transparent",
                stroke: "rgba(240,235,224,0.22)",
                delay: "0.42s",
                outline: true,
              },
              {
                text: "THE FUTURE.",
                color: "transparent",
                stroke: "rgba(240,235,224,0.22)",
                delay: "0.56s",
                outline: true,
              },
            ].map((l, i) => (
              <div key={i} className="hline">
                <span
                  className={`hinner ${loaded ? "up" : ""} ${l.outline ? "outline-text" : ""}`}
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(48px,9vw,138px)",
                    lineHeight: 0.9,
                    color: l.color,
                    WebkitTextStroke: l.stroke
                      ? `1.5px ${l.stroke}`
                      : undefined,
                    transitionDelay: l.delay,
                    letterSpacing: "0.01em",
                  }}
                >
                  {l.text}
                </span>
              </div>
            ))}
          </div>

          {/* subtitle */}
          <p
            className={`hfade ${loaded ? "show" : ""}`}
            style={{
              transitionDelay: "0.72s",
              fontSize: "clamp(13px,1.1vw,15px)",
              color: "rgba(240,235,224,0.5)",
              fontStyle: "italic",
              lineHeight: 1.8,
              maxWidth: 430,
              marginBottom: "clamp(24px,4vh,40px)",
            }}
          >
            Fostering entrepreneurship & igniting innovation at MES Wadia —
            where the next generation of founders is forged.
          </p>

          {/* CTAs */}
          <div
            className={`hfade ${loaded ? "show" : ""}`}
            style={{
              transitionDelay: "0.88s",
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: "clamp(36px,5vh,56px)",
            }}
          >
            <a
              href="#events"
              className="btn-fill"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "14px 30px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Explore Events <span>→</span>
            </a>
            <a
              href="#about"
              className="btn-outline"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "14px 30px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Our Story
            </a>
          </div>

          {/* STATS bar */}
          <div
            className={`hfade ${loaded ? "show" : ""}`}
            style={{
              transitionDelay: "1.05s",
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 1,
              background: "rgba(255,255,255,0.05)",
              maxWidth: 560,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(8,8,8,0.92)",
                  padding: "14px 18px",
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(20,20,20,1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(8,8,8,0.92)")
                }
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(30px,3.5vw,44px)",
                    color: "#f59e0b",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#404040",
                    marginTop: 3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div
          className={`hfade ${loaded ? "show" : ""}`}
          style={{
            transitionDelay: "1.4s",
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 8,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#333",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 44,
              background:
                "linear-gradient(to bottom,rgba(245,158,11,0.6),transparent)",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════ MARQUEE ═══════════════════ */}
      <div
        style={{
          background: "#f59e0b",
          overflow: "hidden",
          borderTop: "1px solid #d97706",
          borderBottom: "1px solid #d97706",
          padding: "13px 0",
        }}
      >
        <div
          className="marquee"
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {Array(4)
            .fill(null)
            .map((_, gi) => (
              <span key={gi} style={{ display: "flex", alignItems: "center" }}>
                {[
                  "IGNITE 2.0",
                  "ENTREPRENEURSHIP",
                  "INNOVATION HUB",
                  "STARTUP CULTURE",
                  "WADIA COLLEGE PUNE",
                  "INSPIRED BY LEGACY",
                  "BUILD FOR THE FUTURE",
                  "PITCH · BUILD · LAUNCH",
                ].map((t, i) => (
                  <span
                    key={i}
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <span
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 17,
                        letterSpacing: "0.2em",
                        color: "#080808",
                        padding: "0 30px",
                      }}
                    >
                      {t}
                    </span>
                    <span
                      style={{
                        color: "rgba(8,8,8,0.35)",
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      ◆
                    </span>
                  </span>
                ))}
              </span>
            ))}
        </div>
      </div>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section
        id="about"
        style={{ padding: "clamp(72px,10vw,144px) clamp(20px,6vw,80px)" }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "clamp(48px,7vw,100px)",
            alignItems: "center",
          }}
        >
          <FadeUp>
            <div style={{ position: "relative" }}>
              {/* offset amber border frame */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  right: 10,
                  bottom: 10,
                  border: "1px solid rgba(245,158,11,0.2)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  paddingBottom: "70%",
                }}
              >
                <img
                  src={HERO_IMG}
                  alt="E-Cell Team"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 30%",
                    display: "block",
                    filter: "brightness(0.82) contrast(1.06) saturate(0.88)",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top,rgba(8,8,8,0.45) 0%,transparent 60%)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  zIndex: 2,
                  background: "rgba(8,8,8,0.93)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "6px 14px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#f59e0b",
                  }}
                >
                  E-Cell MESWCOE · Pune
                </span>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={140}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 28,
                  height: 1,
                  background: "#f59e0b",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#f59e0b",
                }}
              >
                About E-Cell
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(46px,6vw,78px)",
                lineHeight: 0.95,
                marginBottom: 24,
                letterSpacing: "0.01em",
              }}
            >
              We Build
              <br />
              <span style={{ color: "#f59e0b" }}>Founders,</span>
              <br />
              Not Just Engineers.
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(240,235,224,0.58)",
                lineHeight: 1.9,
                marginBottom: 14,
              }}
            >
              The{" "}
              <strong style={{ color: "#f0ebe0", fontWeight: 500 }}>
                Entrepreneurship Cell of MES Wadia College of Engineering
              </strong>{" "}
              is a student-led organisation cultivating an entrepreneurial
              mindset across campus and beyond.
            </p>
            <p
              style={{
                fontSize: 14,
                color: "rgba(240,235,224,0.58)",
                lineHeight: 1.9,
                marginBottom: 36,
              }}
            >
              From ideation bootcamps to flagship expos, we provide the
              platform, mentorship, and community for the next wave of
              innovators.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {[
                {
                  icon: "⚡",
                  title: "Ideate",
                  desc: "Hackathons & workshops to spark bold ideas",
                },
                {
                  icon: "🚀",
                  title: "Launch",
                  desc: "Competitions to turn ideas into ventures",
                },
                {
                  icon: "🤝",
                  title: "Connect",
                  desc: "Network with mentors and investors",
                },
                {
                  icon: "📈",
                  title: "Grow",
                  desc: "Incubation and ecosystem access",
                },
              ].map((p, i) => (
                <FadeUp key={i} delay={200 + i * 60}>
                  <div
                    style={{
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: "14px 16px",
                      transition: "border-color 0.25s,background 0.25s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(245,158,11,0.4)";
                      e.currentTarget.style.background =
                        "rgba(245,158,11,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 8 }}>
                      {p.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 9,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#f59e0b",
                        marginBottom: 5,
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#525252",
                        lineHeight: 1.65,
                      }}
                    >
                      {p.desc}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ EVENTS ═══════════════════ */}
      <section
        id="events"
        style={{
          background: "#101010",
          padding: "clamp(72px,10vw,144px) clamp(20px,6vw,80px)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <FadeUp>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 20,
                marginBottom: "clamp(44px,6vw,60px)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: 28,
                      height: 1,
                      background: "#f59e0b",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#f59e0b",
                    }}
                  >
                    Events & Competitions
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(52px,7.5vw,100px)",
                    lineHeight: 0.92,
                    letterSpacing: "0.01em",
                  }}
                >
                  What's
                  <br />
                  <span
                    className="outline-text"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(240,235,224,0.17)",
                    }}
                  >
                    Happening
                  </span>
                </h2>
              </div>
              <a
                href="#"
                className="btn-outline"
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "12px 22px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                }}
              >
                All Events →
              </a>
            </div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 2,
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {EVENTS.map((ev, i) => (
              <FadeUp key={i} delay={i * 70}>
                {ev.featured ? (
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      minHeight: 440,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      const img = e.currentTarget.querySelector("img");
                      if (img) img.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      const img = e.currentTarget.querySelector("img");
                      if (img) img.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src={HERO_IMG}
                      alt={ev.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 28%",
                        filter: "brightness(0.6) saturate(0.85)",
                        transition: "transform 0.7s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top,rgba(8,8,8,0.97) 0%,rgba(8,8,8,0.4) 55%,transparent 100%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "clamp(20px,3vw,30px)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 9,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#f59e0b",
                          marginBottom: 10,
                        }}
                      >
                        ⭐ {ev.tag}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Bebas Neue',sans-serif",
                          fontSize: "clamp(30px,4vw,46px)",
                          marginBottom: 8,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {ev.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: "rgba(240,235,224,0.6)",
                          lineHeight: 1.65,
                          marginBottom: 12,
                        }}
                      >
                        {ev.sub}
                      </p>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 9,
                          color: "#444",
                          marginBottom: 20,
                        }}
                      >
                        {ev.date} · {ev.venue}
                      </div>
                      <a
                        href="#"
                        className="btn-fill"
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "12px 22px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        Register →
                      </a>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      background: "#080808",
                      minHeight: 320,
                      padding: "clamp(20px,3vw,28px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "background 0.25s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#0e0e0e")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#080808")
                    }
                  >
                    <div>
                      <div style={{ fontSize: 28, marginBottom: 14 }}>
                        {ev.emoji}
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 9,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(245,158,11,0.55)",
                          marginBottom: 10,
                        }}
                      >
                        {ev.tag}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Bebas Neue',sans-serif",
                          fontSize: "clamp(24px,3vw,36px)",
                          marginBottom: 8,
                          letterSpacing: "0.02em",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#f59e0b")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#f0ebe0")
                        }
                      >
                        {ev.title}
                      </h3>
                      <p
                        style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}
                      >
                        {ev.sub}
                      </p>
                    </div>
                    <div>
                      <div
                        style={{
                          width: "100%",
                          height: 1,
                          background: "rgba(255,255,255,0.06)",
                          margin: "16px 0",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: "'JetBrains Mono',monospace",
                              fontSize: 9,
                              color: "#444",
                            }}
                          >
                            {ev.date}
                          </div>
                          <div
                            style={{
                              fontFamily: "'JetBrains Mono',monospace",
                              fontSize: 9,
                              color: "#333",
                              marginTop: 3,
                            }}
                          >
                            {ev.venue}
                          </div>
                        </div>
                        <span
                          style={{
                            color: "rgba(245,158,11,0.3)",
                            fontSize: 22,
                          }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ INITIATIVES ═══════════════════ */}
      <section
        id="initiatives"
        style={{ padding: "clamp(72px,10vw,144px) clamp(20px,6vw,80px)" }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <FadeUp>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: "clamp(44px,6vw,64px)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: 28,
                      height: 1,
                      background: "#f59e0b",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#f59e0b",
                    }}
                  >
                    What We Do
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(52px,7.5vw,100px)",
                    lineHeight: 0.92,
                    letterSpacing: "0.01em",
                  }}
                >
                  Our{" "}
                  <span
                    className="outline-text"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(240,235,224,0.2)",
                    }}
                  >
                    Initiatives
                  </span>
                </h2>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#444",
                  maxWidth: 260,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                }}
              >
                A year-round calendar designed to take you from idea to
                execution.
              </p>
            </div>
          </FadeUp>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {INITIATIVES.map((item, i) => (
              <FadeUp key={i} delay={i * 45}>
                <div
                  className="init-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr auto",
                    alignItems: "center",
                    gap: "clamp(16px,3vw,52px)",
                    padding: "clamp(18px,2.5vw,28px) 8px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    transition: "background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(245,158,11,0.03)";
                    setActiveInit(i);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    setActiveInit(null);
                  }}
                >
                  <div
                    className="init-num"
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: "clamp(38px,4.5vw,56px)",
                      lineHeight: 1,
                      color:
                        activeInit === i ? "#f59e0b" : "rgba(255,255,255,0.08)",
                      transition: "color 0.25s",
                    }}
                  >
                    {item.num}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4
                      className="init-title"
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: "clamp(22px,2.8vw,34px)",
                        marginBottom: 4,
                        color: activeInit === i ? "#f59e0b" : "#f0ebe0",
                        transition: "color 0.25s",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{ fontSize: 13, color: "#444", lineHeight: 1.65 }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      border: `1px solid ${activeInit === i ? "#f59e0b" : "rgba(255,255,255,0.09)"}`,
                      color: activeInit === i ? "#f59e0b" : "#404040",
                      padding: "6px 12px",
                      whiteSpace: "nowrap",
                      transition: "all 0.25s",
                    }}
                    className="hide-mob"
                  >
                    {item.tag}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TEAM ═══════════════════ */}
      <section
        id="team"
        style={{
          background: "#101010",
          padding: "clamp(72px,10vw,144px) clamp(20px,6vw,80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "clamp(48px,7vw,100px)",
            alignItems: "center",
          }}
        >
          <FadeUp>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                paddingBottom: "66%",
              }}
            >
              <img
                src={HERO_IMG}
                alt="E-Cell Team"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 30%",
                  display: "block",
                  filter: "brightness(0.84) contrast(1.06)",
                  transition: "transform 0.7s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top,rgba(8,8,8,0.5) 0%,transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  background: "rgba(8,8,8,0.94)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "6px 14px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#f59e0b",
                  }}
                >
                  500+ Members
                </span>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={140}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 28,
                  height: 1,
                  background: "#f59e0b",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#f59e0b",
                }}
              >
                Our People
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(42px,5.5vw,70px)",
                lineHeight: 0.95,
                marginBottom: 22,
                letterSpacing: "0.01em",
              }}
            >
              Driven by
              <br />
              <span style={{ color: "#f59e0b" }}>Passion.</span>
              <br />
              Fueled by
              <br />
              Purpose.
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(240,235,224,0.55)",
                lineHeight: 1.9,
                marginBottom: 14,
              }}
            >
              A diverse, passionate team from every department — united by one
              mission: to build the entrepreneurial fabric of Wadia College.
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#404040",
                lineHeight: 1.8,
                marginBottom: 36,
                fontStyle: "italic",
              }}
            >
              Faculty advisors, core team, department leads, and alumni mentors
              all come together to make E-Cell what it is.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href="#"
                className="btn-outline"
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "12px 22px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Meet the Team →
              </a>
              <a
                href="#"
                className="btn-fill"
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "12px 22px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Join Us →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section
        id="join"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(88px,14vw,180px) clamp(20px,6vw,80px)",
          background: "#080808",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(90px,20vw,280px)",
            color: "rgba(255,255,255,0.02)",
            lineHeight: 1,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          JOIN
        </div>
        <FadeUp style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                display: "block",
                width: 28,
                height: 1,
                background: "#f59e0b",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f59e0b",
              }}
            >
              Ready to Build?
            </span>
            <span
              style={{
                display: "block",
                width: 28,
                height: 1,
                background: "#f59e0b",
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(52px,8.5vw,120px)",
              lineHeight: 0.92,
              marginBottom: 22,
              letterSpacing: "0.01em",
            }}
          >
            Be Part of
            <br />
            <span style={{ color: "#f59e0b" }}>Something Big.</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(240,235,224,0.45)",
              fontStyle: "italic",
              lineHeight: 1.8,
              maxWidth: 380,
              margin: "0 auto 44px",
            }}
          >
            Join E-Cell MESWCOE and become part of the movement shaping the
            entrepreneurial future of Wadia College.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <a
              href="#"
              className="btn-fill glow-pulse"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "16px 38px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Apply to Join E-Cell →
            </a>
            <a
              href="#events"
              className="btn-outline"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "16px 38px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Explore Events
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer
        id="contact"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "#080808",
          padding:
            "clamp(52px,8vw,80px) clamp(20px,6vw,80px) clamp(32px,4vw,40px)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: "clamp(30px,5vw,52px)",
              marginBottom: "clamp(44px,6vw,64px)",
            }}
          >
            <div style={{ gridColumn: "span 2" }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 30,
                  letterSpacing: "0.14em",
                  color: "#f59e0b",
                  marginBottom: 12,
                }}
              >
                E<span style={{ color: "#f0ebe0" }}>—</span>CELL
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#444",
                  lineHeight: 1.75,
                  marginBottom: 10,
                }}
              >
                Entrepreneurship Cell
                <br />
                MES Wadia College of Engineering, Pune
              </p>
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9,
                  color: "#333",
                  marginBottom: 22,
                }}
              >
                ecell@meswcoe.edu.in
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {["IG", "LI", "X", "YT"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="hover-amber"
                    style={{
                      width: 36,
                      height: 36,
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 9,
                      color: "#444",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
            {[
              {
                title: "Navigate",
                links: ["About", "Events", "Initiatives", "Team", "Contact"],
              },
              {
                title: "Platform",
                links: ["Register", "Login", "Dashboard", "Admin"],
              },
              {
                title: "Connect",
                links: ["Instagram", "LinkedIn", "Twitter", "YouTube"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h5
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#f59e0b",
                    marginBottom: 16,
                  }}
                >
                  {col.title}
                </h5>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 11,
                  }}
                >
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        style={{
                          fontSize: 13,
                          color: "#444",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#f0ebe0")}
                        onMouseLeave={(e) => (e.target.style.color = "#444")}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: 24,
            }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                color: "#333",
              }}
            >
              © 2025 E-Cell MESWCOE. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                color: "#333",
              }}
            >
              Developed by{" "}
              <span style={{ color: "#f59e0b" }}>
                XTN — Xplorevo Tech Network
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

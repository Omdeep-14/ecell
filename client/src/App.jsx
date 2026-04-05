import { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import heroPhoto from "./assets/hero-photo.jpg";
import aboutVideo from "./assets/about-video.mp4";
import galEntrepreneurs from "./assets/Gallery/Entrepreneurs .png";
import galIgnitePitch from "./assets/Gallery/Ignite Pitch .png";
import galIgnitePitch20 from "./assets/Gallery/IGNITE PITCH 2.0 .png";
import galIlluminate1 from "./assets/Gallery/Illuminate 1.png";
import galIlluminate from "./assets/Gallery/Illuminate.png";
import galInnovatExpo20 from "./assets/Gallery/InnovatExpo 2.0.png";
import galInnovatExpo from "./assets/Gallery/InnovatExpo.png";
import galProject from "./assets/Gallery/Project .png";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

if (!hasSupabaseConfig) {
  console.error(
    "Missing Supabase client env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in client/.env.",
  );
}

const supabase = createClient(
  SUPABASE_URL || "https://your-project-ref.supabase.co",
  SUPABASE_ANON_KEY || "your-anon-key",
);

const EVENT_BUCKET = "event-images";
const GALLERY_BUCKET = "gallery-images";

const SPONSOR_LOGOS = [
  { file: "7eleven.png", name: "7-Eleven" },
  { file: "aprilia.png", name: "Aprilia" },
  { file: "studyin.jpeg", name: "StudyIn" },
  { file: "hdfc.png", name: "HDFC Credila" },
  { file: "fateh.jpeg", name: "Fateh" },
  { file: "unstop.jpeg", name: "Unstop" },
  { file: "xtn.jpeg", name: "XTN" },
  { file: "studentrebel.jpeg", name: "The Student Rebel" },
  { file: "redbull.jpeg", name: "Red Bull" },
  { file: "kalbhor.jpeg", name: "Kalbhor Group" },
];
const SPONSOR_MARQUEE = [...SPONSOR_LOGOS, ...SPONSOR_LOGOS];
const sponsorSrc = (file) =>
  new URL(`./assets/sponsors/${file}`, import.meta.url).href;

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json().catch(() => ({}));
}

async function authFetch(path, session, options = {}) {
  return apiFetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...(options.headers || {}),
    },
  });
}

/* ─── CSS ─── */
const css = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
:root{
  --white:#ffffff;
  --black:#0a0a0a;
  --red:#d42b2b;
  --red-dark:#a81f1f;
  --gray-100:#f8f8f8;
  --gray-200:#e8e8e8;
  --gray-400:#aaaaaa;
  --gray-600:#666666;
  --serif:'Cormorant Garamond',Georgia,serif;
  --sans:'Inter',system-ui,sans-serif;
  --display:'Cormorant Garamond',Georgia,serif;
  --px:clamp(20px,5vw,64px);
  --section-py:96px;
}
html{scroll-behavior:smooth;}
body{font-family:var(--sans);background:#fff;color:var(--black);overflow-x:hidden;}

/* NAV */
nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  background:rgba(255,255,255,0.96);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid #e8e8e8;
  padding:0 var(--px);height:64px;
  display:flex;align-items:center;justify-content:space-between;
}
.nav-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--black);cursor:pointer;}
.nav-logo-mark{width:36px;height:36px;background:var(--red);color:white;font-family:var(--serif);font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.nav-logo-text{font-family:var(--serif);font-size:17px;font-weight:700;letter-spacing:.3px;line-height:1.2;}
.nav-logo-sub{font-family:var(--sans);font-size:9px;color:var(--gray-400);font-weight:400;letter-spacing:2.5px;text-transform:uppercase;}
.nav-desktop{display:none;}
@media(min-width:900px){
  .nav-desktop{display:flex;align-items:center;gap:2px;list-style:none;}
  .nav-desktop li a{text-decoration:none;font-family:var(--sans);font-size:13px;font-weight:500;color:var(--gray-600);padding:8px 16px;transition:color .2s;cursor:pointer;display:block;position:relative;}
  .nav-desktop li a::after{content:'';position:absolute;bottom:2px;left:16px;right:16px;height:1.5px;background:var(--red);transform:scaleX(0);transition:transform .25s ease;}
  .nav-desktop li a:hover{color:var(--black);}
  .nav-desktop li a:hover::after,.nav-desktop li a.active-nav::after{transform:scaleX(1);}
  .nav-desktop li a.active-nav{color:var(--black);}
  .nav-cta-desktop{background:var(--black);color:white;padding:10px 22px;font-size:13px;font-weight:600;letter-spacing:.5px;border:none;cursor:pointer;transition:background .2s;font-family:var(--sans);}
  .nav-cta-desktop:hover{background:var(--red);}
  .nav-admin-btn{background:transparent;color:var(--gray-400);padding:8px 14px;font-size:12px;font-weight:500;border:1px solid var(--gray-200);cursor:pointer;transition:all .2s;font-family:var(--sans);display:flex;align-items:center;gap:6px;}
  .nav-admin-btn:hover{border-color:var(--black);color:var(--black);}
  .nav-hamburger{display:none;}
}
.nav-hamburger{background:none;border:1px solid var(--gray-200);padding:8px 10px;cursor:pointer;font-size:16px;color:var(--black);display:flex;align-items:center;justify-content:center;}
@media(min-width:900px){.nav-hamburger{display:none;}}
.mobile-menu{position:fixed;top:64px;left:0;right:0;background:white;border-bottom:1px solid var(--gray-200);z-index:999;transform:translateY(-110%);transition:transform .3s ease;box-shadow:0 12px 32px rgba(0,0,0,.1);}
.mobile-menu.open{transform:translateY(0);}
.mobile-menu a,.mobile-menu button.mobile-nav-link{display:block;padding:16px var(--px);font-size:15px;font-weight:500;color:var(--black);text-decoration:none;cursor:pointer;border-bottom:1px solid var(--gray-100);background:none;border-left:none;border-right:none;border-top:none;text-align:left;font-family:var(--sans);width:100%;}
.mobile-menu a:hover,.mobile-menu button.mobile-nav-link:hover{background:var(--gray-100);}
.mobile-menu a.active-nav{color:var(--red);}
.mobile-join-btn{background:var(--black)!important;color:white!important;font-weight:600!important;letter-spacing:.5px;border-bottom:none!important;}
.mobile-join-btn:hover{background:var(--red)!important;}

/* SHARED */
.section-label{font-family:var(--sans);font-size:10px;letter-spacing:3.5px;text-transform:uppercase;color:var(--red);font-weight:600;display:flex;align-items:center;gap:12px;margin-bottom:20px;}
.section-label::before{content:'';width:24px;height:1px;background:var(--red);flex-shrink:0;}
.section-title{font-family:var(--serif);font-size:clamp(38px,6vw,68px);font-weight:700;line-height:0.95;color:var(--black);}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease;}
.reveal.visible{opacity:1;transform:none;}
.btn-primary{background:var(--black);color:white;padding:14px 28px;font-size:12px;font-weight:600;font-family:var(--sans);letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:background .25s,transform .15s;display:inline-flex;align-items:center;gap:10px;}
.btn-primary:hover{background:var(--red);transform:translateY(-2px);}
.btn-outline{border:1.5px solid var(--black);color:var(--black);background:transparent;padding:13px 26px;font-size:12px;font-weight:600;font-family:var(--sans);letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:10px;}
.btn-outline:hover{background:var(--black);color:white;}
.skeleton{background:linear-gradient(90deg,var(--gray-200) 25%,var(--gray-100) 50%,var(--gray-200) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;}
@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
.skeleton-block{height:18px;border-radius:2px;margin-bottom:10px;}
.api-error{padding:20px 24px;background:#fff0f0;border-left:3px solid var(--red);color:var(--red-dark);font-size:13px;display:flex;align-items:center;gap:10px;margin-bottom:16px;}

/* MARQUEE */
.marquee-wrap{background:#0a0a0a;padding:14px 0;overflow:hidden;white-space:nowrap;}
.marquee-track{display:inline-block;animation:marquee 32s linear infinite;}
.marquee-track span{font-family:var(--sans);font-size:10px;letter-spacing:4px;font-weight:600;color:rgba(255,255,255,.45);padding:0 28px;text-transform:uppercase;}
.marquee-track span.dot{color:var(--red);padding:0 6px;font-size:6px;}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.8);}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}

/* HERO */
#hero{min-height:100svh;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:120px var(--px) 80px;position:relative;overflow:hidden;background:#0a0a0a;}
#hero::before{display:none;}
#hero::after{display:none;}
.hero-overlay{display:block;position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,0.82) 0%,rgba(10,10,10,0.60) 50%,rgba(10,10,10,0.28) 100%);z-index:1;}
.hero-bg-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;z-index:0;opacity:1;}
.hero-content{position:relative;z-index:2;width:100%;max-width:680px;}
.hero-bg-text{display:none;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;font-family:var(--sans);font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.18);padding:7px 16px;margin-bottom:32px;background:rgba(255,255,255,.06);backdrop-filter:blur(8px);}
.hero-badge span{display:inline-block;width:6px;height:6px;background:var(--red);border-radius:50%;animation:pulse 2s infinite;flex-shrink:0;}
.hero-title{font-family:var(--serif);font-size:clamp(52px,10vw,100px);font-weight:700;line-height:1.0;color:#ffffff;margin-bottom:24px;text-shadow:0 2px 32px rgba(0,0,0,.5);}
.hero-title .red{color:var(--red);}
.hero-sub{font-family:var(--sans);font-size:clamp(14px,1.8vw,17px);font-weight:300;color:rgba(255,255,255,.72);margin-bottom:44px;line-height:1.8;max-width:480px;}
.hero-actions{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
.hero-actions .btn-primary{background:var(--red);color:white;}
.hero-actions .btn-primary:hover{background:#b02020;}
.hero-actions .btn-outline{border-color:rgba(255,255,255,.45);color:white;background:transparent;}
.hero-actions .btn-outline:hover{background:white;color:var(--black);border-color:white;}
.hero-stats-panel{display:none;}

/* PAGE HERO */
.page-hero{
  padding:clamp(80px,12vw,140px) var(--px) clamp(52px,6vw,88px);
  background:#0a0a0a;
  position:relative;overflow:hidden;
}
.page-hero::before{
  content:'';position:absolute;
  top:0;left:var(--px);
  width:1px;height:60%;
  background:linear-gradient(to bottom,var(--red),transparent);
  opacity:.5;z-index:1;
}
.page-hero::after{display:none;}
.page-hero > div{position:relative;z-index:2;padding-left:28px;}
.page-hero .section-label{color:rgba(255,255,255,.35);margin-bottom:20px;}
.page-hero .section-label::before{background:rgba(255,255,255,.2);}
.page-hero .section-title{
  font-size:clamp(56px,10vw,112px);
  color:#ffffff;font-weight:700;
  line-height:.9;letter-spacing:-.5px;
}
.page-hero p{font-family:var(--sans);color:rgba(255,255,255,.45);font-weight:300;font-size:14px;max-width:440px;line-height:1.85;margin-top:22px;}

/* HOME WHAT */
.home-what{padding:var(--section-py) var(--px);display:grid;grid-template-columns:1fr;gap:60px;align-items:start;background:#fff;}
@media(min-width:768px){.home-what{grid-template-columns:1fr 1fr;gap:96px;}}
.what-big{font-family:var(--serif);font-size:clamp(19px,3vw,30px);font-weight:500;line-height:1.5;color:var(--black);margin-top:28px;}
.what-body{font-family:var(--sans);font-size:15px;line-height:1.9;color:var(--gray-600);margin-top:20px;}
.what-body strong{color:var(--black);font-weight:600;}

/* HOME STATS */
.home-stats{background:#0a0a0a;display:grid;grid-template-columns:repeat(2,1fr);}
@media(min-width:640px){.home-stats{grid-template-columns:repeat(4,1fr);}}
.hstat{padding:52px 20px;text-align:center;border-right:1px solid rgba(255,255,255,.06);position:relative;}
.hstat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:transparent;transition:background .3s;}
.hstat:hover::before{background:var(--red);}
.hstat:nth-child(2n){border-right:none;}
@media(min-width:640px){.hstat:nth-child(2n){border-right:1px solid rgba(255,255,255,.06);}.hstat:last-child{border-right:none;}}
.hstat:nth-child(1),.hstat:nth-child(2){border-bottom:1px solid rgba(255,255,255,.06);}
@media(min-width:640px){.hstat:nth-child(1),.hstat:nth-child(2){border-bottom:none;}}
.hstat-num{font-family:var(--serif);font-size:clamp(52px,9vw,76px);font-weight:700;color:white;line-height:1;}
.hstat-num span{color:var(--red);}
.hstat-label{font-family:var(--sans);font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.35);margin-top:10px;}

/* INITIATIVES */
.home-initiatives{padding:var(--section-py) var(--px);background:var(--gray-100);}
.initiatives-grid{display:grid;grid-template-columns:1fr;gap:1px;background:#ddd;margin-top:52px;}
@media(min-width:600px){.initiatives-grid{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.initiatives-grid{grid-template-columns:repeat(3,1fr);}}
.init-card{background:#fff;padding:40px 32px;transition:background .3s;position:relative;overflow:hidden;}
.init-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.init-card:hover{background:var(--gray-100);}
.init-card:hover::after{transform:scaleX(1);}
.init-icon{font-size:20px;color:var(--red);margin-bottom:20px;opacity:.85;}
.init-title{font-family:var(--sans);font-size:15px;font-weight:600;margin-bottom:10px;color:var(--black);}
.init-desc{font-family:var(--sans);font-size:13px;color:var(--gray-400);line-height:1.8;}

/* SPONSORS */
.home-sponsors{padding:var(--section-py) var(--px);background:#fff;}
.sponsors-track-wrap{margin-top:52px;overflow:hidden;white-space:nowrap;padding:36px 0;background:#fff;border-top:1px solid var(--gray-200);border-bottom:1px solid var(--gray-200);}
.sponsors-track{display:inline-flex;align-items:center;gap:0;animation:sponsorScroll 30s linear infinite;white-space:nowrap;}
.sponsors-track-wrap:hover .sponsors-track{animation-play-state:paused;}
.sponsor-logo-card{display:inline-flex;align-items:center;justify-content:center;padding:16px 44px;border-right:1px solid var(--gray-200);flex-shrink:0;transition:opacity .3s;}
.sponsor-logo-card:hover{opacity:.7;}
.sponsor-logo-img{height:80px;width:auto;max-width:180px;object-fit:contain;display:block;}
@keyframes sponsorScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* TESTIMONIALS */
.home-testimonials{padding:var(--section-py) var(--px);background:var(--black);}
.testimonials-grid{display:grid;grid-template-columns:1fr;gap:1px;background:rgba(255,255,255,.04);margin-top:52px;}
@media(min-width:768px){.testimonials-grid{grid-template-columns:repeat(3,1fr);}}
.testi-card{background:#111;padding:40px 32px;border:1px solid rgba(255,255,255,.05);transition:border-color .3s;}
.testi-card:hover{border-color:rgba(212,43,43,.35);}
.testi-quote{font-family:var(--serif);font-size:17px;font-style:italic;line-height:1.85;color:rgba(255,255,255,.75);margin-bottom:28px;}
.testi-quote::before{content:'\u201C';font-family:var(--serif);font-size:64px;color:var(--red);line-height:.4;display:block;margin-bottom:20px;font-style:normal;}
.testi-name{font-family:var(--sans);font-size:13px;font-weight:600;color:white;}
.testi-info{font-family:var(--sans);font-size:11px;color:rgba(255,255,255,.25);margin-top:5px;letter-spacing:.5px;}

/* ABOUT VIDEO */
.about-video-wrap {
  width: 100%;
  background: var(--black);
  line-height: 0;
  position: relative;
  /* remove overflow: hidden and max-height entirely */
}

.about-video-wrap video {
  width: 100%;
  height: auto;
  display: block;
  opacity: .8;
  /* remove object-fit: cover and max-height */
}
.about-video-label{position:absolute;bottom:24px;left:var(--px);font-family:var(--sans);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.35);font-weight:600;}

/* ORIGINS */
.origins{padding:var(--section-py) var(--px);display:grid;grid-template-columns:1fr;gap:40px;align-items:start;background:#fff;}
@media(min-width:640px){.origins{grid-template-columns:auto 1fr;gap:72px;}}
.origins-year{font-family:var(--serif);font-size:clamp(80px,15vw,120px);font-weight:700;line-height:.85;color:#0a0a0a;letter-spacing:-3px;flex-shrink:0;display:inline-block;}
.origins-body{font-family:var(--sans);font-size:16px;color:var(--gray-600);line-height:1.9;margin-top:12px;}
.origins-body strong{color:var(--black);font-weight:600;}

/* VISION */
.vision-section{padding:var(--section-py) var(--px);background:var(--gray-100);}
.vision-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#ddd;margin-top:52px;}
@media(min-width:768px){.vision-grid{grid-template-columns:repeat(4,1fr);}}
.vision-card{background:#fff;padding:36px 26px;transition:background .3s;position:relative;overflow:hidden;}
.vision-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .35s;}
.vision-card:hover{background:#0a0a0a;}
.vision-card:hover::after{transform:scaleX(1);}
.vision-card:hover .vc-num{color:rgba(212,43,43,.5);}
.vision-card:hover .vc-title{color:white;}
.vision-card:hover .vc-desc{color:rgba(255,255,255,.3);}
.vc-num{font-family:var(--serif);font-size:48px;font-weight:700;color:var(--gray-200);transition:color .3s;margin-bottom:16px;line-height:1;}
.vc-title{font-family:var(--sans);font-size:14px;font-weight:600;margin-bottom:10px;transition:color .3s;}
.vc-desc{font-family:var(--sans);font-size:13px;color:var(--gray-400);line-height:1.75;transition:color .3s;}

/* ABOUT STATS */
.about-stats{background:#0a0a0a;display:grid;grid-template-columns:repeat(2,1fr);}
@media(min-width:640px){.about-stats{grid-template-columns:repeat(4,1fr);}}
.astat{padding:52px 20px;text-align:center;border-right:1px solid rgba(255,255,255,.06);position:relative;opacity: 1 !important;
  transform: none !important;}
.astat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:transparent;transition:background .3s;}
.astat:hover::before{background:var(--red);}
.astat:nth-child(2n){border-right:none;}
@media(min-width:640px){.astat:nth-child(2n){border-right:1px solid rgba(255,255,255,.06);}.astat:last-child{border-right:none;}}
.astat:nth-child(1),.astat:nth-child(2){border-bottom:1px solid rgba(255,255,255,.06);}
@media(min-width:640px){.astat:nth-child(1),.astat:nth-child(2){border-bottom:none;}}
.astat-num{font-family:var(--serif);font-size:clamp(48px,9vw,70px);font-weight:700;color:white;line-height:1;}
.astat-num span{color:var(--red);}
.astat-label{font-family:var(--sans);font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.35);margin-top:10px;}

/* SPOTLIGHT */
.spotlight{padding:var(--section-py) var(--px);background:#fff;}
.spotlight-grid{display:grid;grid-template-columns:1fr;gap:1px;background:#ddd;margin-top:52px;}
@media(min-width:768px){.spotlight-grid{grid-template-columns:repeat(2,1fr);}}
.spot-card{background:#fff;padding:40px 36px;display:flex;gap:22px;align-items:flex-start;transition:background .3s;position:relative;overflow:hidden;}
.spot-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .35s;}
.spot-card:hover{background:var(--gray-100);}
.spot-card:hover::after{transform:scaleX(1);}
.spot-icon{font-size:20px;color:var(--red);flex-shrink:0;margin-top:4px;opacity:.85;}
.spot-title{font-family:var(--sans);font-size:15px;font-weight:600;margin-bottom:10px;color:var(--black);}
.spot-body{font-family:var(--sans);font-size:13px;color:var(--gray-400);line-height:1.8;}
.spot-tag{font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--red);margin-top:12px;font-weight:600;}

/* HISTORY */
.history-section{padding:var(--section-py) var(--px);background:var(--gray-100);}
.timeline{margin-top:52px;}
.t-item{display:grid;grid-template-columns:80px 1px 1fr;gap:0 24px;}
@media(min-width:480px){.t-item{grid-template-columns:108px 1px 1fr;gap:0 32px;}}
.t-year-cell{padding:32px 0;text-align:right;font-family:var(--serif);font-size:clamp(18px,3.5vw,26px);font-weight:700;color:var(--gray-400);transition:color .25s;line-height:1.1;}
.t-item:hover .t-year-cell{color:var(--red);}
.t-line-cell{position:relative;background:var(--gray-200);}
.t-dot-el{position:absolute;top:40px;left:50%;transform:translateX(-50%);width:10px;height:10px;background:var(--red);border-radius:50%;border:2.5px solid var(--gray-100);box-shadow:0 0 0 4px rgba(212,43,43,.12);}
.t-content-cell{padding:32px 0 32px 4px;border-bottom:1px solid var(--gray-200);}
.t-title{font-family:var(--sans);font-size:14px;font-weight:600;margin-bottom:8px;color:var(--black);}
.t-desc{font-family:var(--sans);font-size:13px;color:var(--gray-400);line-height:1.75;}

/* PATRONAGE */
.patronage{padding:var(--section-py) var(--px);background:#fff;}
.patron-grid{display:grid;grid-template-columns:1fr;gap:1px;background:#ddd;margin-top:52px;}
@media(min-width:480px){.patron-grid{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.patron-grid{grid-template-columns:repeat(3,1fr);}}
.patron-card{background:#fff;padding:32px 28px;transition:background .3s;cursor:default;position:relative;overflow:hidden;}
.patron-card::after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--red);transform:scaleY(0);transform-origin:top;transition:transform .3s;}
.patron-card:hover{background:#0a0a0a;}
.patron-card:hover::after{transform:scaleY(1);}
.patron-card:hover .patron-name{color:white;}
.patron-card:hover .patron-role{color:var(--red);}
.patron-card:hover .patron-org{color:rgba(255,255,255,.3);}
.patron-name{font-family:var(--serif);font-size:17px;font-weight:700;margin-bottom:6px;transition:color .3s;color:var(--black);}
.patron-role{font-family:var(--sans);font-size:11px;color:var(--red);font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;transition:color .3s;}
.patron-org{font-family:var(--sans);font-size:13px;color:var(--gray-400);transition:color .3s;}

/* EVENTS */
.events-grid-page{display:grid;grid-template-columns:1fr;gap:1px;background:#ddd;margin:0 var(--px) var(--section-py);}
@media(min-width:600px){.events-grid-page{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.events-grid-page{grid-template-columns:repeat(3,1fr);}}
.ev-card{background:#fff;padding:40px 32px;cursor:pointer;transition:background .3s;position:relative;overflow:hidden;}
.ev-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.ev-card:hover{background:var(--gray-100);}
.ev-card:hover::after{transform:scaleX(1);}
.ev-num{font-family:var(--serif);font-size:56px;font-weight:700;color:var(--gray-200);line-height:1;margin-bottom:20px;transition:color .3s;}
.ev-card:hover .ev-num{color:rgba(212,43,43,.2);}
.ev-date{font-family:var(--sans);font-size:10px;color:var(--red);letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px;font-weight:600;}
.ev-title{font-family:var(--serif);font-size:20px;font-weight:700;margin-bottom:12px;color:var(--black);line-height:1.2;}
.ev-desc{font-family:var(--sans);font-size:13px;color:var(--gray-400);line-height:1.8;}
.ev-link{display:inline-flex;align-items:center;gap:8px;font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--black);margin-top:24px;border-bottom:1px solid var(--gray-200);transition:border-color .2s,color .2s;text-decoration:none;padding-bottom:2px;}
.ev-link:hover{border-color:var(--black);color:var(--red);}

/* GALLERY */
.gallery-filters{display:flex;gap:4px;padding:0 var(--px);margin-bottom:36px;flex-wrap:wrap;}
.filter-btn{padding:8px 18px;border:1px solid var(--gray-200);background:#fff;font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .2s;}
.filter-btn.active,.filter-btn:hover{background:#0a0a0a;color:white;border-color:#0a0a0a;}
.gallery-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;padding:0 var(--px) var(--section-py);}
@media(min-width:640px){.gallery-grid{grid-template-columns:repeat(3,1fr);}}
@media(min-width:900px){.gallery-grid{grid-template-columns:repeat(4,1fr);}}
.gal-item{aspect-ratio:4/3;background:var(--gray-100);overflow:hidden;cursor:pointer;position:relative;}
.gal-item.wide{grid-column:span 2;aspect-ratio:16/9;}
.gal-placeholder{width:100%;height:100%;min-height:140px;background:linear-gradient(135deg,var(--gray-200),var(--gray-100));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;transition:background .3s;}
.gal-item:hover .gal-placeholder{background:linear-gradient(135deg,#ddd,#ccc);}
.gal-real-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
.gal-item:hover .gal-real-img{transform:scale(1.04);}
.gal-icon-el{font-size:22px;color:var(--gray-400);}
.gal-label-el{font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);}
.gal-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 60%);display:flex;align-items:flex-end;padding:16px 20px;opacity:0;transition:opacity .3s;}
.gal-item:hover .gal-overlay{opacity:1;}
.gal-overlay span{font-family:var(--sans);color:white;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;}

/* TEAM */
.team-section{padding:var(--section-py) var(--px);background:#fff;}
.year-tabs{display:flex;gap:0;margin:32px 0;flex-wrap:wrap;width:fit-content;border:1px solid var(--gray-200);}
.year-tab{padding:10px 22px;font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border:none;background:#fff;color:var(--gray-400);transition:all .2s;border-right:1px solid var(--gray-200);}
.year-tab:last-child{border-right:none;}
.year-tab.active{background:#0a0a0a;color:white;}
.year-tab:hover:not(.active){background:var(--gray-100);color:var(--black);}
.team-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1px;background:#ddd;}
@media(min-width:640px){.team-grid{grid-template-columns:repeat(3,1fr);}}
@media(min-width:900px){.team-grid{grid-template-columns:repeat(4,1fr);}}
.team-card{background:#fff;padding:36px 16px 28px;text-align:center;overflow:hidden;transition:background .3s;}
.team-card:hover{background:var(--gray-100);}
.team-photo{border:1.5px solid #0a0a0a;background:transparent;color:#0a0a0a;font-family:var(--serif);font-size:22px;font-weight:700;border-radius:50%;width:64px;height:64px;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;transition:border-color .3s,background .3s,color .3s;}
.team-card:hover .team-photo{background:#0a0a0a;color:white;}
.team-name{font-family:var(--serif);font-size:16px;font-weight:700;color:#0a0a0a;padding:0 12px;margin-bottom:6px;line-height:1.2;}
.team-role{font-family:var(--sans);font-size:10px;color:var(--red);letter-spacing:1.5px;text-transform:uppercase;padding:0 12px;font-weight:600;}
.team-dept{font-family:var(--sans);font-size:11px;color:var(--gray-400);margin-top:5px;padding:0 12px;}
.team-empty{padding:56px;text-align:center;color:var(--gray-400);font-size:14px;background:#fff;grid-column:1/-1;font-family:var(--sans);}

/* CONTACT */
.contact-form-section{padding:var(--section-py) var(--px);background:#fff;}
.contact-grid{display:grid;grid-template-columns:1fr;gap:56px;align-items:start;}
@media(min-width:768px){.contact-grid{grid-template-columns:1fr 1fr;gap:80px;}}
.contact-detail{display:flex;gap:16px;align-items:center;margin-bottom:18px;font-family:var(--sans);font-size:14px;color:var(--gray-600);}
.contact-detail i{color:var(--red);width:18px;flex-shrink:0;}
.form-box{background:#fff;border:1px solid #e8e8e8;padding:48px 40px;position:relative;}
.form-box::before{content:'';position:absolute;top:0;left:0;width:40px;height:3px;background:var(--red);}
.form-group{margin-bottom:20px;}
.form-group label{display:block;font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);margin-bottom:8px;font-weight:600;}
.form-group input,.form-group textarea,.form-group select{width:100%;border:1px solid #e8e8e8;background:#fff;padding:13px 16px;font-size:14px;font-family:var(--sans);color:var(--black);outline:none;transition:border-color .2s;resize:none;}
.form-group input:focus,.form-group textarea:focus,.form-group select:focus{border-color:#0a0a0a;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.btn-send{width:100%;background:#0a0a0a;color:white;border:none;padding:16px;font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;margin-top:8px;transition:background .25s;}
.btn-send:hover{background:var(--red);}

/* MODALS */
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:2000;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);}
.modal-overlay.open{display:flex;}
.modal-box{background:#fff;max-width:680px;width:100%;max-height:90svh;overflow-y:auto;animation:slideUp .3s ease;}
.modal-head{background:var(--black);padding:44px 40px;color:white;position:relative;}
.modal-close-btn{position:absolute;top:16px;right:16px;background:none;border:none;color:rgba(255,255,255,.4);font-size:22px;cursor:pointer;transition:color .2s;line-height:1;padding:4px 8px;}
.modal-close-btn:hover{color:white;}
.modal-ev-tag{font-family:var(--sans);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:12px;}
.modal-ev-title{font-family:var(--serif);font-size:clamp(32px,7vw,48px);font-weight:700;line-height:1;}
.modal-ev-image{width:100%;max-height:260px;object-fit:cover;display:block;}
.modal-body-section{padding:44px 40px;}
.modal-body-section p{font-family:var(--sans);font-size:15px;color:var(--gray-600);line-height:1.9;}
.modal-form-link{display:inline-flex;align-items:center;gap:8px;margin-top:24px;background:var(--red);color:white;padding:13px 24px;font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;transition:background .2s;}
.modal-form-link:hover{background:var(--red-dark);}
.modal-reg-date{font-family:var(--sans);font-size:12px;color:var(--gray-400);margin-top:16px;letter-spacing:.5px;}
.join-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:2000;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);}
.join-overlay.open{display:flex;}
.join-box{background:#fff;padding:56px 48px;max-width:480px;width:100%;max-height:90svh;overflow-y:auto;animation:slideUp .3s ease;position:relative;}
.join-close{position:absolute;top:20px;right:20px;background:none;border:none;font-size:20px;color:var(--gray-400);cursor:pointer;}
.join-title{font-family:var(--serif);font-size:clamp(40px,10vw,52px);font-weight:700;line-height:.95;margin-bottom:10px;}
.join-sub{font-family:var(--sans);font-size:14px;color:var(--gray-400);margin-bottom:32px;line-height:1.7;}

/* FOOTER */
footer{background:#0a0a0a;color:white;padding:80px var(--px) 40px;}
.footer-top{display:grid;grid-template-columns:1fr;gap:48px;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,.07);}
@media(min-width:640px){.footer-top{grid-template-columns:1.8fr 1fr 1fr;gap:72px;}}
.footer-brand{font-family:var(--serif);font-size:clamp(40px,9vw,52px);font-weight:700;line-height:1;margin-bottom:16px;}
.footer-brand span{color:var(--red);}
.footer-tagline{font-family:var(--serif);font-style:italic;color:rgba(255,255,255,.3);font-size:16px;}
.footer-col h4{font-family:var(--sans);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:20px;}
.footer-col a{display:block;font-family:var(--sans);color:rgba(255,255,255,.5);text-decoration:none;font-size:14px;margin-bottom:12px;transition:color .2s;cursor:pointer;}
.footer-col a:hover{color:white;}
.footer-bottom{display:flex;flex-direction:column;gap:16px;padding-top:32px;font-family:var(--sans);font-size:12px;color:rgba(255,255,255,.22);}
@media(min-width:480px){.footer-bottom{flex-direction:row;justify-content:space-between;align-items:center;}}
.social-links{display:flex;gap:8px;}
.soc-link{width:36px;height:36px;border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.35);text-decoration:none;font-size:14px;transition:all .25s;}
.soc-link:hover{border-color:var(--red);color:white;background:var(--red);}

/* AUTH */
.auth-page{min-height:100svh;display:grid;grid-template-columns:1fr;background:#fff;}
@media(min-width:768px){.auth-page{grid-template-columns:1fr 1fr;}}
.auth-left{background:#0a0a0a;padding:64px 56px;display:flex;flex-direction:column;justify-content:space-between;min-height:280px;}
@media(min-width:768px){.auth-left{min-height:100svh;}}
.auth-left-logo{font-family:var(--serif);font-size:clamp(48px,10vw,72px);font-weight:700;color:white;line-height:.9;}
.auth-left-logo span{color:var(--red);}
.auth-left-tagline{font-family:var(--serif);font-style:italic;color:rgba(255,255,255,.3);font-size:16px;margin-top:14px;}
.auth-left-footer{font-family:var(--sans);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.18);}
.auth-right{padding:64px 56px;display:flex;flex-direction:column;justify-content:center;background:#fff;}
.auth-right-inner{max-width:380px;width:100%;}
@media(min-width:768px){.auth-right-inner{margin:auto;}}
.auth-label{font-family:var(--sans);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--red);font-weight:600;display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.auth-label::before{content:'';width:20px;height:1px;background:var(--red);flex-shrink:0;}
.auth-title{font-family:var(--serif);font-size:clamp(40px,8vw,60px);font-weight:700;line-height:.92;margin-bottom:8px;color:var(--black);}
.auth-sub{font-family:var(--sans);font-size:14px;color:var(--gray-400);margin-bottom:36px;line-height:1.7;}
.auth-error{background:#fff0f0;border-left:3px solid var(--red);color:var(--red-dark);padding:12px 16px;font-family:var(--sans);font-size:13px;margin-bottom:20px;display:flex;align-items:center;gap:8px;}
.auth-input-wrap{margin-bottom:18px;}
.auth-input-wrap label{display:block;font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);margin-bottom:8px;font-weight:600;}
.auth-input-wrap input{width:100%;border:1px solid #e8e8e8;background:#fff;padding:14px 16px;font-size:14px;font-family:var(--sans);color:var(--black);outline:none;transition:border-color .2s;}
.auth-input-wrap input:focus{border-color:#0a0a0a;}
.auth-submit{width:100%;background:#0a0a0a;color:white;border:none;padding:16px;font-size:12px;font-weight:600;font-family:var(--sans);letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;margin-top:8px;transition:background .2s;display:flex;align-items:center;justify-content:center;gap:8px;}
.auth-submit:hover:not(:disabled){background:var(--red);}
.auth-submit:disabled{opacity:.5;cursor:not-allowed;}
.auth-back{margin-top:20px;font-family:var(--sans);font-size:13px;color:var(--gray-400);text-align:center;}
.auth-back button{background:none;border:none;color:var(--black);cursor:pointer;font-weight:600;font-family:var(--sans);font-size:13px;text-decoration:underline;}

/* ADMIN */
.admin-page{height:100svh;background:var(--gray-100);display:flex;flex-direction:column;overflow:hidden;}
.admin-topbar{background:#0a0a0a;padding:0 var(--px);height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;flex-shrink:0;}
.admin-topbar-left{display:flex;align-items:center;gap:14px;}
.admin-menu-toggle{background:none;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.6);padding:7px 14px;font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:2px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .2s;}
.admin-menu-toggle:hover{border-color:var(--red);color:white;}
.admin-topbar-logo{font-family:var(--serif);font-size:24px;font-weight:700;color:white;}
.admin-topbar-logo span{color:var(--red);}
.admin-badge{font-family:var(--sans);font-size:9px;letter-spacing:2px;text-transform:uppercase;background:var(--red);color:white;padding:3px 8px;font-weight:600;}
.admin-topbar-right{display:flex;align-items:center;gap:12px;}
.admin-user-email{font-family:var(--sans);font-size:12px;color:rgba(255,255,255,.35);display:none;}
@media(min-width:640px){.admin-user-email{display:block;}}
.admin-logout-btn{background:transparent;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.5);padding:7px 16px;font-family:var(--sans);font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px;}
.admin-logout-btn:hover{border-color:var(--red);color:white;}
.admin-role-badge{font-family:var(--sans);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;padding:2px 8px;font-weight:600;background:rgba(212,43,43,.12);color:var(--red);margin-left:6px;}
.admin-body{display:flex;flex:1;min-height:0;position:relative;}
.admin-sidebar{position:fixed;top:60px;left:0;height:calc(100svh - 60px);width:240px;background:#111;border-right:1px solid #1e1e1e;padding:20px 0;overflow-y:auto;display:flex;flex-direction:column;z-index:200;transform:translateX(-100%);transition:transform .28s ease;box-shadow:4px 0 32px rgba(0,0,0,.5);}
.admin-sidebar.open{transform:translateX(0);}
.admin-sidebar-backdrop{position:fixed;top:60px;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:199;display:none;}
.admin-sidebar-backdrop.open{display:block;}
.admin-sidebar-label{font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#444;padding:0 16px 8px;display:block;}
.admin-nav-btn{display:flex;align-items:center;gap:10px;width:100%;padding:11px 16px;background:none;border:none;color:#666;font-size:13px;font-family:var(--sans);cursor:pointer;text-align:left;transition:color .15s,background .15s;}
.admin-nav-btn:hover{color:#ddd;background:#1a1a1a;}
.admin-nav-btn.active{color:white;background:#1a1a1a;border-left:2px solid var(--red);}
.admin-main-area{flex:1;min-width:0;overflow-y:auto;padding:32px var(--px);}
.admin-content{}
.admin-welcome{margin-bottom:32px;}
.admin-welcome h1{font-family:var(--serif);font-size:clamp(36px,7vw,52px);font-weight:700;line-height:1;margin-bottom:8px;}
.admin-welcome p{font-family:var(--sans);font-size:14px;color:var(--gray-400);}
.admin-stats-row{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#e8e8e8;margin-bottom:32px;}
@media(min-width:640px){.admin-stats-row{grid-template-columns:repeat(4,1fr);}}
.admin-stat-card{background:#fff;padding:28px 24px;}
.admin-stat-num{font-family:var(--serif);font-size:44px;font-weight:700;line-height:1;margin-bottom:6px;color:var(--black);}
.admin-stat-label{font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);}
.mgr-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;}
.mgr-title{font-family:var(--serif);font-size:30px;font-weight:700;display:flex;align-items:center;gap:12px;}
.mgr-count{font-family:var(--sans);font-size:12px;color:var(--gray-400);font-weight:400;}
.mgr-list{display:flex;flex-direction:column;gap:8px;}
.mgr-item{display:flex;align-items:center;gap:14px;padding:14px 16px;background:#fff;border:1px solid var(--gray-200);transition:border-color .15s;}
.mgr-item:hover{border-color:#bbb;}
.mgr-item-thumb{width:72px;height:54px;object-fit:cover;flex-shrink:0;border:1px solid var(--gray-200);}
.mgr-item-thumb-ph{width:72px;height:54px;background:var(--gray-100);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--gray-400);flex-shrink:0;}
.mgr-avatar{width:38px;height:38px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:16px;font-weight:700;color:white;flex-shrink:0;}
.mgr-item-body{flex:1;min-width:0;}
.mgr-item-name{font-family:var(--sans);font-size:14px;font-weight:600;margin-bottom:4px;}
.mgr-item-meta{display:flex;flex-wrap:wrap;gap:6px;align-items:center;}
.mgr-tag{font-family:var(--sans);font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:2px 7px;background:var(--gray-100);border:1px solid var(--gray-200);color:var(--gray-600);}
.mgr-tag-red{background:rgba(212,43,43,.08);border-color:rgba(212,43,43,.2);color:var(--red);}
.mgr-tag-blue{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8;}
.mgr-date{font-family:var(--sans);font-size:11px;color:var(--gray-400);}
.mgr-excerpt{font-family:var(--sans);font-size:12px;color:var(--gray-400);margin-top:4px;line-height:1.5;}
.mgr-actions{display:flex;gap:8px;flex-shrink:0;}
.mgr-empty{padding:48px;text-align:center;color:var(--gray-400);border:1px dashed var(--gray-200);background:#fff;font-family:var(--sans);font-size:13px;}
.mgr-form{max-width:700px;}
.mgr-back{background:none;border:none;color:var(--gray-400);cursor:pointer;font-family:var(--sans);font-size:12px;letter-spacing:.5px;margin-bottom:18px;padding:0;display:flex;align-items:center;gap:6px;}
.mgr-back:hover{color:var(--black);}
.mgr-form-title{font-family:var(--serif);font-size:28px;font-weight:700;margin-bottom:24px;}
.mgr-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
.mgr-field{display:flex;flex-direction:column;gap:5px;}
.mgr-field.full{grid-column:1/-1;}
.mgr-field.check{justify-content:flex-end;}
.mgr-field label{font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);font-weight:600;}
.mgr-field input,.mgr-field textarea,.mgr-field select{border:1px solid var(--gray-200);background:var(--gray-100);padding:10px 12px;font-size:13px;font-family:var(--sans);color:var(--black);outline:none;transition:border-color .15s;resize:vertical;}
.mgr-field input:focus,.mgr-field textarea:focus,.mgr-field select:focus{border-color:#0a0a0a;background:#fff;}
.mgr-img-drop{border:1px dashed var(--gray-200);background:var(--gray-100);min-height:110px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .15s;overflow:hidden;}
.mgr-img-drop:hover{border-color:var(--red);}
.mgr-img-preview{width:100%;max-height:180px;object-fit:cover;display:block;}
.mgr-img-ph{font-family:var(--sans);font-size:12px;color:var(--gray-400);letter-spacing:.5px;}
.mgr-clear-img{background:none;border:none;color:var(--red);cursor:pointer;font-family:var(--sans);font-size:11px;margin-top:5px;padding:0;}
.mgr-form-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:4px;}
.mgr-msg{padding:10px 14px;font-family:var(--sans);font-size:12px;margin-bottom:16px;}
.mgr-msg.ok{background:#f0fdf4;border-left:3px solid #86efac;color:#15803d;}
.mgr-msg.err{background:#fef2f2;border-left:3px solid #fca5a5;color:#b91c1c;}
.btn-adm{padding:9px 18px;font-size:12px;font-family:var(--sans);letter-spacing:.5px;font-weight:600;cursor:pointer;border:none;transition:opacity .15s,background .15s;}
.btn-adm:disabled{opacity:.4;cursor:not-allowed;}
.btn-adm.primary{background:var(--red);color:white;}
.btn-adm.primary:hover:not(:disabled){background:var(--red-dark);}
.btn-adm.cancel{background:var(--gray-100);color:var(--black);border:1px solid var(--gray-200);}
.btn-adm.cancel:hover{border-color:#999;}
.btn-adm.edit{background:#fff;color:var(--black);border:1px solid var(--gray-200);}
.btn-adm.edit:hover{border-color:#888;}
.btn-adm.del{background:transparent;color:var(--red);border:1px solid var(--red);}
.btn-adm.del:hover:not(:disabled){background:var(--red);color:white;}
.roles-add-box{background:#fff;border:1px solid var(--gray-200);padding:20px;margin-bottom:12px;}
.roles-add-title{font-family:var(--sans);font-size:13px;font-weight:700;letter-spacing:.5px;margin-bottom:4px;}
.roles-add-hint{font-family:var(--sans);font-size:12px;color:var(--gray-400);margin-bottom:12px;}
.roles-add-row{display:flex;gap:10px;}
.roles-input{flex:1;border:1px solid var(--gray-200);background:var(--gray-100);padding:10px 12px;font-family:var(--sans);font-size:13px;outline:none;}
.roles-input:focus{border-color:var(--black);}
.role-chip{font-family:var(--sans);font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;font-weight:700;}
.role-chip.superadmin{background:var(--red);color:white;}
.role-chip.admin{background:#1d4ed8;color:white;}
.admin-card{background:#fff;padding:28px;margin-bottom:16px;border:1px solid var(--gray-200);}
.admin-card-title{font-family:var(--sans);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);font-weight:600;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--gray-200);display:flex;align-items:center;justify-content:space-between;}
.admin-event-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--gray-100);}
.admin-event-row:last-child{border-bottom:none;}
.admin-event-num{font-family:var(--serif);font-size:22px;font-weight:700;color:var(--gray-200);width:28px;flex-shrink:0;}
.admin-event-name{font-family:var(--sans);font-size:13px;font-weight:600;margin-bottom:2px;}
.admin-event-tag{font-family:var(--sans);font-size:11px;color:var(--red);letter-spacing:1px;text-transform:uppercase;}
.admin-go-site{display:inline-flex;align-items:center;gap:8px;font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--gray-600);border:1px solid var(--gray-200);padding:10px 18px;cursor:pointer;background:#fff;transition:all .2s;}
.admin-go-site:hover{background:#0a0a0a;color:white;border-color:#0a0a0a;}

`;

/* ─── REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".reveal");
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
          }),
        { threshold: 0.08 },
      );
      els.forEach((el) => obs.observe(el));
    }, 120);
    return () => clearTimeout(timer);
  }, []);
}

function reRunReveal() {
  setTimeout(() => {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
  }, 80);
}

function LoadingSkeleton({ rows = 3 }) {
  return (
    <div style={{ padding: "24px 0" }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="skeleton skeleton-block"
          style={{ width: `${70 + (i % 3) * 10}%` }}
        />
      ))}
    </div>
  );
}

/* ─── SUPABASE HELPERS ─── */
async function getMyRole() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();
  return data?.role ?? null;
}

async function uploadToBucket(bucket, id, file) {
  if (!file) return null;
  const ext = file.name.split(".").pop();
  const path = `${id}.${ext}`;
  await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/* ══════════════════════════════════════════════════════════════
   ADMIN MANAGERS
══════════════════════════════════════════════════════════════ */

const EMPTY_EVENT = {
  title: "",
  date: "",
  tag: "",
  content: "",
  registration_deadline: "",
  form_link: "",
  image_url: "",
  sort_order: 0,
};

function EventsManager() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(EMPTY_EVENT);
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [msg, setMsg] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("sort_order");
    setEvents(data ?? []);
  }

  function openNew() {
    setForm(EMPTY_EVENT);
    setImgFile(null);
    setPreview(null);
    setView("new");
  }
  function openEdit(ev) {
    setForm({
      title: ev.title,
      date: ev.date,
      tag: ev.tag,
      content: ev.content,
      registration_deadline: ev.registration_deadline ?? "",
      form_link: ev.form_link ?? "",
      image_url: ev.image_url ?? "",
      sort_order: ev.sort_order ?? 0,
    });
    setImgFile(null);
    setPreview(ev.image_url || null);
    setView(ev.id);
  }
  function f(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function save() {
    if (!form.title || !form.date || !form.tag || !form.content) {
      setMsg({
        t: "err",
        m: "Title, date, tag, and description are required.",
      });
      return;
    }
    setSaving(true);
    try {
      if (view === "new") {
        const { data: ins, error } = await supabase
          .from("events")
          .insert([{ ...form, image_url: "" }])
          .select()
          .single();
        if (error) throw error;
        const url = await uploadToBucket(EVENT_BUCKET, ins.id, imgFile);
        if (url)
          await supabase
            .from("events")
            .update({ image_url: url })
            .eq("id", ins.id);
      } else {
        const url = imgFile
          ? await uploadToBucket(EVENT_BUCKET, view, imgFile)
          : form.image_url;
        const { error } = await supabase
          .from("events")
          .update({
            ...form,
            image_url: url ?? "",
            updated_at: new Date().toISOString(),
          })
          .eq("id", view);
        if (error) throw error;
      }
      setMsg({
        t: "ok",
        m: view === "new" ? "Event created!" : "Event updated!",
      });
      await load();
      setTimeout(() => {
        setView("list");
        setMsg(null);
      }, 1000);
    } catch (e) {
      setMsg({ t: "err", m: e.message });
    }
    setSaving(false);
  }

  async function del(ev) {
    if (!confirm(`Delete "${ev.title}"?`)) return;
    setDeleting(ev.id);
    if (ev.image_url) {
      const path = ev.image_url.split(`/${EVENT_BUCKET}/`)[1];
      if (path) await supabase.storage.from(EVENT_BUCKET).remove([path]);
    }
    await supabase.from("events").delete().eq("id", ev.id);
    await load();
    setDeleting(null);
  }

  if (view !== "list")
    return (
      <div className="mgr-form">
        <button
          className="mgr-back"
          onClick={() => {
            setView("list");
            setMsg(null);
          }}
        >
          ← Back to Events
        </button>
        <div className="mgr-form-title">
          {view === "new" ? "New Event" : "Edit Event"}
        </div>
        {msg && <div className={`mgr-msg ${msg.t}`}>{msg.m}</div>}
        <div className="mgr-grid">
          <div className="mgr-field full">
            <label>Event Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={f}
              placeholder="IGNITE PITCH 3.0"
            />
          </div>
          <div className="mgr-field">
            <label>Date / Period *</label>
            <input
              name="date"
              value={form.date}
              onChange={f}
              placeholder="January 2025"
            />
          </div>
          <div className="mgr-field">
            <label>Tag *</label>
            <input
              name="tag"
              value={form.tag}
              onChange={f}
              placeholder="Pitch Competition"
            />
          </div>
          <div className="mgr-field">
            <label>Registration Deadline</label>
            <input
              name="registration_deadline"
              type="date"
              value={form.registration_deadline}
              onChange={f}
            />
          </div>
          <div className="mgr-field">
            <label>Google Form Link</label>
            <input
              name="form_link"
              value={form.form_link}
              onChange={f}
              placeholder="https://forms.gle/..."
            />
          </div>
          <div className="mgr-field">
            <label>Sort Order</label>
            <input
              name="sort_order"
              type="number"
              value={form.sort_order}
              onChange={f}
            />
          </div>
          <div className="mgr-field full">
            <label>Description *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={f}
              rows={5}
              placeholder="Describe the event..."
            />
          </div>
          <div className="mgr-field full">
            <label>Event Image</label>
            <div
              className="mgr-img-drop"
              onClick={() => fileRef.current.click()}
            >
              {preview ? (
                <img src={preview} className="mgr-img-preview" alt="preview" />
              ) : (
                <span className="mgr-img-ph">Click to upload image</span>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImgFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {preview && (
              <button
                className="mgr-clear-img"
                onClick={() => {
                  setPreview(null);
                  setImgFile(null);
                  setForm((p) => ({ ...p, image_url: "" }));
                }}
              >
                Remove image
              </button>
            )}
          </div>
        </div>
        <div className="mgr-form-actions">
          <button
            className="btn-adm cancel"
            onClick={() => {
              setView("list");
              setMsg(null);
            }}
          >
            Cancel
          </button>
          <button className="btn-adm primary" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save Event"}
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <div className="mgr-header">
        <div className="mgr-title">
          Events <span className="mgr-count">{events.length} total</span>
        </div>
        <button className="btn-adm primary" onClick={openNew}>
          + New Event
        </button>
      </div>
      <div className="mgr-list">
        {events.map((ev) => (
          <div className="mgr-item" key={ev.id}>
            {ev.image_url ? (
              <img
                src={ev.image_url}
                className="mgr-item-thumb"
                alt={ev.title}
              />
            ) : (
              <div className="mgr-item-thumb-ph">
                <i className="fas fa-calendar" />
              </div>
            )}
            <div className="mgr-item-body">
              <div className="mgr-item-name">{ev.title}</div>
              <div className="mgr-item-meta">
                <span className="mgr-tag mgr-tag-red">{ev.tag}</span>
                <span className="mgr-date">{ev.date}</span>
                {ev.registration_deadline && (
                  <span className="mgr-date">
                    Reg. by {ev.registration_deadline}
                  </span>
                )}
                {ev.form_link && (
                  <a
                    href={ev.form_link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 11, color: "var(--red)" }}
                  >
                    Form ↗
                  </a>
                )}
              </div>
              <div className="mgr-excerpt">{ev.content?.slice(0, 100)}…</div>
            </div>
            <div className="mgr-actions">
              <button className="btn-adm edit" onClick={() => openEdit(ev)}>
                Edit
              </button>
              <button
                className="btn-adm del"
                onClick={() => del(ev)}
                disabled={deleting === ev.id}
              >
                {deleting === ev.id ? "…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="mgr-empty">No events yet. Create one!</div>
        )}
      </div>
    </div>
  );
}

const EMPTY_GAL = {
  label: "",
  icon: "fa-image",
  cat: "",
  wide: false,
  sort_order: 0,
  image_url: "",
};

function GalleryManager() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(EMPTY_GAL);
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [msg, setMsg] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    load();
  }, []);
  async function load() {
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .order("sort_order");
    setItems(data ?? []);
  }
  function openNew() {
    setForm(EMPTY_GAL);
    setImgFile(null);
    setPreview(null);
    setView("new");
  }
  function openEdit(it) {
    setForm({
      label: it.label,
      icon: it.icon,
      cat: it.cat,
      wide: it.wide,
      sort_order: it.sort_order,
      image_url: it.image_url ?? "",
    });
    setPreview(it.image_url || null);
    setImgFile(null);
    setView(it.id);
  }
  function f(e) {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [e.target.name]: val }));
  }

  async function save() {
    if (!form.label || !form.cat) {
      setMsg({ t: "err", m: "Label and category required." });
      return;
    }
    setSaving(true);
    try {
      if (view === "new") {
        const { data: ins, error } = await supabase
          .from("gallery_items")
          .insert([{ ...form, image_url: "" }])
          .select()
          .single();
        if (error) throw error;
        const url = await uploadToBucket(GALLERY_BUCKET, ins.id, imgFile);
        if (url)
          await supabase
            .from("gallery_items")
            .update({ image_url: url })
            .eq("id", ins.id);
      } else {
        const url = imgFile
          ? await uploadToBucket(GALLERY_BUCKET, view, imgFile)
          : form.image_url;
        const { error } = await supabase
          .from("gallery_items")
          .update({ ...form, image_url: url ?? "" })
          .eq("id", view);
        if (error) throw error;
      }
      setMsg({ t: "ok", m: "Saved!" });
      await load();
      setTimeout(() => {
        setView("list");
        setMsg(null);
      }, 1000);
    } catch (e) {
      setMsg({ t: "err", m: e.message });
    }
    setSaving(false);
  }

  async function del(it) {
    if (!confirm(`Delete "${it.label}"?`)) return;
    setDeleting(it.id);
    if (it.image_url) {
      const path = it.image_url.split(`/${GALLERY_BUCKET}/`)[1];
      if (path) await supabase.storage.from(GALLERY_BUCKET).remove([path]);
    }
    await supabase.from("gallery_items").delete().eq("id", it.id);
    await load();
    setDeleting(null);
  }

  if (view !== "list")
    return (
      <div className="mgr-form">
        <button
          className="mgr-back"
          onClick={() => {
            setView("list");
            setMsg(null);
          }}
        >
          ← Back to Gallery
        </button>
        <div className="mgr-form-title">
          {view === "new" ? "New Gallery Item" : "Edit Gallery Item"}
        </div>
        {msg && <div className={`mgr-msg ${msg.t}`}>{msg.m}</div>}
        <div className="mgr-grid">
          <div className="mgr-field">
            <label>Label *</label>
            <input
              name="label"
              value={form.label}
              onChange={f}
              placeholder="NEC IIT Bombay"
            />
          </div>
          <div className="mgr-field">
            <label>Category *</label>
            <input name="cat" value={form.cat} onChange={f} placeholder="nec" />
          </div>
          <div className="mgr-field">
            <label>Icon (Font Awesome)</label>
            <input
              name="icon"
              value={form.icon}
              onChange={f}
              placeholder="fa-image"
            />
          </div>
          <div className="mgr-field">
            <label>Sort Order</label>
            <input
              name="sort_order"
              type="number"
              value={form.sort_order}
              onChange={f}
            />
          </div>
          <div className="mgr-field check">
            <label>
              <input
                name="wide"
                type="checkbox"
                checked={form.wide}
                onChange={f}
                style={{ marginRight: 6 }}
              />
              Wide tile (spans 2 columns)
            </label>
          </div>
          <div className="mgr-field full">
            <label>Image</label>
            <div
              className="mgr-img-drop"
              onClick={() => fileRef.current.click()}
            >
              {preview ? (
                <img src={preview} className="mgr-img-preview" alt="preview" />
              ) : (
                <span className="mgr-img-ph">Click to upload image</span>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImgFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {preview && (
              <button
                className="mgr-clear-img"
                onClick={() => {
                  setPreview(null);
                  setImgFile(null);
                  setForm((p) => ({ ...p, image_url: "" }));
                }}
              >
                Remove image
              </button>
            )}
          </div>
        </div>
        <div className="mgr-form-actions">
          <button
            className="btn-adm cancel"
            onClick={() => {
              setView("list");
              setMsg(null);
            }}
          >
            Cancel
          </button>
          <button className="btn-adm primary" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <div className="mgr-header">
        <div className="mgr-title">
          Gallery <span className="mgr-count">{items.length} items</span>
        </div>
        <button className="btn-adm primary" onClick={openNew}>
          + New Item
        </button>
      </div>
      <div className="mgr-list">
        {items.map((it) => (
          <div className="mgr-item" key={it.id}>
            {it.image_url ? (
              <img
                src={it.image_url}
                className="mgr-item-thumb"
                alt={it.label}
              />
            ) : (
              <div className="mgr-item-thumb-ph">
                <i className={`fas ${it.icon}`} />
              </div>
            )}
            <div className="mgr-item-body">
              <div className="mgr-item-name">{it.label}</div>
              <div className="mgr-item-meta">
                <span className="mgr-tag">{it.cat}</span>
                {it.wide && <span className="mgr-tag">Wide</span>}
              </div>
            </div>
            <div className="mgr-actions">
              <button className="btn-adm edit" onClick={() => openEdit(it)}>
                Edit
              </button>
              <button
                className="btn-adm del"
                onClick={() => del(it)}
                disabled={deleting === it.id}
              >
                {deleting === it.id ? "…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="mgr-empty">No gallery items yet.</div>
        )}
      </div>
    </div>
  );
}

const EMPTY_SP = { initial: "", name: "", role: "", tag: "", sort_order: 0 };
function SpeakersManager() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(EMPTY_SP);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    load();
  }, []);
  async function load() {
    const { data } = await supabase
      .from("speakers")
      .select("*")
      .order("sort_order");
    setItems(data ?? []);
  }
  function openNew() {
    setForm(EMPTY_SP);
    setView("new");
  }
  function openEdit(s) {
    setForm({
      initial: s.initial,
      name: s.name,
      role: s.role,
      tag: s.tag,
      sort_order: s.sort_order,
    });
    setView(s.id);
  }
  function f(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  async function save() {
    if (!form.name || !form.role) {
      setMsg({ t: "err", m: "Name and role required." });
      return;
    }
    setSaving(true);
    try {
      if (view === "new") {
        const { error } = await supabase.from("speakers").insert([form]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("speakers")
          .update(form)
          .eq("id", view);
        if (error) throw error;
      }
      setMsg({ t: "ok", m: "Saved!" });
      await load();
      setTimeout(() => {
        setView("list");
        setMsg(null);
      }, 1000);
    } catch (e) {
      setMsg({ t: "err", m: e.message });
    }
    setSaving(false);
  }
  async function del(s) {
    if (!confirm(`Delete "${s.name}"?`)) return;
    setDeleting(s.id);
    await supabase.from("speakers").delete().eq("id", s.id);
    await load();
    setDeleting(null);
  }

  if (view !== "list")
    return (
      <div className="mgr-form">
        <button
          className="mgr-back"
          onClick={() => {
            setView("list");
            setMsg(null);
          }}
        >
          ← Back to Speakers
        </button>
        <div className="mgr-form-title">
          {view === "new" ? "New Speaker" : "Edit Speaker"}
        </div>
        {msg && <div className={`mgr-msg ${msg.t}`}>{msg.m}</div>}
        <div className="mgr-grid">
          <div className="mgr-field">
            <label>Initial (avatar)</label>
            <input
              name="initial"
              value={form.initial}
              onChange={f}
              placeholder="A"
              maxLength={2}
            />
          </div>
          <div className="mgr-field">
            <label>Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={f}
              placeholder="Dr. Jane Smith"
            />
          </div>
          <div className="mgr-field">
            <label>Role / Title *</label>
            <input
              name="role"
              value={form.role}
              onChange={f}
              placeholder="Founder & CEO"
            />
          </div>
          <div className="mgr-field">
            <label>Event Tag</label>
            <input
              name="tag"
              value={form.tag}
              onChange={f}
              placeholder="Ignite Pitch 2.0"
            />
          </div>
          <div className="mgr-field">
            <label>Sort Order</label>
            <input
              name="sort_order"
              type="number"
              value={form.sort_order}
              onChange={f}
            />
          </div>
        </div>
        <div className="mgr-form-actions">
          <button
            className="btn-adm cancel"
            onClick={() => {
              setView("list");
              setMsg(null);
            }}
          >
            Cancel
          </button>
          <button className="btn-adm primary" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    );
  return (
    <div>
      <div className="mgr-header">
        <div className="mgr-title">
          Speakers <span className="mgr-count">{items.length} total</span>
        </div>
        <button className="btn-adm primary" onClick={openNew}>
          + New Speaker
        </button>
      </div>
      <div className="mgr-list">
        {items.map((s) => (
          <div className="mgr-item" key={s.id}>
            <div className="mgr-avatar">{s.initial}</div>
            <div className="mgr-item-body">
              <div className="mgr-item-name">{s.name}</div>
              <div className="mgr-item-meta">
                <span className="mgr-tag">{s.role}</span>
                <span className="mgr-date">{s.tag}</span>
              </div>
            </div>
            <div className="mgr-actions">
              <button className="btn-adm edit" onClick={() => openEdit(s)}>
                Edit
              </button>
              <button
                className="btn-adm del"
                onClick={() => del(s)}
                disabled={deleting === s.id}
              >
                {deleting === s.id ? "…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="mgr-empty">No speakers yet.</div>
        )}
      </div>
    </div>
  );
}

const EMPTY_TM = { quote: "", name: "", info: "", sort_order: 0 };
function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(EMPTY_TM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    load();
  }, []);
  async function load() {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order");
    setItems(data ?? []);
  }
  function openNew() {
    setForm(EMPTY_TM);
    setView("new");
  }
  function openEdit(t) {
    setForm({
      quote: t.quote,
      name: t.name,
      info: t.info,
      sort_order: t.sort_order,
    });
    setView(t.id);
  }
  function f(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  async function save() {
    if (!form.quote || !form.name) {
      setMsg({ t: "err", m: "Quote and name required." });
      return;
    }
    setSaving(true);
    try {
      if (view === "new") {
        const { error } = await supabase.from("testimonials").insert([form]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("testimonials")
          .update(form)
          .eq("id", view);
        if (error) throw error;
      }
      setMsg({ t: "ok", m: "Saved!" });
      await load();
      setTimeout(() => {
        setView("list");
        setMsg(null);
      }, 1000);
    } catch (e) {
      setMsg({ t: "err", m: e.message });
    }
    setSaving(false);
  }
  async function del(t) {
    if (!confirm(`Delete testimonial from "${t.name}"?`)) return;
    setDeleting(t.id);
    await supabase.from("testimonials").delete().eq("id", t.id);
    await load();
    setDeleting(null);
  }

  if (view !== "list")
    return (
      <div className="mgr-form">
        <button
          className="mgr-back"
          onClick={() => {
            setView("list");
            setMsg(null);
          }}
        >
          ← Back to Testimonials
        </button>
        <div className="mgr-form-title">
          {view === "new" ? "New Testimonial" : "Edit Testimonial"}
        </div>
        {msg && <div className={`mgr-msg ${msg.t}`}>{msg.m}</div>}
        <div className="mgr-grid">
          <div className="mgr-field full">
            <label>Quote *</label>
            <textarea
              name="quote"
              value={form.quote}
              onChange={f}
              rows={4}
              placeholder="What they said…"
            />
          </div>
          <div className="mgr-field">
            <label>Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={f}
              placeholder="Student Name"
            />
          </div>
          <div className="mgr-field">
            <label>Info (batch/dept)</label>
            <input
              name="info"
              value={form.info}
              onChange={f}
              placeholder="BE Computer Engineering · 2025 Batch"
            />
          </div>
          <div className="mgr-field">
            <label>Sort Order</label>
            <input
              name="sort_order"
              type="number"
              value={form.sort_order}
              onChange={f}
            />
          </div>
        </div>
        <div className="mgr-form-actions">
          <button
            className="btn-adm cancel"
            onClick={() => {
              setView("list");
              setMsg(null);
            }}
          >
            Cancel
          </button>
          <button className="btn-adm primary" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    );
  return (
    <div>
      <div className="mgr-header">
        <div className="mgr-title">
          Testimonials <span className="mgr-count">{items.length} total</span>
        </div>
        <button className="btn-adm primary" onClick={openNew}>
          + New Testimonial
        </button>
      </div>
      <div className="mgr-list">
        {items.map((t) => (
          <div className="mgr-item" key={t.id}>
            <div className="mgr-item-body">
              <div
                className="mgr-item-name"
                style={{ fontStyle: "italic", fontWeight: 400 }}
              >
                "{t.quote.slice(0, 90)}…"
              </div>
              <div className="mgr-item-meta">
                <span className="mgr-tag">{t.name}</span>
                <span className="mgr-date">{t.info}</span>
              </div>
            </div>
            <div className="mgr-actions">
              <button className="btn-adm edit" onClick={() => openEdit(t)}>
                Edit
              </button>
              <button
                className="btn-adm del"
                onClick={() => del(t)}
                disabled={deleting === t.id}
              >
                {deleting === t.id ? "…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="mgr-empty">No testimonials yet.</div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ADMIN DASHBOARD
══════════════════════════════════════════════════════════════ */
function AdminDashboard({ session, userRole, onLogout, onGoToSite }) {
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState([]);
  const [loadingOverview, setLoadingOverview] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("events").select("*").order("sort_order"),
      supabase.from("stats").select("*").order("sort_order"),
    ]).then(([evRes, stRes]) => {
      setEvents(evRes.data ?? []);
      setStats(stRes.data ?? []);
      setLoadingOverview(false);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout();
  }

  const TABS = [
    { id: "overview", icon: "fa-th-large", label: "Overview" },
    { id: "events", icon: "fa-calendar", label: "Events" },
    { id: "gallery", icon: "fa-images", label: "Gallery" },
    { id: "testimonials", icon: "fa-quote-left", label: "Testimonials" },
  ];

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <button
            className="admin-menu-toggle"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`}></i>
            MENU
          </button>
          <div className="admin-topbar-logo">
            E-CELL <span>MESW</span>COE
          </div>
          <div className="admin-badge">Admin</div>
        </div>
        <div className="admin-topbar-right">
          <span className="admin-user-email">{session.user.email}</span>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </div>

      <div className="admin-body">
        <div
          className={`admin-sidebar-backdrop${sidebarOpen ? " open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />
        <nav className={`admin-sidebar${sidebarOpen ? " open" : ""}`}>
          <span className="admin-sidebar-label">Menu</span>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`admin-nav-btn${tab === t.id ? " active" : ""}`}
              onClick={() => {
                setTab(t.id);
                setSidebarOpen(false);
              }}
            >
              <i className={`fas ${t.icon}`} style={{ width: 16 }}></i>
              {t.label}
            </button>
          ))}
          <div
            style={{
              marginTop: "auto",
              padding: "16px",
              borderTop: "1px solid #222",
            }}
          >
            <button
              className="admin-go-site"
              onClick={onGoToSite}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <i className="fas fa-external-link-alt"></i> View Site
            </button>
          </div>
        </nav>

        <main className="admin-main-area">
          {tab === "overview" && (
            <div className="admin-content">
              <div className="admin-welcome">
                <h1>Dashboard</h1>
                <p>
                  Welcome back — <strong>{session.user.email}</strong>
                </p>
              </div>
              <div className="admin-stats-row">
                {loadingOverview
                  ? [0, 1, 2, 3].map((i) => (
                      <div className="admin-stat-card" key={i}>
                        <div
                          className="skeleton skeleton-block"
                          style={{ height: 36, width: "50%", marginBottom: 6 }}
                        />
                        <div
                          className="skeleton skeleton-block"
                          style={{ height: 12, width: "70%" }}
                        />
                      </div>
                    ))
                  : stats.length > 0
                    ? stats.map((s, i) => (
                        <div className="admin-stat-card" key={s.id || i}>
                          <div className="admin-stat-num">
                            {s.num}
                            {s.suffix || ""}
                          </div>
                          <div className="admin-stat-label">{s.label}</div>
                        </div>
                      ))
                    : [
                        ["8", "Total Events"],
                        ["33", "Team Members"],
                        ["100+", "Participants"],
                        ["1", "NEC Finalist"],
                      ].map(([n, l], i) => (
                        <div className="admin-stat-card" key={i}>
                          <div className="admin-stat-num">{n}</div>
                          <div className="admin-stat-label">{l}</div>
                        </div>
                      ))}
              </div>
              <div className="admin-card">
                <div className="admin-card-title">
                  <span>All Events</span>
                  <span style={{ color: "var(--red)", fontSize: 11 }}>
                    {events.length} total
                  </span>
                </div>
                {loadingOverview ? (
                  <LoadingSkeleton rows={4} />
                ) : (
                  events.map((ev, i) => (
                    <div className="admin-event-row" key={ev.id || i}>
                      <div className="admin-event-num">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="admin-event-name">{ev.title}</div>
                        <div className="admin-event-tag">
                          {ev.date} · {ev.tag}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {tab === "events" && <EventsManager />}
          {tab === "gallery" && <GalleryManager />}
          {tab === "testimonials" && <TestimonialsManager />}
        </main>
      </div>
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer({ onNav }) {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            E-CELL
            <br />
            <span>MESW</span>COE
          </div>
          <div className="footer-tagline">
            Innovate Today. Elevate Tomorrow.
          </div>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          {["home", "about", "events", "gallery", "contact"].map((p) => (
            <a key={p} onClick={() => onNav(p)}>
              {p === "home"
                ? "Home"
                : p === "about"
                  ? "About Us"
                  : p.charAt(0).toUpperCase() + p.slice(1)}
            </a>
          ))}
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a>ecell@meswcoe.edu.in</a>
          <a>
            MES Wadia College of Engineering
            <br />
            Pune, Maharashtra
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 E-Cell MESWCOE. All rights reserved.</span>
        <div className="social-links">
          <a href="#" className="soc-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="soc-link">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="soc-link">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── LOGIN PAGE ─── */
function LoginPage({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        { email, password },
      );
      if (authError) throw authError;
      if (data.session) {
        const role = await getMyRole();
        if (!role)
          throw new Error("Access denied. You do not have an admin role.");
        onLoginSuccess(data.session, role);
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page" style={{ paddingTop: 0 }}>
      <div className="auth-left">
        <div>
          <div className="auth-left-logo">
            E-CELL
            <br />
            <span>MESW</span>COE
          </div>
          <div className="auth-left-tagline">
            Innovate Today. Elevate Tomorrow.
          </div>
        </div>
        <div className="auth-left-footer">Admin Portal · MESWCOE · Pune</div>
      </div>
      <div className="auth-right">
        <div className="auth-right-inner">
          <span className="auth-label">Admin Access</span>
          <h1 className="auth-title">
            Welcome
            <br />
            Back.
          </h1>
          <p className="auth-sub">
            Sign in with your admin credentials to access the E-Cell dashboard.
          </p>
          {error && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
          <div className="auth-input-wrap">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@meswcoe.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              autoFocus
            />
          </div>
          <div className="auth-input-wrap">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <button
            className="auth-submit"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Signing In…
              </>
            ) : (
              <>
                Sign In <i className="fas fa-arrow-right"></i>
              </>
            )}
          </button>
          <div className="auth-back">
            <button onClick={onBack}>← Back to website</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ onNav, onJoin }) {
  const [stats, setStats] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  useReveal();

  useEffect(() => {
    Promise.all([
      apiFetch("/api/stats").catch(() => []),
      apiFetch("/api/speakers").catch(() => []),
      apiFetch("/api/testimonials").catch(() => []),
    ])
      .then(([s, sp, t]) => {
        setStats(Array.isArray(s) ? s : []);
        setSpeakers(Array.isArray(sp) ? sp : []);
        setTestimonials(Array.isArray(t) ? t : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) reRunReveal();
  }, [loading]);

  const displayStats =
    stats.length > 0
      ? stats
      : [
          { num: "80", suffix: "+", label: "Students Trained" },
          { num: "100", suffix: "+", label: "Event Participants" },
          { num: "3", suffix: "+", label: "Years Active" },
          { num: "1", suffix: "", label: "NEC Grand Finale" },
        ];

  return (
    <div>
      <section id="hero">
        <img src={heroPhoto} alt="E-Cell Team" className="hero-bg-img" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-bg-text">EC</div>
          <div className="hero-badge reveal">
            <span></span>Est. July 22, 2023 — MESWCOE, Pune
          </div>
          <h1 className="hero-title reveal">
            E-CELL
            <br />
            <span className="red">MESW</span>COE
          </h1>
          <p className="hero-sub reveal">
            Innovate Today.
            <br />
            Elevate Tomorrow.
          </p>
          <div className="hero-actions reveal">
            <button className="btn-primary" onClick={() => onNav("about")}>
              Our Story <i className="fas fa-arrow-right"></i>
            </button>
            <button className="btn-outline" onClick={() => onNav("events")}>
              Explore Events
            </button>
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {[
            "ENTREPRENEURSHIP",
            "INNOVATION",
            "LEADERSHIP",
            "NEC IIT BOMBAY",
            "IGNITE PITCH",
            "ILLUMINATE",
            "WADIA COLLEGE",
            "ENTREPRENEURSHIP",
            "INNOVATION",
            "LEADERSHIP",
            "NEC IIT BOMBAY",
            "IGNITE PITCH",
            "ILLUMINATE",
            "WADIA COLLEGE",
          ]
            .map((t, i) => <span key={i}>{t}</span>)
            .reduce(
              (acc, el, i) =>
                i === 0
                  ? [el]
                  : [
                      ...acc,
                      <span key={`d${i}`} className="dot">
                        ●
                      </span>,
                      el,
                    ],
              [],
            )}
        </div>
      </div>

      <div className="home-what">
        <div className="reveal">
          <span className="section-label">The Idea</span>
          <h2 className="section-title">
            What is
            <br />
            E-Cell?
          </h2>
          <p className="what-big">
            More than just a college club — it's a culture and a movement that
            builds people.
          </p>
          <p className="what-body">
            E-Cell MESWCOE is the official Entrepreneurship Cell of Modern
            Education Society's Wadia College of Engineering, Pune. We create an
            environment where students are encouraged to{" "}
            <strong>think differently</strong>, identify real-world problems,
            and turn ideas into solutions.
            <br />
            <br />
            Here, students don't just organize events — they become{" "}
            <strong>
              planners, leaders, marketers, negotiators, and changemakers
            </strong>{" "}
            ready to build the future.
          </p>
          <div style={{ marginTop: 28 }}>
            <button className="btn-primary" onClick={() => onNav("about")}>
              Learn More <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="reveal">
          <div
            style={{
              background: "var(--black)",
              padding: "44px 36px",
              color: "white",
            }}
          >
            <div
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(72px,16vw,96px)",
                lineHeight: 1,
                color: "var(--red)",
                marginBottom: 14,
              }}
            >
              E
            </div>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(17px,3vw,21px)",
                lineHeight: 1.65,
                color: "rgba(255,255,255,.75)",
              }}
            >
              "E-Cell transforms curious minds into confident innovators ready
              to build the future."
            </p>
            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,.1)",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "rgba(255,255,255,.28)",
              }}
            >
              Est. July 22, 2023 · MESWCOE · Pune
            </div>
          </div>
        </div>
      </div>

      <div className="home-stats">
        {displayStats.map((s, i) => (
          <div className="hstat reveal" key={s.id || i}>
            <div className="hstat-num">
              {s.num}
              <span>{s.suffix || ""}</span>
            </div>
            <div className="hstat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="home-initiatives">
        <span className="section-label reveal">What We Do</span>
        <h2 className="section-title reveal">Our Initiatives</h2>
        <div className="initiatives-grid">
          {[
            [
              "fa-rocket",
              "Startup Pitching",
              "Providing students a professional platform to present ideas to real investors and mentors through structured pitch competitions.",
            ],
            [
              "fa-lightbulb",
              "Ideation Workshops",
              "Structured sessions guiding students from problem identification to validated ideas — the crucial first step in entrepreneurship.",
            ],
            [
              "fa-trophy",
              "National Competitions",
              "Representing MESWCOE at national competitions including the NEC Grand Finale at IIT Bombay, gaining national recognition.",
            ],
            [
              "fa-users",
              "Industry Connect",
              "Bridging campus and startup ecosystems through company visits, alumni interactions, and mentor matchmaking.",
            ],
            [
              "fa-microphone",
              "Speaker Sessions",
              "Hosting talks by founders, investors, and industry leaders who share authentic entrepreneurial journeys.",
            ],
            [
              "fa-chalkboard-teacher",
              "Skill Development",
              "Leadership bootcamps, communication training, and business development programs for career-defining skills.",
            ],
          ].map(([icon, title, desc], i) => (
            <div className="init-card reveal" key={i}>
              <div className="init-icon">
                <i className={`fas ${icon}`}></i>
              </div>
              <div className="init-title">{title}</div>
              <div className="init-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-sponsors">
        <span className="section-label reveal">Trusted By</span>
        <h2 className="section-title reveal">
          Our Sponsors &<br />
          Partners
        </h2>
        <p
          style={{
            marginTop: 14,
            color: "var(--gray-400)",
            fontSize: 14,
            maxWidth: 440,
            lineHeight: 1.7,
          }}
          className="reveal"
        >
          Proudly supported by leading brands and organizations who believe in
          the next generation of entrepreneurs.
        </p>
        <div className="sponsors-track-wrap reveal">
          <div className="sponsors-track">
            {SPONSOR_MARQUEE.map((sp, i) => (
              <div className="sponsor-logo-card" key={i}>
                <img
                  src={sponsorSrc(sp.file)}
                  alt={sp.name}
                  className="sponsor-logo-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="home-testimonials">
        <span
          className="section-label reveal"
          style={{ color: "rgba(255,100,100,.8)" }}
        >
          What Members Say
        </span>
        <h2 className="section-title reveal" style={{ color: "white" }}>
          Testimonials
        </h2>
        <div className="testimonials-grid">
          {loading
            ? [0, 1, 2].map((i) => (
                <div className="testi-card" key={i}>
                  {[100, 80, 60].map((w, j) => (
                    <div
                      key={j}
                      className="skeleton skeleton-block"
                      style={{
                        height: 12,
                        width: `${w}%`,
                        background: "rgba(255,255,255,.08)",
                      }}
                    />
                  ))}
                </div>
              ))
            : testimonials.length > 0
              ? testimonials.map((t) => (
                  <div className="testi-card reveal" key={t.id}>
                    <div className="testi-quote">{t.quote}</div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-info">{t.info}</div>
                  </div>
                ))
              : [
                  [
                    "E-Cell gave me the courage to think beyond just getting a job. It pushed me to ask 'what problem can I solve?' and that changed everything.",
                    "Student Name",
                    "BE Computer Engineering · 2025 Batch",
                  ],
                  [
                    "Being part of the NEC team and competing at IIT Bombay was something I never imagined I'd do in college. E-Cell made it happen.",
                    "Student Name",
                    "TE Mechanical Engineering · 2026 Batch",
                  ],
                  [
                    "The speaker sessions exposed me to a world I didn't know existed. I left every event with a new perspective and a bigger vision.",
                    "Student Name",
                    "SE Electronics Engineering · 2027 Batch",
                  ],
                ].map(([q, n, info], i) => (
                  <div className="testi-card reveal" key={i}>
                    <div className="testi-quote">{q}</div>
                    <div className="testi-name">{n}</div>
                    <div className="testi-info">{info}</div>
                  </div>
                ))}
        </div>
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

/* ─── ABOUT PAGE ─── */
function AboutPage({ onNav }) {
  const [stats, setStats] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  useReveal();

  useEffect(() => {
    apiFetch("/api/stats")
      .then((data) => setStats(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoadingStats(false));
  }, []);

  const displayStats =
    stats.length > 0
      ? stats
      : [
          { num: "80", suffix: "+", label: "Students Trained" },
          { num: "100", suffix: "+", label: "Event Participants" },
          { num: "1", suffix: "", label: "NEC Grand Finale" },
          { num: "3", suffix: "+", label: "Years of Impact" },
        ];

  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">Our Story</span>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}
          >
            About
            <br />
            E-Cell
          </h1>
          <p>
            The official Entrepreneurship Cell of Modern Education Society's
            Wadia College of Engineering, Pune — building entrepreneurs since
            July 2023.
          </p>
        </div>
      </div>
      <div className="origins">
        <div className="origins-year reveal">2023</div>
        <div className="reveal">
          <span className="section-label">Origins of E-Cell</span>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(32px,7vw,68px)", marginBottom: 24 }}
          >
            Born From
            <br />
            Ambition
          </h2>
          <p className="origins-body">
            The spark began in early 2024 when a small group of ambitious
            students, led by{" "}
            <strong>Harshad Harishchandra Pakhale (Founder)</strong> and{" "}
            <strong>Manas Deshmukh (Co-Founder)</strong>, decided to build
            something meaningful from nothing.
            <br />
            <br />
            Supported by <strong>Prof. Shrikant Dhavale</strong>, the cell
            launched its first initiatives and rapidly evolved into one of
            Pune's most vibrant student-led entrepreneurship communities — with
            national recognition and a growing campus movement.
            <br />
            <br />
            Formally established on <strong>July 22, 2023</strong>, E-Cell
            MESWCOE now stands as a campus-wide culture, not just a club.
          </p>
        </div>
      </div>
      <div className="about-video-wrap">
        <video src={aboutVideo} autoPlay muted loop playsInline />
        <div className="about-video-label">E-Cell MESWCOE · In Action</div>
      </div>
      <div className="vision-section">
        <span className="section-label reveal">Our Vision</span>
        <h2 className="section-title reveal">
          Four Pillars of
          <br />
          Everything We Do
        </h2>
        <div className="vision-grid">
          {[
            [
              "01",
              "Empowerment",
              "Helping every student discover and develop their entrepreneurial potential through real experience.",
            ],
            [
              "02",
              "Innovation",
              "Challenging existing systems and imagining better products, services, and solutions.",
            ],
            [
              "03",
              "Collaboration",
              "Building meaningful ideas together. Diverse minds meeting around a shared purpose.",
            ],
            [
              "04",
              "Execution",
              "Turning thoughts into real action and tangible impact. Ideas only matter when they move.",
            ],
          ].map(([num, title, desc]) => (
            <div className="vision-card reveal" key={num}>
              <div className="vc-num">{num}</div>
              <div className="vc-title">{title}</div>
              <div className="vc-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-stats">
        {displayStats.map((s, i) => (
          <div className="astat reveal" key={s.id || i}>
            <div className="astat-num">
              {s.num}
              {s.suffix || ""}
            </div>
            <div className="astat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="spotlight">
        <span className="section-label reveal">Highlights</span>
        <h2 className="section-title reveal">In the Spotlight</h2>
        <div className="spotlight-grid">
          {[
            [
              "fa-trophy",
              "NEC Grand Finale — IIT Bombay",
              "Our team competed at the National Entrepreneurship Challenge by E-Cell IIT Bombay, qualifying for the Grand Finale and putting MESWCOE on the national map.",
              "2025 Achievement",
            ],
            [
              "fa-microphone-alt",
              "Ignite Pitch 2.0",
              "A high-energy pitching competition bringing 100+ participants to present startup ideas to industry mentors in a professional setting.",
              "Flagship Event",
            ],
            [
              "fa-star",
              "Illuminate 2.0",
              "A landmark knowledge-sharing summit with talks and panels by successful founders, drawing 100+ students for an evening of inspiration.",
              "2025 Edition",
            ],
            [
              "fa-handshake",
              "E-Cell IIT Bombay Partnership",
              "A strong collaboration giving MESWCOE students access to national networks, resources, and mentors from one of India's top entrepreneurship ecosystems.",
              "Ongoing Partnership",
            ],
          ].map(([icon, title, body, tag], i) => (
            <div className="spot-card reveal" key={i}>
              <div className="spot-icon">
                <i className={`fas ${icon}`}></i>
              </div>
              <div>
                <div className="spot-title">{title}</div>
                <div className="spot-body">{body}</div>
                <div className="spot-tag">{tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="history-section">
        <span className="section-label reveal">Timeline</span>
        <h2 className="section-title reveal">Our History</h2>
        <div className="timeline">
          {[
            [
              "2023",
              "Official Establishment — July 22, 2023",
              "E-Cell MESWCOE formally established at MES Wadia College of Engineering, Pune, under the guidance of Prof. Shrikant Dhavale.",
            ],
            [
              "Early\n2024",
              "First Events & NEC Entry",
              "VentureSphere team formed. E-Cell enters the National Entrepreneurship Challenge for the first time at a national level.",
            ],
            [
              "Jan\n2024",
              "Ignite Pitch 2.0 Launch",
              "Flagship pitch competition launched with 100+ participants, putting E-Cell on the campus map as a serious platform.",
            ],
            [
              "2025",
              "Breakthrough Year — NEC Grand Finale @ IIT Bombay",
              "Team qualifies for NEC Grand Finale at IIT Bombay. Illuminate 2.0 and VentureSphere 2.0 also successfully hosted.",
            ],
            [
              "2026",
              "Growing Strong",
              "Now one of Pune's most active student-led E-Cells, with a growing alumni network and expanding industry partnerships.",
            ],
          ].map(([year, title, desc], i) => (
            <div className="t-item reveal" key={i}>
              <div className="t-year-cell" style={{ whiteSpace: "pre-line" }}>
                {year}
              </div>
              <div className="t-line-cell">
                <div className="t-dot-el"></div>
              </div>
              <div className="t-content-cell">
                <div className="t-title">{title}</div>
                <div className="t-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="patronage">
        <span className="section-label reveal">Backed By</span>
        <h2 className="section-title reveal">
          Patronages &<br />
          Recognitions
        </h2>
        <div className="patron-grid">
          {[
            ["Prof. Shrikant Dhavale", "Faculty Advisor", "E-Cell MESWCOE"],
            ["Dr. M.P. Dale", "Principal", "MESWCOE, Pune"],
            [
              "Dr. V.N. Raibhole",
              "President, IIC",
              "Institution's Innovation Council",
            ],
            ["Harshad H. Pakhale", "Founder", "E-Cell MESWCOE"],
            ["Manas Deshmukh", "Co-Founder", "E-Cell MESWCOE"],
            [
              "E-Cell IIT Bombay",
              "National Partner",
              "NEC · National Entrepreneurship Challenge",
            ],
          ].map(([name, role, org], i) => (
            <div className="patron-card reveal" key={i}>
              <div className="patron-name">{name}</div>
              <div className="patron-role">{role}</div>
              <div className="patron-org">{org}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

/* ─── EVENTS PAGE ─── */
function EventsPage({ onNav }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  useReveal();

  useEffect(() => {
    apiFetch("/api/events")
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load events"))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (!loading) reRunReveal();
  }, [loading]);

  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">What We Do</span>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(52px,11vw,130px)" }}
          >
            Flagship
            <br />
            Events
          </h1>
          <p>
            Every event is designed to push students beyond their comfort zones
            and into the world of real entrepreneurship.
          </p>
        </div>
      </div>
      <div style={{ height: 40 }}></div>
      {error && (
        <div className="api-error" style={{ margin: "0 var(--px) 24px" }}>
          <i className="fas fa-exclamation-circle"></i> Could not load events:{" "}
          {error}
        </div>
      )}
      <div className="events-grid-page">
        {loading
          ? [0, 1, 2, 3, 4, 5].map((i) => (
              <div className="ev-card" key={i} style={{ cursor: "default" }}>
                <div
                  className="skeleton skeleton-block"
                  style={{ height: 44, width: "40%", marginBottom: 16 }}
                />
                <div
                  className="skeleton skeleton-block"
                  style={{ height: 10, width: "60%", marginBottom: 8 }}
                />
                <div
                  className="skeleton skeleton-block"
                  style={{ height: 16, width: "80%", marginBottom: 10 }}
                />
                <div
                  className="skeleton skeleton-block"
                  style={{ width: "100%" }}
                />
                <div
                  className="skeleton skeleton-block"
                  style={{ width: "90%" }}
                />
              </div>
            ))
          : events.map((ev, i) => (
              <div
                className="ev-card reveal"
                key={ev.id || i}
                onClick={() => setSelectedEvent(i)}
              >
                <div className="ev-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="ev-date">
                  {ev.date} · {ev.tag}
                </div>
                <div className="ev-title">{ev.title}</div>
                <div className="ev-desc">{ev.content.substring(0, 155)}…</div>
                <span className="ev-link">
                  Read More{" "}
                  <i
                    className="fas fa-arrow-right"
                    style={{ fontSize: 11 }}
                  ></i>
                </span>
              </div>
            ))}
      </div>
      {selectedEvent !== null && events[selectedEvent] && (
        <div
          className="modal-overlay open"
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedEvent(null)
          }
        >
          <div className="modal-box">
            <div className="modal-head">
              <button
                className="modal-close-btn"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>
              <span className="modal-ev-tag">
                {events[selectedEvent].date} · {events[selectedEvent].tag}
              </span>
              <div className="modal-ev-title">
                {events[selectedEvent].title}
              </div>
            </div>
            {events[selectedEvent].image_url && (
              <img
                src={events[selectedEvent].image_url}
                className="modal-ev-image"
                alt={events[selectedEvent].title}
              />
            )}
            <div className="modal-body-section">
              <p>{events[selectedEvent].content}</p>
              {events[selectedEvent].registration_deadline && (
                <div className="modal-reg-date">
                  <i
                    className="fas fa-calendar-alt"
                    style={{ color: "var(--red)", marginRight: 6 }}
                  ></i>
                  Registration deadline:{" "}
                  <strong>{events[selectedEvent].registration_deadline}</strong>
                </div>
              )}
              {events[selectedEvent].form_link && (
                <a
                  href={events[selectedEvent].form_link}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-form-link"
                >
                  Register Now <i className="fas fa-external-link-alt"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer onNav={onNav} />
    </div>
  );
}

/* ─── GALLERY HELPERS ─── */
const localGallery = [
  {
    id: 1,
    label: "Entrepreneurs",
    cat: "nec",
    wide: true,
    image_url: galEntrepreneurs,
  },
  {
    id: 2,
    label: "Ignite Pitch",
    cat: "ignite",
    wide: false,
    image_url: galIgnitePitch,
  },
  {
    id: 3,
    label: "Ignite Pitch 2.0",
    cat: "ignite",
    wide: false,
    image_url: galIgnitePitch20,
  },
  {
    id: 4,
    label: "InnovatExpo 2.0",
    cat: "venture",
    wide: true,
    image_url: galInnovatExpo20,
  },
  {
    id: 5,
    label: "Illuminate 1",
    cat: "illuminate",
    wide: false,
    image_url: galIlluminate1,
  },
  {
    id: 6,
    label: "Illuminate",
    cat: "illuminate",
    wide: false,
    image_url: galIlluminate,
  },
  {
    id: 7,
    label: "InnovatExpo",
    cat: "venture",
    wide: false,
    image_url: galInnovatExpo,
  },
  {
    id: 8,
    label: "Project",
    cat: "workshops",
    wide: false,
    image_url: galProject,
  },
];

/**
 * Reorders items so wide tiles (2 cols) always pair with 2 normal tiles
 * to fill a 4-column row perfectly, regardless of the order from the DB.
 * Row pattern: [wide(2 slots) + normal + normal] = 4 slots
 * Leftover normals fill rows of 4 by themselves.
 * Leftover wides with no normals to pair just append at the end.
 */
function arrangeGallery(items) {
  const wides = items.filter((i) => i.wide);
  const normals = items.filter((i) => !i.wide);
  const result = [];
  let wi = 0,
    ni = 0;

  while (wi < wides.length || ni < normals.length) {
    if (wi < wides.length && ni + 1 < normals.length) {
      // Perfect row: wide + 2 normals = 4 slots
      result.push(wides[wi++]);
      result.push(normals[ni++]);
      result.push(normals[ni++]);
    } else if (ni < normals.length) {
      // No more wides — drain remaining normals
      result.push(normals[ni++]);
    } else {
      // Leftover wide with no normals — just append
      result.push(wides[wi++]);
    }
  }
  return result;
}

/* ─── GALLERY PAGE ─── */
function GalleryPage({ onNav }) {
  const [galleryItems, setGalleryItems] = useState(localGallery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  useReveal();

  useEffect(() => {
    apiFetch("/api/gallery")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setGalleryItems(data);
        else setGalleryItems(localGallery);
      })
      .catch(() => setGalleryItems(localGallery))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) reRunReveal();
  }, [loading]);

  const filterCategories = [
    "all",
    ...new Set(galleryItems.map((g) => g.cat).filter(Boolean)),
  ];
  const filterLabels = {
    all: "All",
    ignite: "Ignite Pitch",
    illuminate: "Illuminate",
    venture: "VentureSphere",
    nec: "NEC IIT Bombay",
    workshops: "Workshops",
  };

  const filtered =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.cat === activeFilter);
  const arranged = arrangeGallery(filtered); // ← dynamic order fix

  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">Captured Moments</span>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(52px,11vw,130px)" }}
          >
            Gallery
          </h1>
          <p>
            Every event, every moment, every memory from the E-Cell journey.
          </p>
        </div>
      </div>
      <div style={{ height: 40 }}></div>
      {error && (
        <div className="api-error" style={{ margin: "0 var(--px) 24px" }}>
          <i className="fas fa-exclamation-circle"></i> Could not load gallery:{" "}
          {error}
        </div>
      )}
      {!loading && galleryItems.length > 0 && (
        <div className="gallery-filters">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${activeFilter === cat ? " active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {filterLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}
      <div className="gallery-grid">
        {loading
          ? [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div className={`gal-item${i % 5 === 0 ? " wide" : ""}`} key={i}>
                <div className="gal-placeholder skeleton"></div>
              </div>
            ))
          : arranged.map((item, i) => (
              <div
                className={`gal-item${item.wide ? " wide" : ""}`}
                key={item.id || i}
              >
                {item.image_url ? (
                  <>
                    <img
                      src={item.image_url}
                      className="gal-real-img"
                      alt={item.label}
                    />
                    <div className="gal-overlay">
                      <span>{item.label}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="gal-placeholder">
                      {item.icon && (
                        <i className={`fas ${item.icon} gal-icon-el`}></i>
                      )}
                      <div className="gal-label-el">{item.label}</div>
                    </div>
                    <div className="gal-overlay">
                      <span>View Photo</span>
                    </div>
                  </>
                )}
              </div>
            ))}
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

/* ─── CONTACT PAGE ─── */
function ContactPage({ onNav }) {
  const [activeYear, setActiveYear] = useState("current");
  const [teamByYear, setTeamByYear] = useState({});
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [teamError, setTeamError] = useState("");
  useReveal();

  const yearTabs = [
    { key: "current", label: "2026–2027 (Current)" },
    { key: "2025-2026", label: "2025–2026" },
    { key: "2024-2025", label: "2024–2025 (Founders)" },
  ];

  useEffect(() => {
    apiFetch("/api/team")
      .then((data) => {
        if (!Array.isArray(data)) return;
        const grouped = {};
        data.forEach((m) => {
          const y = m.year || "current";
          if (!grouped[y]) grouped[y] = [];
          grouped[y].push(m);
        });
        setTeamByYear(grouped);
      })
      .catch((err) => setTeamError(err.message || "Failed to load team"))
      .finally(() => {
        setLoadingTeam(false);
        setTimeout(() => reRunReveal(), 100);
      });
  }, []);

  useEffect(() => {
    reRunReveal();
  }, [activeYear]);

  const currentMembers = teamByYear[activeYear] || [];

  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">Get Involved</span>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(52px,11vw,130px)" }}
          >
            Contact
          </h1>
          <p>
            Meet the team, explore previous batches, and get in touch with us.
          </p>
        </div>
      </div>
      <div className="team-section">
        <span className="section-label reveal">The People</span>
        <h2 className="section-title reveal">Meet Our Team</h2>
        {teamError && (
          <div className="api-error" style={{ marginTop: 20 }}>
            <i className="fas fa-exclamation-circle"></i> {teamError}
          </div>
        )}
        <div className="year-tabs reveal">
          {yearTabs.map((tab) => (
            <button
              key={tab.key}
              className={`year-tab${activeYear === tab.key ? " active" : ""}`}
              onClick={() => setActiveYear(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="team-grid">
          {loadingTeam ? (
            [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div className="team-card" key={i}>
                <div
                  className="team-photo skeleton"
                  style={{ background: "none" }}
                ></div>
                <div
                  className="skeleton skeleton-block"
                  style={{ width: "60%", margin: "0 auto 6px" }}
                />
                <div
                  className="skeleton skeleton-block"
                  style={{ width: "80%", margin: "0 auto" }}
                />
              </div>
            ))
          ) : currentMembers.length > 0 ? (
            currentMembers.map((m, i) => (
              <div className="team-card reveal" key={m.id || i}>
                <div className="team-photo">{m.init}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-dept">{m.dept}</div>
              </div>
            ))
          ) : (
            <div className="team-empty">
              <i
                className="fas fa-users"
                style={{
                  fontSize: 32,
                  marginBottom: 12,
                  display: "block",
                  color: "var(--gray-200)",
                }}
              ></i>
              No team members found for this year.
            </div>
          )}
        </div>
      </div>
      <div className="contact-form-section">
        <div className="contact-grid">
          <div className="reveal">
            <span className="section-label">Reach Out</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(36px,8vw,72px)" }}
            >
              Send Us a<br />
              Message
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--gray-600)",
                lineHeight: 1.8,
                marginTop: 20,
                marginBottom: 28,
              }}
            >
              Have a question, collaboration idea, or want to be part of our
              story? We'd love to hear from you.
            </p>
            <div className="contact-detail">
              <i className="fas fa-envelope"></i> ecell@meswcoe.edu.in
            </div>
            <div className="contact-detail">
              <i className="fas fa-map-marker-alt"></i> MES Wadia College of
              Engineering, Pune
            </div>
            <div className="contact-detail">
              <i className="fab fa-instagram"></i> @ecell.meswcoe
            </div>
            <div className="contact-detail">
              <i className="fab fa-linkedin-in"></i> E-Cell MESWCOE
            </div>
          </div>
          <div className="form-box reveal">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Rahul" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Sharma" />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@email.com" />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select>
                <option>General Enquiry</option>
                <option>Collaboration / Sponsorship</option>
                <option>Joining E-Cell</option>
                <option>Event Query</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="Tell us what's on your mind..."
              ></textarea>
            </div>
            <button className="btn-send">
              Send Message{" "}
              <i className="fas fa-paper-plane" style={{ marginLeft: 8 }}></i>
            </button>
          </div>
        </div>
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

/* ─── JOIN MODAL ─── */
function JoinModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="join-overlay open"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="join-box">
        <button className="join-close" onClick={onClose}>
          ✕
        </button>
        <div className="join-title">
          Join the
          <br />
          <span style={{ color: "var(--red)" }}>Movement.</span>
        </div>
        <p className="join-sub">
          Become part of Pune's most ambitious student entrepreneurship
          community.
        </p>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="First name" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Last name" />
          </div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@email.com" />
        </div>
        <div className="form-group">
          <label>Year of Study</label>
          <select>
            <option>First Year (FE)</option>
            <option>Second Year (SE)</option>
            <option>Third Year (TE)</option>
            <option>Final Year (BE)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" placeholder="e.g. Computer Engineering" />
        </div>
        <div className="form-group">
          <label>Why do you want to join?</label>
          <textarea rows="3" placeholder="Tell us briefly..."></textarea>
        </div>
        <button className="btn-send">
          Submit Application{" "}
          <i className="fas fa-arrow-right" style={{ marginLeft: 8 }}></i>
        </button>
      </div>
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = useState("home");
  const [joinOpen, setJoinOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authView, setAuthView] = useState(null);
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        try {
          const role = await getMyRole();
          if (role) {
            setSession(data.session);
            setUserRole(role);
            setAuthView("dashboard");
          } else await supabase.auth.signOut();
        } catch {
          await supabase.auth.signOut();
        }
      }
      setAuthLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (!sess) {
        setSession(null);
        setUserRole(null);
        setAuthView(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const navTo = (p) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  if (authLoading)
    return (
      <>
        <style>{css}</style>
        <div
          style={{
            minHeight: "100svh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--black)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 32,
              color: "white",
              letterSpacing: 2,
            }}
          >
            <i
              className="fas fa-spinner fa-spin"
              style={{ color: "var(--red)", marginRight: 14 }}
            ></i>
            Loading…
          </div>
        </div>
      </>
    );

  if (authView === "login")
    return (
      <>
        <style>{css}</style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <LoginPage
          onLoginSuccess={(sess, role) => {
            setSession(sess);
            setUserRole(role);
            setAuthView("dashboard");
          }}
          onBack={() => setAuthView(null)}
        />
      </>
    );

  if (authView === "dashboard" && session)
    return (
      <>
        <style>{css}</style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <AdminDashboard
          session={session}
          userRole={userRole}
          onLogout={() => {
            setSession(null);
            setUserRole(null);
            setAuthView(null);
          }}
          onGoToSite={() => {
            setAuthView(null);
            navTo("home");
          }}
        />
      </>
    );

  return (
    <>
      <style>{css}</style>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <nav>
        <div className="nav-logo" onClick={() => navTo("home")}>
          <div className="nav-logo-mark">E</div>
          <div>
            <div className="nav-logo-text">E-CELL</div>
            <div className="nav-logo-sub">MESWCOE</div>
          </div>
        </div>
        <ul className="nav-desktop">
          {[
            ["home", "Home"],
            ["about", "About Us"],
            ["events", "Events"],
            ["gallery", "Gallery"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <li key={id}>
              <a
                className={page === id ? "active-nav" : ""}
                onClick={() => navTo(id)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="nav-admin-btn"
              onClick={() => setAuthView("login")}
              title="Admin Login"
            >
              <i className="fas fa-lock"></i> Admin
            </button>
          </li>
          <li>
            <button
              className="nav-cta-desktop"
              onClick={() => setJoinOpen(true)}
            >
              Join the Movement
            </button>
          </li>
        </ul>
        <button
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </nav>
      <div className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}>
        {[
          ["home", "Home"],
          ["about", "About Us"],
          ["events", "Events"],
          ["gallery", "Gallery"],
          ["contact", "Contact"],
        ].map(([id, label]) => (
          <a
            key={id}
            className={page === id ? "active-nav" : ""}
            onClick={() => navTo(id)}
          >
            {label}
          </a>
        ))}
        <a
          onClick={() => {
            setAuthView("login");
            setMobileMenuOpen(false);
          }}
        >
          <i
            className="fas fa-lock"
            style={{ marginRight: 8, color: "var(--gray-400)" }}
          ></i>
          Admin Login
        </a>
        <button
          className="mobile-nav-link mobile-join-btn"
          onClick={() => {
            setJoinOpen(true);
            setMobileMenuOpen(false);
          }}
        >
          Join the Movement
        </button>
      </div>
      <div style={{ paddingTop: 60 }}>
        {page === "home" && (
          <HomePage onNav={navTo} onJoin={() => setJoinOpen(true)} />
        )}
        {page === "about" && <AboutPage onNav={navTo} />}
        {page === "events" && <EventsPage onNav={navTo} />}
        {page === "gallery" && <GalleryPage onNav={navTo} />}
        {page === "contact" && <ContactPage onNav={navTo} />}
      </div>
      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  );
}

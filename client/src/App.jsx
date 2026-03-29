import { useState, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import heroPhoto from "./assets/hero-photo.jpg";
import aboutVideo from "./assets/about-video.mp4";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
:root{
  --white:#ffffff;--black:#0a0a0a;--red:#d42b2b;--red-dark:#a81f1f;
  --gray-100:#f5f5f5;--gray-200:#e8e8e8;--gray-400:#999;--gray-600:#555;
  --serif:'DM Serif Display',Georgia,serif;
  --sans:'DM Sans',system-ui,sans-serif;
  --display:'Bebas Neue',Impact,sans-serif;
  --px:24px;
}
@media(min-width:768px){:root{--px:48px;}}
html{scroll-behavior:smooth;}
body{font-family:var(--sans);background:var(--white);color:var(--black);overflow-x:hidden;}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);border-bottom:1px solid var(--gray-200);padding:0 var(--px);height:60px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--black);cursor:pointer;}
.nav-logo-mark{width:34px;height:34px;background:var(--red);color:white;font-family:var(--display);font-size:20px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.nav-logo-text{font-size:14px;font-weight:600;letter-spacing:.5px;line-height:1.2;}
.nav-logo-sub{font-size:9px;color:var(--gray-400);font-weight:400;letter-spacing:2px;text-transform:uppercase;}
.nav-desktop{display:none;}
@media(min-width:900px){
  .nav-desktop{display:flex;align-items:center;gap:4px;list-style:none;}
  .nav-desktop li a{text-decoration:none;font-size:13px;font-weight:500;color:var(--gray-600);padding:6px 14px;transition:color .2s;cursor:pointer;display:block;border-bottom:2px solid transparent;}
  .nav-desktop li a:hover{color:var(--black);}
  .nav-desktop li a.active-nav{color:var(--black);border-bottom-color:var(--red);}
  .nav-cta-desktop{background:var(--black);color:white;padding:9px 20px;font-size:13px;font-weight:600;letter-spacing:.5px;border:none;cursor:pointer;transition:background .2s;font-family:var(--sans);}
  .nav-cta-desktop:hover{background:var(--red);}
  .nav-admin-btn{background:transparent;color:var(--gray-400);padding:9px 14px;font-size:12px;font-weight:500;letter-spacing:.5px;border:1px solid var(--gray-200);cursor:pointer;transition:all .2s;font-family:var(--sans);display:flex;align-items:center;gap:6px;}
  .nav-admin-btn:hover{border-color:var(--black);color:var(--black);}
  .nav-hamburger{display:none;}
}
.nav-hamburger{background:none;border:1px solid var(--gray-200);padding:8px 10px;cursor:pointer;font-size:16px;color:var(--black);display:flex;align-items:center;justify-content:center;}
@media(min-width:900px){.nav-hamburger{display:none;}}
.mobile-menu{position:fixed;top:60px;left:0;right:0;background:white;border-bottom:1px solid var(--gray-200);z-index:999;transform:translateY(-110%);transition:transform .3s ease;box-shadow:0 8px 24px rgba(0,0,0,.08);}
.mobile-menu.open{transform:translateY(0);}
.mobile-menu a,.mobile-menu button.mobile-nav-link{display:block;padding:16px var(--px);font-size:15px;font-weight:500;color:var(--black);text-decoration:none;cursor:pointer;border-bottom:1px solid var(--gray-100);background:none;border-left:none;border-right:none;border-top:none;text-align:left;font-family:var(--sans);width:100%;}
.mobile-menu a:hover,.mobile-menu button.mobile-nav-link:hover{background:var(--gray-100);}
.mobile-menu a.active-nav{color:var(--red);}
.mobile-join-btn{background:var(--black)!important;color:white!important;font-weight:600!important;letter-spacing:.5px;border-bottom:none!important;}
.mobile-join-btn:hover{background:var(--red)!important;}

/* ── SHARED ── */
.section-label{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:var(--red);font-weight:600;display:block;margin-bottom:16px;}
.section-title{font-family:var(--display);font-size:clamp(40px,8vw,88px);line-height:.95;letter-spacing:1px;color:var(--black);}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease;}
.reveal.visible{opacity:1;transform:none;}
.btn-primary{background:var(--red);color:white;padding:13px 26px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:background .2s,transform .15s;display:inline-flex;align-items:center;gap:10px;}
.btn-primary:hover{background:var(--red-dark);transform:translateY(-1px);}
.btn-outline{border:1.5px solid var(--black);color:var(--black);padding:12px 24px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:all .2s;background:transparent;display:inline-flex;align-items:center;gap:10px;}
.btn-outline:hover{background:var(--black);color:white;}

/* ── LOADING SKELETON ── */
.skeleton{background:linear-gradient(90deg,var(--gray-200) 25%,var(--gray-100) 50%,var(--gray-200) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;}
@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
.skeleton-block{height:18px;border-radius:2px;margin-bottom:10px;}
.api-error{padding:24px;background:#fff0f0;border:1px solid #fcc;color:var(--red-dark);font-size:13px;display:flex;align-items:center;gap:10px;margin-bottom:16px;}

/* ── MARQUEE ── */
.marquee-wrap{background:var(--black);padding:15px 0;overflow:hidden;white-space:nowrap;}
.marquee-track{display:inline-block;animation:marquee 28s linear infinite;}
.marquee-track span{font-family:var(--display);font-size:15px;letter-spacing:3px;color:white;padding:0 24px;}
.marquee-track span.dot{color:var(--red);padding:0 6px;}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.8);}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}

/* ── HERO ── */
#hero{min-height:100svh;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:120px var(--px) 80px;position:relative;overflow:hidden;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.6) 40%,rgba(0,0,0,0.78) 100%);z-index:0;}
.hero-bg-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;z-index:-1;}
.hero-content{position:relative;z-index:1;width:100%;}
.hero-bg-text{position:absolute;top:50%;right:-20px;transform:translateY(-50%);font-family:var(--display);font-size:clamp(120px,30vw,400px);color:rgba(0,0,0,0.04);line-height:1;pointer-events:none;user-select:none;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--gray-600);border:1px solid var(--gray-200);padding:6px 14px;margin-bottom:32px;background:rgba(255,255,255,0.7);backdrop-filter:blur(4px);}
.hero-badge span{display:inline-block;width:6px;height:6px;background:var(--red);border-radius:50%;animation:pulse 2s infinite;flex-shrink:0;}
.hero-title{font-family:var(--display);font-size:clamp(64px,18vw,190px);line-height:.88;letter-spacing:2px;color:var(--black);margin-bottom:20px;}
.hero-title .red{color:var(--red);}
.hero-sub{font-family:var(--serif);font-size:clamp(17px,3.5vw,30px);font-style:italic;color:var(--gray-600);margin-bottom:40px;line-height:1.55;}
.hero-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}

/* ── HOME WHAT ── */
.home-what{padding:72px var(--px);display:grid;grid-template-columns:1fr;gap:48px;align-items:start;}
@media(min-width:768px){.home-what{grid-template-columns:1fr 1fr;gap:80px;}}
.what-big{font-family:var(--serif);font-size:clamp(18px,3vw,32px);line-height:1.5;color:var(--black);margin-top:28px;}
.what-body{font-size:15px;line-height:1.85;color:var(--gray-600);margin-top:20px;}
.what-body strong{color:var(--black);}

/* ── HOME STATS ── */
.home-stats{background:var(--black);display:grid;grid-template-columns:repeat(2,1fr);}
@media(min-width:640px){.home-stats{grid-template-columns:repeat(4,1fr);}}
.hstat{padding:44px 16px;text-align:center;border-right:1px solid rgba(255,255,255,.08);}
.hstat:nth-child(2n){border-right:none;}
@media(min-width:640px){.hstat:nth-child(2n){border-right:1px solid rgba(255,255,255,.08);}.hstat:last-child{border-right:none;}}
.hstat:nth-child(1),.hstat:nth-child(2){border-bottom:1px solid rgba(255,255,255,.08);}
@media(min-width:640px){.hstat:nth-child(1),.hstat:nth-child(2){border-bottom:none;}}
.hstat-num{font-family:var(--display);font-size:clamp(48px,9vw,68px);color:white;line-height:1;}
.hstat-num span{color:var(--red);}
.hstat-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:8px;}

/* ── INITIATIVES ── */
.home-initiatives{padding:72px var(--px);background:var(--gray-100);}
.initiatives-grid{display:grid;grid-template-columns:1fr;gap:2px;background:var(--gray-200);margin-top:48px;}
@media(min-width:600px){.initiatives-grid{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.initiatives-grid{grid-template-columns:repeat(3,1fr);}}
.init-card{background:white;padding:36px 28px;transition:background .25s;position:relative;overflow:hidden;}
.init-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:0;background:var(--red);transition:height .3s;}
.init-card:hover::before{height:100%;}
.init-card:hover{background:var(--gray-100);}
.init-icon{font-size:26px;color:var(--red);margin-bottom:18px;}
.init-title{font-size:16px;font-weight:700;margin-bottom:8px;}
.init-desc{font-size:13.5px;color:var(--gray-400);line-height:1.75;}

/* ── SPEAKERS ── */
.home-speakers{padding:72px var(--px);background:var(--white);}
.speakers-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:48px;}
@media(min-width:768px){.speakers-grid{grid-template-columns:repeat(4,1fr);}}
.speaker-card{text-align:center;}
.speaker-img-placeholder{width:100%;aspect-ratio:1;background:linear-gradient(135deg,var(--gray-200),var(--gray-100));display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:clamp(32px,8vw,48px);color:var(--gray-400);margin-bottom:14px;}
.speaker-name{font-size:14px;font-weight:700;}
.speaker-role{font-size:12px;color:var(--gray-400);margin-top:4px;}
.speaker-tag{font-size:11px;color:var(--red);letter-spacing:1.5px;text-transform:uppercase;margin-top:6px;}

/* ── TESTIMONIALS ── */
.home-testimonials{padding:72px var(--px);background:var(--black);}
.testimonials-grid{display:grid;grid-template-columns:1fr;gap:2px;margin-top:48px;}
@media(min-width:768px){.testimonials-grid{grid-template-columns:repeat(3,1fr);}}
.testi-card{background:#111;padding:36px 28px;border:1px solid rgba(255,255,255,.07);}
.testi-quote{font-family:var(--serif);font-size:16px;font-style:italic;line-height:1.78;color:rgba(255,255,255,.8);margin-bottom:24px;}
.testi-quote::before{content:'\u201C';font-size:44px;color:var(--red);line-height:.5;display:block;margin-bottom:12px;font-style:normal;}
.testi-name{font-size:14px;font-weight:600;color:white;}
.testi-info{font-size:12px;color:rgba(255,255,255,.3);margin-top:4px;}

/* ── PAGE HERO ── */
.page-hero{padding:120px var(--px) 64px;background:linear-gradient(160deg,#fff 50%,#111 100%);min-height:46vh;display:flex;align-items:flex-end;}
.page-hero p{color:rgba(255,255,255,.55);font-size:15px;max-width:420px;line-height:1.7;margin-top:14px;}

/* ── ABOUT VIDEO ── */
.about-video-wrap{width:100%;background:var(--black);line-height:0;position:relative;overflow:hidden;max-height:520px;}
.about-video-wrap video{width:100%;max-height:520px;object-fit:cover;display:block;opacity:.85;}
.about-video-label{position:absolute;bottom:24px;left:var(--px);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.4);font-weight:600;}

/* ── ABOUT ── */
.origins{padding:72px var(--px);display:grid;grid-template-columns:1fr;gap:40px;align-items:start;}
@media(min-width:640px){.origins{grid-template-columns:auto 1fr;gap:64px;}}
.origins-year{font-family:var(--display);font-size:clamp(72px,18vw,130px);line-height:.85;color:white;background:var(--black);padding:16px 24px;letter-spacing:-2px;flex-shrink:0;display:inline-block;}
.origins-body{font-size:16px;color:var(--gray-600);line-height:1.85;margin-top:12px;}
.origins-body strong{color:var(--black);}
.vision-section{padding:64px var(--px);background:var(--gray-100);}
.vision-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--gray-200);margin-top:48px;}
@media(min-width:768px){.vision-grid{grid-template-columns:repeat(4,1fr);}}
.vision-card{background:white;padding:32px 22px;transition:background .25s;}
.vision-card:hover{background:var(--black);}
.vision-card:hover .vc-num{color:var(--red);}
.vision-card:hover .vc-title{color:white;}
.vision-card:hover .vc-desc{color:rgba(255,255,255,.35);}
.vc-num{font-family:var(--display);font-size:40px;color:var(--gray-200);transition:color .25s;margin-bottom:14px;}
.vc-title{font-size:15px;font-weight:700;margin-bottom:8px;transition:color .25s;}
.vc-desc{font-size:13px;color:var(--gray-400);line-height:1.7;transition:color .25s;}
.about-stats{background:var(--red);display:grid;grid-template-columns:repeat(2,1fr);}
@media(min-width:640px){.about-stats{grid-template-columns:repeat(4,1fr);}}
.astat{padding:44px 16px;text-align:center;border-right:1px solid rgba(255,255,255,.2);}
.astat:nth-child(2n){border-right:none;}
@media(min-width:640px){.astat:nth-child(2n){border-right:1px solid rgba(255,255,255,.2);}.astat:last-child{border-right:none;}}
.astat:nth-child(1),.astat:nth-child(2){border-bottom:1px solid rgba(255,255,255,.2);}
@media(min-width:640px){.astat:nth-child(1),.astat:nth-child(2){border-bottom:none;}}
.astat-num{font-family:var(--display);font-size:clamp(44px,9vw,64px);color:white;line-height:1;}
.astat-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.65);margin-top:8px;}
.spotlight{padding:72px var(--px);background:var(--white);}
.spotlight-grid{display:grid;grid-template-columns:1fr;gap:2px;background:var(--gray-200);margin-top:48px;}
@media(min-width:768px){.spotlight-grid{grid-template-columns:repeat(2,1fr);}}
.spot-card{background:white;padding:36px 32px;display:flex;gap:20px;align-items:flex-start;transition:background .2s;}
.spot-card:hover{background:var(--gray-100);}
.spot-icon{font-size:22px;color:var(--red);flex-shrink:0;margin-top:4px;}
.spot-title{font-size:16px;font-weight:700;margin-bottom:8px;}
.spot-body{font-size:13.5px;color:var(--gray-400);line-height:1.75;}
.spot-tag{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--red);margin-top:10px;font-weight:600;}
.history-section{padding:72px var(--px);background:var(--gray-100);}
.timeline{margin-top:48px;}
.t-item{display:grid;grid-template-columns:72px 1px 1fr;gap:0 20px;}
@media(min-width:480px){.t-item{grid-template-columns:100px 1px 1fr;gap:0 28px;}}
.t-year-cell{padding:28px 0;text-align:right;font-family:var(--display);font-size:clamp(18px,4vw,28px);color:var(--gray-400);transition:color .2s;line-height:1.1;}
.t-item:hover .t-year-cell{color:var(--red);}
.t-line-cell{position:relative;background:var(--gray-200);}
.t-dot-el{position:absolute;top:36px;left:50%;transform:translateX(-50%);width:10px;height:10px;background:var(--red);border-radius:50%;border:2px solid var(--gray-100);}
.t-content-cell{padding:28px 0 28px 4px;border-bottom:1px solid var(--gray-200);}
.t-title{font-size:14px;font-weight:700;margin-bottom:6px;}
.t-desc{font-size:13px;color:var(--gray-400);line-height:1.7;}
.patronage{padding:72px var(--px);background:var(--white);}
.patron-grid{display:grid;grid-template-columns:1fr;gap:2px;background:var(--gray-200);margin-top:48px;}
@media(min-width:480px){.patron-grid{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.patron-grid{grid-template-columns:repeat(3,1fr);}}
.patron-card{background:white;padding:28px 24px;transition:background .2s;cursor:default;}
.patron-card:hover{background:var(--black);}
.patron-card:hover .patron-name{color:white;}
.patron-card:hover .patron-role{color:var(--red);}
.patron-card:hover .patron-org{color:rgba(255,255,255,.3);}
.patron-name{font-size:15px;font-weight:700;margin-bottom:4px;transition:color .2s;}
.patron-role{font-size:13px;color:var(--red);font-weight:500;margin-bottom:2px;transition:color .2s;}
.patron-org{font-size:13px;color:var(--gray-400);transition:color .2s;}

/* ── EVENTS ── */
.events-grid-page{display:grid;grid-template-columns:1fr;gap:2px;background:var(--gray-200);margin:0 var(--px) 72px;}
@media(min-width:600px){.events-grid-page{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.events-grid-page{grid-template-columns:repeat(3,1fr);}}
.ev-card{background:white;padding:36px 28px;cursor:pointer;transition:background .25s;position:relative;overflow:hidden;}
.ev-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:0;background:var(--red);transition:height .3s;}
.ev-card:hover::before{height:100%;}
.ev-card:hover{background:var(--gray-100);}
.ev-num{font-family:var(--display);font-size:44px;color:var(--gray-200);line-height:1;margin-bottom:16px;transition:color .2s;}
.ev-card:hover .ev-num{color:var(--red);}
.ev-date{font-size:11px;color:var(--red);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;}
.ev-title{font-size:15px;font-weight:700;margin-bottom:10px;}
.ev-desc{font-size:13.5px;color:var(--gray-400);line-height:1.72;}
.ev-link{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--black);margin-top:20px;border-bottom:1px solid transparent;transition:border-color .2s;text-decoration:none;}
.ev-link:hover{border-color:var(--black);}

/* ── GALLERY ── */
.gallery-filters{display:flex;gap:8px;padding:0 var(--px);margin-bottom:32px;flex-wrap:wrap;}
.filter-btn{padding:8px 16px;border:1px solid var(--gray-200);background:white;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;font-family:var(--sans);}
.filter-btn.active,.filter-btn:hover{background:var(--black);color:white;border-color:var(--black);}
.gallery-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;padding:0 var(--px) 72px;}
@media(min-width:640px){.gallery-grid{grid-template-columns:repeat(3,1fr);}}
@media(min-width:900px){.gallery-grid{grid-template-columns:repeat(4,1fr);}}
.gal-item{aspect-ratio:1;background:var(--gray-100);overflow:hidden;cursor:pointer;position:relative;}
.gal-item.wide{grid-column:span 2;}
.gal-placeholder{width:100%;height:100%;min-height:140px;background:linear-gradient(135deg,var(--gray-200),var(--gray-100));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;transition:background .25s;}
.gal-item:hover .gal-placeholder{background:linear-gradient(135deg,#ddd,#ccc);}
.gal-icon-el{font-size:22px;color:var(--gray-400);}
.gal-label-el{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);}
.gal-overlay{position:absolute;inset:0;background:rgba(0,0,0,.68);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;}
.gal-item:hover .gal-overlay{opacity:1;}
.gal-overlay span{color:white;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;}

/* ── TEAM ── */
.team-section{padding:64px var(--px);}
.year-tabs{display:flex;gap:0;margin:28px 0;flex-wrap:wrap;border:1px solid var(--gray-200);width:fit-content;}
.year-tab{padding:10px 20px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;background:white;color:var(--gray-400);font-family:var(--sans);transition:all .2s;border-right:1px solid var(--gray-200);}
.year-tab:last-child{border-right:none;}
.year-tab.active{background:var(--black);color:white;}
.year-tab:hover:not(.active){background:var(--gray-100);color:var(--black);}
.team-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--gray-200);}
@media(min-width:640px){.team-grid{grid-template-columns:repeat(3,1fr);}}
@media(min-width:900px){.team-grid{grid-template-columns:repeat(4,1fr);}}
.team-card{background:white;padding:0 0 24px;text-align:center;overflow:hidden;transition:background .2s;}
.team-card:hover{background:var(--gray-100);}
.team-photo{width:100%;aspect-ratio:1;background:linear-gradient(135deg,var(--gray-200),var(--gray-100));display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:clamp(36px,8vw,56px);color:var(--gray-400);margin-bottom:16px;}
.team-name{font-size:14px;font-weight:700;padding:0 12px;margin-bottom:4px;}
.team-role{font-size:10px;color:var(--red);letter-spacing:1px;text-transform:uppercase;padding:0 12px;}
.team-dept{font-size:11px;color:var(--gray-400);margin-top:4px;padding:0 12px;}
.team-empty{padding:48px;text-align:center;color:var(--gray-400);font-size:14px;background:white;grid-column:1/-1;}

/* ── CONTACT FORM ── */
.contact-form-section{padding:64px var(--px);background:var(--white);}
.contact-grid{display:grid;grid-template-columns:1fr;gap:48px;align-items:start;}
@media(min-width:768px){.contact-grid{grid-template-columns:1fr 1fr;gap:72px;}}
.contact-detail{display:flex;gap:14px;align-items:center;margin-bottom:16px;font-size:14px;color:var(--gray-600);}
.contact-detail i{color:var(--red);width:18px;}
.form-box{background:var(--gray-100);padding:36px 28px;}
@media(min-width:480px){.form-box{padding:48px 40px;}}
.form-group{margin-bottom:18px;}
.form-group label{display:block;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);margin-bottom:8px;font-weight:600;}
.form-group input,.form-group textarea,.form-group select{width:100%;border:1px solid var(--gray-200);background:white;padding:12px 14px;font-size:14px;font-family:var(--sans);color:var(--black);outline:none;transition:border-color .2s;resize:none;}
.form-group input:focus,.form-group textarea:focus,.form-group select:focus{border-color:var(--black);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.btn-send{width:100%;background:var(--black);color:white;border:none;padding:15px;font-size:13px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;margin-top:8px;transition:background .2s;font-family:var(--sans);}
.btn-send:hover{background:var(--red);}

/* ── MODALS ── */
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:2000;align-items:center;justify-content:center;padding:16px;}
.modal-overlay.open{display:flex;}
.modal-box{background:white;max-width:680px;width:100%;max-height:90svh;overflow-y:auto;animation:slideUp .3s ease;}
.modal-head{background:var(--black);padding:36px 28px;color:white;position:relative;}
@media(min-width:480px){.modal-head{padding:44px 40px;}}
.modal-close-btn{position:absolute;top:16px;right:16px;background:none;border:none;color:rgba(255,255,255,.5);font-size:22px;cursor:pointer;transition:color .2s;line-height:1;padding:4px 8px;}
.modal-close-btn:hover{color:white;}
.modal-ev-tag{font-size:10.5px;letter-spacing:2.5px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:10px;}
.modal-ev-title{font-family:var(--display);font-size:clamp(36px,8vw,52px);letter-spacing:1px;line-height:1;}
.modal-body-section{padding:32px 28px;}
@media(min-width:480px){.modal-body-section{padding:44px 40px;}}
.modal-body-section p{font-size:15px;color:var(--gray-600);line-height:1.88;}
.join-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:2000;align-items:center;justify-content:center;padding:16px;}
.join-overlay.open{display:flex;}
.join-box{background:white;padding:36px 28px;max-width:480px;width:100%;max-height:90svh;overflow-y:auto;animation:slideUp .3s ease;position:relative;}
@media(min-width:480px){.join-box{padding:48px;}}
.join-close{position:absolute;top:16px;right:16px;background:none;border:none;font-size:20px;color:var(--gray-400);cursor:pointer;}
.join-title{font-family:var(--display);font-size:clamp(40px,10vw,50px);line-height:.95;margin-bottom:8px;}
.join-sub{font-size:13.5px;color:var(--gray-400);margin-bottom:28px;line-height:1.6;}

/* ── FOOTER ── */
footer{background:var(--black);color:white;padding:64px var(--px) 36px;}
.footer-top{display:grid;grid-template-columns:1fr;gap:40px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,.08);}
@media(min-width:640px){.footer-top{grid-template-columns:1.6fr 1fr 1fr;gap:60px;}}
.footer-brand{font-family:var(--display);font-size:clamp(40px,10vw,52px);letter-spacing:1px;line-height:1;margin-bottom:14px;}
.footer-brand span{color:var(--red);}
.footer-tagline{font-family:var(--serif);font-style:italic;color:rgba(255,255,255,.35);font-size:15px;}
.footer-col h4{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:16px;}
.footer-col a{display:block;color:rgba(255,255,255,.55);text-decoration:none;font-size:14px;margin-bottom:10px;transition:color .2s;cursor:pointer;}
.footer-col a:hover{color:white;}
.footer-bottom{display:flex;flex-direction:column;gap:16px;padding-top:28px;font-size:12px;color:rgba(255,255,255,.28);}
@media(min-width:480px){.footer-bottom{flex-direction:row;justify-content:space-between;align-items:center;}}
.social-links{display:flex;gap:10px;}
.soc-link{width:34px;height:34px;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);text-decoration:none;font-size:14px;transition:all .2s;}
.soc-link:hover{border-color:var(--red);color:white;background:var(--red);}

/* ── AUTH / LOGIN ── */
.auth-page{min-height:100svh;display:grid;grid-template-columns:1fr;background:var(--white);}
@media(min-width:768px){.auth-page{grid-template-columns:1fr 1fr;}}
.auth-left{background:var(--black);padding:64px 48px;display:flex;flex-direction:column;justify-content:space-between;min-height:280px;}
@media(min-width:768px){.auth-left{min-height:100svh;}}
.auth-left-logo{font-family:var(--display);font-size:clamp(48px,10vw,72px);color:white;line-height:.9;}
.auth-left-logo span{color:var(--red);}
.auth-left-tagline{font-family:var(--serif);font-style:italic;color:rgba(255,255,255,.35);font-size:16px;margin-top:12px;}
.auth-left-footer{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.2);}
.auth-right{padding:64px 48px;display:flex;flex-direction:column;justify-content:center;}
.auth-right-inner{max-width:380px;width:100%;}
@media(min-width:768px){.auth-right-inner{margin:auto;}}
.auth-label{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:var(--red);font-weight:600;display:block;margin-bottom:12px;}
.auth-title{font-family:var(--display);font-size:clamp(40px,8vw,56px);line-height:.95;margin-bottom:8px;}
.auth-sub{font-size:14px;color:var(--gray-400);margin-bottom:36px;line-height:1.6;}
.auth-error{background:#fff0f0;border:1px solid #fcc;color:var(--red-dark);padding:12px 16px;font-size:13px;margin-bottom:20px;display:flex;align-items:center;gap:8px;}
.auth-input-wrap{margin-bottom:18px;}
.auth-input-wrap label{display:block;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);margin-bottom:8px;font-weight:600;}
.auth-input-wrap input{width:100%;border:1px solid var(--gray-200);background:var(--gray-100);padding:13px 16px;font-size:14px;font-family:var(--sans);color:var(--black);outline:none;transition:border-color .2s,background .2s;}
.auth-input-wrap input:focus{border-color:var(--black);background:white;}
.auth-submit{width:100%;background:var(--black);color:white;border:none;padding:15px;font-size:13px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;margin-top:8px;transition:background .2s;font-family:var(--sans);display:flex;align-items:center;justify-content:center;gap:8px;}
.auth-submit:hover:not(:disabled){background:var(--red);}
.auth-submit:disabled{opacity:.5;cursor:not-allowed;}
.auth-back{margin-top:20px;font-size:13px;color:var(--gray-400);text-align:center;}
.auth-back button{background:none;border:none;color:var(--black);cursor:pointer;font-weight:600;font-family:var(--sans);font-size:13px;text-decoration:underline;}

/* ── ADMIN DASHBOARD ── */
.admin-page{min-height:100svh;background:var(--gray-100);}
.admin-topbar{background:var(--black);padding:0 var(--px);height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
.admin-topbar-left{display:flex;align-items:center;gap:14px;}
.admin-topbar-logo{font-family:var(--display);font-size:22px;color:white;letter-spacing:1px;}
.admin-topbar-logo span{color:var(--red);}
.admin-badge{font-size:9px;letter-spacing:2px;text-transform:uppercase;background:var(--red);color:white;padding:3px 8px;font-weight:600;}
.admin-topbar-right{display:flex;align-items:center;gap:12px;}
.admin-user-email{font-size:12px;color:rgba(255,255,255,.4);display:none;}
@media(min-width:640px){.admin-user-email{display:block;}}
.admin-logout-btn{background:transparent;border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:7px 16px;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;font-family:var(--sans);display:flex;align-items:center;gap:6px;}
.admin-logout-btn:hover{border-color:var(--red);color:white;}
.admin-content{padding:40px var(--px);}
.admin-welcome{margin-bottom:36px;}
.admin-welcome h1{font-family:var(--display);font-size:clamp(36px,7vw,56px);line-height:1;margin-bottom:6px;}
.admin-welcome p{font-size:14px;color:var(--gray-400);}
.admin-stats-row{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--gray-200);margin-bottom:40px;}
@media(min-width:640px){.admin-stats-row{grid-template-columns:repeat(4,1fr);}}
.admin-stat-card{background:white;padding:28px 20px;}
.admin-stat-num{font-family:var(--display);font-size:40px;line-height:1;margin-bottom:4px;}
.admin-stat-label{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--gray-400);}
.admin-sections{display:grid;grid-template-columns:1fr;gap:24px;}
@media(min-width:900px){.admin-sections{grid-template-columns:2fr 1fr;}}
.admin-card{background:white;padding:28px;}
.admin-card-title{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);font-weight:600;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--gray-200);display:flex;align-items:center;justify-content:space-between;}
.admin-event-row{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--gray-100);}
.admin-event-row:last-child{border-bottom:none;}
.admin-event-num{font-family:var(--display);font-size:20px;color:var(--gray-200);width:28px;flex-shrink:0;}
.admin-event-name{font-size:13px;font-weight:600;margin-bottom:2px;}
.admin-event-tag{font-size:11px;color:var(--red);letter-spacing:1px;text-transform:uppercase;}
.admin-quick-action{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--gray-200);margin-bottom:10px;cursor:pointer;transition:all .2s;background:white;}
.admin-quick-action:hover{border-color:var(--black);background:var(--black);color:white;}
.admin-quick-action:hover .aqa-icon{color:var(--red);}
.admin-quick-action:hover .aqa-label{color:white;}
.aqa-icon{font-size:16px;color:var(--gray-400);width:20px;flex-shrink:0;transition:color .2s;}
.aqa-label{font-size:13px;font-weight:500;transition:color .2s;}
.admin-go-site{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--gray-600);border:1px solid var(--gray-200);padding:10px 18px;cursor:pointer;background:white;font-family:var(--sans);transition:all .2s;margin-top:24px;}
.admin-go-site:hover{background:var(--black);color:white;border-color:var(--black);}
.admin-role-badge{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;padding:2px 8px;font-weight:600;background:rgba(212,43,43,.12);color:var(--red);margin-left:6px;}
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

/* ─── LOADING SKELETON ─── */
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
        const me = await authFetch("/api/auth/me", data.session);
        onLoginSuccess(data.session, me.role);
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

/* ─── ADMIN DASHBOARD ─── */
function AdminDashboard({ session, userRole, onLogout, onGoToSite }) {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    apiFetch("/api/events")
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoadingEvents(false));
    apiFetch("/api/stats")
      .then((data) => setStats(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoadingStats(false));
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout();
  }

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-topbar-logo">
            E-CELL <span>MESW</span>COE
          </div>
          <div className="admin-badge">Admin</div>
          {userRole === "superadmin" && (
            <div className="admin-role-badge">Superadmin</div>
          )}
        </div>
        <div className="admin-topbar-right">
          <span className="admin-user-email">{session.user.email}</span>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </div>
      <div className="admin-content">
        <div className="admin-welcome">
          <h1>Dashboard</h1>
          <p>
            Welcome back — logged in as <strong>{session.user.email}</strong> ·
            role: <strong>{userRole}</strong>
          </p>
        </div>
        <div className="admin-stats-row">
          {loadingStats
            ? [0, 1, 2, 3].map((i) => (
                <div className="admin-stat-card" key={i}>
                  <div
                    className="skeleton skeleton-block"
                    style={{ height: 40, width: "60%", marginBottom: 8 }}
                  />
                  <div
                    className="skeleton skeleton-block"
                    style={{ height: 12, width: "80%" }}
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
                ].map(([num, label], i) => (
                  <div className="admin-stat-card" key={i}>
                    <div className="admin-stat-num">{num}</div>
                    <div className="admin-stat-label">{label}</div>
                  </div>
                ))}
        </div>
        <div className="admin-sections">
          <div className="admin-card">
            <div className="admin-card-title">
              <span>All Events</span>
              <span style={{ color: "var(--red)", fontSize: 11 }}>
                {events.length} total
              </span>
            </div>
            {loadingEvents ? (
              <LoadingSkeleton rows={5} />
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
          <div>
            <div className="admin-card" style={{ marginBottom: 24 }}>
              <div className="admin-card-title">
                <span>Quick Actions</span>
              </div>
              {[
                ["fa-plus", "Add New Event"],
                ["fa-users", "Manage Team"],
                ["fa-images", "Update Gallery"],
                ["fa-envelope", "View Messages"],
                ["fa-cog", "Site Settings"],
              ].map(([icon, label], i) => (
                <div className="admin-quick-action" key={i}>
                  <i className={`fas ${icon} aqa-icon`}></i>
                  <span className="aqa-label">{label}</span>
                </div>
              ))}
            </div>
            <div className="admin-card">
              <div className="admin-card-title">
                <span>Session Info</span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--gray-400)",
                  lineHeight: 1.9,
                }}
              >
                <div>
                  <strong style={{ color: "var(--black)" }}>User ID</strong>
                  <br />
                  {session.user.id.slice(0, 18)}…
                </div>
                <div style={{ marginTop: 10 }}>
                  <strong style={{ color: "var(--black)" }}>
                    Last Sign In
                  </strong>
                  <br />
                  {new Date(session.user.last_sign_in_at).toLocaleString()}
                </div>
                <div style={{ marginTop: 10 }}>
                  <strong style={{ color: "var(--black)" }}>
                    Token Expires
                  </strong>
                  <br />
                  {new Date(session.expires_at * 1000).toLocaleString()}
                </div>
              </div>
            </div>
            <button className="admin-go-site" onClick={onGoToSite}>
              <i className="fas fa-external-link-alt"></i> View Public Site
            </button>
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
      {/* ── HERO WITH TEAM PHOTO ── */}
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

      <div className="home-speakers">
        <span className="section-label reveal">Voices That Inspire</span>
        <h2 className="section-title reveal">
          Inspirational
          <br />
          Speakers
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
          We bring together founders, innovators, and industry leaders to share
          stories that ignite entrepreneurial ambition.
        </p>
        <div className="speakers-grid">
          {loading
            ? [0, 1, 2, 3].map((i) => (
                <div className="speaker-card" key={i}>
                  <div
                    className="speaker-img-placeholder skeleton"
                    style={{ background: "none" }}
                  ></div>
                  <div
                    className="skeleton skeleton-block"
                    style={{ width: "70%", margin: "14px auto 6px" }}
                  />
                  <div
                    className="skeleton skeleton-block"
                    style={{ width: "50%", margin: "0 auto" }}
                  />
                </div>
              ))
            : speakers.length > 0
              ? speakers.map((sp) => (
                  <div className="speaker-card reveal" key={sp.id}>
                    <div className="speaker-img-placeholder">{sp.initial}</div>
                    <div className="speaker-name">{sp.name}</div>
                    <div className="speaker-role">{sp.role}</div>
                    <div className="speaker-tag">{sp.tag}</div>
                  </div>
                ))
              : [
                  ["A", "Speaker Name", "Founder & CEO", "Ignite Pitch 2.0"],
                  ["B", "Speaker Name", "Venture Capitalist", "Illuminate 2.0"],
                  ["C", "Speaker Name", "Serial Entrepreneur", "VentureSphere"],
                  ["D", "Speaker Name", "Product Lead", "Leadership Bootcamp"],
                ].map(([init, name, role, tag], i) => (
                  <div className="speaker-card reveal" key={i}>
                    <div className="speaker-img-placeholder">{init}</div>
                    <div className="speaker-name">{name}</div>
                    <div className="speaker-role">{role}</div>
                    <div className="speaker-tag">{tag}</div>
                  </div>
                ))}
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
            style={{ fontSize: "clamp(52px,11vw,130px)", color: "white" }}
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

      {/* ── ABOUT VIDEO ── */}
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
            style={{ fontSize: "clamp(52px,11vw,130px)", color: "white" }}
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
            <div className="modal-body-section">
              <p>{events[selectedEvent].content}</p>
            </div>
          </div>
        </div>
      )}
      <Footer onNav={onNav} />
    </div>
  );
}

/* ─── GALLERY PAGE ─── */
function GalleryPage({ onNav }) {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  useReveal();

  useEffect(() => {
    apiFetch("/api/gallery")
      .then((data) => setGalleryItems(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load gallery"))
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

  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">Captured Moments</span>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(52px,11vw,130px)", color: "white" }}
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
          : filtered.map((item, i) => (
              <div
                className={`gal-item${item.wide ? " wide" : ""}`}
                key={item.id || i}
              >
                <div className="gal-placeholder">
                  {item.icon && (
                    <i className={`fas ${item.icon} gal-icon-el`}></i>
                  )}
                  <div className="gal-label-el">{item.label}</div>
                </div>
                <div className="gal-overlay">
                  <span>View Photo</span>
                </div>
              </div>
            ))}
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

/* ─── CONTACT PAGE (with dynamic team) ─── */
function ContactPage({ onNav }) {
  const [activeYear, setActiveYear] = useState("current");
  const [teamByYear, setTeamByYear] = useState({});
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [teamError, setTeamError] = useState("");
  useReveal();

  // Year tab config
  const yearTabs = [
    { key: "current", label: "2026–2027 (Current)" },
    { key: "2025-2026", label: "2025–2026" },
    { key: "2024-2025", label: "2024–2025 (Founders)" },
  ];

  useEffect(() => {
    // Fetch all team members at once, group by year client-side
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
      .finally(() => setLoadingTeam(false));
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
            style={{ fontSize: "clamp(52px,11vw,130px)", color: "white" }}
          >
            Contact
          </h1>
          <p>
            Meet the team, explore previous batches, and get in touch with us.
          </p>
        </div>
      </div>

      {/* ── DYNAMIC TEAM ── */}
      <div className="team-section">
        <span className="section-label reveal">The People</span>
        <h2 className="section-title reveal">Meet Our Team</h2>

        {teamError && (
          <div className="api-error" style={{ marginTop: 20 }}>
            <i className="fas fa-exclamation-circle"></i> {teamError} — showing
            cached data if available.
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
              <br />
              <span style={{ fontSize: 12, color: "var(--gray-400)" }}>
                Add members via the admin dashboard or seed the database.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── CONTACT FORM ── */}
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
          const me = await authFetch("/api/auth/me", data.session);
          setSession(data.session);
          setUserRole(me.role);
          setAuthView("dashboard");
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

  if (authLoading) {
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
  }

  if (authView === "login") {
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
  }

  if (authView === "dashboard" && session) {
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
  }

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

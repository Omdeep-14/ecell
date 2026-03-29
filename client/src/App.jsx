import { useState, useEffect, useRef } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

/* ─── DATA ─── */
const events = [
  { title: "IGNITE PITCH 2.0", date: "January 2024", tag: "Pitch Competition", content: "IGNITE PITCH 2.0 was a high-energy startup pitching competition that gave student entrepreneurs a professional platform to present innovative business ideas to real industry mentors and investors. Participants refined their pitches, received live feedback, and competed for recognition. The event brought together over 100 participants and demonstrated the growing appetite for entrepreneurial thinking within our campus ecosystem." },
  { title: "VENTURESPHERE", date: "Early 2024", tag: "Ideation Event", content: "VentureSphere was E-Cell MESWCOE's flagship ideation and team-building event. Designed to simulate a real startup environment, participants formed cross-discipline teams to solve industry-provided problem statements. The event fostered collaboration, creative thinking, and rapid prototyping — producing ideas later developed into full business proposals for national competitions." },
  { title: "NEC — IIT BOMBAY", date: "2025", tag: "National Competition", content: "The National Entrepreneurship Challenge (NEC) organized by E-Cell IIT Bombay is one of India's most prestigious student entrepreneurship competitions. E-Cell MESWCOE's team competed nationally, qualifying for the Grand Finale held at IIT Bombay — putting MESWCOE on the national entrepreneurship map." },
  { title: "ILLUMINATE 2.0", date: "2025", tag: "Speaker Summit", content: "ILLUMINATE 2.0 was a flagship knowledge-sharing event featuring talks, workshops, and panel discussions with successful entrepreneurs, startup founders, and industry experts. Over 100 students attended and left with renewed motivation, new networks, and actionable insights from real entrepreneurial journeys." },
  { title: "STARTUP SATURDAY", date: "Recurring", tag: "Community", content: "Startup Saturday is a recurring informal meetup where E-Cell members gather to discuss startup news, pitch rough ideas, and workshop concepts in a low-pressure environment. It's where the culture of entrepreneurship is built week by week — through conversation, debate, and genuine collaboration." },
  { title: "LEADERSHIP BOOTCAMP", date: "Annual", tag: "Skill Building", content: "An intensive one-day program building core skills every entrepreneur needs: communication, decision-making under pressure, team management, and strategic thinking. Through simulations, challenges, and expert sessions, participants develop capabilities that extend well beyond their academic journey." },
  { title: "IDEA HACKATHON", date: "2024–2025", tag: "Hackathon", content: "The Idea Hackathon challenges students to solve real-world problems within a fixed time frame, combining creativity with execution. Teams brainstorm, prototype, and present solutions to a panel of judges — simulating the pace and pressure of the startup world. Previous editions produced ideas in EdTech, AgriTech, and HealthTech." },
  { title: "INDUSTRY CONNECT", date: "Ongoing", tag: "Networking", content: "Industry Connect is E-Cell's ongoing initiative to bridge the gap between campus and the professional startup ecosystem. Through company visits, alumni interactions, and mentor matchmaking, students gain first-hand exposure to how startups operate, scale, and navigate challenges." },
];

const galleryItems = [
  { label: "Ignite Pitch 2.0", icon: "fa-microphone", cat: "ignite", wide: true },
  { label: "NEC IIT Bombay", icon: "fa-trophy", cat: "nec" },
  { label: "Team Photo", icon: "fa-users", cat: "ignite" },
  { label: "Illuminate 2.0", icon: "fa-star", cat: "illuminate", wide: true },
  { label: "Workshop Session", icon: "fa-chalkboard-teacher", cat: "workshops" },
  { label: "VentureSphere", icon: "fa-rocket", cat: "venture" },
  { label: "Pitch Day", icon: "fa-comments", cat: "ignite" },
  { label: "NEC Grand Finale", icon: "fa-medal", cat: "nec" },
  { label: "Campus Event", icon: "fa-flag", cat: "illuminate" },
  { label: "Team Building", icon: "fa-handshake", cat: "workshops" },
  { label: "Idea Hackathon", icon: "fa-lightbulb", cat: "venture" },
  { label: "Speaker Session", icon: "fa-microphone-alt", cat: "illuminate" },
];

// Team 26-27 (Current / New Team)
const currentTeam = [
  { name: "Shantanu Kale",      role: "Co-ordinator",                    dept: "Computer Engineering",                      init: "SK" },
  { name: "Saee Thombre",       role: "Co-ordinator",                    dept: "Computer Engineering",                      init: "ST" },
  { name: "Sanskruti Harpale",  role: "Social Media & Content (Lead)",   dept: "Computer Engineering",                      init: "SH" },
  { name: "Rohan Khmankar",     role: "Graphic Team (Lead)",             dept: "Computer Engineering",                      init: "RK" },
  { name: "Vedant Wadekar",     role: "Graphic Team (Co-Lead)",          dept: "Computer Engineering",                      init: "VW" },
  { name: "Parvi Lokhande",     role: "Content Writer (Lead)",           dept: "Computer Engineering",                      init: "PL" },
  { name: "Aaryashree Rahane",  role: "Documentation (Lead)",            dept: "Computer Engineering",                      init: "AR" },
  { name: "Vaibhavi Joshi",     role: "Documentation Team",              dept: "Computer Engineering",                      init: "VJ" },
  { name: "Atharv Bhosale",     role: "Marketing (Co-Lead)",             dept: "Computer Engineering",                      init: "AB" },
  { name: "Anuja Bhoi",         role: "Marketing Team",                  dept: "Computer Engineering",                      init: "AB" },
  { name: "Omkar Tuplondhe",    role: "Event & PR Team",                 dept: "Computer Engineering",                      init: "OT" },
  { name: "Sanket Bande",       role: "Event & PR Team",                 dept: "Computer Engineering",                      init: "SB" },
  { name: "Tanishka",           role: "Event & PR Team",                 dept: "Computer Engineering",                      init: "T"  },
  { name: "Omkar Harihar",      role: "Technical (Lead)",                dept: "Computer Engineering",                      init: "OH" },
  { name: "Tanmay Gaikwad",     role: "Décor Team",                      dept: "Computer Engineering",                      init: "TG" },
  { name: "Sujal",              role: "Décor Team",                      dept: "Computer Engineering",                      init: "S"  },
  { name: "Samruddhi Langote",  role: "Documentation (Co-Lead)",         dept: "Automation & Robotics",                     init: "SL" },
  { name: "Avdhut Jagtap",      role: "Marketing Team",                  dept: "Automation & Robotics",                     init: "AJ" },
  { name: "Saksham Shete",      role: "Event & PR (Lead)",               dept: "Automation & Robotics",                     init: "SS" },
  { name: "Heena Shaikh",       role: "Décor (Lead)",                    dept: "Automation & Robotics",                     init: "HS" },
  { name: "Jotiba",             role: "Décor Team",                      dept: "Automation & Robotics",                     init: "J"  },
  { name: "Soham Lavhe",        role: "Social Media & Content (Co-Lead)",dept: "Electronics & Telecommunication Engg.",      init: "SL" },
  { name: "Yash Tikone",        role: "Guest Handling (Lead)",           dept: "Electronics & Telecommunication Engg.",      init: "YT" },
  { name: "Vedansh Chowskey",   role: "Marketing (Lead)",                dept: "Electronics & Telecommunication Engg.",      init: "VC" },
  { name: "Rutuja Bansod",      role: "Finance (Co-Lead)",               dept: "Electronics & Telecommunication Engg.",      init: "RB" },
  { name: "Yash Taras",         role: "Event & PR Team",                 dept: "Electronics & Telecommunication Engg.",      init: "YT" },
  { name: "Atharv Ingole",      role: "Finance Team",                    dept: "Electronics & Telecommunication Engg.",      init: "AI" },
  { name: "Piyush Patil",       role: "Guest Handling (Co-Lead)",        dept: "Electronics & Telecommunication Engg.",      init: "PP" },
  { name: "Durva Angre",        role: "Guest Handling Team",             dept: "Electronics & Telecommunication Engg.",      init: "DA" },
  { name: "Rastrapal",          role: "Video Editor",                    dept: "Mechanical Engineering",                    init: "R"  },
  { name: "Mahima Kondeti",     role: "Graphic Team",                    dept: "Mechanical Engineering",                    init: "MK" },
  { name: "Aarya Devkule",      role: "Marketing Team",                  dept: "Mechanical Engineering",                    init: "AD" },
  { name: "Rudra Deshmukh",     role: "Event & PR (Co-Lead)",            dept: "Mechanical Engineering",                    init: "RD" },
];

// Team 25-26 (Advance Team)
const team2526 = [
  { name: "Harshad Kadam",      role: "President",          dept: "Electronics & Telecommunication Engg.", init: "HK" },
  { name: "Aasawari Chavan",    role: "General Secretary",  dept: "Electronics & Telecommunication Engg.", init: "AC" },
  { name: "Janhavi Todkar",     role: "Treasurer",          dept: "Electronics & Telecommunication Engg.", init: "JT" },
  { name: "Hardik Jagtap",      role: "Content Head",       dept: "Electronics & Telecommunication Engg.", init: "HJ" },
  { name: "Devang Mantri",      role: "Content Team",       dept: "Electronics & Telecommunication Engg.", init: "DM" },
  { name: "Varad Pardeshi",     role: "Marketing Team",     dept: "Electronics & Telecommunication Engg.", init: "VP" },
  { name: "Sihals Solanki",     role: "Events Lead",        dept: "Electronics & Telecommunication Engg.", init: "SS" },
  { name: "Shruti Savale",      role: "Graphics Director",  dept: "Electronics & Telecommunication Engg.", init: "SS" },
  { name: "Vaishnavi Vidhate",  role: "Tech Team",          dept: "Computer Engineering",                  init: "VV" },
  { name: "Apurva Gawas",       role: "Tech Team",          dept: "Computer Engineering",                  init: "AG" },
  { name: "Shreya Pandharkar",  role: "President",          dept: "Mechanical Engineering",                init: "SP" },
  { name: "Shrushti Daphal",    role: "Marketing Head",     dept: "Mechanical Engineering",                init: "SD" },
  { name: "Uday Sartape",       role: "Graphics Team",      dept: "Mechanical Engineering",                init: "US" },
  { name: "Shifa Munshi",       role: "Graphics Team",      dept: "Mechanical Engineering",                init: "SM" },
  { name: "Aarya Kasture",      role: "Operations Head",    dept: "Automation & Robotics",                 init: "AK" },
];

// Team 24-25 (Founders Team)
const team2425 = [
  { name: "Harshad Pakhale",    role: "Overall Co-Ordinator & Founder",    dept: "Computer Engineering",                  init: "HP" },
  { name: "Manaswa Medhi",      role: "Corporate Relations Head",           dept: "Computer Engineering",                  init: "MM" },
  { name: "Shraddha Bhujbal",   role: "Web and Technical Head",             dept: "Computer Engineering",                  init: "SB" },
  { name: "Sanika Bhawale",     role: "Events and PR Head",                 dept: "Computer Engineering",                  init: "SB" },
  { name: "Mohit Wazulkar",     role: "Media Head",                         dept: "Electronics & Telecommunication Engg.", init: "MW" },
  { name: "Shravani Kumbhar",   role: "Operations Head",                    dept: "Electronics & Telecommunication Engg.", init: "SK" },
  { name: "Drup Aherwar",       role: "Design Head",                        dept: "Electronics & Telecommunication Engg.", init: "DA" },
  { name: "Manas Deshmukh",     role: "Overall Co-Ordinator & Co-Founder",  dept: "Mechanical Engineering",                init: "MD" },
  { name: "Girish Patil",       role: "Corporate Relations Head",           dept: "Mechanical Engineering",                init: "GP" },
  { name: "Nilesh Zambare",     role: "Events and PR Head",                 dept: "Mechanical Engineering",                init: "NZ" },
  { name: "Shivam Bhor",        role: "Marketing Head",                     dept: "Mechanical Engineering",                init: "SB" },
  { name: "Saurabh Pawar",      role: "Marketing Head",                     dept: "Mechanical Engineering",                init: "SP" },
  { name: "Avadhoot Pohnerkar", role: "Operations Head",                    dept: "Mechanical Engineering",                init: "AP" },
];

const prevTeams = {
  2526: team2526,
  2425: team2425,
};

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
}
html{scroll-behavior:smooth;}
body{font-family:var(--sans);background:var(--white);color:var(--black);overflow-x:hidden;}
nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);border-bottom:1px solid var(--gray-200);padding:0 48px;height:68px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--black);cursor:pointer;}
.nav-logo-mark{width:38px;height:38px;background:var(--red);color:white;font-family:var(--display);font-size:22px;display:flex;align-items:center;justify-content:center;}
.nav-logo-text{font-size:15px;font-weight:600;letter-spacing:.5px;}
.nav-logo-sub{font-size:10px;color:var(--gray-400);font-weight:400;letter-spacing:2px;text-transform:uppercase;}
.nav-links{display:flex;align-items:center;gap:4px;list-style:none;}
.nav-links li a{text-decoration:none;font-size:13px;font-weight:500;color:var(--gray-600);padding:6px 14px;transition:color .2s;cursor:pointer;display:block;border-bottom:2px solid transparent;}
.nav-links li a:hover{color:var(--black);}
.nav-links li a.active-nav{color:var(--black);border-bottom-color:var(--red);}
.nav-cta{background:var(--black);color:white;padding:9px 20px;font-size:13px;font-weight:600;letter-spacing:.5px;border:none;cursor:pointer;transition:background .2s;font-family:var(--sans);}
.nav-cta:hover{background:var(--red);}
.section-label{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:var(--red);font-weight:600;display:block;margin-bottom:16px;}
.section-title{font-family:var(--display);font-size:clamp(44px,6vw,88px);line-height:.95;letter-spacing:1px;color:var(--black);}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease;}
.reveal.visible{opacity:1;transform:none;}
.btn-primary{background:var(--red);color:white;padding:14px 30px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:background .2s,transform .15s;display:inline-flex;align-items:center;gap:10px;}
.btn-primary:hover{background:var(--red-dark);transform:translateY(-1px);}
.btn-outline{border:1.5px solid var(--black);color:var(--black);padding:13px 28px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:all .2s;background:transparent;display:inline-flex;align-items:center;gap:10px;}
.btn-outline:hover{background:var(--black);color:white;}
.marquee-wrap{background:var(--black);padding:17px 0;overflow:hidden;white-space:nowrap;}
.marquee-track{display:inline-block;animation:marquee 28s linear infinite;}
.marquee-track span{font-family:var(--display);font-size:17px;letter-spacing:3px;color:white;padding:0 32px;}
.marquee-track span.dot{color:var(--red);padding:0 8px;}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.8);}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
#hero{min-height:100vh;background:linear-gradient(160deg,#ffffff 0%,#ffffff 40%,#111111 100%);display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:140px 48px 100px;position:relative;overflow:hidden;}
.hero-bg-text{position:absolute;top:50%;right:-40px;transform:translateY(-50%);font-family:var(--display);font-size:clamp(180px,24vw,400px);color:rgba(0,0,0,0.04);line-height:1;pointer-events:none;user-select:none;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:var(--gray-600);border:1px solid var(--gray-200);padding:7px 16px;margin-bottom:44px;}
.hero-badge span{display:inline-block;width:6px;height:6px;background:var(--red);border-radius:50%;animation:pulse 2s infinite;}
.hero-title{font-family:var(--display);font-size:clamp(72px,12vw,190px);line-height:.88;letter-spacing:2px;color:var(--black);margin-bottom:24px;}
.hero-title .red{color:var(--red);}
.hero-sub{font-family:var(--serif);font-size:clamp(18px,2.4vw,30px);font-style:italic;color:var(--gray-600);margin-bottom:52px;line-height:1.55;}
.hero-actions{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
.home-what{padding:100px 48px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
.what-big{font-family:var(--serif);font-size:clamp(20px,2.5vw,32px);line-height:1.5;color:var(--black);margin-top:28px;}
.what-body{font-size:16px;line-height:1.85;color:var(--gray-600);margin-top:20px;}
.what-body strong{color:var(--black);}
.home-stats{background:var(--black);display:grid;grid-template-columns:repeat(4,1fr);}
.hstat{padding:56px 24px;text-align:center;border-right:1px solid rgba(255,255,255,.08);}
.hstat:last-child{border-right:none;}
.hstat-num{font-family:var(--display);font-size:68px;color:white;line-height:1;}
.hstat-num span{color:var(--red);}
.hstat-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:8px;}
.home-initiatives{padding:100px 48px;background:var(--gray-100);}
.initiatives-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--gray-200);margin-top:56px;}
.init-card{background:white;padding:44px 36px;transition:background .25s;position:relative;overflow:hidden;}
.init-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:0;background:var(--red);transition:height .3s;}
.init-card:hover::before{height:100%;}
.init-card:hover{background:var(--gray-100);}
.init-icon{font-size:28px;color:var(--red);margin-bottom:20px;}
.init-title{font-size:17px;font-weight:700;margin-bottom:10px;}
.init-desc{font-size:14px;color:var(--gray-400);line-height:1.75;}
.home-speakers{padding:100px 48px;background:var(--white);}
.speakers-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:56px;}
.speaker-card{text-align:center;}
.speaker-img-placeholder{width:100%;aspect-ratio:1;background:linear-gradient(135deg,var(--gray-200),var(--gray-100));display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:48px;color:var(--gray-400);margin-bottom:16px;}
.speaker-name{font-size:15px;font-weight:700;}
.speaker-role{font-size:12px;color:var(--gray-400);margin-top:4px;}
.speaker-tag{font-size:11px;color:var(--red);letter-spacing:1.5px;text-transform:uppercase;margin-top:6px;}
.home-testimonials{padding:100px 48px;background:var(--black);}
.testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:56px;}
.testi-card{background:#111;padding:44px 36px;border:1px solid rgba(255,255,255,.07);}
.testi-quote{font-family:var(--serif);font-size:17px;font-style:italic;line-height:1.78;color:rgba(255,255,255,.8);margin-bottom:28px;}
.testi-quote::before{content:'\u201C';font-size:48px;color:var(--red);line-height:.5;display:block;margin-bottom:12px;font-style:normal;}
.testi-name{font-size:14px;font-weight:600;color:white;}
.testi-info{font-size:12px;color:rgba(255,255,255,.3);margin-top:4px;}
.page-hero{padding:140px 48px 80px;background:linear-gradient(160deg,#fff 50%,#111 100%);min-height:52vh;display:flex;align-items:flex-end;}
.page-hero p{color:rgba(255,255,255,.55);font-size:16px;max-width:420px;line-height:1.7;margin-top:16px;}
.origins{padding:100px 48px;display:grid;grid-template-columns:auto 1fr;gap:72px;align-items:start;}
.origins-year{font-family:var(--display);font-size:130px;line-height:.85;color:white;background:var(--black);padding:20px 32px;letter-spacing:-2px;flex-shrink:0;}
.origins-body{font-size:17px;color:var(--gray-600);line-height:1.85;margin-top:12px;}
.origins-body strong{color:var(--black);}
.vision-section{padding:80px 48px;background:var(--gray-100);}
.vision-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:var(--gray-200);margin-top:56px;}
.vision-card{background:white;padding:40px 28px;transition:background .25s;}
.vision-card:hover{background:var(--black);}
.vision-card:hover .vc-num{color:var(--red);}
.vision-card:hover .vc-title{color:white;}
.vision-card:hover .vc-desc{color:rgba(255,255,255,.35);}
.vc-num{font-family:var(--display);font-size:44px;color:var(--gray-200);transition:color .25s;margin-bottom:16px;}
.vc-title{font-size:16px;font-weight:700;margin-bottom:8px;transition:color .25s;}
.vc-desc{font-size:13.5px;color:var(--gray-400);line-height:1.7;transition:color .25s;}
.about-stats{background:var(--red);display:grid;grid-template-columns:repeat(4,1fr);}
.astat{padding:52px 24px;text-align:center;border-right:1px solid rgba(255,255,255,.2);}
.astat:last-child{border-right:none;}
.astat-num{font-family:var(--display);font-size:64px;color:white;line-height:1;}
.astat-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.65);margin-top:8px;}
.spotlight{padding:100px 48px;background:var(--white);}
.spotlight-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--gray-200);margin-top:56px;}
.spot-card{background:white;padding:48px 40px;display:flex;gap:24px;align-items:flex-start;transition:background .2s;}
.spot-card:hover{background:var(--gray-100);}
.spot-icon{font-size:24px;color:var(--red);flex-shrink:0;margin-top:4px;}
.spot-title{font-size:17px;font-weight:700;margin-bottom:8px;}
.spot-body{font-size:14px;color:var(--gray-400);line-height:1.75;}
.spot-tag{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--red);margin-top:12px;font-weight:600;}
.history-section{padding:100px 48px;background:var(--gray-100);}
.timeline{margin-top:56px;}
.t-item{display:grid;grid-template-columns:120px 1px 1fr;gap:0 32px;}
.t-year-cell{padding:32px 0;text-align:right;font-family:var(--display);font-size:28px;color:var(--gray-400);transition:color .2s;line-height:1.1;}
.t-item:hover .t-year-cell{color:var(--red);}
.t-line-cell{position:relative;background:var(--gray-200);}
.t-dot-el{position:absolute;top:38px;left:50%;transform:translateX(-50%);width:10px;height:10px;background:var(--red);border-radius:50%;border:2px solid var(--gray-100);}
.t-content-cell{padding:32px 0 32px 4px;border-bottom:1px solid var(--gray-200);}
.t-title{font-size:16px;font-weight:700;margin-bottom:6px;}
.t-desc{font-size:14px;color:var(--gray-400);line-height:1.7;}
.patronage{padding:100px 48px;background:var(--white);}
.patron-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--gray-200);margin-top:56px;}
.patron-card{background:white;padding:36px 30px;transition:background .2s;cursor:default;}
.patron-card:hover{background:var(--black);}
.patron-card:hover .patron-name{color:white;}
.patron-card:hover .patron-role{color:var(--red);}
.patron-card:hover .patron-org{color:rgba(255,255,255,.3);}
.patron-name{font-size:16px;font-weight:700;margin-bottom:4px;transition:color .2s;}
.patron-role{font-size:13px;color:var(--red);font-weight:500;margin-bottom:2px;transition:color .2s;}
.patron-org{font-size:13px;color:var(--gray-400);transition:color .2s;}
.events-grid-page{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--gray-200);margin:0 48px 80px;}
.ev-card{background:white;padding:42px 34px;cursor:pointer;transition:background .25s;position:relative;overflow:hidden;}
.ev-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:0;background:var(--red);transition:height .3s;}
.ev-card:hover::before{height:100%;}
.ev-card:hover{background:var(--gray-100);}
.ev-num{font-family:var(--display);font-size:52px;color:var(--gray-200);line-height:1;margin-bottom:20px;transition:color .2s;}
.ev-card:hover .ev-num{color:var(--red);}
.ev-date{font-size:11px;color:var(--red);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;}
.ev-title{font-size:16px;font-weight:700;margin-bottom:12px;}
.ev-desc{font-size:14px;color:var(--gray-400);line-height:1.72;}
.ev-link{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--black);margin-top:24px;border-bottom:1px solid transparent;transition:border-color .2s;text-decoration:none;}
.ev-link:hover{border-color:var(--black);}
.gallery-filters{display:flex;gap:10px;padding:0 48px;margin-bottom:40px;flex-wrap:wrap;}
.filter-btn{padding:9px 20px;border:1px solid var(--gray-200);background:white;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;font-family:var(--sans);}
.filter-btn.active,.filter-btn:hover{background:var(--black);color:white;border-color:var(--black);}
.gallery-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;padding:0 48px 80px;}
.gal-item{aspect-ratio:1;background:var(--gray-100);overflow:hidden;cursor:pointer;position:relative;}
.gal-item.wide{grid-column:span 2;}
.gal-placeholder{width:100%;height:100%;min-height:200px;background:linear-gradient(135deg,var(--gray-200),var(--gray-100));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;transition:background .25s;}
.gal-item:hover .gal-placeholder{background:linear-gradient(135deg,#ddd,#ccc);}
.gal-icon-el{font-size:26px;color:var(--gray-400);}
.gal-label-el{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);}
.gal-overlay{position:absolute;inset:0;background:rgba(0,0,0,.68);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;}
.gal-item:hover .gal-overlay{opacity:1;}
.gal-overlay span{color:white;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;}
.team-section{padding:80px 48px;}
.year-selector-row{display:flex;gap:12px;align-items:center;margin:32px 0;}
.year-selector-row label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);font-weight:600;}
.year-select{border:1px solid var(--gray-200);padding:10px 40px 10px 16px;font-size:14px;font-family:var(--sans);color:var(--black);background:white;outline:none;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;transition:border-color .2s;}
.year-select:focus{border-color:var(--black);}
.team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:var(--gray-200);}
.team-card{background:white;padding:0 0 32px;text-align:center;overflow:hidden;transition:background .2s;}
.team-card:hover{background:var(--gray-100);}
.team-photo{width:100%;aspect-ratio:1;background:linear-gradient(135deg,var(--gray-200),var(--gray-100));display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:56px;color:var(--gray-400);margin-bottom:20px;}
.team-name{font-size:15px;font-weight:700;padding:0 16px;margin-bottom:4px;}
.team-role{font-size:11px;color:var(--red);letter-spacing:1px;text-transform:uppercase;padding:0 16px;}
.team-dept{font-size:12px;color:var(--gray-400);margin-top:4px;padding:0 16px;}
.prev-teams{padding:80px 48px;background:var(--gray-100);}
.prev-team-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:2px;background:var(--gray-200);}
.prev-card{background:white;padding:28px 20px;text-align:center;}
.prev-photo{width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,var(--gray-200),var(--gray-100));margin:0 auto 14px;display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:28px;color:var(--gray-400);}
.prev-name{font-size:13px;font-weight:600;margin-bottom:4px;}
.prev-role{font-size:11px;color:var(--gray-400);}
.prev-dept{font-size:10px;color:var(--gray-400);margin-top:3px;font-style:italic;}
.contact-form-section{padding:80px 48px;background:var(--white);}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
.contact-detail{display:flex;gap:14px;align-items:center;margin-bottom:16px;font-size:14px;color:var(--gray-600);}
.contact-detail i{color:var(--red);width:18px;}
.form-box{background:var(--gray-100);padding:48px 40px;}
.form-group{margin-bottom:20px;}
.form-group label{display:block;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:var(--gray-400);margin-bottom:8px;font-weight:600;}
.form-group input,.form-group textarea,.form-group select{width:100%;border:1px solid var(--gray-200);background:white;padding:13px 16px;font-size:14px;font-family:var(--sans);color:var(--black);outline:none;transition:border-color .2s;resize:none;}
.form-group input:focus,.form-group textarea:focus,.form-group select:focus{border-color:var(--black);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.btn-send{width:100%;background:var(--black);color:white;border:none;padding:16px;font-size:13px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;margin-top:8px;transition:background .2s;font-family:var(--sans);}
.btn-send:hover{background:var(--red);}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:2000;align-items:center;justify-content:center;padding:24px;}
.modal-overlay.open{display:flex;}
.modal-box{background:white;max-width:680px;width:100%;max-height:90vh;overflow-y:auto;animation:slideUp .3s ease;}
.modal-head{background:var(--black);padding:44px 40px;color:white;position:relative;}
.modal-close-btn{position:absolute;top:18px;right:18px;background:none;border:none;color:rgba(255,255,255,.5);font-size:22px;cursor:pointer;transition:color .2s;}
.modal-close-btn:hover{color:white;}
.modal-ev-tag{font-size:10.5px;letter-spacing:2.5px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:10px;}
.modal-ev-title{font-family:var(--display);font-size:52px;letter-spacing:1px;line-height:1;}
.modal-body-section{padding:44px 40px;}
.modal-body-section p{font-size:16px;color:var(--gray-600);line-height:1.88;}
.join-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:2000;align-items:center;justify-content:center;padding:24px;}
.join-overlay.open{display:flex;}
.join-box{background:white;padding:56px;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;animation:slideUp .3s ease;position:relative;}
.join-close{position:absolute;top:18px;right:18px;background:none;border:none;font-size:20px;color:var(--gray-400);cursor:pointer;}
.join-title{font-family:var(--display);font-size:50px;line-height:.95;margin-bottom:8px;}
.join-sub{font-size:14px;color:var(--gray-400);margin-bottom:36px;line-height:1.6;}
footer{background:var(--black);color:white;padding:80px 48px 40px;}
.footer-top{display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:60px;padding-bottom:60px;border-bottom:1px solid rgba(255,255,255,.08);}
.footer-brand{font-family:var(--display);font-size:52px;letter-spacing:1px;line-height:1;margin-bottom:16px;}
.footer-brand span{color:var(--red);}
.footer-tagline{font-family:var(--serif);font-style:italic;color:rgba(255,255,255,.35);font-size:16px;}
.footer-col h4{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:20px;}
.footer-col a{display:block;color:rgba(255,255,255,.55);text-decoration:none;font-size:14px;margin-bottom:12px;transition:color .2s;cursor:pointer;}
.footer-col a:hover{color:white;}
.footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:32px;font-size:13px;color:rgba(255,255,255,.28);}
.social-links{display:flex;gap:12px;}
.soc-link{width:36px;height:36px;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);text-decoration:none;font-size:14px;transition:all .2s;}
.soc-link:hover{border-color:var(--red);color:white;background:var(--red);}
`;

/* ─── REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ─── SHARED COMPONENTS ─── */
function Footer({ onNav }) {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand">E-CELL<br /><span>MESW</span>COE</div>
          <div className="footer-tagline">Innovate Today. Elevate Tomorrow.</div>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          {["home","about","events","gallery","contact"].map(p => (
            <a key={p} onClick={() => onNav(p)}>{p === "home" ? "Home" : p === "about" ? "About Us" : p.charAt(0).toUpperCase() + p.slice(1)}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a>ecell@meswcoe.edu.in</a>
          <a>MES Wadia College of Engineering<br />Pune, Maharashtra</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 E-Cell MESWCOE. All rights reserved.</span>
        <div className="social-links">
          <a href="#" className="soc-link"><i className="fab fa-instagram"></i></a>
          <a href="#" className="soc-link"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="soc-link"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGES ─── */
function HomePage({ onNav, onJoin }) {
  useReveal();
  return (
    <div>
      <section id="hero">
        <div className="hero-bg-text">EC</div>
        <div className="hero-badge reveal"><span></span>Est. July 22, 2023 — MESWCOE, Pune</div>
        <h1 className="hero-title reveal">E-CELL<br /><span className="red">MESW</span>COE</h1>
        <p className="hero-sub reveal">Innovate Today.<br />Elevate Tomorrow.</p>
        <div className="hero-actions reveal">
          <button className="btn-primary" onClick={() => onNav("about")}>Our Story <i className="fas fa-arrow-right"></i></button>
          <button className="btn-outline" onClick={() => onNav("events")}>Explore Events</button>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {["ENTREPRENEURSHIP","INNOVATION","LEADERSHIP","NEC IIT BOMBAY","IGNITE PITCH","ILLUMINATE","WADIA COLLEGE",
            "ENTREPRENEURSHIP","INNOVATION","LEADERSHIP","NEC IIT BOMBAY","IGNITE PITCH","ILLUMINATE","WADIA COLLEGE"].map((t,i) => (
            <span key={i}>{t}</span>
          )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`d${i}`} className="dot">●</span>, el], [])}
        </div>
      </div>

      <div className="home-what">
        <div className="reveal">
          <span className="section-label">The Idea</span>
          <h2 className="section-title">What is<br />E-Cell?</h2>
          <p className="what-big">More than just a college club — it's a culture and a movement that builds people.</p>
          <p className="what-body">E-Cell MESWCOE is the official Entrepreneurship Cell of Modern Education Society's Wadia College of Engineering, Pune. We create an environment where students are encouraged to <strong>think differently</strong>, identify real-world problems, and turn ideas into solutions.<br /><br />Here, students don't just organize events — they become <strong>planners, leaders, marketers, negotiators, and changemakers</strong> ready to build the future.</p>
          <div style={{ marginTop: 32 }}><button className="btn-primary" onClick={() => onNav("about")}>Learn More <i className="fas fa-arrow-right"></i></button></div>
        </div>
        <div className="reveal" style={{ paddingTop: 72 }}>
          <div style={{ background: "var(--black)", padding: "52px 44px", color: "white" }}>
            <div style={{ fontFamily: "var(--display)", fontSize: 96, lineHeight: 1, color: "var(--red)", marginBottom: 16 }}>E</div>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 21, lineHeight: 1.65, color: "rgba(255,255,255,.75)" }}>"E-Cell transforms curious minds into confident innovators ready to build the future."</p>
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.1)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.28)" }}>Est. July 22, 2023 · MESWCOE · Pune</div>
          </div>
        </div>
      </div>

      <div className="home-stats">
        {[["80","+","Students Trained"],["100","+" ,"Event Participants"],["3","+","Years Active"],["1","","NEC Grand Finale"]].map(([n,s,l],i) => (
          <div className="hstat reveal" key={i}>
            <div className="hstat-num">{n}<span>{s}</span></div>
            <div className="hstat-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="home-initiatives">
        <span className="section-label reveal">What We Do</span>
        <h2 className="section-title reveal">Our Initiatives</h2>
        <div className="initiatives-grid">
          {[
            ["fa-rocket","Startup Pitching","Providing students a professional platform to present ideas to real investors and mentors through structured pitch competitions."],
            ["fa-lightbulb","Ideation Workshops","Structured sessions guiding students from problem identification to validated ideas — the crucial first step in entrepreneurship."],
            ["fa-trophy","National Competitions","Representing MESWCOE at national competitions including the NEC Grand Finale at IIT Bombay, gaining national recognition."],
            ["fa-users","Industry Connect","Bridging campus and startup ecosystems through company visits, alumni interactions, and mentor matchmaking."],
            ["fa-microphone","Speaker Sessions","Hosting talks by founders, investors, and industry leaders who share authentic entrepreneurial journeys."],
            ["fa-chalkboard-teacher","Skill Development","Leadership bootcamps, communication training, and business development programs for career-defining skills."],
          ].map(([icon,title,desc],i) => (
            <div className="init-card reveal" key={i}>
              <div className="init-icon"><i className={`fas ${icon}`}></i></div>
              <div className="init-title">{title}</div>
              <div className="init-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-speakers">
        <span className="section-label reveal">Voices That Inspire</span>
        <h2 className="section-title reveal">Inspirational<br />Speakers</h2>
        <p style={{ marginTop: 16, color: "var(--gray-400)", fontSize: 15, maxWidth: 440, lineHeight: 1.7, marginBottom: 0 }} className="reveal">We bring together founders, innovators, and industry leaders to share stories that ignite entrepreneurial ambition.</p>
        <div className="speakers-grid">
          {[["A","Speaker Name","Founder & CEO","Ignite Pitch 2.0"],["B","Speaker Name","Venture Capitalist","Illuminate 2.0"],["C","Speaker Name","Serial Entrepreneur","VentureSphere"],["D","Speaker Name","Product Lead","Leadership Bootcamp"]].map(([init,name,role,tag],i) => (
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
        <span className="section-label reveal" style={{ color: "rgba(255,100,100,.8)" }}>What Members Say</span>
        <h2 className="section-title reveal" style={{ color: "white" }}>Testimonials</h2>
        <div className="testimonials-grid">
          {[
            ["E-Cell gave me the courage to think beyond just getting a job. It pushed me to ask \"what problem can I solve?\" and that changed everything.","Student Name","BE Computer Engineering · 2025 Batch"],
            ["Being part of the NEC team and competing at IIT Bombay was something I never imagined I'd do in college. E-Cell made it happen.","Student Name","TE Mechanical Engineering · 2026 Batch"],
            ["The speaker sessions exposed me to a world I didn't know existed. I left every event with a new perspective and a bigger vision.","Student Name","SE Electronics Engineering · 2027 Batch"],
          ].map(([q,n,info],i) => (
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

function AboutPage({ onNav }) {
  useReveal();
  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">Our Story</span>
          <h1 className="section-title" style={{ fontSize: "clamp(60px,9vw,130px)", color: "white" }}>About<br />E-Cell</h1>
          <p>The official Entrepreneurship Cell of Modern Education Society's Wadia College of Engineering, Pune — building entrepreneurs since July 2023.</p>
        </div>
      </div>

      <div className="origins">
        <div className="origins-year reveal">2023</div>
        <div className="reveal">
          <span className="section-label">Origins of E-Cell</span>
          <h2 className="section-title" style={{ fontSize: "clamp(36px,5vw,68px)", marginBottom: 24 }}>Born From<br />Ambition</h2>
          <p className="origins-body">The spark began in early 2024 when a small group of ambitious students, led by <strong>Harshad Harishchandra Pakhale (Founder)</strong> and <strong>Manas Deshmukh (Co-Founder)</strong>, decided to build something meaningful from nothing.<br /><br />Supported by <strong>Prof. Shrikant Dhavale</strong>, the cell launched its first initiatives and rapidly evolved into one of Pune's most vibrant student-led entrepreneurship communities — with national recognition and a growing campus movement.<br /><br />Formally established on <strong>July 22, 2023</strong>, E-Cell MESWCOE now stands as a campus-wide culture, not just a club.</p>
        </div>
      </div>

      <div className="vision-section">
        <span className="section-label reveal">Our Vision</span>
        <h2 className="section-title reveal">Four Pillars of<br />Everything We Do</h2>
        <div className="vision-grid">
          {[["01","Empowerment","Helping every student discover and develop their entrepreneurial potential through real experience."],
            ["02","Innovation","Challenging existing systems and imagining better products, services, and solutions."],
            ["03","Collaboration","Building meaningful ideas together. Diverse minds meeting around a shared purpose."],
            ["04","Execution","Turning thoughts into real action and tangible impact. Ideas only matter when they move."]].map(([num,title,desc]) => (
            <div className="vision-card reveal" key={num}>
              <div className="vc-num">{num}</div>
              <div className="vc-title">{title}</div>
              <div className="vc-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-stats">
        {[["80+","Students Trained"],["100+","Event Participants"],["1","NEC Grand Finale"],["3","Years of Impact"]].map(([n,l],i) => (
          <div className="astat reveal" key={i}><div className="astat-num">{n}</div><div className="astat-label">{l}</div></div>
        ))}
      </div>

      <div className="spotlight">
        <span className="section-label reveal">Highlights</span>
        <h2 className="section-title reveal">In the Spotlight</h2>
        <div className="spotlight-grid">
          {[
            ["fa-trophy","NEC Grand Finale — IIT Bombay","Our team competed at the National Entrepreneurship Challenge by E-Cell IIT Bombay, qualifying for the Grand Finale and putting MESWCOE on the national map.","2025 Achievement"],
            ["fa-microphone-alt","Ignite Pitch 2.0","A high-energy pitching competition bringing 100+ participants to present startup ideas to industry mentors in a professional setting.","Flagship Event"],
            ["fa-star","Illuminate 2.0","A landmark knowledge-sharing summit with talks and panels by successful founders, drawing 100+ students for an evening of inspiration.","2025 Edition"],
            ["fa-handshake","E-Cell IIT Bombay Partnership","A strong collaboration giving MESWCOE students access to national networks, resources, and mentors from one of India's top entrepreneurship ecosystems.","Ongoing Partnership"],
          ].map(([icon,title,body,tag],i) => (
            <div className="spot-card reveal" key={i}>
              <div className="spot-icon"><i className={`fas ${icon}`}></i></div>
              <div><div className="spot-title">{title}</div><div className="spot-body">{body}</div><div className="spot-tag">{tag}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="history-section">
        <span className="section-label reveal">Timeline</span>
        <h2 className="section-title reveal">Our History</h2>
        <div className="timeline">
          {[
            ["2023","Official Establishment — July 22, 2023","E-Cell MESWCOE formally established at MES Wadia College of Engineering, Pune, under the guidance of Prof. Shrikant Dhavale."],
            ["Early\n2024","First Events & NEC Entry","VentureSphere team formed. E-Cell enters the National Entrepreneurship Challenge for the first time at a national level."],
            ["Jan\n2024","Ignite Pitch 2.0 Launch","Flagship pitch competition launched with 100+ participants, putting E-Cell on the campus map as a serious platform."],
            ["2025","Breakthrough Year — NEC Grand Finale @ IIT Bombay","Team qualifies for NEC Grand Finale at IIT Bombay. Illuminate 2.0 and VentureSphere 2.0 also successfully hosted."],
            ["2026","Growing Strong","Now one of Pune's most active student-led E-Cells, with a growing alumni network and expanding industry partnerships."],
          ].map(([year,title,desc],i) => (
            <div className="t-item reveal" key={i}>
              <div className="t-year-cell" style={{ whiteSpace: "pre-line" }}>{year}</div>
              <div className="t-line-cell"><div className="t-dot-el"></div></div>
              <div className="t-content-cell"><div className="t-title">{title}</div><div className="t-desc">{desc}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="patronage">
        <span className="section-label reveal">Backed By</span>
        <h2 className="section-title reveal">Patronages &<br />Recognitions</h2>
        <div className="patron-grid">
          {[
            ["Prof. Shrikant Dhavale","Faculty Advisor","E-Cell MESWCOE"],
            ["Dr. M.P. Dale","Principal","MESWCOE, Pune"],
            ["Dr. V.N. Raibhole","President, IIC","Institution's Innovation Council"],
            ["Harshad H. Pakhale","Founder","E-Cell MESWCOE"],
            ["Manas Deshmukh","Co-Founder","E-Cell MESWCOE"],
            ["E-Cell IIT Bombay","National Partner","NEC · National Entrepreneurship Challenge"],
          ].map(([name,role,org],i) => (
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

function EventsPage({ onNav }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  useReveal();
  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">What We Do</span>
          <h1 className="section-title" style={{ fontSize: "clamp(60px,9vw,130px)", color: "white" }}>Flagship<br />Events</h1>
          <p>Every event is designed to push students beyond their comfort zones and into the world of real entrepreneurship.</p>
        </div>
      </div>
      <div style={{ height: 48 }}></div>
      <div className="events-grid-page">
        {events.map((ev, i) => (
          <div className="ev-card reveal" key={i} onClick={() => setSelectedEvent(i)}>
            <div className="ev-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="ev-date">{ev.date} · {ev.tag}</div>
            <div className="ev-title">{ev.title}</div>
            <div className="ev-desc">{ev.content.substring(0, 155)}…</div>
            <span className="ev-link">Read More <i className="fas fa-arrow-right" style={{ fontSize: 11 }}></i></span>
          </div>
        ))}
      </div>

      {selectedEvent !== null && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && setSelectedEvent(null)}>
          <div className="modal-box">
            <div className="modal-head">
              <button className="modal-close-btn" onClick={() => setSelectedEvent(null)}>✕</button>
              <span className="modal-ev-tag">{events[selectedEvent].date} · {events[selectedEvent].tag}</span>
              <div className="modal-ev-title">{events[selectedEvent].title}</div>
            </div>
            <div className="modal-body-section"><p>{events[selectedEvent].content}</p></div>
          </div>
        </div>
      )}

      <Footer onNav={onNav} />
    </div>
  );
}

function GalleryPage({ onNav }) {
  const [activeFilter, setActiveFilter] = useState("all");
  useReveal();
  const filters = [["all","All"],["ignite","Ignite Pitch"],["illuminate","Illuminate"],["venture","VentureSphere"],["nec","NEC IIT Bombay"],["workshops","Workshops"]];
  const filtered = activeFilter === "all" ? galleryItems : galleryItems.filter(i => i.cat === activeFilter);
  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">Captured Moments</span>
          <h1 className="section-title" style={{ fontSize: "clamp(60px,9vw,130px)", color: "white" }}>Gallery</h1>
          <p>Every event, every moment, every memory from the E-Cell journey.</p>
        </div>
      </div>
      <div style={{ height: 48 }}></div>
      <div className="gallery-filters">
        {filters.map(([cat,label]) => (
          <button key={cat} className={`filter-btn${activeFilter === cat ? " active" : ""}`} onClick={() => setActiveFilter(cat)}>{label}</button>
        ))}
      </div>
      <div className="gallery-grid">
        {filtered.map((item, i) => (
          <div className={`gal-item${item.wide ? " wide" : ""}`} key={i}>
            <div className="gal-placeholder">
              <i className={`fas ${item.icon} gal-icon-el`}></i>
              <div className="gal-label-el">{item.label}</div>
            </div>
            <div className="gal-overlay"><span>View Photo</span></div>
          </div>
        ))}
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

function ContactPage({ onNav }) {
  const [prevYear, setPrevYear] = useState("");
  useReveal();
  return (
    <div>
      <div className="page-hero">
        <div>
          <span className="section-label">Get Involved</span>
          <h1 className="section-title" style={{ fontSize: "clamp(60px,9vw,130px)", color: "white" }}>Contact</h1>
          <p>Meet the team, explore previous batches, and get in touch with us.</p>
        </div>
      </div>

      <div className="team-section">
        <span className="section-label reveal">The People</span>
        <h2 className="section-title reveal">Meet Our Team</h2>
        <div className="year-selector-row reveal">
          <label>Current Year</label>
          <select className="year-select"><option>2026–2027</option></select>
        </div>
        <div className="team-grid">
          {currentTeam.map((m, i) => (
            <div className="team-card" key={i}>
              <div className="team-photo">{m.init}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
              <div className="team-dept">{m.dept}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="prev-teams">
        <span className="section-label reveal">Alumni Batches</span>
        <h2 className="section-title reveal">View Previous Teams</h2>
        <div className="year-selector-row reveal">
          <label>Select Year</label>
          <select className="year-select" value={prevYear} onChange={e => setPrevYear(e.target.value)}>
            <option value="">— Choose a batch —</option>
            <option value="2526">2025–2026 (Advance Team)</option>
            <option value="2425">2024–2025 (Founders Team)</option>
          </select>
        </div>
        {prevYear && prevTeams[prevYear] && (
          <div className="prev-team-grid">
            {prevTeams[prevYear].map((m, i) => (
              <div className="prev-card" key={i}>
                <div className="prev-photo">{m.init}</div>
                <div className="prev-name">{m.name}</div>
                <div className="prev-role">{m.role}</div>
                {m.dept && <div className="prev-dept">{m.dept}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="contact-form-section">
        <div className="contact-grid">
          <div className="reveal">
            <span className="section-label">Reach Out</span>
            <h2 className="section-title" style={{ fontSize: "clamp(40px,5vw,72px)" }}>Send Us a<br />Message</h2>
            <p style={{ fontSize: 16, color: "var(--gray-600)", lineHeight: 1.8, marginTop: 24, marginBottom: 36 }}>Have a question, collaboration idea, or want to be part of our story? We'd love to hear from you.</p>
            <div className="contact-detail"><i className="fas fa-envelope"></i> ecell@meswcoe.edu.in</div>
            <div className="contact-detail"><i className="fas fa-map-marker-alt"></i> MES Wadia College of Engineering, Pune</div>
            <div className="contact-detail"><i className="fab fa-instagram"></i> @ecell.meswcoe</div>
            <div className="contact-detail"><i className="fab fa-linkedin-in"></i> E-Cell MESWCOE</div>
          </div>
          <div className="form-box reveal">
            <div className="form-row">
              <div className="form-group"><label>First Name</label><input type="text" placeholder="Rahul" /></div>
              <div className="form-group"><label>Last Name</label><input type="text" placeholder="Sharma" /></div>
            </div>
            <div className="form-group"><label>Email Address</label><input type="email" placeholder="you@email.com" /></div>
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
            <div className="form-group"><label>Message</label><textarea rows="5" placeholder="Tell us what's on your mind..."></textarea></div>
            <button className="btn-send">Send Message <i className="fas fa-paper-plane" style={{ marginLeft: 8 }}></i></button>
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
    <div className="join-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="join-box">
        <button className="join-close" onClick={onClose}>✕</button>
        <div className="join-title">Join the<br /><span style={{ color: "var(--red)" }}>Movement.</span></div>
        <p className="join-sub">Become part of Pune's most ambitious student entrepreneurship community.</p>
        <div className="form-row">
          <div className="form-group"><label>First Name</label><input type="text" placeholder="First name" /></div>
          <div className="form-group"><label>Last Name</label><input type="text" placeholder="Last name" /></div>
        </div>
        <div className="form-group"><label>Email</label><input type="email" placeholder="you@email.com" /></div>
        <div className="form-group">
          <label>Year of Study</label>
          <select>
            <option>First Year (FE)</option>
            <option>Second Year (SE)</option>
            <option>Third Year (TE)</option>
            <option>Final Year (BE)</option>
          </select>
        </div>
        <div className="form-group"><label>Department</label><input type="text" placeholder="e.g. Computer Engineering" /></div>
        <div className="form-group"><label>Why do you want to join?</label><textarea rows="3" placeholder="Tell us briefly..."></textarea></div>
        <button className="btn-send">Submit Application <i className="fas fa-arrow-right" style={{ marginLeft: 8 }}></i></button>
      </div>
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = useState("home");
  const [joinOpen, setJoinOpen] = useState(false);

  const navTo = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <style>{css}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <nav>
        <div className="nav-logo" onClick={() => navTo("home")}>
          <div className="nav-logo-mark">E</div>
          <div>
            <div className="nav-logo-text">E-CELL</div>
            <div className="nav-logo-sub">MESWCOE</div>
          </div>
        </div>
        <ul className="nav-links">
          {[["home","Home"],["about","About Us"],["events","Events"],["gallery","Gallery"],["contact","Contact"]].map(([id,label]) => (
            <li key={id}><a className={page === id ? "active-nav" : ""} onClick={() => navTo(id)}>{label}</a></li>
          ))}
          <li><button className="nav-cta" onClick={() => setJoinOpen(true)}>Join the Movement</button></li>
        </ul>
      </nav>

      <div style={{ paddingTop: 68 }}>
        {page === "home"    && <HomePage    onNav={navTo} onJoin={() => setJoinOpen(true)} />}
        {page === "about"   && <AboutPage   onNav={navTo} />}
        {page === "events"  && <EventsPage  onNav={navTo} />}
        {page === "gallery" && <GalleryPage onNav={navTo} />}
        {page === "contact" && <ContactPage onNav={navTo} />}
      </div>

      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  );
}

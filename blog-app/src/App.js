import { useState, useEffect, useRef, useCallback } from "react";

// ── STYLE INJECTION ──────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:       #0d0d0d;
    --paper:     #f5f0e8;
    --cream:     #ede8de;
    --accent:    #c8392b;
    --gold:      #b8860b;
    --muted:     #7a7268;
    --rule:      #c9c0b0;
    --serif:     'Playfair Display', Georgia, serif;
    --mono:      'DM Mono', monospace;
    --body:      'Lora', Georgia, serif;
    --ease:      cubic-bezier(.4,0,.2,1);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    font-size: 17px;
    line-height: 1.7;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── NOISE TEXTURE OVERLAY ── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  /* ── NAV ── */
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--ink);
    color: var(--paper);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(1.5rem, 5vw, 4rem);
    height: 56px;
    border-bottom: 2px solid var(--accent);
  }

  .nav-logo {
    font-family: var(--serif);
    font-weight: 900;
    font-size: 1.15rem;
    letter-spacing: .04em;
    cursor: pointer;
    color: var(--paper);
    text-decoration: none;
  }
  .nav-logo span { color: var(--accent); }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-links button {
    background: none;
    border: none;
    color: var(--rule);
    font-family: var(--mono);
    font-size: .72rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 4px 0;
    border-bottom: 1.5px solid transparent;
    transition: color .2s var(--ease), border-color .2s var(--ease);
  }
  .nav-links button:hover,
  .nav-links button.active {
    color: var(--paper);
    border-color: var(--accent);
  }

  .nav-issue {
    font-family: var(--mono);
    font-size: .65rem;
    color: var(--gold);
    letter-spacing: .1em;
  }

  /* ── MASTHEAD ── */
  .masthead {
    border-bottom: 1px solid var(--rule);
    padding: clamp(3rem,8vw,6rem) clamp(1.5rem,5vw,4rem) 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: 1rem;
  }
  .masthead-title {
    font-family: var(--serif);
    font-size: clamp(3.5rem, 10vw, 8rem);
    font-weight: 900;
    line-height: .95;
    letter-spacing: -.02em;
  }
  .masthead-title em {
    font-style: italic;
    color: var(--accent);
  }
  .masthead-meta {
    font-family: var(--mono);
    font-size: .68rem;
    color: var(--muted);
    letter-spacing: .1em;
    text-align: right;
    line-height: 1.9;
  }
  .masthead-rule {
    grid-column: 1/-1;
    border: none;
    border-top: 3px double var(--rule);
    margin-top: 1rem;
  }

  /* ── FEATURED STRIP ── */
  .featured-strip {
    background: var(--accent);
    color: var(--paper);
    padding: .55rem clamp(1.5rem,5vw,4rem);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    overflow: hidden;
  }
  .featured-label {
    font-family: var(--mono);
    font-size: .62rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    white-space: nowrap;
    opacity: .85;
  }
  .featured-ticker {
    font-family: var(--serif);
    font-style: italic;
    font-size: .95rem;
  }

  /* ── LAYOUT ── */
  .page { padding: clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem); max-width: 1280px; margin: 0 auto; }

  /* ── HOME GRID ── */
  .home-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 0;
    border: 1px solid var(--rule);
  }
  .home-grid .card:first-child {
    grid-column: 1 / 3;
    border-right: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
  }
  .home-grid .card:nth-child(2) {
    border-bottom: 1px solid var(--rule);
  }
  .home-grid .card:nth-child(3),
  .home-grid .card:nth-child(4) {
    border-right: 1px solid var(--rule);
  }

  /* ── CARD ── */
  .card {
    padding: 2rem;
    cursor: pointer;
    transition: background .18s var(--ease);
    position: relative;
  }
  .card:hover { background: var(--cream); }

  .card-tag {
    font-family: var(--mono);
    font-size: .62rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: .6rem;
  }
  .card-title {
    font-family: var(--serif);
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1.2;
    margin-bottom: .75rem;
  }
  .card:first-child .card-title { font-size: clamp(1.7rem, 3vw, 2.4rem); }
  .card-excerpt {
    font-size: .9rem;
    color: var(--muted);
    line-height: 1.65;
    margin-bottom: 1.1rem;
  }
  .card-byline {
    font-family: var(--mono);
    font-size: .65rem;
    color: var(--muted);
    letter-spacing: .06em;
    display: flex;
    align-items: center;
    gap: .5rem;
  }
  .card-byline::before {
    content: '';
    display: block;
    width: 18px;
    height: 1.5px;
    background: var(--rule);
  }
  .card-arrow {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    font-size: 1.1rem;
    color: var(--rule);
    transition: color .18s, transform .18s;
  }
  .card:hover .card-arrow { color: var(--accent); transform: translate(3px,-3px); }

  /* ── SIDEBAR LAYOUT ── */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 3.5rem;
    align-items: start;
  }
  @media (max-width: 860px) {
    .two-col { grid-template-columns: 1fr; }
    .home-grid { grid-template-columns: 1fr; }
    .home-grid .card:first-child { grid-column: 1; }
  }

  /* ── SIDEBAR ── */
  .sidebar-section { margin-bottom: 2.5rem; }
  .sidebar-heading {
    font-family: var(--mono);
    font-size: .64rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--rule);
    padding-bottom: .5rem;
    margin-bottom: 1rem;
  }
  .sidebar-list { list-style: none; }
  .sidebar-list li {
    padding: .65rem 0;
    border-bottom: 1px dashed var(--rule);
    font-size: .88rem;
    cursor: pointer;
    display: flex;
    align-items: baseline;
    gap: .6rem;
    transition: color .15s;
  }
  .sidebar-list li:hover { color: var(--accent); }
  .sidebar-num {
    font-family: var(--mono);
    font-size: .65rem;
    color: var(--rule);
    min-width: 1.4rem;
  }

  /* ── ARTICLE PAGE ── */
  .article-header {
    max-width: 780px;
    margin: 0 auto 3rem;
    padding-bottom: 2.5rem;
    border-bottom: 3px double var(--rule);
  }
  .article-tag {
    font-family: var(--mono);
    font-size: .65rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
  }
  .article-title {
    font-family: var(--serif);
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -.02em;
    margin-bottom: 1.2rem;
  }
  .article-title em { font-style: italic; color: var(--accent); }
  .article-deck {
    font-size: 1.1rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-style: italic;
  }
  .article-meta {
    font-family: var(--mono);
    font-size: .65rem;
    letter-spacing: .08em;
    color: var(--muted);
    display: flex;
    gap: 1.5rem;
  }
  .article-meta span { display: flex; align-items: center; gap: .35rem; }

  .article-body {
    max-width: 680px;
    margin: 0 auto;
  }
  .article-body p { margin-bottom: 1.5rem; }
  .article-body h2 {
    font-family: var(--serif);
    font-size: 1.5rem;
    font-weight: 700;
    margin: 2.5rem 0 1rem;
    padding-left: 1rem;
    border-left: 3px solid var(--accent);
  }
  .article-body blockquote {
    margin: 2rem 0;
    padding: 1.5rem 2rem;
    background: var(--cream);
    border-left: 4px solid var(--gold);
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.15rem;
    line-height: 1.55;
    color: var(--ink);
  }
  .article-body blockquote cite {
    display: block;
    margin-top: .75rem;
    font-family: var(--mono);
    font-size: .65rem;
    font-style: normal;
    letter-spacing: .1em;
    color: var(--muted);
  }
  .article-body ul, .article-body ol {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .article-body li { margin-bottom: .4rem; }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-family: var(--mono);
    font-size: .68rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 2.5rem;
    padding: 0;
    transition: color .15s;
  }
  .back-btn:hover { color: var(--accent); }

  /* ── ABOUT PAGE ── */
  .about-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    margin-bottom: 4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid var(--rule);
  }
  @media (max-width: 700px) { .about-hero { grid-template-columns: 1fr; } }
  .about-big {
    font-family: var(--serif);
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -.02em;
  }
  .about-big em { font-style: italic; color: var(--accent); }
  .about-text { font-size: 1rem; line-height: 1.8; color: var(--muted); }
  .about-text p { margin-bottom: 1.2rem; }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: var(--rule);
    border: 1.5px solid var(--rule);
    margin-bottom: 4rem;
  }
  @media (max-width: 700px) { .values-grid { grid-template-columns: 1fr; } }
  .value-item {
    background: var(--paper);
    padding: 2rem 1.8rem;
    transition: background .18s;
  }
  .value-item:hover { background: var(--cream); }
  .value-num {
    font-family: var(--mono);
    font-size: 2.5rem;
    font-weight: 300;
    color: var(--rule);
    line-height: 1;
    margin-bottom: .75rem;
  }
  .value-label {
    font-family: var(--serif);
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: .5rem;
  }
  .value-desc { font-size: .88rem; color: var(--muted); line-height: 1.65; }

  /* ── CATEGORIES ── */
  .cat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5px;
    background: var(--rule);
    border: 1.5px solid var(--rule);
  }
  .cat-item {
    background: var(--paper);
    padding: 2rem;
    cursor: pointer;
    transition: background .18s;
    position: relative;
    overflow: hidden;
  }
  .cat-item::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .25s var(--ease);
    z-index: 0;
  }
  .cat-item:hover::after { transform: scaleX(1); }
  .cat-item:hover .cat-name,
  .cat-item:hover .cat-count { color: var(--paper); position: relative; z-index: 1; }
  .cat-name {
    font-family: var(--serif);
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: .35rem;
    position: relative; z-index: 1;
    transition: color .25s;
  }
  .cat-count {
    font-family: var(--mono);
    font-size: .65rem;
    letter-spacing: .12em;
    color: var(--muted);
    position: relative; z-index: 1;
    transition: color .25s;
  }

  /* ── SEARCH PAGE ── */
  .search-bar {
    display: flex;
    align-items: stretch;
    border: 2px solid var(--ink);
    margin-bottom: 3rem;
    transition: border-color .2s;
  }
  .search-bar:focus-within { border-color: var(--accent); }
  .search-input {
    flex: 1;
    padding: 1rem 1.2rem;
    font-family: var(--serif);
    font-size: 1.15rem;
    background: transparent;
    border: none;
    outline: none;
    color: var(--ink);
  }
  .search-input::placeholder { color: var(--rule); }
  .search-btn {
    padding: 0 1.5rem;
    background: var(--ink);
    color: var(--paper);
    border: none;
    font-family: var(--mono);
    font-size: .7rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background .2s;
  }
  .search-btn:hover { background: var(--accent); }

  .search-results-count {
    font-family: var(--mono);
    font-size: .7rem;
    letter-spacing: .1em;
    color: var(--muted);
    margin-bottom: 1.5rem;
    padding-bottom: .75rem;
    border-bottom: 1px solid var(--rule);
  }

  .result-item {
    padding: 1.5rem 0;
    border-bottom: 1px dashed var(--rule);
    cursor: pointer;
    transition: padding-left .18s var(--ease);
  }
  .result-item:hover { padding-left: .75rem; }
  .result-tag {
    font-family: var(--mono);
    font-size: .62rem;
    letter-spacing: .15em;
    color: var(--accent);
    margin-bottom: .35rem;
  }
  .result-title {
    font-family: var(--serif);
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: .35rem;
  }
  .result-excerpt { font-size: .88rem; color: var(--muted); }
  mark {
    background: rgba(200,57,43,.15);
    color: var(--accent);
    padding: 0 2px;
    border-radius: 2px;
  }

  /* ── FOOTER ── */
  .footer {
    background: var(--ink);
    color: var(--paper);
    padding: 3rem clamp(1.5rem,5vw,4rem);
    margin-top: 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    border-top: 3px solid var(--accent);
  }
  @media (max-width: 700px) { .footer { grid-template-columns: 1fr; } }
  .footer-brand {
    font-family: var(--serif);
    font-size: 1.8rem;
    font-weight: 900;
    margin-bottom: .5rem;
  }
  .footer-brand span { color: var(--accent); }
  .footer-tagline { font-size: .85rem; color: var(--muted); line-height: 1.6; }
  .footer-heading {
    font-family: var(--mono);
    font-size: .62rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
  }
  .footer-links { list-style: none; }
  .footer-links li {
    padding: .35rem 0;
    font-size: .88rem;
    color: var(--muted);
    cursor: pointer;
    transition: color .15s;
  }
  .footer-links li:hover { color: var(--paper); }
  .footer-copy {
    grid-column: 1/-1;
    border-top: 1px solid #333;
    padding-top: 1.5rem;
    font-family: var(--mono);
    font-size: .62rem;
    color: #555;
    letter-spacing: .08em;
    display: flex;
    justify-content: space-between;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp .55s var(--ease) both; }
  .fade-up-1 { animation-delay: .05s; }
  .fade-up-2 { animation-delay: .12s; }
  .fade-up-3 { animation-delay: .19s; }
  .fade-up-4 { animation-delay: .26s; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 28s linear infinite;
    gap: 3rem;
  }
  .marquee-wrap { overflow: hidden; flex: 1; }

  /* ── SCROLL PROGRESS ── */
  .scroll-progress {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: var(--accent);
    z-index: 200;
    transition: width .1s linear;
  }

  /* ── READ TIME BADGE ── */
  .read-badge {
    display: inline-block;
    background: var(--ink);
    color: var(--paper);
    font-family: var(--mono);
    font-size: .6rem;
    letter-spacing: .1em;
    padding: .25rem .6rem;
    margin-left: .75rem;
    vertical-align: middle;
  }

  /* ── NEWSLETTER ── */
  .newsletter {
    background: var(--cream);
    border: 1.5px solid var(--rule);
    padding: 2rem;
    text-align: center;
    margin-top: 2.5rem;
  }
  .newsletter h3 {
    font-family: var(--serif);
    font-size: 1.4rem;
    margin-bottom: .5rem;
  }
  .newsletter p { font-size: .88rem; color: var(--muted); margin-bottom: 1.2rem; }
  .nl-row { display: flex; gap: 0; }
  .nl-input {
    flex: 1;
    padding: .7rem 1rem;
    border: 1.5px solid var(--rule);
    border-right: none;
    font-family: var(--body);
    font-size: .9rem;
    background: var(--paper);
    outline: none;
    color: var(--ink);
  }
  .nl-btn {
    padding: .7rem 1.2rem;
    background: var(--ink);
    color: var(--paper);
    border: 1.5px solid var(--ink);
    font-family: var(--mono);
    font-size: .65rem;
    letter-spacing: .1em;
    cursor: pointer;
    transition: background .2s;
  }
  .nl-btn:hover { background: var(--accent); border-color: var(--accent); }

  /* ── TOC (article) ── */
  .toc {
    background: var(--cream);
    border: 1px solid var(--rule);
    padding: 1.25rem 1.5rem;
    margin-bottom: 2.5rem;
  }
  .toc-title {
    font-family: var(--mono);
    font-size: .65rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: .75rem;
  }
  .toc ol { padding-left: 1.2rem; }
  .toc li {
    font-size: .88rem;
    margin-bottom: .3rem;
    color: var(--muted);
    cursor: pointer;
    transition: color .15s;
  }
  .toc li:hover { color: var(--accent); }
`;

// ── DATA ────────────────────────────────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    tag: "Essay",
    title: "The Quiet Revolution in How We Read",
    deck: "Long-form journalism was supposed to die. Instead, it's having its most interesting decade yet.",
    excerpt: "Every few years, someone publishes the obituary of serious reading. Yet here we are, navigating an era of remarkable literary ambition.",
    author: "E. Whitmore",
    date: "March 10, 2026",
    readTime: "8 min",
    category: "Culture",
    body: [
      { type: "p", text: "Every few years, someone publishes the obituary of serious reading. Attention spans are collapsing, screens are winning, the novel is dead—we've heard the eulogy so many times it has become its own genre. Yet here we are, navigating an era of remarkable literary ambition, where independent magazines are thriving, substacks build communities of millions, and audio formats have introduced literature to ears that never met books." },
      { type: "h2", text: "The Attention Economy's Counterculture" },
      { type: "p", text: "The paradox of our moment is that distraction and depth coexist with unusual intensity. The same device that pulverizes concentration into a thousand notifications is also the place where readers discover 10,000-word essays about niche topics and spend hours lost in a thread that spirals into genuine insight." },
      { type: "blockquote", text: "Reading is the sole means by which we slip, involuntarily, often helplessly, into another's skin, another's voice, another's soul.", cite: "— Joyce Carol Oates" },
      { type: "h2", text: "What Survived the Disruption" },
      { type: "p", text: "Print journalism shed its most expensive habits — the physical plant, the massive distribution networks, the classified advertising empires — and was left, sometimes painfully, with what it actually was: sentences, ideas, and the trust of readers. That trust, it turns out, travels well across formats." },
      { type: "ul", items: ["Long-form journalism is experiencing a renaissance in digital form", "Independent writers are finding sustainable audiences without legacy infrastructure", "Audio adaptations have expanded the reach of written work significantly", "Subscription models reward depth over volume of output"] },
      { type: "p", text: "The publications that survived the past two decades of disruption did so not by becoming something new, but by becoming more intensely themselves. Stripping away everything that was merely a product of historical accident — the newsprint, the delivery trucks, the department stores buying full-page ads — they found the thing that readers actually wanted, which was the same thing readers have always wanted: someone who knows more than they do, explaining things with clarity and wit." },
    ]
  },
  {
    id: 2,
    tag: "Technology",
    title: "Against the Algorithm",
    deck: "What happens to art when its audience is selected by machine?",
    excerpt: "The recommendation engine has become the primary curator of cultural life. This should disturb us more than it does.",
    author: "T. Nakamura",
    date: "March 8, 2026",
    readTime: "6 min",
    category: "Technology",
    body: [
      { type: "p", text: "The recommendation engine has become the primary curator of cultural life. Spotify tells us what to hear next. Netflix predicts what we'll watch. The algorithm stands between the artist and the audience, deciding what gets surfaced and what disappears into the long tail of digital oblivion. This should disturb us more than it does." },
      { type: "h2", text: "The Feedback Loop" },
      { type: "p", text: "What concerns those who think carefully about algorithmic curation isn't that the machines have bad taste. It's that taste, in the traditional sense, may be exactly what they're optimizing away from. Taste implies a willingness to be surprised, to be initially resistant, to have an experience that starts with confusion or discomfort and ends somewhere unexpected." },
      { type: "blockquote", text: "The most valuable thing a curator can do is introduce you to something you didn't know you wanted.", cite: "— Anonymous" },
      { type: "p", text: "Algorithms, trained on engagement metrics, optimize for the opposite: immediate recognition, the comfortable feeling of receiving something close to what you already like. This is useful for selling things. It is less useful for the development of an interior life." },
    ]
  },
  {
    id: 3,
    tag: "Design",
    title: "The Typography of Thinking",
    deck: "How fonts shape thought, and the designers who understand this too well.",
    excerpt: "A typeface is never just a container for words. It is a voice, a posture, a set of claims about what matters.",
    author: "C. Bellerose",
    date: "March 6, 2026",
    readTime: "5 min",
    category: "Design",
    body: [
      { type: "p", text: "A typeface is never just a container for words. It is a voice, a posture, a set of claims about what matters and how it should be delivered. To set a legal document in Comic Sans is not merely bad taste; it is a statement about the seriousness with which the drafter regards their work. To set a love letter in Helvetica is to say something specific about the kind of love being expressed — cool, considered, slightly corporate." },
      { type: "h2", text: "The Weight of Letters" },
      { type: "p", text: "Typography is the most invisible of the visual arts. When it succeeds, it disappears entirely, leaving only the meaning. When it fails, it announces itself — suddenly you see the font rather than the words, the container rather than the contents. The great typographers understood that this invisibility was the goal, and that achieving it required extraordinary craft." },
      { type: "blockquote", text: "Typography is what language looks like.", cite: "— Ellen Lupton" },
    ]
  },
  {
    id: 4,
    tag: "Interview",
    title: "Making Things That Last",
    deck: "A conversation with the maker who still uses a 1962 letterpress.",
    excerpt: "In an era of digital reproduction, the appeal of objects that bear the mark of their making has never been stronger.",
    author: "Staff",
    date: "March 4, 2026",
    readTime: "10 min",
    category: "Craft",
    body: [
      { type: "p", text: "In an era of digital reproduction, the appeal of objects that bear the mark of their making has never been stronger. The slight unevenness of a letterpress impression, the texture of hand-thrown pottery, the variation in a hand-knit garment — these imperfections are not bugs to be corrected but evidence of human presence, the thing that distinguishes an artifact from a product." },
      { type: "h2", text: "On Slowness" },
      { type: "p", text: "There's a rhythm to working with the letterpress that you simply cannot rush. The machine has its own tempo, and you either find yourself within it or you're fighting it constantly. Most beginners fight it. That's actually useful — it teaches you something about your own impatience, your assumptions about how fast things should go." },
      { type: "ul", items: ["The press was manufactured in 1962 in Stuttgart", "It prints a maximum of 800 sheets per hour when operating correctly", "The current owner has declined multiple offers from collectors", "Each job requires hand-setting individual metal type"] },
    ]
  },
];

const CATEGORIES = [
  { name: "Culture", count: 24 },
  { name: "Technology", count: 18 },
  { name: "Design", count: 15 },
  { name: "Essay", count: 31 },
  { name: "Craft", count: 9 },
  { name: "Interview", count: 12 },
];

// ── SCROLL PROGRESS ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(pct);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const links = ["home", "categories", "search", "about"];
  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => setPage("home")}>
        THE <span>MARGIN</span>
      </button>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <button
              className={page === l ? "active" : ""}
              onClick={() => setPage(l)}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>
      <span className="nav-issue">Vol. XII · No. 4</span>
    </nav>
  );
}

// ── MASTHEAD ─────────────────────────────────────────────────────────────────
function Masthead() {
  return (
    <header className="masthead fade-up">
      <div>
        <h1 className="masthead-title">
          The<br /><em>Margin</em>
        </h1>
      </div>
      <div className="masthead-meta">
        <div>Est. 2014</div>
        <div>Independent</div>
        <div>Since Issue I</div>
        <div>{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
      </div>
      <hr className="masthead-rule" />
    </header>
  );
}

// ── FEATURED STRIP ────────────────────────────────────────────────────────────
function FeaturedStrip() {
  const items = [
    "NOW READING: The Quiet Revolution in How We Read",
    "NEW ESSAY: Against the Algorithm",
    "INTERVIEW: Making Things That Last",
    "DESIGN: The Typography of Thinking",
  ];
  const repeated = [...items, ...items];
  return (
    <div className="featured-strip">
      <span className="featured-label">Latest</span>
      <div className="marquee-wrap">
        <div className="marquee-track">
          {repeated.map((item, i) => (
            <span key={i} className="featured-ticker">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CARD ─────────────────────────────────────────────────────────────────────
function Card({ post, onClick }) {
  return (
    <article className="card" onClick={() => onClick(post)}>
      <div className="card-tag">{post.tag}</div>
      <h2 className="card-title">{post.title}</h2>
      <p className="card-excerpt">{post.excerpt}</p>
      <div className="card-byline">{post.author} · {post.date}</div>
      <span className="card-arrow">↗</span>
    </article>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ posts, onSelect }) {
  return (
    <aside>
      <div className="sidebar-section">
        <div className="sidebar-heading">Most Read</div>
        <ul className="sidebar-list">
          {posts.map((p, i) => (
            <li key={p.id} onClick={() => onSelect(p)}>
              <span className="sidebar-num">0{i + 1}</span>
              {p.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-heading">Tags</div>
        <ul className="sidebar-list">
          {CATEGORIES.slice(0, 5).map(c => (
            <li key={c.name}>
              <span className="sidebar-num">{c.count}</span>
              {c.name}
            </li>
          ))}
        </ul>
      </div>
      <Newsletter />
    </aside>
  );
}

// ── NEWSLETTER ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (email.includes("@")) { setSent(true); }
    else { inputRef.current?.focus(); }
  };

  return (
    <div className="newsletter">
      <h3>The Weekly Margin</h3>
      {sent ? (
        <p style={{ color: "var(--accent)" }}>You're on the list. Thank you.</p>
      ) : (
        <>
          <p>One essay, once a week. No noise.</p>
          <div className="nl-row">
            <input
              ref={inputRef}
              className="nl-input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            <button className="nl-btn" onClick={handleSubmit}>Subscribe</button>
          </div>
        </>
      )}
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage, setCurrentPost }) {
  const handleSelect = post => { setCurrentPost(post); setPage("article"); };
  return (
    <div className="page">
      <Masthead />
      <FeaturedStrip />
      <br /><br />
      <div className="two-col">
        <main>
          <div className="home-grid fade-up fade-up-2">
            {POSTS.map(p => <Card key={p.id} post={p} onClick={handleSelect} />)}
          </div>
        </main>
        <Sidebar posts={POSTS} onSelect={handleSelect} />
      </div>
    </div>
  );
}

// ── ARTICLE PAGE ──────────────────────────────────────────────────────────────
function ArticlePage({ post, setPage }) {
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [post]);

  const headings = post.body.filter(b => b.type === "h2").map(b => b.text);

  const scrollToHeading = (text) => {
    const all = document.querySelectorAll(".article-body h2");
    all.forEach(el => { if (el.textContent === text) el.scrollIntoView({ behavior: "smooth", block: "start" }); });
  };

  return (
    <div className="page" ref={topRef}>
      <button className="back-btn" onClick={() => setPage("home")}>← Back to all stories</button>
      <div className="article-header fade-up">
        <div className="article-tag">{post.tag} <span className="read-badge">{post.readTime} read</span></div>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-deck">{post.deck}</p>
        <div className="article-meta">
          <span>✍ {post.author}</span>
          <span>📅 {post.date}</span>
          <span>🗂 {post.category}</span>
        </div>
      </div>

      {headings.length > 0 && (
        <div className="article-body fade-up fade-up-1">
          <div className="toc">
            <div className="toc-title">In this piece</div>
            <ol>{headings.map((h, i) => <li key={i} onClick={() => scrollToHeading(h)}>{h}</li>)}</ol>
          </div>
        </div>
      )}

      <div className="article-body fade-up fade-up-2">
        {post.body.map((block, i) => {
          if (block.type === "p") return <p key={i}>{block.text}</p>;
          if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
          if (block.type === "blockquote") return (
            <blockquote key={i}>{block.text}<cite>{block.cite}</cite></blockquote>
          );
          if (block.type === "ul") return (
            <ul key={i}>{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          );
          return null;
        })}
      </div>
    </div>
  );
}

// ── CATEGORIES PAGE ───────────────────────────────────────────────────────────
function CategoriesPage({ setPage, setCurrentPost }) {
  return (
    <div className="page">
      <div style={{ marginBottom: "2.5rem" }} className="fade-up">
        <div style={{ fontFamily: "var(--mono)", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: ".75rem" }}>Browse by Category</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em" }}>
          Every subject<br />we cover
        </h1>
      </div>
      <div className="cat-grid fade-up fade-up-1">
        {CATEGORIES.map(c => (
          <div key={c.name} className="cat-item">
            <div className="cat-name">{c.name}</div>
            <div className="cat-count">{c.count} articles</div>
          </div>
        ))}
      </div>
      <br /><br />
      <div style={{ fontFamily: "var(--mono)", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem", borderBottom: "1px solid var(--rule)", paddingBottom: ".5rem" }}>
        Latest across all categories
      </div>
      <div style={{ display: "grid", gap: "0", border: "1px solid var(--rule)" }}>
        {POSTS.map(p => (
          <div key={p.id} className="result-item" style={{ padding: "1.5rem", borderBottom: "1px dashed var(--rule)" }}
            onClick={() => { setCurrentPost(p); setPage("article"); }}>
            <div className="result-tag">{p.tag} · {p.category}</div>
            <div className="result-title">{p.title}</div>
            <div className="result-excerpt">{p.excerpt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SEARCH PAGE ───────────────────────────────────────────────────────────────
function SearchPage({ setPage, setCurrentPost }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const highlight = (text, q) => {
    if (!q) return text;
    const re = new RegExp(`(${q})`, "gi");
    return text.split(re).map((part, i) =>
      re.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  const search = useCallback((q) => {
    const lower = q.toLowerCase().trim();
    if (!lower) { setResults([]); return; }
    setResults(POSTS.filter(p =>
      p.title.toLowerCase().includes(lower) ||
      p.excerpt.toLowerCase().includes(lower) ||
      p.tag.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
    ));
  }, []);

  const handleChange = (e) => { setQuery(e.target.value); search(e.target.value); };

  return (
    <div className="page">
      <div style={{ marginBottom: "2rem" }} className="fade-up">
        <div style={{ fontFamily: "var(--mono)", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: ".75rem" }}>Search</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "1.5rem" }}>Find what<br />you're after</h1>
        <div className="search-bar">
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search essays, topics, authors…"
            value={query}
            onChange={handleChange}
            onKeyDown={e => e.key === "Enter" && search(query)}
          />
          <button className="search-btn" onClick={() => search(query)}>Search</button>
        </div>
      </div>
      {query && (
        <div className="search-results-count fade-up">
          {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
        </div>
      )}
      <div className="fade-up fade-up-1">
        {results.map(r => (
          <div key={r.id} className="result-item" onClick={() => { setCurrentPost(r); setPage("article"); }}>
            <div className="result-tag">{r.tag} · {r.category}</div>
            <div className="result-title">{highlight(r.title, query)}</div>
            <div className="result-excerpt">{highlight(r.excerpt, query)}</div>
          </div>
        ))}
        {query && results.length === 0 && (
          <p style={{ color: "var(--muted)", fontStyle: "italic", padding: "2rem 0" }}>No results found. Try a different term.</p>
        )}
        {!query && (
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>Suggested searches</div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              {["essay", "technology", "design", "culture", "craft"].map(s => (
                <button key={s} onClick={() => { setQuery(s); search(s); }}
                  style={{ fontFamily: "var(--mono)", fontSize: ".65rem", letterSpacing: ".1em", padding: ".4rem .8rem", border: "1px solid var(--rule)", background: "none", cursor: "pointer", textTransform: "uppercase", transition: "all .15s" }}
                  onMouseOver={e => { e.target.style.background = "var(--ink)"; e.target.style.color = "var(--paper)"; }}
                  onMouseOut={e => { e.target.style.background = "none"; e.target.style.color = ""; }}
                >{s}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage() {
  const missionRef = useRef(null);
  const values = [
    { num: "01", label: "Depth over volume", desc: "We publish fewer pieces than most. Each one is meant to reward your time." },
    { num: "02", label: "Voice over formula", desc: "Our writers are given the space to develop a distinctive perspective, not just fill a template." },
    { num: "03", label: "Permanence", desc: "We're not chasing clicks. We're trying to publish work that holds up five years from now." },
  ];
  return (
    <div className="page">
      <div className="about-hero fade-up">
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>Who We Are</div>
          <h1 className="about-big">We write<br /><em>things</em><br />that last.</h1>
        </div>
        <div className="about-text">
          <p>The Margin was founded in 2014 with a straightforward premise: that there was an audience for serious writing about culture, technology, and design that didn't treat its readers as pageview metrics.</p>
          <p>We were right about the audience. We were wrong about how hard it would be to build the infrastructure to serve them. We spent years figuring out the model, and we're still figuring it out.</p>
          <p>What we know for certain is that the work matters. Every piece we publish is an argument that careful attention, deployed with care and wit, can still find readers who care.</p>
        </div>
      </div>
      <div className="values-grid fade-up fade-up-1">
        {values.map(v => (
          <div key={v.num} className="value-item">
            <div className="value-num">{v.num}</div>
            <div className="value-label">{v.label}</div>
            <div className="value-desc">{v.desc}</div>
          </div>
        ))}
      </div>
      <div ref={missionRef} style={{ maxWidth: 680 }} className="fade-up fade-up-2">
        <div style={{ fontFamily: "var(--mono)", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem", borderBottom: "1px solid var(--rule)", paddingBottom: ".5rem" }}>Our Editorial Mission</div>
        <p style={{ marginBottom: "1.5rem" }}>The Margin publishes essays, criticism, interviews, and reported pieces about the intersection of culture, technology, and design. We're particularly interested in work that takes a position — that argues for something, rather than simply describing it.</p>
        <p style={{ marginBottom: "1.5rem" }}>We pay writers, commission photography, and take months on our longer pieces. We think this matters, not for sentimental reasons, but because the quality of the attention that goes into making something is usually visible in the final work.</p>
        <blockquote style={{ background: "var(--cream)", borderLeft: "4px solid var(--gold)", padding: "1.25rem 1.5rem", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.05rem", margin: "2rem 0", lineHeight: 1.55 }}>
          The margin is the most interesting part of any page — it's where the reader talks back to the text.
          <cite style={{ display: "block", marginTop: ".6rem", fontFamily: "var(--mono)", fontSize: ".62rem", fontStyle: "normal", letterSpacing: ".1em", color: "var(--muted)" }}>— Editor's Note, Issue I, 2014</cite>
        </blockquote>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div>
        <div className="footer-brand">THE <span>MARGIN</span></div>
        <div className="footer-tagline">Independent writing on culture, technology, and design. Published since 2014.</div>
      </div>
      <div>
        <div className="footer-heading">Navigate</div>
        <ul className="footer-links">
          {["home","categories","search","about"].map(l => (
            <li key={l} onClick={() => setPage(l)}>{l.charAt(0).toUpperCase() + l.slice(1)}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="footer-heading">Subscribe</div>
        <ul className="footer-links">
          <li>Weekly newsletter</li>
          <li>RSS feed</li>
          <li>Podcast</li>
          <li>Print edition</li>
        </ul>
      </div>
      <div className="footer-copy">
        <span>© 2026 The Margin. All rights reserved.</span>
        <span>Made with care · Vol. XII</span>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [currentPost, setCurrentPost] = useState(null);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{CSS}</style>
      <ScrollProgress />
      <Nav page={page} setPage={navigate} />
      {page === "home" && <HomePage setPage={navigate} setCurrentPost={setCurrentPost} />}
      {page === "article" && currentPost && <ArticlePage post={currentPost} setPage={navigate} />}
      {page === "categories" && <CategoriesPage setPage={navigate} setCurrentPost={setCurrentPost} />}
      {page === "search" && <SearchPage setPage={navigate} setCurrentPost={setCurrentPost} />}
      {page === "about" && <AboutPage />}
      <Footer setPage={navigate} />
    </>
  );
}
/* ============================================================
   SITE CONFIG — edit THIS file to change the site's content.
   Nothing else needs touching: cards, thumbnails and the
   lightbox all build themselves from what's below.
   YouTube links work in any form: watch?v= / youtu.be / shorts/
   ============================================================ */

const SITE = {

  // Hero photo: a TIGHT transparent-cutout PNG (no padding around the person)
  heroImage: "./assets/me.png",

  // Showreel (the big 16:9 player)
  showreel: "https://www.youtube.com/watch?v=DvJShM2QbNk",

  // 9:16 vertical cards — "Shorts & Reels" section
  shorts: [
    {
      title: "Esports LAN Promo",
      category: "EVENT HYPE / PROMO",
      video: "https://www.youtube.com/shorts/PeiR6RK3jTw",
    },
    {
      title: "Squad Wipe Clip",
      category: "FAST CUTS / IMPACT SYNC",
      video: "https://www.youtube.com/shorts/mcr0OLbzMNE",
    },
    {
      title: "Stream Highlights",
      category: "HOOK-FIRST CUTS",
      video: "https://www.youtube.com/shorts/41AwgkJtYoM",
    },
    {
      title: "Street Food Vlog",
      category: "VLOG / BANGLA NARRATION",
      video: "https://www.youtube.com/shorts/MNkhjQahDkk",
    },
  ],

  // 16:9 horizontal cards — "YouTube & Brand Films" section
  films: [
    {
      title: "Headset Review — G435",
      category: "PRODUCT / REVIEW EDIT",
      video: "https://www.youtube.com/watch?v=vwvOkgTn_Ng",
    },
    {
      title: "Sniper Shots Montage",
      category: "FAST CUTS / SFX SYNC",
      video: "https://www.youtube.com/watch?v=wCH9uQg_slY",
    },
    {
      title: "PUBG.EXE — Funny Moments",
      category: "MEME EDIT / COMEDY TIMING",
      video: "https://www.youtube.com/watch?v=Zf9kP-lQ2hM",
    },
  ],

  // Client reviews — the scrolling marquee.
  // image: optional photo URL (e.g. "./assets/client1.jpg"); leave "" to
  // show the initial letter on a gradient circle instead.
  reviews: [
    {
      quote: "Replace this with a real client quote — even one from a small first project counts more than a perfect fake one.",
      name: "Client Name",
      role: "YOUTUBE CREATOR",
      initial: "C",
      image: "",
      stars: 5,
    },
    {
      quote: "Ask every client for one sentence of feedback at delivery. Three short real quotes beat ten invented ones.",
      name: "Client Name",
      role: "BRAND MANAGER",
      initial: "B",
      image: "",
      stars: 5,
    },
    {
      quote: "Specific results land hardest — \"this Short got 40K views\" says more than \"great editor, fast delivery.\"",
      name: "Client Name",
      role: "PODCAST HOST",
      initial: "A",
      image: "",
      stars: 5,
    },
  ],

};

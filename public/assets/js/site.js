{
  /* ---------- Produtos (edite aqui: nome, descrição, foto, link) ---------- */
  const products = [
    // img = foto principal do produto; hover = foto que aparece ao passar o mouse
    { name: "Gloss Labial 01 Berry", desc: "Vermelho · 5,5 g", img: "assets/img/gloss-berry-mao.jpg", pos: "50% 45%", hover: "assets/img/modelo-gloss-berry.jpg", hpos: "50% 40%" },
    { name: "Gloss Labial 02 Chocolate", desc: "Marrom cintilante · 5,5 g", img: "assets/img/gloss-chocolate-mao.jpg", pos: "55% 45%", hover: "assets/img/chocolate-aplicacao.jpg", hpos: "50% 12%" },
    { name: "Gloss Labial 03 Prisma", desc: "Azul cintilante · 5,5 g", img: "assets/img/gloss-prisma-mao.jpg", pos: "50% 50%", hover: "assets/img/modelo-gloss-prisma.jpg", hpos: "50% 60%" },
    { name: "Glam'mor Intense", desc: "Eau de Parfum · 100 ml", img: "assets/img/glammor-maos-2.jpg", pos: "50% 50%", hover: "assets/img/modelo-glammor-spray.jpg", hpos: "45% 35%" },
    { name: "Celina", desc: "Eau de Parfum · 75 ml", img: "assets/img/celina-detalhe.jpg", pos: "50% 65%", hover: "assets/img/celina-modelo-1.jpg", hpos: "50% 28%" }
  ];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const grid = document.getElementById("grid");
  grid.innerHTML = products.map((p) => `
    <article class="card reveal">
      <div class="card__media">
        <img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy" style="object-position:${esc(p.pos)}">
        ${p.hover ? `<img class="card__hover" src="${esc(p.hover)}" alt="" loading="lazy" style="object-position:${esc(p.hpos)}">` : ""}
      </div>
      <h3 class="t-small">${esc(p.name)}</h3>
      <p class="card__desc">${esc(p.desc)}</p>
      <a href="#" class="btn-link btn-link--underline">Comprar</a>
    </article>`).join("");

  /* ---------- Revelar ao rolar ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add("is-in"), i * 120);
      revealObserver.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Gavetas do tríptico ---------- */
  document.querySelectorAll("[data-drawer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const d = document.getElementById(btn.dataset.drawer);
      if (d && d.showModal) d.showModal();
    });
  });
  document.querySelectorAll("dialog.drawer").forEach((d) => {
    d.querySelector("[data-close]").addEventListener("click", () => d.close());
    d.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => d.close()));
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
  });


  /* ---------- HERO: filmes em sequência (sem som; botão para ativar) ---------- */
  const clips = [
    { src: "assets/video/gloss.mp4", poster: "assets/img/poster-gloss.jpg" },
    { src: "assets/video/celina.mp4", poster: "assets/img/poster-celina.jpg" },
    { src: "assets/video/intense.mp4", poster: "assets/img/poster-intense.jpg" }
  ];
  const hero = document.getElementById("hero");
  const layers = [...hero.querySelectorAll("video")];
  const chapters = [...hero.querySelectorAll(".chapter")];
  const pauseBtn = document.getElementById("hero-pause");
  const soundBtn = document.getElementById("hero-sound");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = 0, idx = 0, muted = true, paused = reduce, inView = true;
  const setIcon = (btn, id, label) => { btn.querySelector("use").setAttribute("href", id); btn.setAttribute("aria-label", label); };
  const showChapter = () => chapters.forEach((c, i) => {
    c.classList.toggle("is-on", i === idx);
    c.querySelector("i").style.width = i < idx ? "100%" : "0";
  });
  const tryPlay = (v) => { if (!paused && inView) v.play().catch(() => {}); };
  const load = (v, n) => { v.src = clips[n].src; v.poster = clips[n].poster; v.muted = muted; v.currentTime = 0; };
  const goTo = (n) => {
    const prev = layers[active];
    active = 1 - active;
    idx = (n + clips.length) % clips.length;
    const next = layers[active];
    load(next, idx);
    next.classList.add("on"); next.removeAttribute("aria-hidden");
    prev.classList.remove("on"); prev.setAttribute("aria-hidden", "true");
    setTimeout(() => prev.pause(), 1000);
    showChapter(); tryPlay(next);
  };
  load(layers[0], 0); showChapter(); tryPlay(layers[0]);
  layers.forEach((v) => {
    v.addEventListener("ended", () => { if (v === layers[active]) goTo(idx + 1); });
    v.addEventListener("timeupdate", () => {
      if (v !== layers[active] || !v.duration) return;
      chapters[idx].querySelector("i").style.width = (v.currentTime / v.duration * 100) + "%";
    });
  });
  chapters.forEach((c) => c.addEventListener("click", () => { paused = false; setIcon(pauseBtn, "#i-pause", "Pausar vídeo"); goTo(Number(c.dataset.i)); }));
  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    if (paused) { layers[active].pause(); setIcon(pauseBtn, "#i-play", "Reproduzir vídeo"); }
    else { setIcon(pauseBtn, "#i-pause", "Pausar vídeo"); tryPlay(layers[active]); }
  });
  soundBtn.addEventListener("click", () => {
    muted = !muted;
    layers.forEach((v) => { v.muted = muted; });
    setIcon(soundBtn, muted ? "#i-sound-off" : "#i-sound-on", muted ? "Ativar som" : "Desativar som");
  });
  if (reduce) setIcon(pauseBtn, "#i-play", "Reproduzir vídeo");
  const heroObserver = new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView) tryPlay(layers[active]); else layers[active].pause();
  }, { threshold: 0.2 });
  heroObserver.observe(hero);

  /* ---------- Filme narrado ---------- */
  const film = document.getElementById("film-video");
  const filmCover = document.getElementById("film-play");
  filmCover.addEventListener("click", () => {
    filmCover.hidden = true;
    film.controls = true;
    film.play().catch(() => {});
    if (!muted) soundBtn.click();
  });
  film.addEventListener("ended", () => { filmCover.hidden = false; film.controls = false; });

  /* ---------- Faixas de vídeo: tocam só quando visíveis ---------- */
  const loopObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting && !reduce) { if (v.preload === "none") v.preload = "auto"; v.play().catch(() => {}); }
      else v.pause();
    });
  }, { threshold: 0.25 });
  document.querySelectorAll("video.autoloop").forEach((v) => loopObserver.observe(v));

  /* ---------- Player dos filmes de produto ---------- */
  const player = document.getElementById("player");
  const pv = player.querySelector("video");
  document.querySelectorAll("[data-film]").forEach((b) => {
    b.addEventListener("click", () => {
      pv.src = b.dataset.film;
      if (player.showModal) player.showModal();
      pv.play().catch(() => {});
    });
  });
  player.querySelector("[data-close]").addEventListener("click", () => player.close());
  player.addEventListener("click", (e) => { if (e.target === player) player.close(); });
  player.addEventListener("close", () => { pv.pause(); pv.removeAttribute("src"); pv.load(); });


  /* ---------- Miniaturas: luz dourada contornando o vídeo, no ritmo da reprodução ---------- */
  const thumbs = [...document.querySelectorAll(".vthumb")].map((b) => ({
    b, v: b.querySelector("video"),
    fill: b.querySelector(".vthumb__fill"), glow: b.querySelector(".vthumb__glow")
  }));
  const thumbObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const t = thumbs.find((x) => x.b === e.target);
      if (e.isIntersecting && !reduce) { t.v.preload = "auto"; t.v.play().catch(() => {}); }
      else t.v.pause();
    });
  }, { threshold: 0.3 });
  thumbs.forEach((t) => {
    thumbObserver.observe(t.b);
    t.v.addEventListener("play", () => t.b.classList.add("is-playing"));
    t.v.addEventListener("pause", () => t.b.classList.remove("is-playing"));
  });
  const GLOW = 0.07;
  const ringLoop = () => {
    thumbs.forEach((t) => {
      if (t.v.paused || !t.v.duration) return;
      const p = t.v.currentTime / t.v.duration;
      t.fill.style.strokeDashoffset = 1 - p;
      t.glow.style.strokeDashoffset = GLOW - p;
    });
    requestAnimationFrame(ringLoop);
  };
  if (!reduce) requestAnimationFrame(ringLoop);

  /* ---------- Parallax: a mídia anda mais devagar que a página ---------- */
  const pxItems = [
    ...document.querySelectorAll(".hero__media video, .diptych__media img, .triptych__media img, .wide video")
  ].map((el) => {
    el.classList.add("px");
    return { el, box: el.parentElement, amp: 0.06 };
  });
  let ticking = false;
  const parallax = () => {
    ticking = false;
    const vh = window.innerHeight;
    pxItems.forEach(({ el, box, amp }) => {
      const r = box.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const prog = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      const y = Math.max(-1, Math.min(1, prog)) * r.height * amp;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${1 + amp * 2 + 0.02})`;
    });
  };
  if (!reduce) {
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    parallax();
  }


  /* ---------- Glitter dourado: cintila, faz parallax e brilha mais perto do cursor ---------- */
  const GOLDS = ["205,177,129", "246,227,180", "233,207,149"];
  const mouse = { x: -9999, y: -9999 };
  window.addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") { mouse.x = e.clientX; mouse.y = e.clientY; } }, { passive: true });
  document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  const glitters = [...document.querySelectorAll(".glitter")].map((box) => {
    const c = document.createElement("canvas");
    box.appendChild(c);
    const ctx = c.getContext("2d");
    const g = { box, c, ctx, parts: [], on: false, w: 0, h: 0, ox: 0, oy: 0, hover: 0 };
    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      g.w = box.clientWidth; g.h = box.clientHeight;
      c.width = g.w * dpr; c.height = g.h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(g.w * g.h / 2600);
      g.parts = Array.from({ length: n }, () => ({
        x: Math.random() * g.w, y: Math.random() * g.h,
        z: 0.25 + Math.random() * 0.75,            // profundidade: perto anda mais (parallax)
        r: 0.5 + Math.random() * 1.2,
        col: GOLDS[Math.floor(Math.random() * GOLDS.length)],
        ph: Math.random() * Math.PI * 2, sp: 0.4 + Math.random() * 1.2,
        vy: -(0.02 + Math.random() * 0.08), vx: (Math.random() - 0.5) * 0.04,
        star: Math.random() < 0.12
      }));
    };
    setup();
    window.addEventListener("resize", setup);
    return g;
  });
  const HALO = 120;                                  // raio (px) em que o cursor acende o glitter
  const drawGlitter = (g, t) => {
    const { ctx, w, h } = g;
    const rect = g.box.getBoundingClientRect();
    const mx = mouse.x - rect.left, my = mouse.y - rect.top;
    const inside = mx > -60 && mx < w + 60 && my > -60 && my < h + 60;
    // parallax: segue o cursor (ao contrário) e a rolagem, cada partícula pela sua profundidade
    const tx = inside && !reduce ? (mx - w / 2) * -0.07 : 0;
    const ty = inside && !reduce ? (my - h / 2) * -0.07 : 0;
    g.ox += (tx - g.ox) * 0.07; g.oy += (ty - g.oy) * 0.07;
    g.hover += ((inside ? 1 : 0) - g.hover) * 0.06;
    const scrollShift = reduce ? 0 : (rect.top + h / 2 - window.innerHeight / 2) * -0.06;
    ctx.clearRect(0, 0, w, h);
    if (g.hover > 0.02) {                            // brilho suave em volta do cursor
      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, HALO);
      glow.addColorStop(0, `rgba(205,177,129,${0.10 * g.hover})`);
      glow.addColorStop(1, "rgba(205,177,129,0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
    }
    g.parts.forEach((p) => {
      if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; } }
      const x = p.x + g.ox * p.z;
      const y = p.y + (g.oy + scrollShift) * p.z;
      const tw = reduce ? 0.5 : (Math.sin(t / 1000 * p.sp + p.ph) + 1) / 2;
      const d = Math.hypot(x - mx, y - my);
      const near = g.hover * Math.pow(Math.max(0, 1 - d / HALO), 1.5);   // 0..1, perto do cursor
      const a = Math.min(1, 0.08 + tw * tw * 0.62 + near * 0.75);
      const r = p.r * (1 + near * 1.1);
      ctx.fillStyle = `rgba(${near > 0.3 ? "246,227,180" : p.col},${a})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      const spark = Math.max(p.star ? (tw - 0.82) / 0.18 : 0, near > 0.35 ? near : 0);
      if (spark > 0) {                               // brilho em cruz
        const L = r * (4 + 4 * near) * spark;
        ctx.strokeStyle = `rgba(246,227,180,${a * 0.85})`; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(x - L, y); ctx.lineTo(x + L, y);
        ctx.moveTo(x, y - L); ctx.lineTo(x, y + L); ctx.stroke();
      }
    });
  };
  const glitterObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => { const g = glitters.find((x) => x.box === e.target); g.on = e.isIntersecting; });
  }, { rootMargin: "80px" });
  glitters.forEach((g) => glitterObserver.observe(g.box));
  const mainEl = document.querySelector("main");
  const glitterLoop = (t) => {
    const footerShown = mainEl.getBoundingClientRect().bottom < window.innerHeight;
    glitters.forEach((g) => { if (g.on && (footerShown || !g.box.closest(".footer"))) drawGlitter(g, t); });
    requestAnimationFrame(glitterLoop);
  };
  requestAnimationFrame(glitterLoop);


  /* ---------- Menu: versão clara sobre seções de fundo claro ---------- */
  const subnavEl = document.querySelector(".subnav");
  const lightCheck = () => {
    const r = subnavEl.getBoundingClientRect();
    const under = document.elementsFromPoint(r.left + r.width / 2, r.bottom + 2)
      .find((el) => !subnavEl.contains(el));
    subnavEl.classList.toggle("is-light", !!(under && under.closest(".theme-ivory, .theme-white, .breadcrumb")));
    // some quando o rodapé começa a aparecer (fim da página)
    subnavEl.classList.toggle("is-gone", document.querySelector("main").getBoundingClientRect().bottom < window.innerHeight - 2);
  };
  let navTick = false;
  window.addEventListener("scroll", () => { if (!navTick) { navTick = true; requestAnimationFrame(() => { navTick = false; lightCheck(); }); } }, { passive: true });
  lightCheck();

  /* ---------- Sub-nav: item ativo e seletor mobile ---------- */
  const links = [...document.querySelectorAll(".subnav__item")];
  const select = document.getElementById("subnav-select");
  select.addEventListener("change", () => {
    const t = document.querySelector(select.value);
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = "#" + e.target.id;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
      select.value = id;
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["colecao", "filme", "gloss", "perfumes", "produtos"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  /* ---------- Em cena: painéis que se expandem ----------
     Computador: o painel cresce ao passar o mouse (CSS).
     Toque/teclado: tocar ou apertar Enter abre o painel; no celular o primeiro já começa aberto. */
  const scenes = [...document.querySelectorAll(".scene")];
  const openScene = (el) => scenes.forEach((s) => s.classList.toggle("is-open", s === el));
  scenes.forEach((s) => {
    s.addEventListener("click", () => openScene(s));
    s.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openScene(s); } });
  });
  if (window.matchMedia("(max-width: 960px)").matches && scenes[0]) openScene(scenes[0]);

  /* ---------- Newsletter (Netlify Forms) ----------
     No Netlify, a inscrição vai para o painel "Forms" do site.
     Fora do Netlify (abrindo o arquivo no computador) mostra um aviso. */
  const form = document.getElementById("newsletter");
  const note = document.getElementById("form-note");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "Digite um e-mail válido.";
      form.email.focus();
      return;
    }
    if (location.protocol === "file:") {
      note.textContent = "A inscrição funciona quando o site estiver publicado no Netlify.";
      return;
    }
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    note.textContent = "Enviando…";
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        note.textContent = "Inscrição feita. Obrigada!";
      })
      .catch(() => { note.textContent = "Não foi possível enviar agora. Tente de novo em instantes."; })
      .finally(() => { btn.disabled = false; });
  });

  /* ---------- Menu do celular ---------- */
  const mnav = document.getElementById("mnav");
  document.querySelectorAll("[data-mnav-open]").forEach((b) => b.addEventListener("click", () => mnav.showModal && mnav.showModal()));
  mnav.querySelector("[data-close]").addEventListener("click", () => mnav.close());
  mnav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => mnav.close()));

  /* ---------- Links provisórios (href="#") não pulam para o topo ----------
     Enquanto não houver o endereço real (checkout, WhatsApp, redes...),
     clicar neles não faz nada. Troque o "#" pelo link para ativar. */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href="#"]');
    if (a) e.preventDefault();
  });
}

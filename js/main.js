/**
 * RANCHO PIRABAS — main.js
 * JavaScript modular (ES6+), sem dependências externas.
 * Cada funcionalidade é isolada em sua própria função de
 * inicialização para facilitar manutenção.
 */

'use strict';

/* ---------- Header: sombra/blur ao rolar ---------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const toggleScrolled = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });
}

/* ---------- Menu mobile ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link (mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Parallax sutil da foto de fundo no Hero ---------- */
function initHeroParallax() {
  const bgWrapper = document.querySelector('.hero-bg');
  const hero = document.querySelector('.hero');
  if (!bgWrapper || !hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let ticking = false;

  const update = () => {
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(window.scrollY / heroHeight, 1);
    // A foto se desloca sutilmente para baixo conforme o usuário rola,
    // reforçando a sensação de "afundar" no pôr do sol.
    const translateY = progress * 50;
    bgWrapper.style.transform = `translateY(${translateY}px)`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/* ---------- Scroll Reveal (IntersectionObserver) ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Galeria: arrastar com o mouse (igual ao touch no celular) ---------- */
function initGalleryDrag() {
  const track = document.querySelector('.gallery-track');
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let moved = false;

  const start = (x) => {
    isDown = true;
    moved = false;
    startX = x;
    scrollStart = track.scrollLeft;
    track.classList.add('is-dragging');
  };

  const move = (x) => {
    if (!isDown) return;
    const delta = x - startX;
    if (Math.abs(delta) > 3) moved = true;
    track.scrollLeft = scrollStart - delta;
  };

  const end = () => {
    isDown = false;
    track.classList.remove('is-dragging');
  };

  // Mouse (desktop)
  track.addEventListener('mousedown', (e) => {
    start(e.pageX);
    e.preventDefault(); // evita seleção de texto/imagem ao arrastar
  });

  window.addEventListener('mousemove', (e) => move(e.pageX));
  window.addEventListener('mouseup', end);
  track.addEventListener('mouseleave', () => {
    if (isDown) end();
  });

  // Evita que o clique "vazando" do arraste dispare outras ações (ex. abrir imagem)
  track.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Touch (celular) já funciona nativamente via overflow-x + scroll-snap,
  // não precisa de JS adicional.
}

/* ---------- Barra de progresso de rolagem ---------- */
function initScrollProgress() {
  const fill = document.querySelector('.scroll-progress-fill');
  if (!fill) return;

  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = `${Math.min(progress, 100)}%`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', update);
  update();
}

/* ---------- Contadores animados (números que "sobem" ao entrar na tela) ---------- */
function initCountUp() {
  const targets = document.querySelectorAll('[data-count-to]');
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCount = (el) => {
    const endValue = parseFloat(el.dataset.countTo);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';

    if (prefersReducedMotion) {
      el.textContent = endValue.toFixed(decimals).replace('.', ',') + suffix;
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad — desacelera suavemente perto do final
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = endValue * eased;
      el.textContent = current.toFixed(decimals).replace('.', ',') + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = endValue.toFixed(decimals).replace('.', ',') + suffix;
      }
    };

    window.requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    targets.forEach(animateCount);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Títulos em cascata (palavra por palavra) ---------- */
function initTextSplit() {
  const targets = document.querySelectorAll('[data-split-text]');
  if (!targets.length) return;

  targets.forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map((word, i) => `<span class="split-word" style="transition-delay:${i * 0.05}s">${word}</span>`)
      .join(' ');
    el.classList.add('split-ready');
  });

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Parallax genérico para elementos marcados ---------- */
function initScrollParallax() {
  const items = document.querySelectorAll('[data-parallax]');
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let ticking = false;

  const update = () => {
    const viewportCenter = window.innerHeight / 2;

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elCenter - viewportCenter;
      const strength = parseFloat(el.dataset.parallaxStrength || '15');
      // normaliza a distância pela altura da tela para um deslocamento suave
      const offset = (distanceFromCenter / window.innerHeight) * strength;
      el.style.transform = `scale(1.12) translateY(${offset}px)`;
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/* ---------- Tilt 3D sutil nos cards ao passar o mouse ---------- */
function initCardTilt() {
  const cards = document.querySelectorAll('.highlight-card, .menu-card');
  if (!cards.length) return;

  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!supportsHover || prefersReducedMotion) return;

  const maxTilt = 6; // graus

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * maxTilt * 2;
      const rotateX = -y * maxTilt * 2;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------- Ano dinâmico no footer ---------- */
function initFooterYear() {
  const el = document.querySelector('[data-current-year]');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Lazy loading de imagens (fallback nativo + classe) ---------- */
function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach((img) => {
    img.addEventListener('load', () => img.classList.add('is-loaded'));
  });
}

/* ---------- Inicialização geral ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initHeroParallax();
  initScrollProgress();
  initScrollReveal();
  initCountUp();
  initTextSplit();
  initScrollParallax();
  initCardTilt();
  initGalleryDrag();
  initFooterYear();
  initLazyImages();
});
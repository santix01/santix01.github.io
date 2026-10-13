import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Borde del nav al hacer scroll
const onScroll = () => document.documentElement.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Repos públicos en vivo (falla en silencio si la API no responde)
const ghSlot = document.querySelector<HTMLElement>('[data-gh-repos]');
if (ghSlot) {
  fetch('https://api.github.com/users/santix01', { headers: { Accept: 'application/vnd.github+json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((u) => {
      if (u && typeof u.public_repos === 'number') {
        ghSlot.querySelector('[data-gh-count]')!.textContent = String(u.public_repos);
        ghSlot.hidden = false;
      }
    })
    .catch(() => {});
}

if (!reduced) {
  document.documentElement.classList.add('js-motion');
  gsap.registerPlugin(ScrollTrigger);

  // Scroll suave
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = new URL(a.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
      history.replaceState(null, '', url.hash);
    });
  });

  // Secuencia de entrada del hero (el único momento orquestado)
  const heroEls = gsap.utils.toArray<HTMLElement>('[data-hero]');
  const nameSpans = document.querySelectorAll('.hero__name span');
  if (heroEls.length && !nameSpans.length) {
    gsap.fromTo(heroEls, { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.08, duration: 1.1, ease: 'expo.out' });
  } else if (heroEls.length) {
    gsap.set(heroEls, { opacity: 0, y: 24 });
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 } });
    tl.to(heroEls[0], { opacity: 1, y: 0 })
      .set('.hero__name', { opacity: 1, y: 0 }, 0)
      .from(nameSpans, { yPercent: 110, opacity: 0, stagger: 0.09, duration: 1.2, clipPath: 'inset(0 0 100% 0)' }, 0.05)
      .to(heroEls.slice(2), { opacity: 1, y: 0, stagger: 0.08 }, 0.35);
  }

  // Revelado al hacer scroll
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07, overwrite: true }),
  });

  // Contadores
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(obj, { v: end, duration: 1.4, ease: 'power3.out', onUpdate: () => (el.textContent = String(Math.round(obj.v))) }),
    });
  });

  // Inclinación 3D sutil en las tarjetas de proyecto
  if (finePointer) {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
        ry((x - 0.5) * 6);
        rx((0.5 - y) * 6);
      });
      card.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });
  }

  // Cursor personalizado
  const cursor = document.querySelector<HTMLElement>('.cursor');
  if (cursor && finePointer) {
    const cx = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const cy = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
    window.addEventListener('pointermove', (e) => {
      cx(e.clientX);
      cy(e.clientY);
      cursor.classList.add('is-on');
      const interactive = (e.target as HTMLElement).closest('a, button, [data-tilt], input, textarea');
      cursor.classList.toggle('is-hover', !!interactive);
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
  }

  // Transición entre páginas internas
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = new URL(a.href);
      if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) return;
      if (url.pathname === location.pathname) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // archivos (pdf, txt)
      e.preventDefault();
      gsap.to('main', { opacity: 0, y: -12, duration: 0.3, ease: 'power2.in', onComplete: () => { location.href = a.href; } });
    });
  });
  gsap.from('main', { opacity: 0, duration: 0.5, ease: 'power2.out' });
  window.addEventListener('pageshow', (e) => { if (e.persisted) gsap.set('main', { opacity: 1, y: 0 }); });
}

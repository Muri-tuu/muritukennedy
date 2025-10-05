import { useEffect, useRef } from 'react';

// Lightweight splash cursor effect: radial splash circles following cursor
// This is a simplified, theme-friendly effect that works across devices

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const splashesRef = useRef<Array<{ x: number; y: number; start: number }>>([]);
  const lastAddRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const onMove = (e: MouseEvent | TouchEvent) => {
      let x = 0;
      let y = 0;
      if (e instanceof TouchEvent) {
        const t = e.touches[0];
        if (!t) return;
        x = t.clientX;
        y = t.clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      // Throttle by time and distance to reduce density
      const now = performance.now();
      const last = lastAddRef.current;
      if (last) {
        const dt = now - last.time;
        const dx = x - last.x;
        const dy = y - last.y;
        const dist2 = dx * dx + dy * dy;
        if (dt < 40 && dist2 < 16 * 16) return;
      }
      lastAddRef.current = { x, y, time: now };
      splashesRef.current.push({ x, y, start: now });
      if (splashesRef.current.length > 8) splashesRef.current.shift();
    };

    const shouldIgnore = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      // Ignore interactive elements, text containers, media, and card-like wrappers
      const IGNORE_SELECTOR = [
        'button',
        '[role="button"]',
        'a',
        'input',
        'select',
        'textarea',
        'label',
        'img',
        'svg',
        'canvas',
        'video',
        'picture',
        'figure',
        'figcaption',
        // text elements
        'p',
        'span',
        'strong',
        'em',
        'small',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'code', 'pre',
        'li',
        // card-like containers or explicit opt-out
        '.card', '.panel', '.tile',
        '[class*="card" i]',
        '[class*="glass" i]',
        '[class*="panel" i]',
        '[class*="tile" i]',
        '[class*="box" i]',
        '[data-card]',
        '[data-no-splash]'
      ].join(',');
      if (target.closest(IGNORE_SELECTOR)) return true;
      return false;
    };

    const onMoveFiltered = (e: MouseEvent | TouchEvent) => {
      const t = (e as any).target as EventTarget | null;
      if (shouldIgnore(t)) return;
      onMove(e as any);
    };

    window.addEventListener('mousemove', onMoveFiltered as any, { passive: true } as any);
    window.addEventListener('touchmove', onMoveFiltered as any, { passive: true } as any);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();
      const duration = 450; // ms (shorter for a lighter feel)

      splashesRef.current = splashesRef.current.filter((s) => {
        const t = (now - s.start) / duration;
        if (t >= 1) return false;
        const alpha = 1 - t;
        const radius = 40 * t + 6; // smaller radius
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius);
        // Transparent and less intense center
        const root = document.documentElement;
        const cs = getComputedStyle(root);
        const ringVar = cs.getPropertyValue('--ring').trim();
        const baseColor = ringVar && ringVar.includes('rgb') ? ringVar : 'rgba(125,211,252,1)';
        const innerAlpha = Math.max(0, 0.10 * alpha);
        // Attempt to inject alpha if rgba(..,1) form, else fallback to a soft blue
        const innerColor = baseColor.startsWith('rgba(')
          ? baseColor.replace(/\,\s*([\d.]+)\)$/, `, ${innerAlpha})`)
          : `rgba(160, 200, 255, ${innerAlpha})`;
        grad.addColorStop(0, innerColor);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      requestAnimationFrame(draw);
    };

    const id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', onMoveFiltered as any);
      window.removeEventListener('touchmove', onMoveFiltered as any);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
      }}
      aria-hidden
    />
  );
}
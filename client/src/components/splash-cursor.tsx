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
        // Theme-aware center color: dark on light mode, light on dark mode
        const root = document.documentElement;
        const cs = getComputedStyle(root);
        const isDark = root.classList.contains('dark');
        const fgVar = (cs.getPropertyValue('--foreground').trim()) || (isDark ? '#e6f0ff' : '#0b1220');
        const toRGBA = (color: string, a: number) => {
          const c = color.trim();
          if (c.startsWith('#')) {
            const hex = c.slice(1);
            const full = hex.length === 3 ? hex.split('').map(ch => ch + ch).join('') : hex;
            const r = parseInt(full.slice(0, 2), 16);
            const g = parseInt(full.slice(2, 4), 16);
            const b = parseInt(full.slice(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${a})`;
          }
          if (c.startsWith('rgb')) {
            // replace existing alpha or append
            const m = c.match(/rgba?\((.*)\)/);
            if (m) {
              const parts = m[1].split(',').map(s => s.trim()).slice(0, 3);
              return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${a})`;
            }
          }
          // fallback neutral
          return `rgba(${isDark ? '255,255,255' : '0,0,0'}, ${a})`;
        };
        const innerAlpha = Math.max(0, 0.16 * alpha);
        grad.addColorStop(0, toRGBA(fgVar, innerAlpha));
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
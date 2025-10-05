import { useEffect, useRef } from 'react';

// Lightweight splash cursor effect: radial splash circles following cursor
// This is a simplified, theme-friendly effect that works across devices

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const splashesRef = useRef<Array<{ x: number; y: number; start: number }>>([]);

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
      splashesRef.current.push({ x, y, start: performance.now() });
      if (splashesRef.current.length > 20) splashesRef.current.shift();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();
      const duration = 700; // ms

      splashesRef.current = splashesRef.current.filter((s) => {
        const t = (now - s.start) / duration;
        if (t >= 1) return false;
        const alpha = 1 - t;
        const radius = 80 * t + 10;
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius);
        // premium cyan-blue gradient to match site theme
        grad.addColorStop(0, `rgba(34,197,94,${0.25 * alpha})`); // emerald hint
        grad.addColorStop(1, `rgba(59,130,246,0)`); // blue fade
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
      window.removeEventListener('mousemove', onMove as any);
      window.removeEventListener('touchmove', onMove as any);
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
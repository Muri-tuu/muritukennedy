import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number; // alpha
  tw: number; // twinkle speed
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function CometBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const cometsRef = useRef<Comet[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // Recompute stars based on area
      const target = Math.floor((w * h) / 9000); // density
      const stars: Star[] = [];
      for (let i = 0; i < target; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: (Math.random() * 0.9 + 0.4) * DPR,
          a: Math.random() * 0.6 + 0.2,
          tw: (Math.random() * 0.5 + 0.2) * (Math.random() < 0.5 ? -1 : 1),
        });
      }
      starsRef.current = stars;
    };

    setSize();
    window.addEventListener('resize', setSize);

    let lastSpawn = performance.now();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Space gradient background (deep violet to near-black)
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#060818');
      g.addColorStop(1, '#0a1022');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Subtle vignette
      const vg = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.2, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
      vg.addColorStop(0, 'rgba(255,255,255,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      // Starfield twinkle
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const s of starsRef.current) {
        s.a += s.tw * 0.01;
        if (s.a < 0.1 || s.a > 0.8) s.tw *= -1;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.9, s.a));
        ctx.fillStyle = '#7dd3fc'; // soft cyan
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Spawn comets occasionally
      const now = performance.now();
      if (now - lastSpawn > 2800 && cometsRef.current.length < 2) {
        lastSpawn = now;
        const fromTop = Math.random() < 0.5;
        const startX = fromTop ? Math.random() * w * 0.6 : -w * 0.1;
        const startY = fromTop ? -h * 0.1 : Math.random() * h * 0.4;
        const speed = 0.4 * DPR + Math.random() * 0.6 * DPR;
        cometsRef.current.push({
          x: startX,
          y: startY,
          vx: speed * (1.2 + Math.random() * 0.6),
          vy: speed * (0.6 + Math.random() * 0.4),
          life: 0,
          maxLife: 2200 + Math.random() * 1200,
        });
      }

      // Draw comets with trail
      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        const c = cometsRef.current[i];
        c.life += 16;
        c.x += c.vx * 8;
        c.y += c.vy * 8;
        const lifeT = Math.min(1, c.life / c.maxLife);
        const alpha = (1 - lifeT) * 0.8;
        const len = 140 * (1 + (1 - lifeT) * 1.5) * DPR;

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`; // cyan
        ctx.shadowColor = 'rgba(167,139,250,0.5)'; // purple glow
        ctx.shadowBlur = 12 * DPR;
        ctx.lineWidth = 2 * DPR;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * len, c.y - c.vy * len);
        ctx.stroke();
        ctx.restore();

        if (c.x > w + 200 || c.y > h + 200 || c.life > c.maxLife) {
          cometsRef.current.splice(i, 1);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    />
  );
}

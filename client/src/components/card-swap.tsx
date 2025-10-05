import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './card-swap.css';

export const Card = forwardRef<HTMLDivElement, React.ComponentProps<'div'> & { customClass?: string }>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});
const placeNow = (el: Element, slot: any, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

export default function CardSwap({
  width = 360,
  height = 240,
  cardDistance = 60,
  verticalDistance = 40,
  delay = 4000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 4,
  easing = 'elastic',
  children,
}: React.PropsWithChildren<{
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (i: number) => void;
  skewAmount?: number;
  easing?: 'elastic' | 'power';
}>) {
  const config =
    easing === 'elastic'
      ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
      : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => r.current && placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: '+=500', duration: (config as any).durDrop, ease: (config as any).ease as any });
      tl.addLabel('promote', `-=${(config as any).durDrop * (config as any).promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: (config as any).durMove, ease: (config as any).ease as any }, `promote+=${i * 0.15}`);
      });
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${(config as any).durMove * (config as any).returnDelay}`);
      tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: (config as any).durReturn, ease: (config as any).ease as any }, 'return');
      tl.call(() => { order.current = [...rest, front]; });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay) as any;

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => { tlRef.current?.pause(); if (intervalRef.current) window.clearInterval(intervalRef.current); };
      const resume = () => { tlRef.current?.play(); intervalRef.current = window.setInterval(swap, delay) as any; };
      node.addEventListener('mouseenter', pause); node.addEventListener('mouseleave', resume);
      return () => { node.removeEventListener('mouseenter', pause); node.removeEventListener('mouseleave', resume); if (intervalRef.current) window.clearInterval(intervalRef.current); };
    }
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as any, { key: i, ref: refs[i], style: { width, height, ...(child as any).props?.style ?? {} }, onClick: (e: any) => { (child as any).props?.onClick?.(e); onCardClick?.(i); } })
      : child,
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width: width + (childArr.length-1)*cardDistance + 40, height }}>
      {rendered}
    </div>
  );
}

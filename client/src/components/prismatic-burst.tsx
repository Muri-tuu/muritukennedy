import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import './prismatic-burst.css';

type Props = {
  animationType?: 'rotate' | 'rotate3d' | 'hover';
  intensity?: number;
  speed?: number;
  distort?: number;
  paused?: boolean;
  offset?: { x: number | string; y: number | string };
  hoverDampness?: number;
  rayCount?: number;
  mixBlendMode?: CSSStyleDeclaration['mixBlendMode'] | 'none';
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
};

const vertexShader = `#version 300 es
in vec2 position; in vec2 uv; out vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,0.0,1.0); }`;
const fragmentShader = `#version 300 es
precision highp float; out vec4 fragColor; uniform vec2 uResolution; uniform float uTime; uniform float uIntensity; uniform float uSpeed; uniform int uAnimType; uniform vec2 uMouse; uniform int uColorCount; uniform float uDistort; uniform vec2 uOffset; uniform sampler2D uGradient; uniform float uNoiseAmount; uniform int uRayCount; float hash21(vec2 p){ p=floor(p); float f=52.9829189*fract(dot(p,vec2(0.065,0.005))); return fract(f);} mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8);} float layeredNoise(vec2 fragPx){ vec2 p=mod(fragPx+vec2(uTime*30.0,-uTime*21.0),1024.0); vec2 q=rot30()*p; float n=0.0; n+=0.40*hash21(q); n+=0.25*hash21(q*2.0+17.0); n+=0.20*hash21(q*4.0+47.0); n+=0.10*hash21(q*8.0+113.0); n+=0.05*hash21(q*16.0+191.0); return n;} vec3 sampleGradient(float t){ t=clamp(t,0.0,1.0); return texture(uGradient, vec2(t,0.5)).rgb;} vec2 rot2(vec2 v,float a){ float s=sin(a), c=cos(a); return mat2(c,-s,s,c)*v;} float bendAngle(vec3 q,float t){ float a=0.8*sin(q.x*0.55+t*0.6)+0.7*sin(q.y*0.50-t*0.5)+0.6*sin(q.z*0.60+t*0.7); return a;} vec3 rayDir(vec2 frag, vec2 res, vec2 offset,float dist){ float focal=res.y*max(dist,1e-3); return normalize(vec3(2.0*(frag - offset) - res, focal)); } float edgeFade(vec2 frag, vec2 res, vec2 offset){ vec2 toC = frag - 0.5*res - offset; float r = length(toC) / (0.5*min(res.x,res.y)); float x = clamp(r,0.0,1.0); float q = x*x*x*(x*(x*6.0-15.0)+10.0); float s = q*0.5; s = pow(s,1.5); float tail = 1.0 - pow(1.0 - s, 2.0); s = mix(s, tail, 0.2); float dn = (layeredNoise(frag*0.15)-0.5)*0.0015*s; return clamp(s+dn,0.0,1.0);} mat3 rotX(float a){float c=cos(a), s=sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c);} mat3 rotY(float a){float c=cos(a), s=sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c);} mat3 rotZ(float a){float c=cos(a), s=sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0);} void main(){ vec2 frag = gl_FragCoord.xy; float t=uTime*uSpeed; vec3 dir = rayDir(frag,uResolution,uOffset,1.0); float marchT=0.0; vec3 col=vec3(0.0); float n = layeredNoise(frag); vec4 c = cos(t * 0.2 + vec4(0.0,33.0,11.0,0.0)); mat2 M2 = mat2(c.x,c.y,c.z,c.w); float amp = clamp(uDistort,0.0,50.0)*0.15; mat3 rot3dMat = mat3(1.0); if(uAnimType==1){ vec3 ang = vec3(t*0.31, t*0.21, t*0.17); rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);} mat3 hoverMat = mat3(1.0); if(uAnimType==2){ vec2 m = uMouse*2.0-1.0; vec3 ang = vec3(m.y*0.6, m.x*0.6, 0.0); hoverMat = rotY(ang.y) * rotX(ang.x); } for(int i=0;i<44;++i){ vec3 P=marchT*dir; P.z -= 2.0; float rad = length(P); vec3 Pl = P * (10.0 / max(rad, 1e-6)); if(uAnimType==0){ Pl.xz *= M2; } else if(uAnimType==1){ Pl = rot3dMat*Pl; } else { Pl = hoverMat*Pl; } float stepLen = min(rad-0.3, n*0.1) + 0.1; float grow = smoothstep(0.35,3.0,marchT); float a1 = amp*grow * (sin(Pl.x*0.55 + t*0.6) + sin(Pl.y*0.50 - t*0.5)); vec3 Pb=Pl; Pb.xz = rot2(Pb.xz,a1); float rayPattern = smoothstep(0.5,0.7, sin(Pb.x + cos(Pb.y)*cos(Pb.z)) * sin(Pb.z + sin(Pb.y)*cos(Pb.x+t))); vec3 spectral = vec3(1.0); if(uColorCount==0){ spectral = 1.0 + vec3(cos(marchT*3.0+0.0), cos(marchT*3.0+1.0), cos(marchT*3.0+2.0)); } else { float saw = fract(marchT*0.25); float tt = saw*saw*(3.0-2.0*saw); spectral = texture(uGradient, vec2(tt,0.5)).rgb*2.0; }
      vec3 base = (0.05 / (0.4 + stepLen)) * smoothstep(5.0, 0.0, rad) * spectral; col += base * rayPattern; marchT += stepLen; }
  col *= edgeFade(frag, uResolution, uOffset); col *= uIntensity; fragColor = vec4(clamp(col,0.0,1.0), 1.0); }`;

function toPx(v: number | string | undefined) { if (v == null) return 0; if (typeof v === 'number') return v; const s = String(v).trim(); const num = parseFloat(s.replace('px','')); return isNaN(num) ? 0 : num; }

export default function PrismaticBurst({ animationType='rotate3d', intensity=2, speed=0.5, distort=1.0, paused=false, offset={x:0,y:0}, hoverDampness=0.25, rayCount=24, mixBlendMode='lighten', colors=['#ff007a', '#4d3dff', '#ffffff'], className, style }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const programRef = useRef<Program | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseTargetRef = useRef<[number, number]>([0.5,0.5]);
  const mouseSmoothRef = useRef<[number, number]>([0.5,0.5]);
  const pausedRef = useRef(paused);
  const gradTexRef = useRef<Texture | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(()=>{ pausedRef.current = paused; },[paused]);

  useEffect(() => {
    const container = containerRef.current; if (!container) return;
    const dpr = Math.min(window.devicePixelRatio||1, 2);
    const renderer = new Renderer({ dpr, alpha: true, antialias: true });
    rendererRef.current = renderer;
    const gl = renderer.gl as any;
    gl.canvas.style.position='absolute'; gl.canvas.style.inset='0'; gl.canvas.style.width='100%'; gl.canvas.style.height='100%';
    gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? (mixBlendMode as any) : '';
    container.appendChild(gl.canvas);

    const gradientTex = new Texture(gl, { image: new Uint8Array([255,255,255,255]), width: 1, height: 1, generateMipmaps: false, flipY: false });
    gradTexRef.current = gradientTex;

    const program = new Program(gl, { vertex: vertexShader, fragment: fragmentShader, uniforms: { uResolution: { value: [1,1] }, uTime: { value: 0 }, uIntensity: { value: intensity }, uSpeed: { value: speed }, uAnimType: { value: animationType === 'rotate3d' ? 1 : animationType === 'hover' ? 2 : 0 }, uMouse: { value: [0.5,0.5] }, uColorCount: { value: 0 }, uDistort: { value: distort }, uOffset: { value: [toPx(offset.x), toPx(offset.y)] }, uGradient: { value: gradientTex }, uNoiseAmount: { value: 0.8 }, uRayCount: { value: rayCount } } });
    programRef.current = program;

    const triangle = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry: triangle, program });
    (renderer as any).render({ scene: mesh });

    const resize = () => { const w = container.clientWidth || 1; const h = container.clientHeight || 1; renderer.setSize(w,h); (program.uniforms.uResolution.value as number[])[0] = gl.drawingBufferWidth; (program.uniforms.uResolution.value as number[])[1] = gl.drawingBufferHeight; };
    const ro = new ResizeObserver(resize); ro.observe(container); resize();

    const onPointer = (e: PointerEvent) => { const rect = container.getBoundingClientRect(); const x = (e.clientX - rect.left)/Math.max(rect.width,1); const y = (e.clientY - rect.top)/Math.max(rect.height,1); mouseTargetRef.current = [Math.min(Math.max(x,0),1), Math.min(Math.max(y,0),1)]; };
    container.addEventListener('pointermove', onPointer, { passive: true });

    const io = new IntersectionObserver(entries => { if (entries[0]) isVisibleRef.current = entries[0].isIntersecting; }, { threshold: 0.01 }); io.observe(container);

    let raf = 0; let last = performance.now();
    const update = (now: number) => {
      const dt = Math.max(0, now - last) * 0.001; last = now;
      const visible = isVisibleRef.current && !document.hidden; if (!visible) { raf = requestAnimationFrame(update); return; }
      const tau = 0.06; const alpha = 1 - Math.exp(-dt / tau); const tgt = mouseTargetRef.current; const sm = mouseSmoothRef.current; sm[0] += (tgt[0]-sm[0])*alpha; sm[1] += (tgt[1]-sm[1])*alpha;
      (program.uniforms.uMouse.value as number[])[0] = sm[0]; (program.uniforms.uMouse.value as number[])[1] = sm[1];
      (program.uniforms.uTime.value as number) as any; (program.uniforms.uTime.value = ((program.uniforms.uTime.value as number) + dt));
      renderer.render({ scene: mesh }); raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => { cancelAnimationFrame(raf); container.removeEventListener('pointermove', onPointer); ro.disconnect(); try{ container.removeChild(gl.canvas);}catch{} };
  }, [animationType, intensity, speed, distort, offset?.x, offset?.y, rayCount, mixBlendMode]);

  useEffect(() => {
    const gl = rendererRef.current?.gl as any; const program = programRef.current; const tex = gradTexRef.current; if (!program || !gl || !tex) return;
    const hexToRgb = (hex: string): [number, number, number] => {
      let h = hex.trim(); if (h.startsWith('#')) h = h.slice(1); if (h.length === 3) { const r=h[0], g=h[1], b=h[2]; h = r+r+g+g+b+b; }
      const intVal = parseInt(h, 16); if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [255,255,255];
      const r = (intVal >> 16) & 255; const g = (intVal >> 8) & 255; const b = intVal & 255; return [r,g,b];
    };
    const capped = (Array.isArray(colors) ? colors : ['#ffffff']).slice(0, 64); const count = capped.length;
    const data = new Uint8Array(count*4);
    for (let i=0;i<count;i++){ const [r,g,b] = hexToRgb(String(capped[i])); data[i*4+0]=r; data[i*4+1]=g; data[i*4+2]=b; data[i*4+3]=255; }
    tex.image = data; (tex as any).width = count; (tex as any).height = 1; tex.minFilter = gl.LINEAR; tex.magFilter = gl.LINEAR; tex.wrapS = gl.CLAMP_TO_EDGE; tex.wrapT = gl.CLAMP_TO_EDGE; (tex as any).flipY = false; (tex as any).generateMipmaps = false; (tex as any).needsUpdate = true;
    (program.uniforms.uColorCount.value as number) = count;
  }, [colors]);

  return <div className={`prismatic-burst-container ${className ?? ''}`} style={style} ref={containerRef} />;
}

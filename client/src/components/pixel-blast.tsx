import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, EffectPass, RenderPass, Effect } from 'postprocessing';
import './pixel-blast.css';

const SHAPE_MAP: Record<string, number> = { square: 0, circle: 1, triangle: 2, diamond: 3 };

type Props = {
  variant?: 'square'|'circle'|'triangle'|'diamond';
  pixelSize?: number; color?: string; className?: string; style?: React.CSSProperties; antialias?: boolean;
  patternScale?: number; patternDensity?: number; liquid?: boolean; liquidStrength?: number; liquidRadius?: number;
  pixelSizeJitter?: number; enableRipples?: boolean; rippleIntensityScale?: number; rippleThickness?: number; rippleSpeed?: number;
  liquidWobbleSpeed?: number; autoPauseOffscreen?: boolean; speed?: number; transparent?: boolean; edgeFade?: number; noiseAmount?: number;
};

export default function PixelBlast({ variant='circle', pixelSize=6, color='#B19EEF', className, style, antialias=true, patternScale=3, patternDensity=1.2, liquid=true, liquidStrength=0.12, liquidRadius=1.2, pixelSizeJitter=0.5, enableRipples=true, rippleIntensityScale=1.5, rippleThickness=0.12, rippleSpeed=0.4, liquidWobbleSpeed=5, autoPauseOffscreen=true, speed=0.6, transparent=true, edgeFade=0.25, noiseAmount=0 }: Props){
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibilityRef = useRef({ visible: true });
  const speedRef = useRef(speed);
  const threeRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current; if (!container) return;
    speedRef.current = speed;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', { antialias, alpha: true }); if (!gl) return;
    const renderer = new THREE.WebGLRenderer({ canvas, context: gl as any, antialias, alpha: true });
    renderer.domElement.style.width='100%'; renderer.domElement.style.height='100%';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
    container.appendChild(renderer.domElement);

    const VERTEX_SRC = `void main(){ gl_Position=vec4(position,1.0); }`;
    const FRAGMENT_SRC = `precision highp float; uniform vec3 uColor; uniform vec2 uResolution; uniform float uTime; uniform float uPixelSize; uniform float uScale; uniform float uDensity; uniform float uPixelJitter; uniform int uEnableRipples; uniform float uRippleSpeed; uniform float uRippleThickness; uniform float uRippleIntensity; uniform float uEdgeFade; uniform int uShapeType; const int MAX_CLICKS=10; uniform vec2 uClickPos[MAX_CLICKS]; uniform float uClickTimes[MAX_CLICKS]; float Bayer2(vec2 a){ a=floor(a); return fract(a.x/2. + a.y*a.y*.75);} #define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a)) #define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a)) float hash11(float n){ return fract(sin(n)*43758.5453);} float vnoise(vec3 p){ vec3 ip=floor(p); vec3 fp=fract(p); float n000=hash11(dot(ip+vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0))); float n100=hash11(dot(ip+vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0))); float n010=hash11(dot(ip+vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0))); float n110=hash11(dot(ip+vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0))); float n001=hash11(dot(ip+vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0))); float n101=hash11(dot(ip+vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0))); float n011=hash11(dot(ip+vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0))); float n111=hash11(dot(ip+vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0))); vec3 w=fp*fp*fp*(fp*(fp*6.0-15.0)+10.0); float x00=mix(n000,n100,w.x); float x10=mix(n010,n110,w.x); float x01=mix(n001,n101,w.x); float x11=mix(n011,n111,w.x); float y0=mix(x00,x10,w.y); float y1=mix(x01,x11,w.y); return mix(y0,y1,w.z)*2.0-1.0; } float fbm2(vec2 uv, float t){ vec3 p=vec3(uv*uScale, t); float amp=1.0; float freq=1.0; float sum=1.0; for(int i=0;i<5;++i){ sum += amp * vnoise(p*freq); freq *= 1.25; amp *= 1.0; } return sum*0.5+0.5; } float maskCircle(vec2 p,float cov){ float r=sqrt(cov)*.25; float d=length(p-0.5)-r; float aa=0.5*fwidth(d); return cov*(1.0 - smoothstep(-aa, aa, d*2.0)); } void main(){ float pixelSize=uPixelSize; vec2 fragCoord = gl_FragCoord.xy - uResolution*0.5; float aspect = uResolution.x / uResolution.y; vec2 pixelId=floor(fragCoord/pixelSize); vec2 pixelUV=fract(fragCoord/pixelSize); float cellPixelSize=8.0*pixelSize; vec2 cellId=floor(fragCoord/cellPixelSize); vec2 cellCoord=cellId*cellPixelSize; vec2 uv = cellCoord / uResolution * vec2(aspect,1.0); float base = fbm2(uv,uTime*0.05); base = base * 0.5 - 0.65; float feed = base + (uDensity - 0.5) * 0.3; float bayer = Bayer8(fragCoord / uPixelSize) - 0.5; float bw = step(0.5, feed + bayer); float h=fract(sin(dot(floor(fragCoord/uPixelSize), vec2(127.1,311.7)))*43758.5453); float jitterScale = 1.0 + (h - 0.5)*uPixelJitter; float coverage = bw * jitterScale; float M = maskCircle(pixelUV, coverage); if (uEdgeFade>0.0){ vec2 norm = gl_FragCoord.xy / uResolution; float edge = min(min(norm.x,norm.y), min(1.0-norm.x, 1.0-norm.y)); float fade = smoothstep(0.0, uEdgeFade, edge); M *= fade; } vec3 c = uColor; gl_FragColor=vec4(c, M); }`;

    const scene = new THREE.Scene(); const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
    const uniforms: any = { uResolution: { value: new THREE.Vector2(0,0) }, uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uClickPos: { value: Array.from({length:10}, ()=> new THREE.Vector2(-1,-1)) }, uClickTimes: { value: new Float32Array(10) }, uShapeType: { value: SHAPE_MAP[variant] ?? 0 }, uPixelSize: { value: pixelSize * renderer.getPixelRatio() }, uScale: { value: patternScale }, uDensity: { value: patternDensity }, uPixelJitter: { value: pixelSizeJitter }, uEnableRipples: { value: enableRipples ? 1 : 0 }, uRippleSpeed: { value: rippleSpeed }, uRippleThickness: { value: rippleThickness }, uRippleIntensity: { value: rippleIntensityScale }, uEdgeFade: { value: edgeFade } };
    const material = new THREE.ShaderMaterial({ vertexShader: VERTEX_SRC, fragmentShader: FRAGMENT_SRC, uniforms, transparent: true, glslVersion: THREE.GLSL3, depthTest:false, depthWrite:false });
    const quadGeom = new THREE.PlaneGeometry(2,2); const quad = new THREE.Mesh(quadGeom, material); scene.add(quad);
    const clock = new THREE.Clock();

    const setSize = () => { const w = container.clientWidth||1; const h = container.clientHeight||1; renderer.setSize(w,h,false); uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height); uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio(); };
    renderer.setClearAlpha(0);
    setSize(); const ro = new ResizeObserver(setSize); ro.observe(container);

    let raf = 0; const animate = () => { uniforms.uTime.value = clock.getElapsedTime()*speedRef.current; renderer.render(scene, camera); raf = requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate);

    threeRef.current = { renderer, material, quad, ro, raf };

    return () => { if (!threeRef.current) return; const t = threeRef.current; t.ro?.disconnect(); cancelAnimationFrame(t.raf); t.quad?.geometry.dispose(); (t.material as THREE.ShaderMaterial).dispose(); t.renderer.dispose(); if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement); threeRef.current=null; };
  }, [variant, pixelSize, color, antialias, patternScale, patternDensity, liquid, liquidStrength, liquidRadius, pixelSizeJitter, enableRipples, rippleIntensityScale, rippleThickness, rippleSpeed, liquidWobbleSpeed, autoPauseOffscreen, speed, transparent, edgeFade, noiseAmount]);

  return <div ref={containerRef} className={`pixel-blast-container ${className ?? ''}`} style={style} aria-label="PixelBlast interactive background" />;
}

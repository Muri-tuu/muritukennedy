import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Lightweight site-wide LaserFlow background with theme colors
export default function LaserFlow({ color = '#38bdf8' }: { color?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<any>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
      uColor: { value: new THREE.Vector3(0.22, 0.74, 0.99) }, // cyan
      uFade: { value: 1.0 },
    };
    uniformsRef.current = uniforms;

    const vert = `
      precision highp float;
      attribute vec3 position;
      void main(){
        gl_Position = vec4(position, 1.0);
      }
    `;

    const frag = `
      precision highp float;
      uniform float iTime;
      uniform vec3 iResolution;
      uniform vec3 uColor;
      uniform float uFade;
      
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      void main(){
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        // subtle diagonal laser-like flow with foggy streaks
        vec2 p = uv * 2.0 - 1.0;
        float t = iTime * 0.2;
        float n = noise(p * 3.0 + vec2(t * 2.0, -t * 1.5));
        float beam = smoothstep(0.2, 0.0, abs(p.x + 0.2 * sin(t*2.0 + p.y*2.0)));
        float streaks = smoothstep(0.8, 1.0, n);
        float glow = beam * 0.35 + streaks * 0.25;
        vec3 col = uColor * glow;
        col += vec3(0.05,0.1,0.2) * (0.2 * (1.0 - length(p)));
        gl_FragColor = vec4(col, min(0.35, glow) * uFade);
      }
    `;

    const mat = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, mat);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
    };
    window.addEventListener('resize', resize);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      mat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const uniforms = uniformsRef.current;
    if (!uniforms) return;
    const hex = color.replace('#', '');
    const n = parseInt(hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex, 16);
    const r = ((n >> 16) & 255) / 255;
    const g = ((n >> 8) & 255) / 255;
    const b = (n & 255) / 255;
    uniforms.uColor.value.set(r, g, b);
  }, [color]);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden
    />
  );
}

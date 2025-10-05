import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './liquid-ether.css';

type Props = {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  className?: string;
  style?: React.CSSProperties;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
};

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const webglRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!mountRef.current) return;

    function makePaletteTexture(stops: string[]) {
      const arr = stops && stops.length > 0 ? (stops.length === 1 ? [stops[0], stops[0]] : stops) : ['#ffffff', '#ffffff'];
      const w = arr.length;
      const data = new Uint8Array(w * 4);
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i * 4 + 0] = Math.round(c.r * 255);
        data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255);
        data[i * 4 + 3] = 255;
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    }

    const paletteTex = makePaletteTexture(colors);

    class CommonClass {
      width = 0; height = 0; aspect = 1; pixelRatio = 1; container: HTMLElement | null = null; renderer!: THREE.WebGLRenderer; clock!: THREE.Clock;
      init(container: HTMLElement) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.display = 'block';
        this.clock = new THREE.Clock();
        this.clock.start();
      }
      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);
      }
      update() {}
    }
    const Common = new CommonClass();

    const face_vs = `attribute vec3 position; varying vec2 uv; void main(){ uv=position.xy*0.5+0.5; gl_Position=vec4(position,1.0); }`;
    const advection_fs = `precision highp float; uniform sampler2D velocity; uniform float dt; uniform vec2 fboSize; varying vec2 uv; void main(){ vec2 ratio=max(fboSize.x,fboSize.y)/fboSize; vec2 vel=texture2D(velocity,uv).xy; vec2 uv2=uv-vel*dt*ratio; vec2 newVel=texture2D(velocity,uv2).xy; gl_FragColor=vec4(newVel,0.0,0.0); }`;

    class ShaderPass {
      uniforms: any; scene!: THREE.Scene; camera!: THREE.Camera; material!: THREE.RawShaderMaterial; geometry!: THREE.PlaneGeometry; plane!: THREE.Mesh;
      constructor(public props: any) { this.uniforms = this.props.material?.uniforms; }
      init() { this.scene = new THREE.Scene(); this.camera = new THREE.Camera(); if (this.uniforms) { this.material = new THREE.RawShaderMaterial(this.props.material); this.geometry = new THREE.PlaneGeometry(2,2); this.plane = new THREE.Mesh(this.geometry, this.material); this.scene.add(this.plane);} }
      update() { Common.renderer.setRenderTarget(this.props.output || null); Common.renderer.render(this.scene, this.camera); Common.renderer.setRenderTarget(null); }
    }

    const fboSize = new THREE.Vector2();
    const fboA = new THREE.WebGLRenderTarget(1,1,{ type: THREE.FloatType, depthBuffer:false, stencilBuffer:false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping });
    const fboB = fboA.clone();

    const setFboSize = () => {
      fboSize.set(Math.max(1, Math.round(resolution * Common.width)), Math.max(1, Math.round(resolution * Common.height)));
      fboA.setSize(fboSize.x, fboSize.y); fboB.setSize(fboSize.x, fboSize.y);
    };

    class Advection extends ShaderPass {
      constructor() { super({ material: { vertexShader: face_vs, fragmentShader: advection_fs, uniforms: { fboSize: { value: fboSize }, velocity: { value: fboA.texture }, dt: { value: dt } } }, output: fboB }); this.init(); }
      update(dtVal: number) { this.uniforms.dt.value = dtVal; super.update(); }
    }
    const advect = new Advection();

    class Output {
      scene!: THREE.Scene; camera!: THREE.Camera; quad!: THREE.Mesh; mat!: THREE.RawShaderMaterial; time = 0;
      init() {
        this.scene = new THREE.Scene(); this.camera = new THREE.Camera();
        this.mat = new THREE.RawShaderMaterial({ vertexShader: face_vs, fragmentShader: `precision highp float; uniform sampler2D velocity; uniform sampler2D palette; varying vec2 uv; void main(){ vec2 vel=texture2D(velocity,uv).xy; float l=clamp(length(vel),0.0,1.0); vec3 c=texture2D(palette, vec2(l,0.5)).rgb; gl_FragColor=vec4(c, l); }`, transparent: true, depthWrite: false, uniforms: { velocity: { value: fboB.texture }, palette: { value: paletteTex } } });
        this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2,2), this.mat); this.scene.add(this.quad);
      }
      resize() {}
      render() { Common.renderer.setRenderTarget(null); Common.renderer.render(this.scene, this.camera); }
    }
    const output = new Output();

    Common.init(mountRef.current);
    setFboSize(); output.init();

    const container = mountRef.current;
    container.style.position = container.style.position || 'relative';
    container.style.overflow = container.style.overflow || 'hidden';
    container.prepend(Common.renderer.domElement);

    const onResize = () => { Common.resize(); setFboSize(); };
    const ro = new ResizeObserver(onResize); ro.observe(container); resizeObserverRef.current = ro;

    const loop = () => {
      advect.update(dt);
      output.render();
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      Common.renderer.dispose();
    };
  }, [BFECC, cursorSize, dt, isBounce, isViscous, iterationsPoisson, iterationsViscous, mouseForce, resolution, viscous, colors, autoDemo, autoSpeed, autoIntensity, takeoverDuration, autoResumeDelay, autoRampDuration]);

  return <div ref={mountRef} className={`liquid-ether-container ${className || ''}`} style={style} />;
}

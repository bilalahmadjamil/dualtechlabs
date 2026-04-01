"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 uv = vUv;
  float t = uTime;

  // Base — portal void #020617
  vec3 col = vec3(0.0078, 0.0235, 0.090);

  // Large ambient ellipses (same language as bg-portal-mesh)
  vec2 h1 = uv - vec2(0.5, -0.14);
  float e1 = exp(-length(h1 * vec2(0.38, 0.58)) * 1.65);
  col += vec3(0.05, 0.55, 0.62) * e1 * 0.16 * (0.88 + 0.12 * sin(t * 0.32));

  vec2 h2 = uv - vec2(1.02, 0.14);
  float e2 = exp(-length(h2 * vec2(0.48, 0.42)) * 2.1);
  col += vec3(0.1, 0.52, 0.95) * e2 * 0.09 * (0.9 + 0.1 * cos(t * 0.27));

  vec2 h3 = uv - vec2(-0.02, 0.98);
  float e3 = exp(-length(h3 * vec2(0.5, 0.38)) * 1.95);
  col += vec3(0.12, 0.62, 0.9) * e3 * 0.065;

  // Slow “data ribbon” — cyan → sky
  float rib = sin(uv.x * 11.0 + uv.y * 7.0 - t * 0.5) * sin(uv.y * 8.0 - t * 0.38 + uv.x * 3.0);
  rib = smoothstep(0.78, 1.0, abs(rib)) * 0.13;
  vec3 cyan = vec3(0.133, 0.831, 0.933);
  vec3 sky = vec3(0.231, 0.510, 0.965);
  col += mix(cyan, sky, uv.x * 0.55 + 0.25) * rib;

  // Light horizon band (depth cue, subtle motion)
  float hor = exp(-pow((uv.y - 0.56) * 5.2, 2.0));
  col += sky * hor * 0.11 * (0.85 + 0.15 * sin(t * 0.5));

  // Perspective-style floor grid (no geometry; masks to lower / right)
  vec2 g = (uv - vec2(0.5, 0.64)) * vec2(15.0, 11.0);
  g.y += t * 0.16;
  float gx = smoothstep(0.018, 0.0, abs(fract(g.x + 0.5) - 0.5));
  float gy = smoothstep(0.032, 0.0, abs(fract(g.y + 0.5) - 0.5));
  float gm = max(gx, gy);
  float gmask =
    smoothstep(0.2, 0.38, uv.y) *
    smoothstep(0.96, 0.48, uv.y) *
    smoothstep(0.04, 0.18, uv.x) *
    smoothstep(0.99, 0.72, uv.x);
  col += mix(cyan, sky, 0.4) * gm * gmask * 0.24;

  // Sparse micro-sparkles (instancing-free)
  vec2 sp = uv * 88.0 + t * vec2(1.05, 0.62);
  float spark = pow(noise(floor(sp) * 0.08) * 0.5 + 0.5, 18.0);
  col += vec3(0.45, 0.98, 1.0) * spark * 0.14 * smoothstep(0.25, 0.88, uv.y);

  // Vignette — keeps focus on center / type column
  float vig = smoothstep(1.02, 0.38, length(uv - vec2(0.48, 0.46)));
  col *= vig;

  // Micro grain (breaks banding, hides JPEG feel)
  col += (hash(uv * uResolution * 0.015 + t * 0.01) - 0.5) * 0.011;

  gl_FragColor = vec4(col, 1.0);
}
`;

function HeroBackdrop({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const { invalidate, size } = useThree();
  const running = active && !reducedMotion;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uResolution.value.set(size.width, size.height);
    if (running) {
      mat.uniforms.uTime.value += delta * 0.88;
      invalidate();
    }
  });

  useEffect(() => {
    if (active) {
      invalidate();
    }
  }, [active, invalidate]);

  useEffect(() => {
    invalidate();
  }, [invalidate, size.width, size.height]);

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 1]} near={0} far={2} left={-1} right={1} top={1} bottom={-1} />
      <mesh position={[0, 0, 0]} frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={VERT}
          fragmentShader={FRAG}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

const CLEAR = 0x020617;

/**
 * One full-screen shader quad — no transmission / stars / grid geometry.
 * `frameloop="demand"`: only redraws while `active && !reducedMotion` (no idle rAF, scroll stays light).
 */
export function HeroCanvas({
  active,
  reducedMotion = false,
}: {
  active: boolean;
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={[1, 1.25]}
      frameloop="demand"
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(CLEAR, 1);
        scene.background = new THREE.Color(CLEAR);
      }}
    >
      <HeroBackdrop active={active} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Holographic icosahedron shaders ─────────────────────────────────────────
// Inspired by award-winning studios: one object, real craft, not a background.

const HOLO_VERT = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vec3 pos  = position;

    // Organic breathing — multi-frequency displacement along surface normal
    float wave =
      sin(pos.x * 2.8 + uTime * 0.75) *
      sin(pos.y * 2.2 + uTime * 0.55) *
      sin(pos.z * 3.1 + uTime * 0.90);
    pos += normal * wave * 0.055;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const HOLO_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Brand palette
    vec3 purple = vec3(0.486, 0.227, 0.929);  // #7C3AED
    vec3 violet = vec3(0.659, 0.333, 0.969);  // #A855F7
    vec3 cyan   = vec3(0.024, 0.714, 0.831);  // #06B6D4

    // Fresnel rim — bright at silhouette edges like real glass
    float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    fresnel = pow(fresnel, 1.6);

    // Slow animated color cycle on surface
    float cycle = sin(uTime * 0.35) * 0.5 + 0.5;
    vec3 surfaceBase = mix(purple * 0.18, cyan * 0.14, cycle
      + sin(vPosition.y * 1.8 + uTime * 0.4) * 0.3
    );

    // Iridescent rim — shifts purple→violet→cyan with time + normal angle
    float iriAngle = dot(normalize(vNormal), vec3(0.577, 0.577, 0.577));
    float iriPhase = iriAngle * 2.5 + uTime * 0.45;
    float iriT     = sin(iriPhase) * 0.5 + 0.5;
    vec3  rimColor = mix(purple, cyan, iriT);
    rimColor = mix(rimColor, violet, sin(uTime * 0.28) * 0.35 + 0.35);

    // Horizontal scan lines — tech / hologram feel
    float scanH = sin(vPosition.y * 22.0 + uTime * 0.5) * 0.5 + 0.5;
    float lineH = smoothstep(0.93, 1.0, scanH) * 0.22;

    // Diagonal scan lines — subtle secondary grid
    float scanD = sin((vPosition.x + vPosition.y) * 14.0 - uTime * 0.3) * 0.5 + 0.5;
    float lineD = smoothstep(0.95, 1.0, scanD) * 0.12;

    float lines = lineH + lineD;

    // Compose: dark glass interior + bright iridescent rim + scan lines
    vec3 color = surfaceBase;
    color += rimColor * fresnel * 1.15;
    color += lines * mix(cyan, vec3(0.9, 0.95, 1.0), 0.5);

    // Alpha: nearly transparent centre, opaque at rim — real glass silhouette
    float alpha = 0.12 + fresnel * 0.75 + lines * 0.28;

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`;

// ─── Outer atmospheric glow plane (fullscreen quad, additive) ─────────────────
const GLOW_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const GLOW_FRAG = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2  c    = vUv - 0.5;
    float dist = length(c);

    // Primary purple glow, centre-ish
    float g1 = exp(-dist * 2.8) * (0.7 + 0.3 * sin(uTime * 0.4));
    // Cyan halo ring slightly larger
    float g2 = exp(-(dist - 0.28) * (dist - 0.28) * 18.0) * (0.5 + 0.2 * cos(uTime * 0.35));

    vec3 purple = vec3(0.486, 0.227, 0.929);
    vec3 cyan   = vec3(0.024, 0.714, 0.831);
    vec3 color  = purple * g1 * 0.35 + cyan * g2 * 0.28;

    gl_FragColor = vec4(color, (g1 + g2) * 0.9);
  }
`;

// ─── Main holographic object ──────────────────────────────────────────────────
function HoloObject({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef    = useRef<THREE.Mesh>(null);
  const groupRef   = useRef<THREE.Group>(null);
  const glowRef    = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget  = useRef(new THREE.Vector2(0, 0));
  const mouseCurrent = useRef(new THREE.Vector2(0, 0));

  const holoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader:   HOLO_VERT,
        fragmentShader: HOLO_FRAG,
        uniforms: { uTime: { value: 0 } },
        transparent:  true,
        depthWrite:   false,
        side:         THREE.DoubleSide,
        blending:     THREE.NormalBlending,
      }),
    []
  );

  const glowUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  // Throttled mouse tracking
  useEffect(() => {
    let pending = false;
    let lx = 0, ly = 0;
    const onMove = (e: MouseEvent) => {
      lx = e.clientX; ly = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        mouseTarget.current.set(
          (lx / window.innerWidth)  * 2 - 1,
          -(ly / window.innerHeight) * 2 + 1
        );
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    const t = delta;
    holoMat.uniforms.uTime.value += t * 0.9;
    if (glowRef.current) glowRef.current.uniforms.uTime.value += t * 0.7;

    // Slow self-rotation — Y dominant, slight X wobble
    if (meshRef.current) {
      meshRef.current.rotation.y += t * 0.18;
      meshRef.current.rotation.x += t * 0.07;
    }

    // Mouse parallax on group — smooth lerp for "heavy object" inertia feel
    mouseCurrent.current.lerp(mouseTarget.current, 0.038);
    if (groupRef.current) {
      groupRef.current.rotation.y = mouseCurrent.current.x  * 0.28;
      groupRef.current.rotation.x = -mouseCurrent.current.y * 0.18;
    }
  });

  useEffect(() => () => holoMat.dispose(), [holoMat]);

  return (
    <group ref={groupRef}>
      {/* Atmospheric glow behind the object */}
      <mesh position={[0, 0, -0.5]} frustumCulled={false}>
        <planeGeometry args={[7, 7]} />
        <shaderMaterial
          ref={glowRef}
          vertexShader={GLOW_VERT}
          fragmentShader={GLOW_FRAG}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* The object — Float adds gentle breathing lift */}
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
        <mesh ref={meshRef} material={holoMat}>
          {/* subdivision 4 — smooth, 642 vertices, very light */}
          <icosahedronGeometry args={[1.85, 4]} />
        </mesh>
      </Float>
    </group>
  );
}

// ─── Exported canvas — renders only the right portion of the hero ─────────────
export function HeroCanvas({
  active,
  reducedMotion = false,
}: {
  active: boolean;
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      frameloop="always"
      camera={{ position: [0, 0, 4.5], fov: 52, near: 0.1, far: 20 }}
      gl={{
        antialias:             true,
        powerPreference:       "high-performance",
        alpha:                 true,   // transparent bg — CSS handles the dark bg
        stencil:               false,
        preserveDrawingBuffer: false,
      }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]}  intensity={1.2} color="#7C3AED" />
      <pointLight position={[-4, -3, 2]} intensity={0.8} color="#06B6D4" />
      {active && <HoloObject reducedMotion={reducedMotion} />}
    </Canvas>
  );
}

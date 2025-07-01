"use client";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// GLSL shaders
const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec2 uMouse;

    float hash(float n) { return fract(sin(n) * 43758.5453); }

    float noise(vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f*f*(3.0 - 2.0*f);

        float n = p.x + p.y*57.0 + 113.0*p.z;

        return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                                     mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
                             mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                                     mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
    }

    void main() {
        vNormal = normal;
        vPosition = position;

        vec2 m = uMouse * 2.0 - 1.0;
        float mouseInfluence = clamp(length(m), 0.2, 1.0);

        float n = noise(position * 4.0 + uTime * 1.5);
        float spike = sin(uTime * 10.0 + position.x * 20.0) * 0.2;
        float deform = (n * 0.5 + spike) * mouseInfluence;

        vec3 newPosition = position + normal * deform;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`;

const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
        vec3 baseColor = vec3(0.1, 0.1, 0.2);
        vec3 highlight = vec3(0.6, 0.6, 0.8);

        float lighting = dot(normalize(vNormal), normalize(vec3(0.5, 1.0, 1.0)));
        lighting = clamp(lighting, 0.0, 1.0);

        vec3 color = mix(baseColor, highlight, pow(lighting, 2.0));
        gl_FragColor = vec4(color, 1.0);
    }
`;

function DeformedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  });

  // Animate time
  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();
  });

  // Mouse tracking
  const { gl } = useThree();
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      uniforms.current.uMouse.value.x =
        event.clientX / gl.domElement.clientWidth;
      uniforms.current.uMouse.value.y =
        1.0 - event.clientY / gl.domElement.clientHeight;
    };
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    return () => {
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gl]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.7, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}

function ThreeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 70 }}>
      <DeformedSphere />
    </Canvas>
  );
}

export default ThreeCanvas;

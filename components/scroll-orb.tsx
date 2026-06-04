"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Icosahedron, Float, MeshDistortMaterial } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import type { Group, Mesh } from "three"

function Orb() {
  const group = useRef<Group>(null)
  const inner = useRef<Mesh>(null)
  const wire = useRef<Mesh>(null)

  // scroll progress 0 -> 1 across the document
  const progress = useRef(0)
  const target = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      target.current = max > 0 ? window.scrollY / max : 0
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useFrame((_, delta) => {
    // smooth follow
    progress.current += (target.current - progress.current) * Math.min(1, delta * 5)
    const p = progress.current

    if (group.current) {
      // travel: starts centered & large, drifts down-right and shrinks slightly
      group.current.position.y = 0.2 - p * 3.6
      group.current.position.x = -0.2 + Math.sin(p * Math.PI * 1.2) * 1.4
      group.current.position.z = -p * 1.2
      const scale = 1 - p * 0.35
      group.current.scale.setScalar(scale)

      // continuous rotation that accelerates with scroll
      group.current.rotation.y += delta * (0.15 + p * 0.9)
      group.current.rotation.x += delta * (0.05 + p * 0.4)
    }

    if (inner.current) {
      const m = inner.current.material as { distort?: number; speed?: number }
      if (m && "distort" in m) m.distort = 0.25 + p * 0.55
      if (m && "speed" in m) m.speed = 1 + p * 3
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group}>
        {/* Solid distorting core — bright light blue */}
        <Icosahedron ref={inner} args={[1.1, 6]}>
          <MeshDistortMaterial
            color="#bfe4ff"
            emissive="#7cc4ff"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.2}
            distort={0.3}
            speed={1.4}
          />
        </Icosahedron>

        {/* Wireframe shell — soft dark lines */}
        <Icosahedron ref={wire} args={[1.45, 1]}>
          <meshBasicMaterial color="#2a2a2a" wireframe transparent opacity={0.35} />
        </Icosahedron>

        {/* Outer faint shell — soft dark lines */}
        <Icosahedron args={[1.85, 0]}>
          <meshBasicMaterial color="#2a2a2a" wireframe transparent opacity={0.16} />
        </Icosahedron>
      </group>
    </Float>
  )
}

export function ScrollOrb() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ contain: "strict" }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.95} color="#eaf5ff" />
        <directionalLight position={[3, 4, 5]} intensity={1.3} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#7ec8ff" />
        <directionalLight position={[0, -3, 2]} intensity={0.35} color="#cfe8ff" />
        <Orb />
      </Canvas>
    </div>
  )
}

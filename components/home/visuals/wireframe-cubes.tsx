'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

const WIREFRAME_POSITIONS = [
  [-1, 1, 1],
  [1, 1, 1],
  [-1, -1, 1],
  [1, -1, 1],
  [-1, 1, -1],
  [1, 1, -1],
  [-1, -1, -1],
  [1, -1, -1],
] as const

const THEME_COLOR_MAP = {
  light: { wireframe: '#0A0A0A', accent: '#007BFF' },
  night: { wireframe: '#FFFFFF', accent: '#007BFF' },
  black: { wireframe: '#FFFFFF', accent: '#007BFF' },
  cyberpunk: { wireframe: '#00FFFF', accent: '#FF00FF' },
} as const

function WireframeCube({
  position,
  scale = 0.8,
}: {
  position: readonly [number, number, number]
  scale?: number
}) {
  const { theme } = useTheme()
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)

  const themeColors = THEME_COLOR_MAP[(theme as keyof typeof THEME_COLOR_MAP) ?? 'night']
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(scale, scale, scale), [scale])
  const edgeGeometry = useMemo(() => new THREE.EdgesGeometry(boxGeometry), [boxGeometry])

  useFrame((state) => {
    if (!meshRef.current || !edgesRef.current) {
      return
    }

    const elapsedTime = state.clock.getElapsedTime()
    const [, baseY, z] = position
    const floatingOffset = Math.sin(elapsedTime * 0.5 + position[0] + z) * 0.05

    meshRef.current.position.y = baseY + floatingOffset
    edgesRef.current.position.y = baseY + floatingOffset
  })

  return (
    <group position={[position[0], position[1], position[2]]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[scale, scale, scale]} />
        <meshBasicMaterial transparent opacity={0.02} color={themeColors.accent} />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgeGeometry}>
        <lineBasicMaterial color={themeColors.wireframe} linewidth={2} />
      </lineSegments>
    </group>
  )
}

export function WireframeCubes() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer, viewport } = useThree()
  const rotationTargetRef = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return
    }

    rotationTargetRef.current.x = pointer.y * 0.2
    rotationTargetRef.current.y = pointer.x * 0.2

    groupRef.current.rotation.x += (rotationTargetRef.current.x - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (rotationTargetRef.current.y - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} scale={viewport.width > 10 ? 1 : 0.7}>
      {WIREFRAME_POSITIONS.map((position, index) => (
        <WireframeCube key={index} position={position} />
      ))}
    </group>
  )
}

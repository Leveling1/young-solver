'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useActiveThemeMode } from '@/hooks/use-active-theme-mode'

type Segment = [THREE.Vector3, THREE.Vector3]

const THEME_COLORS = {
  light: {
    points: '#9CA3AF',
    lines: '#9CA3AF',
  },
  dark: {
    points: '#A7AFBB',
    lines: '#A7AFBB',
  },
  black: {
    points: '#A7AFBB',
    lines: '#A7AFBB',
  },
} as const

const CUBE_LAYOUT = [
  { x: -4.2, y: 2.2, z: -4.8, size: 0.76 },
  { x: -1.6, y: 0.9, z: -3.6, size: 0.88 },
  { x: 1.5, y: -0.1, z: -4.4, size: 0.82 },
  { x: 4.4, y: 1.5, z: -5.4, size: 0.94 },
  { x: -3.2, y: -2.1, z: -5.9, size: 0.72 },
  { x: 0.3, y: -2.6, z: -4.9, size: 0.84 },
  { x: 3.4, y: 2.8, z: -6.3, size: 0.68 },
] as const

function createCubeGeometry(cx: number, cy: number, cz: number, size: number) {
  const width = size * 0.88
  const height = size * 0.52

  const top = new THREE.Vector3(cx, cy - size, cz)
  const topRight = new THREE.Vector3(cx + width, cy - height, cz)
  const center = new THREE.Vector3(cx, cy, cz)
  const topLeft = new THREE.Vector3(cx - width, cy - height, cz)
  const bottomLeft = new THREE.Vector3(cx - width, cy + height, cz)
  const bottom = new THREE.Vector3(cx, cy + size, cz)
  const bottomRight = new THREE.Vector3(cx + width, cy + height, cz)

  const segments: Segment[] = [
    [top, topRight],
    [topRight, center],
    [center, topLeft],
    [topLeft, top],
    [topLeft, bottomLeft],
    [bottomLeft, bottom],
    [bottom, center],
    [center, bottomRight],
    [bottomRight, bottom],
    [topRight, bottomRight],
  ]

  const sampledDots: THREE.Vector3[] = []
  segments.forEach(([start, end]) => {
    const steps = 4
    for (let step = 0; step <= steps; step += 1) {
      sampledDots.push(new THREE.Vector3().lerpVectors(start, end, step / steps))
    }
  })

  return { segments, sampledDots }
}

export function CursorCubeConstellation() {
  const { activeThemeMode } = useActiveThemeMode()
  const { viewport, pointer } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  const themeKey = activeThemeMode === 'black' ? 'black' : 'light'
  const colors = THEME_COLORS[themeKey]

  const { linePositions, pointPositions } = useMemo(() => {
    const segments: Segment[] = []
    const dots: THREE.Vector3[] = []

    CUBE_LAYOUT.forEach((cube) => {
      const { segments: cubeSegments, sampledDots } = createCubeGeometry(cube.x, cube.y, cube.z, cube.size)
      segments.push(...cubeSegments)
      dots.push(...sampledDots)
    })

    const segmentArray = new Float32Array(segments.length * 6)
    segments.forEach(([start, end], index) => {
      const offset = index * 6
      segmentArray[offset] = start.x
      segmentArray[offset + 1] = start.y
      segmentArray[offset + 2] = start.z
      segmentArray[offset + 3] = end.x
      segmentArray[offset + 4] = end.y
      segmentArray[offset + 5] = end.z
    })

    const dotArray = new Float32Array(dots.length * 3)
    dots.forEach((dot, index) => {
      const offset = index * 3
      dotArray[offset] = dot.x
      dotArray[offset + 1] = dot.y
      dotArray[offset + 2] = dot.z
    })

    return {
      linePositions: segmentArray,
      pointPositions: dotArray,
    }
  }, [])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) {
      return
    }

    const elapsed = state.clock.getElapsedTime()
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.x * 0.45, 0.06)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -pointer.y * 0.34, 0.06)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, pointer.x * -0.12, 0.05)
    group.position.x = THREE.MathUtils.lerp(group.position.x, pointer.x * 0.95, 0.08)
    group.position.y = THREE.MathUtils.lerp(group.position.y, pointer.y * 0.65, 0.08)
    group.position.z = THREE.MathUtils.lerp(group.position.z, Math.sin(elapsed * 0.35) * 0.18, 0.05)
  })

  return (
    <group ref={groupRef} scale={viewport.width > 9 ? 0.88 : 0.68}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={colors.points}
          size={0.034}
          sizeAttenuation
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={colors.lines} transparent opacity={0.055} />
      </lineSegments>
    </group>
  )
}

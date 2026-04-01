'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

type ParticleData = {
  target: THREE.Vector3
  origin: THREE.Vector3
  drift: number
  speed: number
  size: number
  scatter: THREE.Vector3
}

type Segment = [THREE.Vector3, THREE.Vector3]

type CubeSpec = {
  x: number
  y: number
  z: number
  brokenEdges: string[]
}

type HeroLogoInteraction = {
  active: boolean
  x: number
  y: number
}

const THEME_PARTICLE_COLORS = {
  light: '#0A0A0A',
  dark: '#FFFFFF',
  black: '#FFFFFF',
} as const

const ISO_RADIUS = 1.58
const ISO_WIDTH = ISO_RADIUS * 0.866
const ISO_HEIGHT = ISO_RADIUS * 0.5
const SPACING = 0.96
const AMBIENT_PARTICLE_COUNT = 84

function createCubeSegments(cx: number, cy: number, cz: number, brokenEdges: string[] = []): Segment[] {
  const top = new THREE.Vector3(cx, cy - 2 * ISO_HEIGHT, cz)
  const topRight = new THREE.Vector3(cx + ISO_WIDTH, cy - ISO_HEIGHT, cz)
  const center = new THREE.Vector3(cx, cy, cz)
  const topLeft = new THREE.Vector3(cx - ISO_WIDTH, cy - ISO_HEIGHT, cz)
  const bottomLeft = new THREE.Vector3(cx - ISO_WIDTH, cy + ISO_HEIGHT, cz)
  const bottom = new THREE.Vector3(cx, cy + 2 * ISO_HEIGHT, cz)
  const bottomRight = new THREE.Vector3(cx + ISO_WIDTH, cy + ISO_HEIGHT, cz)

  const segments: Segment[] = []

  const pushEdge = (start: THREE.Vector3, end: THREE.Vector3, edgeName: string) => {
    if (brokenEdges.includes(edgeName)) {
      const edgeStart = new THREE.Vector3().lerpVectors(start, end, 0.32)
      const edgeEnd = new THREE.Vector3().lerpVectors(start, end, 0.68)
      segments.push([start, edgeStart], [edgeEnd, end])
      return
    }

    segments.push([start, end])
  }

  pushEdge(top, topRight, 'top_right')
  pushEdge(topRight, center, 'inner_top_right')
  pushEdge(center, topLeft, 'inner_top_left')
  pushEdge(topLeft, top, 'top_left')
  pushEdge(topLeft, bottomLeft, 'left_vertical')
  pushEdge(bottomLeft, bottom, 'bottom_left')
  pushEdge(bottom, center, 'inner_bottom_left')
  pushEdge(center, bottomRight, 'inner_bottom_right')
  pushEdge(bottomRight, bottom, 'bottom_right')
  pushEdge(topRight, bottomRight, 'right_vertical')

  return segments
}

function createLogoSegments() {
  const horizontalOffset = 2 * ISO_WIDTH * SPACING
  const diagonalOffset = 2 * ISO_HEIGHT * SPACING
  const verticalOffset = 4 * ISO_HEIGHT * SPACING

  const cubes: CubeSpec[] = [
    { x: 0, y: 0, z: 0.84, brokenEdges: [] },
    { x: 0, y: -verticalOffset, z: 0.28, brokenEdges: ['top_left', 'top_right'] },
    { x: horizontalOffset, y: -diagonalOffset, z: 0.5, brokenEdges: ['top_right', 'right_vertical'] },
    { x: horizontalOffset, y: diagonalOffset, z: 0.38, brokenEdges: ['right_vertical', 'bottom_right'] },
    { x: 0, y: verticalOffset, z: 0.68, brokenEdges: ['bottom_right', 'bottom_left'] },
    { x: -horizontalOffset, y: diagonalOffset, z: 0.38, brokenEdges: ['bottom_left', 'left_vertical'] },
    { x: -horizontalOffset, y: -diagonalOffset, z: 0.5, brokenEdges: ['left_vertical', 'top_left'] },
  ]

  return cubes.flatMap((cube) => createCubeSegments(cube.x, cube.y, cube.z, cube.brokenEdges))
}

function createParticleCloud(segments: Segment[]) {
  const particles: ParticleData[] = []

  segments.forEach(([start, end], segmentIndex) => {
    const length = start.distanceTo(end)
    const sampleCount = Math.max(8, Math.round(length * 8.8))

    for (let index = 0; index <= sampleCount; index += 1) {
      const progress = index / sampleCount
      const target = new THREE.Vector3().lerpVectors(start, end, progress)
      const angle = Math.random() * Math.PI * 2
      const radius = 6.2 + Math.random() * 6.8
      const originZ = -4.4 + Math.sin(angle) * 2.8
      const normalized = new THREE.Vector3(target.x, target.y, target.z * 1.2).normalize()
      const scatter = normalized.multiplyScalar(1.15 + Math.random() * 1.45)
      scatter.z += (Math.random() - 0.5) * 1.8

      particles.push({
        target,
        origin: new THREE.Vector3(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 7.4,
          originZ,
        ),
        drift: segmentIndex * 0.16 + Math.random() * Math.PI,
        speed: 0.42 + Math.random() * 0.66,
        size: progress === 0 || progress === 1 ? 0.074 : 0.056,
        scatter,
      })
    }
  })

  for (let index = 0; index < AMBIENT_PARTICLE_COUNT; index += 1) {
    const ambientTarget = new THREE.Vector3(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 9,
      -5.8 + Math.random() * 2.2,
    )

    particles.push({
      target: ambientTarget,
      origin: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        -6.2 + Math.random() * 2.8,
      ),
      drift: Math.random() * Math.PI * 2,
      speed: 0.12 + Math.random() * 0.18,
      size: 0.014 + Math.random() * 0.012,
      scatter: new THREE.Vector3(
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 1.8,
      ),
    })
  }

  return particles
}

export function LogoParticleField() {
  const { resolvedTheme, theme } = useTheme()
  const { viewport, pointer } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const interactionRef = useRef<HeroLogoInteraction>({ active: false, x: 0, y: 0 })
  const hoverMixRef = useRef(0)

  const activeTheme =
    theme === 'black' ? 'black' : resolvedTheme === 'dark' ? 'dark' : 'light'
  const particleColor = THEME_PARTICLE_COLORS[activeTheme]

  useEffect(() => {
    const handleInteraction = (event: Event) => {
      const customEvent = event as CustomEvent<HeroLogoInteraction>
      interactionRef.current = customEvent.detail
    }

    window.addEventListener('hero-logo-interaction', handleInteraction as EventListener)

    return () => window.removeEventListener('hero-logo-interaction', handleInteraction as EventListener)
  }, [])

  const { particles, linePositions, initialPositions } = useMemo(() => {
    const segments = createLogoSegments()
    const particleCloud = createParticleCloud(segments)

    const linePositionArray = new Float32Array(segments.length * 6)
    segments.forEach(([start, end], index) => {
      const offset = index * 6
      linePositionArray[offset] = start.x
      linePositionArray[offset + 1] = start.y
      linePositionArray[offset + 2] = start.z
      linePositionArray[offset + 3] = end.x
      linePositionArray[offset + 4] = end.y
      linePositionArray[offset + 5] = end.z
    })

    const initialPointPositions = new Float32Array(particleCloud.length * 3)
    particleCloud.forEach((particle, index) => {
      const offset = index * 3
      initialPointPositions[offset] = particle.origin.x
      initialPointPositions[offset + 1] = particle.origin.y
      initialPointPositions[offset + 2] = particle.origin.z
    })

    return {
      particles: particleCloud,
      linePositions: linePositionArray,
      initialPositions: initialPointPositions,
    }
  }, [])

  useFrame((state) => {
    const group = groupRef.current
    const points = pointsRef.current
    const lines = lineRef.current

    if (!group || !points || !lines) {
      return
    }

    const positionAttribute = points.geometry.attributes.position as THREE.BufferAttribute
    const lineMaterial = lines.material as THREE.LineBasicMaterial
    const elapsedTime = state.clock.getElapsedTime()
    const introProgress = Math.min(elapsedTime / 2.9, 1)
    const introMix = 1 - Math.pow(1 - introProgress, 3)
    const hoverTarget = interactionRef.current.active ? 1 : 0
    hoverMixRef.current = THREE.MathUtils.lerp(hoverMixRef.current, hoverTarget, interactionRef.current.active ? 0.14 : 0.08)

    const hoverMix = hoverMixRef.current
    const cursorX = interactionRef.current.active ? interactionRef.current.x : pointer.x * 0.48
    const cursorY = interactionRef.current.active ? interactionRef.current.y : pointer.y * 0.42

    particles.forEach((particle, index) => {
      const offset = index * 3
      const flutterX = Math.sin(elapsedTime * particle.speed + particle.drift) * particle.size * 0.62
      const flutterY = Math.cos(elapsedTime * particle.speed * 1.08 + particle.drift) * particle.size * 0.52
      const flutterZ = Math.sin(elapsedTime * particle.speed * 0.72 + particle.drift) * particle.size * 0.34

      const scatterStrength = hoverMix * (1.2 + Math.abs(cursorX) * 0.9 + Math.abs(cursorY) * 0.8)
      const cursorScatterX = cursorX * (0.35 + particle.size * 8.5)
      const cursorScatterY = cursorY * (0.28 + particle.size * 7.2)
      const cursorScatterZ = (Math.abs(cursorX) + Math.abs(cursorY)) * 0.34

      positionAttribute.array[offset] = THREE.MathUtils.lerp(
        particle.origin.x,
        particle.target.x + flutterX + particle.scatter.x * scatterStrength + cursorScatterX,
        introMix,
      )
      positionAttribute.array[offset + 1] = THREE.MathUtils.lerp(
        particle.origin.y,
        particle.target.y + flutterY - particle.scatter.y * scatterStrength - cursorScatterY,
        introMix,
      )
      positionAttribute.array[offset + 2] = THREE.MathUtils.lerp(
        particle.origin.z,
        particle.target.z + flutterZ + particle.scatter.z * scatterStrength + cursorScatterZ,
        introMix,
      )
    })

    positionAttribute.needsUpdate = true

    lineMaterial.opacity = THREE.MathUtils.lerp(
      0.08,
      1 - hoverMix * 0.72,
      Math.max(0, (introProgress - 0.38) / 0.62),
    )

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, cursorX * 0.38, 0.08)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -cursorY * 0.28, 0.08)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, cursorX * -0.08, 0.06)
    group.position.x = THREE.MathUtils.lerp(group.position.x, cursorX * 0.72, 0.08)
    group.position.y = THREE.MathUtils.lerp(group.position.y, cursorY * 0.54, 0.08)
  })

  return (
    <group ref={groupRef} scale={viewport.width > 9 ? 0.78 : 0.6}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={particleColor}
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={particleColor} transparent opacity={0.12} />
      </lineSegments>
    </group>
  )
}

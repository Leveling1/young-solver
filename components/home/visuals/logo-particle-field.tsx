'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { CanvasStage } from '@/components/home/visuals/canvas-stage' // Assurez-vous que le chemin est correct

export function HeroScene() {
  return (
    <CanvasStage className="absolute inset-0 h-full w-full">
      <fog attach="fog" args={['#000000', 7, 22]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 4, 6]} intensity={1.2} />
      <LogoParticleField />
    </CanvasStage>
  )
}

type ParticleData = {
  target: THREE.Vector3
  origin: THREE.Vector3
  drift: number
  speed: number
  size: number
}

type Segment = [THREE.Vector3, THREE.Vector3]

const THEME_PARTICLE_COLORS = {
  light: '#0A0A0A',
  night: '#FFFFFF',
  black: '#FFFFFF',
  cyberpunk: '#C8FFF8',
} as const

// --- NOUVELLE LOGIQUE GÉOMÉTRIQUE ---

const ISO_RADIUS = 1.6; // Taille globale d'un cube
const W = ISO_RADIUS * 0.866; // Largeur isométrique (cos 30)
const H = ISO_RADIUS * 0.5;   // Hauteur isométrique (sin 30)
const SPACING = 1.18; // Espacement entre les cubes (1 = collés, >1 = espacés)

function getCubeEdges(cx: number, cy: number, brokenEdges: string[] = []): Segment[] {
  const top = new THREE.Vector3(cx, cy - 2 * H, 0);
  const topRight = new THREE.Vector3(cx + W, cy - H, 0);
  const center = new THREE.Vector3(cx, cy, 0);
  const topLeft = new THREE.Vector3(cx - W, cy - H, 0);
  const bottomLeft = new THREE.Vector3(cx - W, cy + H, 0);
  const bottom = new THREE.Vector3(cx, cy + 2 * H, 0);
  const bottomRight = new THREE.Vector3(cx + W, cy + H, 0);

  const segments: Segment[] = [];

  const addEdge = (p1: THREE.Vector3, p2: THREE.Vector3, edgeName: string) => {
    if (brokenEdges.includes(edgeName)) {
      // Crée une coupure au milieu de la ligne pour l'effet pochoir
      const gapStart = 0.32; // Fin du premier bout de ligne
      const gapEnd = 0.68;   // Début du deuxième bout de ligne
      const p1a = new THREE.Vector3().lerpVectors(p1, p2, gapStart);
      const p2a = new THREE.Vector3().lerpVectors(p1, p2, gapEnd);
      segments.push([p1, p1a]);
      segments.push([p2a, p2]);
    } else {
      segments.push([p1, p2]);
    }
  };

  // Face supérieure
  addEdge(top, topRight, 'top_right');
  addEdge(topRight, center, 'inner_top_right');
  addEdge(center, topLeft, 'inner_top_left');
  addEdge(topLeft, top, 'top_left');
  // Face gauche
  addEdge(topLeft, bottomLeft, 'left_vertical');
  addEdge(bottomLeft, bottom, 'bottom_left');
  addEdge(bottom, center, 'inner_bottom_left');
  // Face droite
  addEdge(center, bottomRight, 'inner_bottom_right');
  addEdge(bottomRight, bottom, 'bottom_right');
  addEdge(topRight, bottomRight, 'right_vertical');

  return segments;
}

function createLogoSegments() {
  const segments: Segment[] = [];
  const cx = 0;
  const cy = 0;
  
  // Vecteurs de déplacement pour positionner les cubes
  const dx = 2 * W * SPACING;
  const dy = 2 * H * SPACING;
  const dyStraight = 4 * H * SPACING;

  // On ajoute les 7 cubes en spécifiant exactement quelles arêtes extérieures doivent être coupées
  // 1. Cube Central (complet)
  segments.push(...getCubeEdges(cx, cy, []));
  // 2. Cube Haut
  segments.push(...getCubeEdges(cx, cy - dyStraight, ['top_left', 'top_right']));
  // 3. Cube Haut-Droit
  segments.push(...getCubeEdges(cx + dx, cy - dy, ['top_right', 'right_vertical']));
  // 4. Cube Bas-Droit
  segments.push(...getCubeEdges(cx + dx, cy + dy, ['right_vertical', 'bottom_right']));
  // 5. Cube Bas
  segments.push(...getCubeEdges(cx, cy + dyStraight, ['bottom_right', 'bottom_left']));
  // 6. Cube Bas-Gauche
  segments.push(...getCubeEdges(cx - dx, cy + dy, ['bottom_left', 'left_vertical']));
  // 7. Cube Haut-Gauche
  segments.push(...getCubeEdges(cx - dx, cy - dy, ['left_vertical', 'top_left']));

  return segments;
}

// --- RESTE DU CODE INCHANGÉ ---

function sampleParticlesFromSegments(segments: Segment[]) {
  const particles: ParticleData[] = []
  const sampledTargets: THREE.Vector3[] = []

  segments.forEach(([start, end], segmentIndex) => {
    const segmentLength = start.distanceTo(end)
    const samples = Math.max(8, Math.round(segmentLength * 8.5)) // Légèrement augmenté pour des lignes plus denses

    for (let index = 0; index <= samples; index += 1) {
      const progress = index / samples
      const target = new THREE.Vector3().lerpVectors(start, end, progress)
      sampledTargets.push(target)

      const angle = Math.random() * Math.PI * 2
      const radius = 7 + Math.random() * 8
      const verticalSpread = (Math.random() - 0.5) * 7.2

      particles.push({
        target,
        origin: new THREE.Vector3(
          Math.cos(angle) * radius,
          verticalSpread,
          Math.sin(angle) * 3.6 - 3,
        ),
        drift: segmentIndex * 0.17 + Math.random() * Math.PI,
        speed: 0.45 + Math.random() * 0.7,
        size: progress === 0 || progress === 1 ? 0.075 : 0.058,
      })
    }
  })

  for (let index = 0; index < 260; index += 1) {
    particles.push({
      target: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        -8.5 + Math.random() * 18,
        -5.2 + Math.random() * 2.3,
      ),
      origin: new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        -9 + Math.random() * 18,
        -6 + Math.random() * 2.4,
      ),
      drift: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.2,
      size: 0.02 + Math.random() * 0.015,
    })
  }

  return { particles, sampledTargets }
}

export function LogoParticleField() {
  const { theme } = useTheme()
  const { viewport, pointer } = useThree()
  const pointsRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.LineSegments>(null)

  const particleColor = THEME_PARTICLE_COLORS[(theme as keyof typeof THEME_PARTICLE_COLORS) ?? 'night']

  const { particles, linePositions, initialPositions } = useMemo(() => {
    const segments = createLogoSegments()
    const { particles: particleCloud } = sampleParticlesFromSegments(segments)

    const segmentPositions = new Float32Array(segments.length * 2 * 3)
    segments.forEach(([start, end], index) => {
      const offset = index * 6
      segmentPositions[offset] = start.x
      segmentPositions[offset + 1] = start.y
      segmentPositions[offset + 2] = start.z
      segmentPositions[offset + 3] = end.x
      segmentPositions[offset + 4] = end.y
      segmentPositions[offset + 5] = end.z
    })

    const pointPositions = new Float32Array(particleCloud.length * 3)
    particleCloud.forEach((particle, index) => {
      pointPositions[index * 3] = particle.origin.x
      pointPositions[index * 3 + 1] = particle.origin.y
      pointPositions[index * 3 + 2] = particle.origin.z
    })

    return {
      particles: particleCloud,
      linePositions: segmentPositions,
      initialPositions: pointPositions,
    }
  }, [])

  useFrame((state) => {
    const points = pointsRef.current
    const lines = lineRef.current

    if (!points || !lines) {
      return
    }

    const pointPositions = points.geometry.attributes.position as THREE.BufferAttribute
    const lineMaterial = lines.material as THREE.LineBasicMaterial
    const elapsedTime = state.clock.getElapsedTime()
    const introProgress = Math.min(elapsedTime / 3.2, 1)
    const easedProgress = 1 - Math.pow(1 - introProgress, 3)
    const pointerX = pointer.x * 0.22
    const pointerY = pointer.y * 0.18

    particles.forEach((particle, index) => {
      const attributeIndex = index * 3
      const flutterX = Math.sin(elapsedTime * particle.speed + particle.drift) * particle.size * 0.7
      const flutterY = Math.cos(elapsedTime * particle.speed * 1.1 + particle.drift) * particle.size * 0.55
      const backgroundBias = index >= particles.length - 260 ? 1 : 0

      pointPositions.array[attributeIndex] = THREE.MathUtils.lerp(
        particle.origin.x,
        particle.target.x + flutterX + pointerX * (backgroundBias === 1 ? 1.1 : 0.25),
        easedProgress,
      )
      pointPositions.array[attributeIndex + 1] = THREE.MathUtils.lerp(
        particle.origin.y,
        particle.target.y + flutterY - pointerY * (backgroundBias === 1 ? 0.8 : 0.18),
        easedProgress,
      )
      pointPositions.array[attributeIndex + 2] = THREE.MathUtils.lerp(
        particle.origin.z,
        particle.target.z + Math.sin(elapsedTime * particle.speed * 0.7 + particle.drift) * particle.size * 0.4,
        easedProgress,
      )
    })

    pointPositions.needsUpdate = true

    lineMaterial.opacity = THREE.MathUtils.lerp(0.1, 1, Math.max(0, (introProgress - 0.42) / 0.58))

    points.rotation.y = THREE.MathUtils.lerp(points.rotation.y, pointer.x * 0.08, 0.035)
    points.rotation.x = THREE.MathUtils.lerp(points.rotation.x, -pointer.y * 0.05, 0.035)
    lines.rotation.y = points.rotation.y
    lines.rotation.x = points.rotation.x
  })

  return (
    <group scale={viewport.width > 9 ? 0.75 : 0.58}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={particleColor}
          size={0.074}
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
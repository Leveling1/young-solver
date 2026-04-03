'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { useActiveThemeMode } from '@/hooks/use-active-theme-mode'

type HeroLogoInteraction = {
  active: boolean
  x: number
  y: number
}

type ParticleData = {
  target: THREE.Vector3
  origin: THREE.Vector3
  scatter: THREE.Vector3
  drift: number
  speed: number
}

const THEME_PARTICLE_COLORS = {
  light: '#6B7280',
  black: '#8D96A3',
} as const

const LOGO_SOURCE = '/images/logo-black.png'
const LOGO_WIDTH = 7.25
const SAMPLE_STEP = 8

function createParticleCloudFromLogo(image: HTMLImageElement | HTMLCanvasElement) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', { willReadFrequently: true })

  if (!context) {
    return {
      bounds: { height: LOGO_WIDTH, width: LOGO_WIDTH },
      initialPositions: new Float32Array(),
      particles: [] as ParticleData[],
    }
  }

  canvas.width = image.width
  canvas.height = image.height
  context.drawImage(image, 0, 0)

  const { data, height, width } = context.getImageData(0, 0, canvas.width, canvas.height)
  const logoHeight = LOGO_WIDTH * (height / width)
  const particles: ParticleData[] = []

  for (let y = 0; y < height; y += SAMPLE_STEP) {
    for (let x = 0; x < width; x += SAMPLE_STEP) {
      const pixelIndex = (y * width + x) * 4
      const alpha = data[pixelIndex + 3]

      if (alpha < 42) {
        continue
      }

      const target = new THREE.Vector3(
        (x / width - 0.5) * LOGO_WIDTH,
        (0.5 - y / height) * logoHeight,
        (Math.random() - 0.5) * 0.24,
      )

      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 7.4 + Math.random() * 3.8
      const origin = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * radius,
        (Math.random() - 0.5) * 8.8,
        Math.cos(phi) * radius - 5.2,
      )

      particles.push({
        target,
        origin,
        scatter: new THREE.Vector3(
          (Math.random() - 0.5) * 2.6,
          (Math.random() - 0.5) * 2.6,
          (Math.random() - 0.5) * 2.1,
        ),
        drift: Math.random() * Math.PI * 2,
        speed: 0.45 + Math.random() * 0.65,
      })
    }
  }

  const initialPositions = new Float32Array(particles.length * 3)

  particles.forEach((particle, index) => {
    const offset = index * 3
    initialPositions[offset] = particle.origin.x
    initialPositions[offset + 1] = particle.origin.y
    initialPositions[offset + 2] = particle.origin.z
  })

  return {
    bounds: { width: LOGO_WIDTH, height: logoHeight },
    initialPositions,
    particles,
  }
}

export function LogoParticleField() {
  const { activeThemeMode } = useActiveThemeMode()
  const { pointer, viewport } = useThree()
  const logoTexture = useLoader(THREE.TextureLoader, LOGO_SOURCE)
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const interactionRef = useRef<HeroLogoInteraction>({ active: false, x: 0, y: 0 })
  const interactionActiveRef = useRef(false)
  const animationStateRef = useRef({ hover: 0, intro: 0 })

  const particleColor = THEME_PARTICLE_COLORS[activeThemeMode]

  const { bounds, initialPositions, particles } = useMemo(() => {
    return createParticleCloudFromLogo(logoTexture.image as HTMLImageElement)
  }, [logoTexture])

  useEffect(() => {
    const introTween = gsap.to(animationStateRef.current, {
      duration: 1.9,
      ease: 'power4.out',
      intro: 1,
    })

    const handleInteraction = (event: Event) => {
      const customEvent = event as CustomEvent<HeroLogoInteraction>
      interactionRef.current = customEvent.detail

      if (interactionActiveRef.current === customEvent.detail.active) {
        return
      }

      interactionActiveRef.current = customEvent.detail.active

      gsap.to(animationStateRef.current, {
        duration: customEvent.detail.active ? 0.32 : 0.72,
        ease: customEvent.detail.active ? 'power3.out' : 'power3.inOut',
        hover: customEvent.detail.active ? 1 : 0,
        overwrite: true,
      })
    }

    window.addEventListener('hero-logo-interaction', handleInteraction as EventListener)

    return () => {
      introTween.kill()
      window.removeEventListener('hero-logo-interaction', handleInteraction as EventListener)
      gsap.killTweensOf(animationStateRef.current)
    }
  }, [])

  useFrame((state) => {
    const group = groupRef.current
    const points = pointsRef.current

    if (!group || !points) {
      return
    }

    const positionAttribute = points.geometry.attributes.position as THREE.BufferAttribute
    const elapsedTime = state.clock.getElapsedTime()
    const introMix = animationStateRef.current.intro
    const hoverMix = animationStateRef.current.hover

    const cursorX = interactionRef.current.active ? interactionRef.current.x : pointer.x * 0.36
    const cursorY = interactionRef.current.active ? interactionRef.current.y : pointer.y * 0.28
    const focusX = cursorX * bounds.width * 0.48
    const focusY = -cursorY * bounds.height * 0.48
    const focusRadius = Math.max(0.88, bounds.width * 0.16)

    particles.forEach((particle, index) => {
      const offset = index * 3
      const driftX = Math.sin(elapsedTime * particle.speed + particle.drift) * 0.028
      const driftY = Math.cos(elapsedTime * (particle.speed * 0.92) + particle.drift) * 0.02
      const driftZ = Math.sin(elapsedTime * (particle.speed * 0.65) + particle.drift) * 0.036

      const deltaX = particle.target.x - focusX
      const deltaY = particle.target.y - focusY
      const distance = Math.hypot(deltaX, deltaY)
      const localInfluence = interactionRef.current.active
        ? Math.max(0, 1 - distance / focusRadius)
        : 0
      const scatterMix = hoverMix * localInfluence * localInfluence
      const safeDistance = distance || 0.0001
      const repelX = (deltaX / safeDistance) * scatterMix * 1.5
      const repelY = (deltaY / safeDistance) * scatterMix * 1.1
      const repelZ = scatterMix * 0.64

      positionAttribute.array[offset] = THREE.MathUtils.lerp(
        particle.origin.x,
        particle.target.x + driftX + particle.scatter.x * scatterMix * 0.7 + repelX,
        introMix,
      )
      positionAttribute.array[offset + 1] = THREE.MathUtils.lerp(
        particle.origin.y,
        particle.target.y + driftY + particle.scatter.y * scatterMix * 0.65 + repelY,
        introMix,
      )
      positionAttribute.array[offset + 2] = THREE.MathUtils.lerp(
        particle.origin.z,
        particle.target.z + driftZ + particle.scatter.z * scatterMix * 0.5 + repelZ,
        introMix,
      )
    })

    positionAttribute.needsUpdate = true

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, cursorX * 0.28, 0.08)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -cursorY * 0.2, 0.08)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, cursorX * -0.05, 0.05)
    group.position.x = THREE.MathUtils.lerp(group.position.x, cursorX * 0.5, 0.08)
    group.position.y = THREE.MathUtils.lerp(group.position.y, cursorY * 0.32, 0.08)
  })

  return (
    <group ref={groupRef} scale={viewport.width > 9 ? 1.04 : 0.78}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={particleColor}
          size={viewport.width > 9 ? 0.042 : 0.052}
          sizeAttenuation
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

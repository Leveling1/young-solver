'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

type FloatingCubeConfig = {
  position: THREE.Vector3
  rotation: THREE.Euler
  speed: number
  scale: number
  offset: number
  burstSpeed: number
}

const THEME_ACCENT_MAP = {
  light: '#007BFF',
  night: '#007BFF',
  black: '#007BFF',
  cyberpunk: '#FF00FF',
} as const

export function FloatingCubes({ count = 30 }: { count?: number }) {
  const { theme } = useTheme()
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const animationStartRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false)

  const color = THEME_ACCENT_MAP[(theme as keyof typeof THEME_ACCENT_MAP) ?? 'night']
  const cubeConfigs = useMemo<FloatingCubeConfig[]>(
    () =>
      Array.from({ length: count }, () => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5,
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ),
        speed: Math.random() * 0.5 + 0.2,
        scale: Math.random() * 0.15 + 0.05,
        offset: Math.random() * Math.PI * 2,
        burstSpeed: Math.random() * 15 + 10,
      })),
    [count],
  )
  const dummyObject = useMemo(() => new THREE.Object3D(), [])

  useEffect(() => {
    const canvasElement = document.querySelector('canvas')

    if (!canvasElement?.parentElement) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedIntro) {
            setIsVisible(true)
            animationStartRef.current = null
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(canvasElement.parentElement)

    return () => observer.disconnect()
  }, [hasPlayedIntro])

  useFrame((state) => {
    const mesh = meshRef.current

    if (!mesh) {
      return
    }

    const elapsedTime = state.clock.getElapsedTime()

    if (isVisible && animationStartRef.current === null) {
      animationStartRef.current = elapsedTime
    }

    const introProgress =
      isVisible && animationStartRef.current !== null
        ? Math.min((elapsedTime - animationStartRef.current) / 2, 1)
        : 0
    const easedProgress = 1 - Math.pow(1 - introProgress, 3)
    const burstMultiplier = isVisible ? 1 - easedProgress : 0

    if (introProgress >= 1 && !hasPlayedIntro) {
      setHasPlayedIntro(true)
    }

    cubeConfigs.forEach((cubeConfig, index) => {
      dummyObject.position.copy(cubeConfig.position)
      dummyObject.position.y += Math.sin(elapsedTime * cubeConfig.speed + cubeConfig.offset) * 0.5

      dummyObject.rotation.x =
        cubeConfig.rotation.x + elapsedTime * cubeConfig.speed * 0.3 + elapsedTime * cubeConfig.burstSpeed * burstMultiplier
      dummyObject.rotation.y =
        cubeConfig.rotation.y + elapsedTime * cubeConfig.speed * 0.2 + elapsedTime * cubeConfig.burstSpeed * 0.8 * burstMultiplier
      dummyObject.rotation.z =
        cubeConfig.rotation.z + elapsedTime * cubeConfig.speed * 0.15 + elapsedTime * cubeConfig.burstSpeed * 0.6 * burstMultiplier

      const scaleMultiplier = isVisible ? easedProgress : 0.3
      dummyObject.scale.setScalar(cubeConfig.scale * scaleMultiplier)

      dummyObject.updateMatrix()
      mesh.setMatrixAt(index, dummyObject.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} wireframe />
    </instancedMesh>
  )
}

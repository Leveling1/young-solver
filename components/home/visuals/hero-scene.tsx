'use client'

import { useTheme } from 'next-themes'
import { CanvasStage } from '@/components/home/visuals/canvas-stage'
import { CursorCubeConstellation } from '@/components/home/visuals/cursor-cube-constellation'
import { LogoParticleField } from '@/components/home/visuals/logo-particle-field'

export function HeroScene() {
  const { resolvedTheme, theme } = useTheme()
  const isBlackTheme = theme === 'black' || resolvedTheme === 'dark'

  return (
    <CanvasStage className="absolute inset-0 h-full w-full">
      <fog attach="fog" args={[isBlackTheme ? '#000000' : '#F8F8F8', 7, 22]} />
      <ambientLight intensity={isBlackTheme ? 0.54 : 0.72} />
      <pointLight position={[0, 4, 6]} intensity={isBlackTheme ? 1.05 : 0.8} />
      <CursorCubeConstellation />
      <LogoParticleField />
    </CanvasStage>
  )
}

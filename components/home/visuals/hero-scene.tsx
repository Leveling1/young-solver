'use client'

import { CanvasStage } from '@/components/home/visuals/canvas-stage'
import { CursorCubeConstellation } from '@/components/home/visuals/cursor-cube-constellation'
import { LogoParticleField } from '@/components/home/visuals/logo-particle-field'
import { useActiveThemeMode } from '@/hooks/use-active-theme-mode'

export function HeroScene({ className }: { className?: string }) {
  const { activeThemeMode } = useActiveThemeMode()
  const isBlackTheme = activeThemeMode === 'black'

  return (
    <CanvasStage className={className ?? 'absolute inset-0 h-full w-full'}>
      <fog attach="fog" args={[isBlackTheme ? '#000000' : '#f8f8f8d3', 7, 22]} />
      <ambientLight intensity={isBlackTheme ? 0.48 : 0.68} />
      <pointLight position={[0, 4, 6]} intensity={isBlackTheme ? 1.05 : 0.82} />
      <pointLight position={[-3, -2, 5]} intensity={isBlackTheme ? 0.36 : 0.18} color={isBlackTheme ? '#3B82F6' : '#0A0A0A'} />
      <CursorCubeConstellation />
      <LogoParticleField />
    </CanvasStage>
  )
}

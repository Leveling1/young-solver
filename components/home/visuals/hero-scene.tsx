'use client'

import { CanvasStage } from '@/components/home/visuals/canvas-stage'
import { LogoParticleField } from '@/components/home/visuals/logo-particle-field'

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

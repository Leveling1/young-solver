'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export function CanvasStage({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.7 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}

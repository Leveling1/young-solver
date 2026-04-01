import { ImageResponse } from 'next/og'
import { SOCIAL_PREVIEW_CONTENT } from '@/content/site-config'

export const alt = 'Young Solver social preview'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
export const revalidate = 86400

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at top left, rgba(0,123,255,0.35), transparent 28%), linear-gradient(135deg, #020617 0%, #0a0a0a 55%, #111827 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.25,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            padding: '58px 64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <div
              style={{
                display: 'flex',
                height: 56,
                width: 56,
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
              }}
            />
            <div
              style={{
                display: 'flex',
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: '-0.03em',
              }}
            >
              {SOCIAL_PREVIEW_CONTENT.eyebrow}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              maxWidth: 920,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 74,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: '-0.05em',
              }}
            >
              {SOCIAL_PREVIEW_CONTENT.title}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 34,
                lineHeight: 1.2,
                color: 'rgba(255,255,255,0.88)',
                letterSpacing: '-0.03em',
              }}
            >
              {SOCIAL_PREVIEW_CONTENT.subtitle}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 14,
              }}
            >
              {['Web', 'Mobile', 'Desktop', 'Cloud', 'IA'].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.14)',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '10px 18px',
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 24,
                color: 'rgba(255,255,255,0.72)',
              }}
            >
              {SOCIAL_PREVIEW_CONTENT.caption}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}

import { ImageResponse } from 'next/og'

export const alt = 'All Solutions - Young Solver'
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
          flexDirection: 'column',
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              margin: '0 0 24px 0',
            }}
          >
            Our Solutions
          </h1>
          <p
            style={{
              fontSize: 36,
              color: '#007BFF',
              margin: '0 0 16px 0',
            }}
          >
            SaaS Products
          </p>
          <p
            style={{
              fontSize: 24,
              color: '#999999',
              margin: 0,
            }}
          >
            Workflow • Operations • AI Content
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

'use client'

import Link from 'next/link'

type ScrollLinkProps = {
  href: `#${string}`
  className?: string
  onClick?: () => void
  children: React.ReactNode
  ariaLabel?: string
}

function getTargetId(href: `#${string}`) {
  return href.slice(1)
}

export function ScrollLink({ href, className, onClick, children, ariaLabel }: ScrollLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const targetId = getTargetId(href)
    const targetElement = document.getElementById(targetId)

    if (!targetElement) {
      return
    }

    window.history.replaceState(null, '', href)
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    onClick?.()
  }

  return (
    <Link href={href} scroll={false} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  )
}

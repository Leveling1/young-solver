'use client'

import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

type ShowcaseCardProps = {
  title: string
  subtitle: string
  description: string
  image: string
  tags: readonly string[]
  href?: string
  githubHref?: string
  showGithubButton?: boolean 
}

export function ShowcaseCard({
  title,
  subtitle,
  description,
  image,
  tags,
  href = '#',
  githubHref = '#',
  showGithubButton = false,
}: ShowcaseCardProps) {
  return (
    <article className="group flex h-full w-full max-w-[18.75rem] flex-col rounded-[1rem] border border-border/60 bg-card p-3 pb-1 shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-[background-color,border-color,color,box-shadow] dark:shadow-[0_16px_36px_rgba(0,0,0,0.2)]">
      <Link
        href={href}
        className="block overflow-hidden rounded-[0.8rem] border border-border/60 bg-background"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </Link>

      <div className="flex flex-1 flex-col pt-2">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Link
            href={href}
            className="text-[1.35rem] font-medium leading-none tracking-[-0.03em] text-foreground transition-colors hover:text-primary"
          >
            {title}
          </Link>
          <ArrowUpRight className="h-4 w-4 text-foreground/85 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <p className="mb-4 text-[0.92rem] leading-snug text-muted-foreground">{subtitle}</p>

        <p className="mb-2 max-w-[98%] text-[0.92rem] leading-[1.42] text-foreground/92">
          {description}
        </p>

        <div className={cn('flex flex-wrap gap-2', showGithubButton ? 'mt-auto mb-3' : 'mt-4 mb-0')}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#b6ff3b] mb-3 px-3 py-1 text-[0.74rem] font-semibold text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        {showGithubButton ? (
          <Link
            href={githubHref}
            className="inline-flex h-9 w-full mb-2 items-center justify-center rounded-full bg-foreground px-4 mb-0 text-[0.92rem] font-semibold text-background transition-transform duration-200 hover:scale-[1.01]"
          >
            <Github className="mr-2 h-4 w-4 shrink-0 text-background" />
            Voir le code Github
          </Link>
        ) : null}
      </div>
    </article>
  )
}

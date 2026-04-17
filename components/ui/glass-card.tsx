import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

export function GlassCard({ children, className, hover = true, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-xl p-6',
        hover && 'transition-colors duration-200 hover:border-primary/40',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

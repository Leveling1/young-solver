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
        hover && 'transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

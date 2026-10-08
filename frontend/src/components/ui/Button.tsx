import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  primary: 'bg-volt text-ink hover:bg-volt-dim shadow-[0_8px_25px_rgba(186,255,59,.08)]',
  outline: 'border border-line text-bone hover:border-volt/60 hover:text-volt bg-transparent',
  ghost: 'text-bone hover:text-volt bg-transparent',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-cursor="click"
        className={`inline-flex items-center justify-center gap-2 rounded-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'


import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`h-11 rounded-lg border border-line bg-surface2 px-4 text-sm text-bone outline-none transition-colors placeholder:text-muted/60 focus:border-volt ${className}`}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export function Select({
  label,
  className = '',
  id,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`h-11 rounded-lg border border-line bg-surface2 px-4 text-sm text-bone outline-none transition-colors focus:border-volt ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

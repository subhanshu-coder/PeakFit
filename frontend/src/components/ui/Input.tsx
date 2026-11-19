import { type InputHTMLAttributes, forwardRef, useId } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const generatedInputId = useId()
    const inputId = id ?? generatedInputId
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`h-12 rounded-[3px] border border-line bg-[#0c100c] px-4 text-sm text-bone outline-none transition-colors placeholder:text-muted/60 focus:border-volt focus-visible:ring-2 focus-visible:ring-volt/70 ${className}`}
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
  const generatedSelectId = useId()
  const selectId = id ?? generatedSelectId
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={selectId} className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`h-12 rounded-[3px] border border-line bg-[#0c100c] px-4 text-sm text-bone outline-none transition-colors focus:border-volt focus-visible:ring-2 focus-visible:ring-volt/70 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}


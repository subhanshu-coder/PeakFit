import type { HTMLAttributes } from 'react'

type Tone = 'volt' | 'violet' | 'muted'

const tones: Record<Tone, string> = {
  volt: 'bg-volt/10 text-volt border-volt/30',
  violet: 'bg-violet/10 text-violet border-violet/30',
  muted: 'bg-white/5 text-muted border-line',
}

export function Badge({
  tone = 'muted',
  className = '',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${tones[tone]} ${className}`}
      {...props}
    />
  )
}

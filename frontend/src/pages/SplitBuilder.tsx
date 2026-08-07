import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface PlanDay {
  day: string
  label: string
  muscles: string[]
}

interface Plan {
  id: string
  days: PlanDay[]
}

export default function SplitBuilder() {
  const navigate = useNavigate()
  const [plan, setPlan] = useState<Plan | null>(null)
  const [muscles, setMuscles] = useState<string[]>([])
  const [draft, setDraft] = useState<Record<string, string[]>>({})
  const [savingDay, setSavingDay] = useState<string | null>(null)

  useEffect(() => {
    api.get('/plan').then((r) => {
      setPlan(r.data.plan)
      const initial: Record<string, string[]> = {}
      r.data.plan.days.forEach((d: PlanDay) => (initial[d.day] = d.muscles))
      setDraft(initial)
    })
    api.get('/exercises/muscles').then((r) => setMuscles(r.data.muscles))
  }, [])

  function toggle(day: string, muscle: string) {
    setDraft((prev) => {
      const current = prev[day] ?? []
      const next = current.includes(muscle)
        ? current.filter((m) => m !== muscle)
        : [...current, muscle]
      return { ...prev, [day]: next }
    })
  }

  async function saveDay(day: string) {
    if (!plan) return
    setSavingDay(day)
    try {
      await api.patch(`/plan/${plan.id}/day/${day}`, { muscles: draft[day] })
    } finally {
      setSavingDay(null)
    }
  }

  if (!plan) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-muted">
        No plan found. Generate one from the dashboard first.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-wider text-volt">Customize</span>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Build Your Own Split</h1>
      <p className="mt-3 max-w-xl text-muted">
        Toggle muscle groups per day. Exercises auto-fill from the library when you save.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {plan.days.map((d) => (
          <Card key={d.day} className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">{d.day}</span>
                <h3 className="font-display text-xl tracking-wide">{d.label}</h3>
              </div>
              <Button size="sm" onClick={() => saveDay(d.day)} disabled={savingDay === d.day}>
                {savingDay === d.day ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Day
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {muscles.map((m) => {
                const active = draft[d.day]?.includes(m)
                return (
                  <button
                    key={m}
                    type="button"
                    data-cursor="toggle"
                    onClick={() => toggle(d.day, m)}
                    className="transition-transform active:scale-95"
                  >
                    <Badge tone={active ? 'volt' : 'muted'} className="cursor-pointer">
                      {m}
                    </Badge>
                  </button>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="mt-8" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
    </div>
  )
}

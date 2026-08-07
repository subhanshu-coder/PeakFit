import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Flame, Settings2, ChevronRight } from 'lucide-react'
import { api } from '@/lib/api'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuthStore } from '@/store/auth'

interface ExerciseRef {
  id: number
  name: string
  muscle: string
  equipment: string
  defaultSets: number
  defaultReps: string
}

interface PlanDay {
  day: string
  label: string
  muscles: string[]
  exercises: ExerciseRef[]
}

interface Plan {
  id: string
  splitType: string
  label: string
  days: PlanDay[]
}

interface Template {
  key: string
  label: string
  description: string
}

export default function Dashboard() {
  const user = useAuthStore((s) => s.user)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  async function loadPlan() {
    try {
      const { data } = await api.get('/plan')
      setPlan(data.plan)
    } catch {
      setPlan(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    api.get('/plan/templates').then((r) => setTemplates(r.data.templates))
    loadPlan()
  }, [])

  async function generate(splitType: string) {
    setGenerating(true)
    try {
      const { data } = await api.post('/plan/generate', { splitType })
      setPlan(data.plan)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-volt">
          {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Your Program'}
        </span>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Weekly Split</h1>
      </div>

      {loading ? (
        <p className="mt-10 text-muted">Loading your program…</p>
      ) : !plan ? (
        <div className="mt-10">
          <p className="mb-6 max-w-xl text-muted">
            No program yet. Pick a template to auto-build your Monday–Saturday split — every
            muscle trained twice a week by default. You can customize any day afterward.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {templates.map((t) => (
              <Card key={t.key} className="flex flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-xl tracking-wide">{t.label}</h3>
                  <p className="mt-2 text-sm text-muted">{t.description}</p>
                </div>
                <Button
                  className="mt-6 w-full"
                  disabled={generating}
                  onClick={() => generate(t.key)}
                >
                  Use This Split
                </Button>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Badge tone="volt">{plan.label}</Badge>
            <Link to="/split-builder">
              <Button variant="outline" size="sm">
                <Settings2 className="h-4 w-4" />
                Customize Split
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plan.days.map((d, i) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card
                  className={`h-full p-6 ${
                    d.muscles.length === 0 ? 'opacity-50' : 'hover:border-volt/40'
                  } transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">
                      {d.day}
                    </span>
                    {d.muscles.length > 0 && <Flame className="h-4 w-4 text-volt" />}
                  </div>
                  <h3 className="mt-2 font-display text-2xl tracking-wide">{d.label}</h3>

                  {d.muscles.length === 0 ? (
                    <p className="mt-3 text-sm text-muted">Recovery day.</p>
                  ) : (
                    <>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {d.muscles.map((m) => (
                          <Badge key={m} tone="muted">
                            {m}
                          </Badge>
                        ))}
                      </div>
                      <ul className="mt-4 flex flex-col gap-1.5">
                        {d.exercises.slice(0, 4).map((ex) => (
                          <li
                            key={ex.id}
                            className="flex items-center justify-between text-sm text-bone/90"
                          >
                            <span className="flex items-center gap-1.5">
                              <ChevronRight className="h-3.5 w-3.5 text-volt" />
                              {ex.name}
                            </span>
                            <span className="font-mono text-xs text-muted">
                              {ex.defaultSets}×{ex.defaultReps}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

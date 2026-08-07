import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Flame, Beef, Wheat, Droplet } from 'lucide-react'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'

interface Meal {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface DietResult {
  bmr: number
  tdee: number
  calories: number
  protein: number
  carbs: number
  fat: number
  meals: Meal[]
}

export default function Diet() {
  const [form, setForm] = useState({
    sex: 'male',
    weightKg: '',
    heightCm: '',
    age: '',
    activity: 'moderate',
    goal: 'maintain',
  })
  const [result, setResult] = useState<DietResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data } = await api.post('/diet/calculate', form)
      setResult(data.diet)
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-wider text-volt">Nutrition</span>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Diet Plan</h1>
      <p className="mt-3 max-w-xl text-muted">
        Calories and macros calculated from your stats and goal, split evenly across your day.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        <Card className="h-fit p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Select label="Sex" value={form.sex} onChange={(e) => update('sex', e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Weight (kg)"
                type="number"
                min={30}
                value={form.weightKg}
                onChange={(e) => update('weightKg', e.target.value)}
                required
              />
              <Input
                label="Height (cm)"
                type="number"
                min={100}
                value={form.heightCm}
                onChange={(e) => update('heightCm', e.target.value)}
                required
              />
            </div>
            <Input
              label="Age"
              type="number"
              min={14}
              value={form.age}
              onChange={(e) => update('age', e.target.value)}
              required
            />
            <Select
              label="Activity Level"
              value={form.activity}
              onChange={(e) => update('activity', e.target.value)}
            >
              <option value="sedentary">Sedentary (desk job, no training)</option>
              <option value="light">Light (1-3 sessions/week)</option>
              <option value="moderate">Moderate (3-5 sessions/week)</option>
              <option value="active">Active (6-7 sessions/week)</option>
              <option value="athlete">Athlete (2x/day training)</option>
            </Select>
            <Select label="Goal" value={form.goal} onChange={(e) => update('goal', e.target.value)}>
              <option value="cut">Cut — lose fat</option>
              <option value="maintain">Maintain</option>
              <option value="bulk">Bulk — build muscle</option>
            </Select>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? 'Calculating…' : 'Calculate My Plan'}
            </Button>
          </form>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Flame, label: 'Calories', value: result.calories, unit: 'kcal' },
                { icon: Beef, label: 'Protein', value: result.protein, unit: 'g' },
                { icon: Wheat, label: 'Carbs', value: result.carbs, unit: 'g' },
                { icon: Droplet, label: 'Fat', value: result.fat, unit: 'g' },
              ].map((m) => (
                <Card key={m.label} className="p-5">
                  <m.icon className="h-5 w-5 text-volt" />
                  <p className="mt-3 font-mono text-2xl font-semibold">{m.value}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {m.label} ({m.unit})
                  </p>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                BMR {result.bmr} kcal · TDEE {result.tdee} kcal
              </p>
            </Card>

            <div>
              <h2 className="font-display text-2xl tracking-wide">Meal Breakdown</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {result.meals.map((meal) => (
                  <Card key={meal.name}>
                    <CardHeader>
                      <CardTitle>{meal.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between font-mono text-sm">
                      <span className="text-volt">{meal.calories} kcal</span>
                      <span className="text-muted">
                        P{meal.protein} · C{meal.carbs} · F{meal.fat}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

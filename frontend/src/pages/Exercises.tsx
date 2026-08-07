import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Input'

interface ExerciseRef {
  id: number
  name: string
  muscle: string
  equipment: string
  defaultSets: number
  defaultReps: string
}

export default function Exercises() {
  const [muscles, setMuscles] = useState<string[]>([])
  const [muscle, setMuscle] = useState('')
  const [exercises, setExercises] = useState<ExerciseRef[]>([])

  useEffect(() => {
    api.get('/exercises/muscles').then((r) => setMuscles(r.data.muscles))
  }, [])

  useEffect(() => {
    api
      .get('/exercises', { params: muscle ? { muscle } : {} })
      .then((r) => setExercises(r.data.exercises))
  }, [muscle])

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-wider text-volt">Library</span>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Exercise Library</h1>
      <p className="mt-3 max-w-xl text-muted">
        Every movement used to build your split, with default sets, reps, and equipment.
      </p>

      <div className="mt-8 max-w-xs">
        <Select label="Filter by muscle" value={muscle} onChange={(e) => setMuscle(e.target.value)}>
          <option value="">All muscles</option>
          {muscles.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((ex, i) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4) }}
          >
            <Card className="h-full p-6 transition-colors hover:border-volt/40">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl tracking-wide">{ex.name}</h3>
                <Badge tone="volt">{ex.muscle}</Badge>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">
                {ex.equipment}
              </p>
              <p className="mt-4 font-mono text-sm text-bone/90">
                {ex.defaultSets} sets × {ex.defaultReps}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

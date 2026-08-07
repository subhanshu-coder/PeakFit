import { useEffect, useState, type FormEvent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Plus, Trash2 } from 'lucide-react'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'

interface SetEntry {
  reps: string
  weight: string
}

interface Log {
  id: string
  day: string
  date: string
  entries: { exerciseId: number; exerciseName: string; sets: { reps: string; weight: string }[] }[]
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Progress() {
  const [day, setDay] = useState('Mon')
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState<SetEntry[]>([{ reps: '', weight: '' }])
  const [logs, setLogs] = useState<Log[]>([])
  const [chartExercise, setChartExercise] = useState('')
  const [chartData, setChartData] = useState<{ date: string; maxWeight: number }[]>([])

  async function loadLogs() {
    const { data } = await api.get('/logs')
    setLogs(data.logs)
  }

  useEffect(() => {
    loadLogs()
  }, [])

  useEffect(() => {
    if (!chartExercise) return
    api.get(`/logs/progress/${encodeURIComponent(chartExercise)}`).then((r) => {
      setChartData(
        r.data.points.map((p: any) => ({
          date: new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          maxWeight: p.maxWeight,
        }))
      )
    })
  }, [chartExercise])

  function updateSet(i: number, key: keyof SetEntry, value: string) {
    setSets((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!exerciseName.trim()) return
    await api.post('/logs', {
      day,
      entries: [{ exerciseId: 0, exerciseName, sets }],
    })
    setExerciseName('')
    setSets([{ reps: '', weight: '' }])
    loadLogs()
    if (exerciseName === chartExercise) {
      api.get(`/logs/progress/${encodeURIComponent(chartExercise)}`).then((r) => {
        setChartData(
          r.data.points.map((p: any) => ({
            date: new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            maxWeight: p.maxWeight,
          }))
        )
      })
    }
  }

  const loggedExerciseNames = Array.from(
    new Set(logs.flatMap((l) => l.entries.map((e) => e.exerciseName)))
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-wider text-volt">Tracking</span>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Progress</h1>
      <p className="mt-3 max-w-xl text-muted">
        Log every set you complete. Chart the top weight per exercise over time.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        <Card className="h-fit p-6">
          <h2 className="font-display text-xl tracking-wide">Log a Set</h2>
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
            <Select label="Day" value={day} onChange={(e) => setDay(e.target.value)}>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
            <Input
              label="Exercise"
              placeholder="e.g. Barbell Bench Press"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Sets</span>
              {sets.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    placeholder="Reps"
                    type="number"
                    value={s.reps}
                    onChange={(e) => updateSet(i, 'reps', e.target.value)}
                  />
                  <Input
                    placeholder="Weight (kg)"
                    type="number"
                    value={s.weight}
                    onChange={(e) => updateSet(i, 'weight', e.target.value)}
                  />
                  {sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSets((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-muted hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSets((prev) => [...prev, { reps: '', weight: '' }])}
              >
                <Plus className="h-4 w-4" />
                Add Set
              </Button>
            </div>

            <Button type="submit" className="mt-2 w-full">
              Save Log
            </Button>
          </form>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardTitle>Strength Progress</CardTitle>
              <Select
                value={chartExercise}
                onChange={(e) => setChartExercise(e.target.value)}
                className="w-56"
              >
                <option value="">Select an exercise</option>
                {loggedExerciseNames.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mt-6 h-72">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="#2A2A33" strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#8B8B96" fontSize={11} />
                    <YAxis stroke="#8B8B96" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: '#131318',
                        border: '1px solid #2A2A33',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="maxWeight"
                      stroke="#C6FF3A"
                      strokeWidth={2}
                      dot={{ fill: '#C6FF3A', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted">
                  Log a few sessions of an exercise to see its trend here.
                </div>
              )}
            </div>
          </Card>

          <div>
            <h2 className="font-display text-2xl tracking-wide">Recent Logs</h2>
            <div className="mt-4 flex flex-col gap-3">
              {logs
                .slice()
                .reverse()
                .slice(0, 8)
                .map((log) => (
                  <Card key={log.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{log.day}</CardTitle>
                        <span className="font-mono text-xs text-muted">
                          {new Date(log.date).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1">
                      {log.entries.map((entry, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{entry.exerciseName}</span>
                          <span className="font-mono text-muted">
                            {entry.sets.map((s) => `${s.weight}×${s.reps}`).join(', ')}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              {logs.length === 0 && (
                <p className="text-sm text-muted">No logs yet — save your first set.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

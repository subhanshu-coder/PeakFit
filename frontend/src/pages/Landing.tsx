import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Dumbbell,
  Salad,
  LineChart,
  Sparkles,
  Repeat,
  Target,
  ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const FEATURES = [
  {
    icon: Repeat,
    title: 'Science-Backed Splits',
    desc: 'Push/Pull/Legs, Upper/Lower, or fully custom — every muscle hits twice a week by default, tuned to how you actually recover.',
  },
  {
    icon: Target,
    title: 'Built Around You',
    desc: 'Swap any day, reassign muscle groups, or let FitForge auto-fill exercises from a 30+ movement library.',
  },
  {
    icon: Salad,
    title: 'Diet That Matches Training',
    desc: 'TDEE and macros calculated from your stats and goal, split across meals so nutrition tracks the same plan as your lifts.',
  },
  {
    icon: LineChart,
    title: 'Progress You Can See',
    desc: 'Log every set. Watch your top lifts trend upward on a real progress chart, not a spreadsheet you forget to open.',
  },
]

const STEPS = [
  { n: '01', title: 'Set your goal', desc: 'Cut, maintain, or bulk — tell us your stats once.' },
  { n: '02', title: 'Pick your split', desc: 'Choose a template or build Mon–Sat from scratch.' },
  { n: '03', title: 'Train & log', desc: 'Hit the gym, log sets, watch the numbers move.' },
]

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative border-b border-line/60">
        <div className="absolute inset-0 bg-grid bg-grid opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-volt">
              <Sparkles className="h-3.5 w-3.5" />
              Your program, built in minutes
            </span>

            <h1 className="max-w-3xl font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
              Train smart.
              <br />
              <span className="text-gradient">Track everything.</span>
            </h1>

            <p className="max-w-xl text-base text-muted sm:text-lg">
              FitForge builds your Monday-to-Saturday split, hits every muscle twice a week
              by default, and pairs it with a macro plan built for your goal — all in one place.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/signup">
                <Button size="lg" data-cursor="start">
                  Build My Program
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  I Have An Account
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { label: 'Exercises in library', value: '30+' },
              { label: 'Split templates', value: '3' },
              { label: 'Muscle exposures / week', value: '2x' },
              { label: 'Days fully customizable', value: '6' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-surface/60 p-5">
                <p className="font-mono text-3xl font-semibold text-volt">{s.value}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-volt">Why FitForge</span>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Everything a real program needs
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="group h-full p-8 transition-colors hover:border-volt/40">
                <f.icon className="h-7 w-7 text-volt" strokeWidth={1.75} />
                <h3 className="mt-5 font-display text-2xl tracking-wide">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-line/60 bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-volt">Process</span>
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Three steps to a plan</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span className="font-display text-7xl text-line">{s.n}</span>
                <h3 className="mt-2 font-display text-2xl tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-12 text-center sm:p-20">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <Dumbbell className="relative mx-auto h-10 w-10 text-volt" />
          <h2 className="relative mt-6 font-display text-4xl tracking-tight sm:text-5xl">
            Your split is one click away.
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted">
            Free to start. No card required. Six days, one program, built for you.
          </p>
          <Link to="/signup">
            <Button size="lg" className="relative mt-8">
              Build My Program
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

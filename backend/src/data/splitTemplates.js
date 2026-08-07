// Each template maps Mon-Sat to a list of muscle groups.
// Every muscle in a template is trained exactly twice across the week,
// which is the default "two times per muscle per week" program.

export const SPLIT_TEMPLATES = {
  ppl_2x: {
    label: 'Push / Pull / Legs — 2x per muscle',
    description:
      'Six days, each muscle trained twice. Push and pull days share upper-body volume, legs get a dedicated day twice a week.',
    days: {
      Mon: { label: 'Push A', muscles: ['chest', 'shoulders', 'triceps'] },
      Tue: { label: 'Pull A', muscles: ['back', 'biceps'] },
      Wed: { label: 'Legs A', muscles: ['quads', 'hamstrings', 'glutes', 'calves'] },
      Thu: { label: 'Push B', muscles: ['chest', 'shoulders', 'triceps'] },
      Fri: { label: 'Pull B', muscles: ['back', 'biceps'] },
      Sat: { label: 'Legs B', muscles: ['quads', 'hamstrings', 'glutes', 'core'] },
      Sun: { label: 'Rest', muscles: [] },
    },
  },
  upper_lower_3x: {
    label: 'Upper / Lower — 3x split',
    description:
      'Six days alternating upper and lower body, three exposures each, for lifters who recover fast and want higher frequency.',
    days: {
      Mon: { label: 'Upper A', muscles: ['chest', 'back', 'shoulders'] },
      Tue: { label: 'Lower A', muscles: ['quads', 'hamstrings', 'glutes'] },
      Wed: { label: 'Upper B', muscles: ['chest', 'back', 'triceps', 'biceps'] },
      Thu: { label: 'Lower B', muscles: ['quads', 'hamstrings', 'calves'] },
      Fri: { label: 'Upper C', muscles: ['shoulders', 'back', 'chest'] },
      Sat: { label: 'Lower C', muscles: ['glutes', 'hamstrings', 'core'] },
      Sun: { label: 'Rest', muscles: [] },
    },
  },
  bro_split: {
    label: 'Classic Bro Split — 1x per muscle',
    description: 'One dedicated day per major muscle group. Maximum focus, lower frequency.',
    days: {
      Mon: { label: 'Chest', muscles: ['chest'] },
      Tue: { label: 'Back', muscles: ['back'] },
      Wed: { label: 'Shoulders', muscles: ['shoulders'] },
      Thu: { label: 'Legs', muscles: ['quads', 'hamstrings', 'glutes', 'calves'] },
      Fri: { label: 'Arms', muscles: ['biceps', 'triceps'] },
      Sat: { label: 'Core & Weak Points', muscles: ['core'] },
      Sun: { label: 'Rest', muscles: [] },
    },
  },
}

export const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Muscle group keys used throughout the app
export const MUSCLES = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'quads',
  'hamstrings',
  'glutes',
  'calves',
  'core',
]

let _id = 1
const ex = (name, muscle, equipment, sets, reps) => ({
  id: _id++,
  name,
  muscle,
  equipment,
  defaultSets: sets,
  defaultReps: reps,
})

export const EXERCISES = [
  // Chest
  ex('Barbell Bench Press', 'chest', 'Barbell', 4, '6-8'),
  ex('Incline Dumbbell Press', 'chest', 'Dumbbell', 3, '8-10'),
  ex('Cable Fly', 'chest', 'Cable', 3, '12-15'),
  ex('Dips', 'chest', 'Bodyweight', 3, '8-12'),
  // Back
  ex('Deadlift', 'back', 'Barbell', 3, '4-6'),
  ex('Pull-Up', 'back', 'Bodyweight', 4, '6-10'),
  ex('Barbell Row', 'back', 'Barbell', 4, '6-8'),
  ex('Lat Pulldown', 'back', 'Cable', 3, '10-12'),
  ex('Seated Cable Row', 'back', 'Cable', 3, '10-12'),
  // Shoulders
  ex('Overhead Press', 'shoulders', 'Barbell', 4, '6-8'),
  ex('Lateral Raise', 'shoulders', 'Dumbbell', 4, '12-15'),
  ex('Rear Delt Fly', 'shoulders', 'Dumbbell', 3, '12-15'),
  ex('Face Pull', 'shoulders', 'Cable', 3, '15-20'),
  // Biceps
  ex('Barbell Curl', 'biceps', 'Barbell', 3, '8-10'),
  ex('Incline Dumbbell Curl', 'biceps', 'Dumbbell', 3, '10-12'),
  ex('Hammer Curl', 'biceps', 'Dumbbell', 3, '10-12'),
  // Triceps
  ex('Close-Grip Bench Press', 'triceps', 'Barbell', 3, '8-10'),
  ex('Overhead Triceps Extension', 'triceps', 'Dumbbell', 3, '10-12'),
  ex('Triceps Pushdown', 'triceps', 'Cable', 3, '12-15'),
  // Quads
  ex('Back Squat', 'quads', 'Barbell', 4, '5-8'),
  ex('Leg Press', 'quads', 'Machine', 4, '10-12'),
  ex('Walking Lunge', 'quads', 'Dumbbell', 3, '10-12 / leg'),
  ex('Leg Extension', 'quads', 'Machine', 3, '12-15'),
  // Hamstrings
  ex('Romanian Deadlift', 'hamstrings', 'Barbell', 4, '6-8'),
  ex('Seated Leg Curl', 'hamstrings', 'Machine', 3, '10-12'),
  ex('Nordic Curl', 'hamstrings', 'Bodyweight', 3, '6-10'),
  // Glutes
  ex('Hip Thrust', 'glutes', 'Barbell', 4, '8-10'),
  ex('Cable Kickback', 'glutes', 'Cable', 3, '12-15'),
  ex('Bulgarian Split Squat', 'glutes', 'Dumbbell', 3, '8-10 / leg'),
  // Calves
  ex('Standing Calf Raise', 'calves', 'Machine', 4, '10-15'),
  ex('Seated Calf Raise', 'calves', 'Machine', 3, '12-15'),
  // Core
  ex('Hanging Leg Raise', 'core', 'Bodyweight', 3, '10-15'),
  ex('Cable Crunch', 'core', 'Cable', 3, '12-15'),
  ex('Plank', 'core', 'Bodyweight', 3, '45-60s'),
]

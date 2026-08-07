const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
}

const GOAL_ADJUSTMENT = {
  cut: -0.2,
  maintain: 0,
  bulk: 0.15,
}

/**
 * @param {{ sex: 'male'|'female', weightKg: number, heightCm: number, age: number,
 *           activity: keyof typeof ACTIVITY_MULTIPLIERS, goal: keyof typeof GOAL_ADJUSTMENT }} input
 */
export function calculatePlan(input) {
  const { sex, weightKg, heightCm, age, activity, goal } = input

  const bmr =
    sex === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161

  const activityMultiplier = ACTIVITY_MULTIPLIERS[activity] ?? 1.375
  const tdee = bmr * activityMultiplier

  const adjustment = GOAL_ADJUSTMENT[goal] ?? 0
  const calories = Math.round(tdee * (1 + adjustment))

  const proteinG = Math.round(weightKg * 2.0)
  const fatCalories = calories * 0.25
  const fatG = Math.round(fatCalories / 9)
  const proteinCalories = proteinG * 4
  const carbCalories = Math.max(calories - proteinCalories - fatCalories, 0)
  const carbG = Math.round(carbCalories / 4)

  const meals = [
    { name: 'Breakfast', share: 0.25 },
    { name: 'Lunch', share: 0.3 },
    { name: 'Pre/Post Workout', share: 0.2 },
    { name: 'Dinner', share: 0.25 },
  ].map((m) => ({
    name: m.name,
    calories: Math.round(calories * m.share),
    protein: Math.round(proteinG * m.share),
    carbs: Math.round(carbG * m.share),
    fat: Math.round(fatG * m.share),
  }))

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calories,
    protein: proteinG,
    carbs: carbG,
    fat: fatG,
    meals,
  }
}

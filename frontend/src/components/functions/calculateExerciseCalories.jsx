export default function calculateExerciseCalories(userInfoData) {
  const exercise = userInfoData?.Exercise || [];

  const totalCalories = exercise.reduce(
    (sum, item) => sum + (item.calories || 0),
    0
  );

  return totalCalories;
}

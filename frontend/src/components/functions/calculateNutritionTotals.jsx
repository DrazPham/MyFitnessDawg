export default function calculateNutritionTotals(userInfoData) {
  const cart = userInfoData?.Cart || [];

  const total = cart.reduce(
    (acc, item) => ({
      calories: acc.calories + (item.calories || 0),
      fat: acc.fat + (item.fat || 0),
      protein: acc.protein + (item.protein || 0),
      carbs: acc.carbs + (item.carbs || 0),
    }),
    { calories: 0, fat: 0, protein: 0, carbs: 0 }
  );

  return total;
}


  const calculateMacros = (calories, goal) => {
    let proteinRatio, fatRatio;
    switch (goal) {
      case 'MuscleGain':
        proteinRatio = 0.25;
        fatRatio = 0.25;
        break;
      case 'WeightLoss':
      case 'Cutting':
        proteinRatio = 0.35;
        fatRatio = 0.25;
        break;
      case 'BodyRecomposition':
        proteinRatio = 0.3;
        fatRatio = 0.25;
        break;
      default:
        proteinRatio = 0.25;
        fatRatio = 0.25;
    }
    const proteinCalories = calories * proteinRatio;
    const fatCalories = calories * fatRatio;
    const carbCalories = calories - (proteinCalories + fatCalories);

    return {
      protein: Math.round(proteinCalories / 4),
      fat: Math.round(fatCalories / 9),
      carbs: Math.round(carbCalories / 4),
    };
  };

    export default calculateMacros;
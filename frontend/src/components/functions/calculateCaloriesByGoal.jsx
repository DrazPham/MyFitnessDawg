const calculateCaloriesByGoal = (tdee, goal) => {
    switch (goal) {
      case 'WeightLoss': return tdee - 500;
      case 'MuscleGain': return tdee + 500;
      case 'Maintenance': return tdee;
      case 'BodyRecomposition': return tdee - 200;
      case 'Cutting': return tdee - 700;
      default: return tdee;
    }
  };

  export default calculateCaloriesByGoal;
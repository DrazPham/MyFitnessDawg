// NutritionGoalsCard.jsx
import React from 'react';
import NutritionItem from './nutritionitems';
import Dropdown from 'src/components/common/menu/Dropdown.jsx'

const NutritionGoalsCard = () => {
  const goals = {
    Calories: { value: 2060, unit: '', percentage: null },
    Carbohydrates: { value: 258, unit: 'g', percentage: '50%' },
    Fat: { value: 69, unit: 'g', percentage: '30%' },
    Protein: { value: 103, unit: 'g', percentage: '20%' },
  };

  const dropdownOptions = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' }
  ];


  return (
    <div className = "dailyGoals">
      <h2>Daily Nutrition Goals</h2>
      {Object.entries(goals).map(([label, data]) => (
        <NutritionItem
          key={label}
          label={label}
          value={data.value}
          unit={data.unit}
          percentage={data.percentage}
        />
      ))}
        <Dropdown label="Select your framework:" options={dropdownOptions}  />
    </div>
  );
};

export default NutritionGoalsCard;
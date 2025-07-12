// NutritionGoalsCard.jsx
import React from 'react';
import NutritionItem from './nutritionitems';
import Dropdown from 'src/components/common/menu/Dropdown.jsx'
import { useContext } from "react";
import { userInfoContext } from "../index";


const NutritionGoalsCard = () => {

  const userInfoData = useContext(userInfoContext);
	

  const goals = {
    // Calories: { value: userInfoData.Calories, unit: '', percentage: null },
    // Carbohydrates: { value: userInfoData.Macros.carbs, unit: 'g', percentage: '50%' },
    // Fat: { value: userInfoData.Macros.fat, unit: 'g', percentage: '30%' },
    // Protein: { value: userInfoData.Macros.protein, unit: 'g', percentage: '20%' },
  };

  const dropdownOptions = [
    { label: 'Sedentary (little/no exercise)', value: '1.2' },
    { label: 'Light exercise (1-3 days/week)', value: '1.375' },
    { label: 'Moderate exercise (3-5 days/week)', value: '1.55' },
    { label: 'Heavy exercise (6-7 days/week)', value: '1.725' },
    { label: 'Very intense training', value: '1.9' }

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
        <Dropdown label="Select your activity level:" options={dropdownOptions}  />
    </div>
  );
};

export default NutritionGoalsCard;
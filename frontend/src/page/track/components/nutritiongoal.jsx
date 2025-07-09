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

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      borderRadius: '8px',
      width: '100%',
      fontFamily: 'sans-serif',
    }}>
      <h2>Daily Nutrition Goals</h2>
        {/* <Dropdown /> */}
      {Object.entries(goals).map(([label, data]) => (
        <NutritionItem
          key={label}
          label={label}
          value={data.value}
          unit={data.unit}
          percentage={data.percentage}
        />
      ))}
      <button style={{ marginTop: '12px' }}>Edit Goals</button>
      <div style={{ marginTop: '8px', fontSize: '12px', color: 'gray' }}>
        Custom Daily Goals: <span role="img" aria-label="lock">🔒</span> No
      </div>
    </div>
  );
};

export default NutritionGoalsCard;
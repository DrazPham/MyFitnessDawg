// NutritionItem.jsx
import React from 'react';

const NutritionItem = ({ label, value, unit, percentage }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
    <strong>{label}</strong>
    <span>
      {value} {unit} {percentage && `(${percentage})`}
    </span>
  </div>
);

export default NutritionItem;
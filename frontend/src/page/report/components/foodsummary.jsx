// FoodSummaryDashboard.jsx
import React from 'react';
import FoodCategoryCard from './foodcategorycard';

const foodData = [
  { title: 'Vegetables', description: 'Plants packed with flavor and nutrients.', count: 0 },
  { title: 'Fresh fruits', description: 'Sweet and satisfying to keep you fuller, longer.', count: 0 },
  { title: 'Proteins', description: 'Muscle-building meats, eggs, beans, and legumes.', count: 0 },
  { title: 'Sweets and snacks', description: 'When your sweet (or salty) tooth is calling.', count: 0 },
  { title: 'Alcoholic beverages', description: 'Your drinks count, too.', count: 0 },
];

const FoodSummaryDashboard = () => (
  <div className="dashboard">
    {foodData.map((item) => (
      <FoodCategoryCard
        key={item.title}
        title={item.title}
        description={item.description}
        count={item.count}
      />
    ))}
  </div>
);

export default FoodSummaryDashboard;
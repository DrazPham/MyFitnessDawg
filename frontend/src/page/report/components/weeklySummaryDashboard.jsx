// WeekSummaryDashboard.jsx
import React from 'react';
import CalorieStats from './caloriesstats';
import { FaBullseye, FaUtensils, FaFire } from 'react-icons/fa';

const WeekSummaryDashboard = () => (
  <div className="week-summary">
    <h2>Week At A Glance</h2>
    <p className="motivation">Keep it up! You logged in 2 out of 7 days this week.</p>

    <div className="stats">
      <CalorieStats
        icon={<FaBullseye />}
        label="Weekly Calorie Goal"
        value="14,420"
        color="#2d80fc"
      />
      <CalorieStats
        icon={<FaUtensils />}
        label="Calories Logged"
        value="0"
        color="#28a745"
      />
      <CalorieStats
        icon={<FaFire />}
        label="Calories Burned"
        value="0"
        color="#fd7e14"
      />
    </div>
  </div>
);

export default WeekSummaryDashboard;
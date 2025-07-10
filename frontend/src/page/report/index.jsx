import React, { useState,useEffect } from 'react';
import FoodSummaryDashboard from"./components/foodsummary"
import WeekSummaryDashboard from './components/weeklySummaryDashboard';
import WeightRecord from './components/weightRecord';
import "assets/css/report/index.css";

function Report(){
  return (
    <main>
      <div className ="wrapper aximo-all-section report">
        <WeightRecord/>
        <FoodSummaryDashboard/>
        <WeekSummaryDashboard/>
      </div>
    </main>
  );
};

export default Report
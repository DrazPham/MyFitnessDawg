import React from 'react';
import Banner from "assets/images/banner/Basebanner.png";
import "assets/css/base/FitnessBanner.css";
import HeaderButton from 'components/header/base/elements/HeaderButton';

const FitnessBanner = () => {
  return (
    <div className="fitness-banner">
      <div className="banner-content">
        <h2>#1 Nutrition Tracker Replica</h2>
        <h1>Fuel your day, the real way.</h1>
        <p>
          Master your meals, workouts, and goals—all from one powerful app.
        </p>
        <HeaderButton Title="Start Today"/>
      </div>
      <div className="app-preview">
        <img src={Banner} alt="App Preview" />
      </div>
    </div>
  );
};

export default FitnessBanner;
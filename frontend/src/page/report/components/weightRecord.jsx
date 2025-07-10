import React, { useState,useEffect } from 'react';
import ReportSelector from"./reportselector"
import ReportingPeriodSelector from"./periodselector"
import Chart from"./chart"
import ExportButton from "./exportbutton"

const generateDummyData = (days) => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < Number(days); i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    data.unshift({
      date: date.toISOString().split('T')[0],
      weight: Math.round(60 + Math.random() * 10),
    });
  }

  return data;
};

const WeightRecord = () => {
    const [reportType, setReportType] = useState('weight');
  const [period, setPeriod] = useState('7');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch or generate chart data based on reportType and period
    setData(generateDummyData(period)); 
  }, [reportType, period]);

  const handleExport = () => {
    // Export logic (CSV download, print, etc.)
  };

  return (
    <div className ="reportTable">
      <ReportSelector selectedReport={reportType} onChange={setReportType} />
      <ReportingPeriodSelector selectedPeriod={period} onSelect={setPeriod} />
      <Chart data={data} />
      <ExportButton onExport={handleExport} />
    </div>
  );
};

export default WeightRecord
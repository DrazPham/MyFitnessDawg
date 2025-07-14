import React, { useState,useEffect } from 'react';
import ReportSelector from"./reportselector"
import ReportingPeriodSelector from"./periodselector"
import Chart from"./chart"
import ExportButton from "./exportbutton"
import { useContext } from "react";
import UserInfoContext from "components/functions/UserInfoContext";


const getFilteredSortedData = (records, startDate, endDate, sortOrder = 'asc') => {
  const data = records
    // Lọc theo khoảng ngày
    .filter(record => {
      const recordDate = new Date(record.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || recordDate >= start) && (!end || recordDate <= end);
    })
    // Map lại chỉ lấy date và weight
    .map(record => ({
      date: record.date,
      weight: record.weight
    }))
    // Sắp xếp theo ngày
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return data;
};


const WeightRecord = ({ onDateChange }) => {
      if (!UserInfoContext) {
    return <div>Loading user info...</div>; // fallback an toàn nếu muốn thêm
    }
      const userInfoData = useContext(UserInfoContext).userInfo;

const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [reportType, setReportType] = useState('weight');
  const [period, setPeriod] = useState('7');
  const [data, setData] = useState([]);

  console.log(userInfoData)
  const records = userInfoData?.records || [];
    

  const handleStartChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    onDateChange(value, endDate);
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    onDateChange(startDate, value);
  };
  useEffect(() => {
    // Fetch or generate chart data based on reportType and period
    
  }, [reportType, period]);

  const handleExport = () => {
    setData(getFilteredSortedData(records, startDate, endDate)); 
  };
  console.log(data)

  return (
    <div className ="reportTable">
      <ReportSelector selectedReport={reportType} onChange={setReportType} />
      <ReportingPeriodSelector selectedPeriod={period} onSelect={setPeriod} />
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <div>
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={handleStartChange} />
      </div>
      <div>
        <label>End Date: </label>
        <input type="date" value={endDate} onChange={handleEndChange} />
      </div>
    </div>
      <Chart data={data} />
      <ExportButton onExport={handleExport} />
    </div>
  );
};

export default WeightRecord
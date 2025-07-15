import { useState, useEffect } from "react";
import { useContext } from "react";
import UserInfoContext from "components/functions/UserInfoContext";
import ReportSelector from "./reportselector";
import AnalyzeButton from "./analyzeButton";
import Chart from "./chart"

const WeightRecord = ({ onDateChange }) => {
  const userInfoData = useContext(UserInfoContext).userInfo;

  const getFilteredSortedData = (records, startDate, endDate, sortOrder = 'asc') => {
  const data = records
    .filter(record => {
      const recordDate = new Date(record.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || recordDate >= start) && (!end || recordDate <= end);
    })
    .map(record => ({
      date: record.date,
      weight: record.weight
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return data;
};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [reportType, setReportType] = useState("weight");
  const [data, setData] = useState([]);

  const records = userInfoData?.records || [];

  const handleStartChange = (e) => {
  const value = e.target.value;
  setStartDate(value);
  if (typeof onDateChange === 'function' && value && endDate) {
  onDateChange(value, endDate);
}

};

 const handleEndChange = (e) => {
  const value = e.target.value;
  setEndDate(value);
  if (typeof onDateChange === 'function' && startDate && value) {
  onDateChange(startDate, value);
}


};

  const handleAnalyze = () => {
    setData(getFilteredSortedData(records, startDate, endDate));
  };
  return (
    <div className="reportTable">
      <div className= "reportWrapper">
        <ReportSelector selectedReport={reportType} onChange={setReportType} />
        <div className = "timeSelectorContainer">
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
        <AnalyzeButton onAnalyze={handleAnalyze} />
    </div>
    </div>
  );
};
export default WeightRecord;

import { useState, useEffect, useContext } from "react";
import UserInfoContext from "components/functions/UserInfoContext";
import ReportSelector from "./reportselector";
import AnalyzeButton from "./analyzeButton";
import Chart from "./chart";
import { useTranslation } from "react-i18next";

const WeightRecord = ({ onDateChange }) => {
  const { t } = useTranslation();
  const userInfoData = useContext(UserInfoContext).userInfo;
  const getFilteredSortedData = (
  records,
  startDate,
  endDate,
  reportType,
  sortOrder = "asc"
) => {
  return records
    .filter((record) => {
      const recordDate = new Date(record.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (!start || recordDate >= start) && (!end || recordDate <= end);
    })
    .map((record) => ({
      date: record.date,
      value: record[reportType] ?? null, // lấy dữ liệu theo reportType
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
};

    

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportType, setReportType] = useState("weight");
  const [data, setData] = useState([]);

  const records = userInfoData?.records || [];
  console.log(userInfoData.records);
  
  const handleStartChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    if (typeof onDateChange === "function" && value && endDate) {
      onDateChange(value, endDate);
    }
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    if (typeof onDateChange === "function" && startDate && value) {
      onDateChange(startDate, value);
    }
  };

const handleAnalyze = () => {    
  setData(getFilteredSortedData(records, startDate, endDate, reportType));
};
console.log(data);


  return (
    <div className="reportTable">
      <div className="reportWrapper">
        <ReportSelector selectedReport={reportType} onChange={setReportType} />
        <div className="timeSelectorContainer">
          <div>
            <label>{t("label.startDate")}:</label>
            <input type="date" value={startDate} onChange={handleStartChange} />
          </div>
          <div>
            <label>{t("label.endDate")}:</label>
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

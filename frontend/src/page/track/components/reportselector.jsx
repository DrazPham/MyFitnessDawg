const ReportSelector = ({ selectedReport, onChange }) => (
  <select value={selectedReport} onChange={(e) => onChange(e.target.value)}>
    <option value="weight">Weight</option>
    <option value="neck">Neck</option>
    <option value="waist">Waist</option>
    <option value="hip">Hip</option>
  </select>
);
export default ReportSelector;
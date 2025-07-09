const ReportSelector = ({ selectedReport, onChange }) => (
  <select value={selectedReport} onChange={(e) => onChange(e.target.value)}>
    <option value="weight">Weight</option>
    {/* Add other report types */}
  </select>
);
export default ReportSelector;
// CalorieStats.jsx
const CalorieStats = ({ icon, label, value, color }) => (
  <div className="stat-block" style={{ borderLeft: `6px solid ${color}` }}>
    <div className="stat-icon">{icon}</div>
    <div>
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  </div>
);
export default CalorieStats
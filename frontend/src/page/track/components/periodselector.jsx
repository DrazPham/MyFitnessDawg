
const periods = ['7', '30', '90', '180', '365'];

const ReportingPeriodSelector = ({ selectedPeriod, onSelect }) => (
  <div className = "periodSelector">
    {periods.map((days) => (
      <button
        key={days}
        onClick={() => onSelect(days)}
        className={selectedPeriod === days ? 'active' : ''}
      >
        Last {days} days
      </button>
    ))}
  </div>
);

export default ReportingPeriodSelector;
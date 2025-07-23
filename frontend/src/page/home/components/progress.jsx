import "assets/css/home/progress.css";
const CircularProgress = ({ current, label = "Remaining", goal,exercise = 0 }) => {
  const percent = (goal -(goal - current + exercise))/goal;
  const progressDegrees = percent * 360;
  return (
    <div className = "circularBorder" style ={{background: `conic-gradient(#f4b860 ${progressDegrees}deg, #e6e6e6 0deg)`}}>
      <div className = "circularInner"/>
      <div className = "progressInfo">
        <div className = "progressNumbers">{goal - current + exercise}</div>
      </div>
    </div>
  );
};
export default CircularProgress;

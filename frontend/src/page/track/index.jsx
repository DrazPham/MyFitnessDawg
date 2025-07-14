import NutritionGoalsCard from './components/nutritiongoal';
import MeasurementForm from './components/weightcheckin';
import WeightRecord from './components/weightRecord';
import "assets/css/track/index.css";
function Track() {
	return (
		<main>
			<div className="wrapper aximo-all-section track">
                <NutritionGoalsCard />
				<MeasurementForm/>
				<WeightRecord/>
			</div>
		</main>
	);
}
export default Track;
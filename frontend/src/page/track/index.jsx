import NutritionGoalsCard from './components/nutritiongoal';
import MeasurementForm from './components/weightcheckin';
import "assets/css/track/index.css";
function Track() {
	return (
		<main>
			<div className="wrapper aximo-all-section track">
                <NutritionGoalsCard />
				<MeasurementForm/>
			</div>
		</main>
	);
}

export default Track;
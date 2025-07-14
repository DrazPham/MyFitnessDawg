import { useContext } from "react";
import UserInfoContext from "components/functions/UserInfoContext";
import Progress from "./progress";
import { FaBullseye, FaUtensils, FaFire } from 'react-icons/fa';
import calculateNutritionTotals from "components/functions/calculateNutritionTotals";
import calculateExerciseCalories from "components/functions/calculateExerciseCalories";
const CaloriesTracking = () => {
	const userInfoData = useContext(UserInfoContext).userInfo;
	const totalFoodCalories = calculateNutritionTotals(userInfoData);
	const totalExerciseCalories = calculateExerciseCalories(userInfoData);
	return (
		<div className="container aximo-all-section tracking">
			<h1>Calories</h1>
			<p>Remaining = Goal - Food + Exercise</p>
			<div className = "tracker">
				<Progress  current ={totalFoodCalories.calories} goal = {userInfoData.Calories} exercise={totalExerciseCalories}/>
				<div className="detail">
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaBullseye/>}</div>
						<div>
							<h1>Base Goal</h1>
							<p>
								{userInfoData.Calories}
								</p>
						</div>
					</div>
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaUtensils/>}</div>
						<div>
							<h1>Food</h1>
							<p>
								{totalFoodCalories.calories}
								</p>
						</div>
					</div>
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaFire/>}</div>
						<div>
							<h1>Exercise</h1>
							<p>
								{totalExerciseCalories}
								</p>
						</div>
					</div>
					</div>
			</div>
		</div>
	);
}
export default CaloriesTracking;
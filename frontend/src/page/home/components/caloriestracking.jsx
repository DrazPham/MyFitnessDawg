import { useContext } from "react";
import UserInfoContext from "components/functions/UserInfoContext";
import Progress from "./progress";
import { FaBullseye, FaUtensils, FaFire } from 'react-icons/fa';
import calculateNutritionTotals from "components/functions/calculateNutritionTotals";
import calculateExerciseCalories from "components/functions/calculateExerciseCalories";
import { useTranslation } from "react-i18next";
const CaloriesTracking = () => {
	const { t } = useTranslation();
	const userInfoData = useContext(UserInfoContext).userInfo;
	const totalFoodCalories = calculateNutritionTotals(userInfoData);
	const totalExerciseCalories = calculateExerciseCalories(userInfoData);
	return (
		<div className="container aximo-all-section tracking">
      		<h1>{t("calories.title")}</h1>
      		<p>{t("calories.description")}</p>
			<div className = "tracker">
				<Progress  current ={totalFoodCalories.calories} goal = {userInfoData.Calories} exercise={totalExerciseCalories}/>
				<div className="detail">
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaBullseye/>}</div>
						<div>
							      <h1>{t("calories.baseGoal")}</h1>
							<p>
								{userInfoData.Calories}
								</p>
						</div>
					</div>
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaUtensils/>}</div>
						<div>
							      <h1>{t("calories.food")}</h1>
							<p>
								{totalFoodCalories.calories}
								</p>
						</div>
					</div>
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaFire/>}</div>
						<div>
							      <h1>{t("calories.exercise")}</h1>
							<p>
								{totalExerciseCalories.exercise||0}
								</p>
						</div>
					</div>
					</div>
			</div>
		</div>
	);
}
export default CaloriesTracking;
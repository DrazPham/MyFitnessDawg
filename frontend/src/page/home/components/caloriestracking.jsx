import Progress from "./progress";
import { FaBullseye, FaUtensils, FaFire } from 'react-icons/fa';
import { useContext } from "react";
import { userInfoContext } from "../index";

const CaloriesTracking = () => {
	const userInfoData = useContext(userInfoContext);
// 	console.log(userInfoData);


// 	const total = userInfoData.Cart.reduce(
//   (acc, item) => {
//     return {
//       calories: acc.calories + (item.calories || 0),
//       fat: acc.fat + (item.fat || 0),
//       protein: acc.protein + (item.protein || 0),
//       carbs: acc.carbs + (item.carbs || 0),
//     };
//   },
//   { calories: 0, fat: 0, protein: 0, carbs: 0 }
// );

// const totalCalories = userInfoData.Exercise.reduce(
//   (sum, item) => sum + (item.calories || 0),
//   0
// );




	
	return (
		<div className="container aximo-all-section tracking">
			<h1>Calories</h1>
			<p>Remaining = Goal - Food + Exercise</p>
			<div className = "tracker">
				{/* <Progress  current ={total.calories} goal = {userInfoData.Calories} exercise={totalCalories}/> */}
				<div className="detail">
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaBullseye/>}</div>
						<div>
							<h1>Base Goal</h1>
							<p>
								{/* {userInfoData.Calories} */}
								</p>
						</div>
					</div>
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaUtensils/>}</div>
						<div>
							<h1>Food</h1>
							<p>
								{/* {total.calories} */}
								</p>
						</div>
					</div>
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaFire/>}</div>
						<div>
							<h1>Exercise</h1>
							<p>
								{/* {totalCalories} */}
								</p>
						</div>
					</div>
					</div>
			</div>
		</div>
	);
}

export default CaloriesTracking;
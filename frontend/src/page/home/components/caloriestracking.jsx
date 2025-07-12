import Progress from "./progress";
import { FaBullseye, FaUtensils, FaFire } from 'react-icons/fa';
import { useContext } from "react";
import { userInfoContext } from "../index";

const CaloriesTracking = () => {
	const userInfoData = useContext(userInfoContext);
	console.log(userInfoData);
	
	return (
		<div className="container aximo-all-section tracking">
			<h1>Calories</h1>
			<p>Remaining = Goal - Food + Exercise</p>
			<div className = "tracker">
				{/* <Progress  current = "1000" goal = {userInfoData.Calories}/> */}
				<div className="detail">
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaBullseye/>}</div>
						<div>
							<h1>Base Goal</h1>
							{/* <p>{userInfoData.Calories}</p> */}
						</div>
					</div>
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaUtensils/>}</div>
						<div>
							<h1>Food</h1>
							<p>0</p>
						</div>
					</div>
					<div className="caloriesTrackGroups">
						<div className="stat-icon">{<FaFire/>}</div>
						<div>
							<h1>Exercise</h1>
							<p>0</p>
						</div>
					</div>
					</div>
			</div>
		</div>
	);
}

export default CaloriesTracking;
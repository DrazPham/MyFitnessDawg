import Progress from "./progress";
import { useContext } from "react";
import { userInfoContext } from "../index";

function MacrosTracking() {
	const userInfoData = useContext(userInfoContext);
	console.log(userInfoData)
	return (
		<div className="container aximo-all-section tracking">
        	<h1>Macros</h1>
			<div className = "macrostracker">
				<div>
					<p className = "FoodMacros">Carbohydrate</p>
					{/* <Progress current = "10" goal = {userInfoData.Macros.carbs}/>
            		<p className = "remainingAmount">{userInfoData.Macros.carbs}g left</p> */}
				</div>
				<div>
					<p  className = "FoodMacros">Protein</p>
					{/* <Progress  current = "10" goal = {userInfoData.Macros.protein}/>
            		<p className = "remainingAmount">{userInfoData.Macros.protein}g left</p> */}
				</div>
				<div>
					<p className = "FoodMacros">Fat</p>
					{/* <Progress  current = "10" goal = {userInfoData.Macros.fat}/>
            		<p className = "remainingAmount">{userInfoData.Macros.fat}g left</p> */}
				</div>
			</div>
		</div>
	);
}

export default MacrosTracking;
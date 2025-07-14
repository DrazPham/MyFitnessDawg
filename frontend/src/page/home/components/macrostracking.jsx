import Progress from "./progress";
import { useContext } from "react";
import UserInfoContext from "components/functions/UserInfoContext";
import calculateMacrosTotals from "components/functions/calculateMacrosTotals";

function MacrosTracking() {
	if (!UserInfoContext) {
	return <div>Loading user info...</div>; // fallback an toàn nếu muốn thêm
	}
	const userInfoData = useContext(UserInfoContext).userInfo;
	const totalMacros = calculateMacrosTotals(userInfoData);
	

	return (
		<div className="container aximo-all-section tracking">
        	<h1>Macros</h1>
			<div className = "macrostracker">
				<div>
					<p className = "FoodMacros">Carbohydrate</p>
					<Progress current = {totalMacros.carbs} goal = {userInfoData.Macros.carbs}/>
            		<p className = "remainingAmount">{userInfoData.Macros.carbs - totalMacros.carbs}g left</p>
				</div>
				<div>
					<p  className = "FoodMacros">Protein</p>
					<Progress  current = {totalMacros.protein} goal = {userInfoData.Macros.protein}/>
            		<p className = "remainingAmount">{userInfoData.Macros.protein - totalMacros.protein}g left</p>
				</div>
				<div>
					<p className = "FoodMacros">Fat</p>
					<Progress  current = {totalMacros.fat} goal = {userInfoData.Macros.fat}/>
            		<p className = "remainingAmount">{userInfoData.Macros.fat - totalMacros.fat}g left</p>
				</div>
			</div>
		</div>
	);
}

export default MacrosTracking;
import Progress from "./progress";
import { useContext } from "react";
import { userInfoContext } from "../index";

function MacrosTracking() {
	const userInfoData = useContext(userInfoContext);
	console.log(userInfoData)

// 		const total = userInfoData.Cart.reduce(
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

	return (
		<div className="container aximo-all-section tracking">
        	<h1>Macros</h1>
			<div className = "macrostracker">
				<div>
					<p className = "FoodMacros">Carbohydrate</p>
					{/* <Progress current = {total.carbs} goal = {userInfoData.Macros.carbs}/> */}
            		{/* <p className = "remainingAmount">{userInfoData.Macros.carbs}g left</p> */}
				</div>
				<div>
					<p  className = "FoodMacros">Protein</p>
					{/* <Progress  current = {total.protein} goal = {userInfoData.Macros.protein}/> */}
            		{/* <p className = "remainingAmount">{userInfoData.Macros.protein}g left</p> */}
				</div>
				<div>
					<p className = "FoodMacros">Fat</p>
					{/* <Progress  current = {total.fat} goal = {userInfoData.Macros.fat}/> */}
            		{/* <p className = "remainingAmount">{userInfoData.Macros.fat}g left</p> */}
				</div>
			</div>
		</div>
	);
}

export default MacrosTracking;
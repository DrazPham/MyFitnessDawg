import Progress from "./progress";

function MacrosTracking() {
	return (
		<div className="container aximo-all-section tracking">
        	<h1>Macros</h1>
			<div className = "macrostracker">
				<div>
					<p className = "FoodMacros">Carbohydrate</p>
					<Progress/>
            		<p className = "remainingAmount">256g left</p>
				</div>
				<div>
					<p  className = "FoodMacros">Protein</p>
					<Progress/>
            		<p className = "remainingAmount">256g left</p>
				</div>
				<div>
					<p className = "FoodMacros">Fat</p>
					<Progress/>
            		<p className = "remainingAmount">256g left</p>
				</div>
			</div>
		</div>
	);
}

export default MacrosTracking;
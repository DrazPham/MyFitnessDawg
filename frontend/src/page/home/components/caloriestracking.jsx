import Progress from "./progress";
function CaloriesTracking() {
	return (
		<div className="container aximo-all-section tracking">
			<h1>Calories</h1>
			<p>Remaining = Goal - Food + Exercise</p>
			<div className = "tracker">
				<Progress />
				<div className="detail">
					<div>
						<img src="" alt="" />
						<h1>Base Goal</h1>
						<h1>0</h1>
					</div>
					<div>
						<img src="" alt="" />
						<h1>Food</h1>
						<h1>0</h1>
					</div>
					<div>
						<img src="" alt="" />
						<h1>Exercise</h1>
						<h1>0</h1>
					</div>
					</div>
			</div>
		</div>
	);
}

export default CaloriesTracking;
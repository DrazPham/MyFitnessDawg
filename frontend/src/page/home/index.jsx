import Personal from "./components/personal";
import CaloriesTracking from "./components/caloriestracking";
import MacrosTracking from "./components/macrostracking";
import "assets/css/home/index.css";
import "assets/css/home/tracking.css";
function Home() {
	return (
		<main>
			<div className="wrapper aximo-all-section home">
				<Personal/>
				<CaloriesTracking />
				<MacrosTracking/>
			</div>
		</main>
	);
}

export default Home;
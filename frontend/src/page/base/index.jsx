// import Personal from "./components/personal";
// import CaloriesTracking from "./components/caloriestracking";
// import About from "src/components/common/about/index.jsx";
import FaqAccordion from "src/components/faq/FaqAccordion.jsx";
import AutoSlider from "src/components/common/auto-slider/index.jsx";

import "assets/css/base/index.css";

function Base() {
	return (
		<main>
			<div className="wrapper aximo-all-section base">
				<FaqAccordion/>
				<AutoSlider/>
				<h1>Base</h1>
			</div>
		</main>
	);
}

export default Base;
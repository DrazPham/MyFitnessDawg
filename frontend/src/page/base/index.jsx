import FitnessBanner from './components/FitnessBanner';
import About from "src/components/common/about/index.jsx";
import FaqAccordion from "src/components/faq/FaqAccordion.jsx";
import "assets/css/base/index.css";

function Base() {
	return (
		<main style={{"margin":"0"}}>
			<FitnessBanner/>
			<div className="wrapper aximo-all-section base">
				<About/>
				<FaqAccordion/>
			</div>
		</main>
	);
}

export default Base;
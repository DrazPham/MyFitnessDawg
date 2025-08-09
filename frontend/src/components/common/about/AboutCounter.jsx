import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
function AboutCounter() {
	const { t } = useTranslation();

	return (
		<div className="aximo-counter-wrap">
			<div className="aximo-counter-data">
				<h2 className="aximo-counter-number">
					<span className="aximo-counter">
						<CountUp end={1000} duration={3} redraw={true} enableScrollSpy />
					</span>
					+
				</h2>
				<p>{t("about.counter.years")}</p>
			</div>
			<div className="aximo-counter-data">
				<h2 className="aximo-counter-number">
					<span className="aximo-counter">
						<CountUp end={95} duration={3} redraw={true} enableScrollSpy />
					</span>
					%
				</h2>
				<p>{t("about.counter.projects")}</p>
			</div>
			<div className="aximo-counter-data">
				<h2 className="aximo-counter-number">
					<span className="aximo-counter">
						<CountUp end={90} duration={3} redraw={true} enableScrollSpy />
					</span>
					%
				</h2>
				<p>{t("about.counter.satisfaction")}</p>
			</div>
		</div>
	);
}

export default AboutCounter;
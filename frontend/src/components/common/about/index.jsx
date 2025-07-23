import { useTranslation } from "react-i18next";
import Video from "./Video";
import AboutCounter from "./AboutCounter";

function About() {
	const { t } = useTranslation();

	return (
		<div className="section">
			<div id="aximo-counter"></div>
			<div className="title">
				<h2>{t("about.title")}</h2>
				<div className="col-lg-4 offset-lg-1 d-flex align-items-center">
					<p>{t("about.description")}</p>
				</div>
			</div>
			<div className="AboutContainer">
				<Video />
				<AboutCounter />
			</div>
		</div>
	);
}

export default About;

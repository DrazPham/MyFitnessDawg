import Video from "./Video";
import Star2Img from "assets/images/v1/star2.png";
import AboutCounter from "./AboutCounter";

function About() {
	return (
		<div className="section">
			<div id="aximo-counter"></div>
				<div>
					<h2>From Meals to Muscle — All in One Place.</h2>
					<div className="col-lg-4 offset-lg-1 d-flex align-items-center">
						<p> We listen, adapt, and design with precision — turning client insights into powerful digital solutions.</p>
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

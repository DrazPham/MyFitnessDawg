import Star2Img from "assets/images/v1/star2.png";
import TeamCard from "./TeamCard";

function Teams({ title, teams }) {
	return (
		<div className="section" style={{margin:"50px 0 0"}}>
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						{title}
					</h2>
				</div>
				<div className="row extra-side-margin">
					{teams.map((team) => (
						<TeamCard key={team.id} team={team} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Teams;

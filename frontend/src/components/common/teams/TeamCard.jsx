import { Link } from "react-router-dom";
function TeamCard({ team: { name, designation, img } }) {
	return (
		<div className="col-lg-3 col-md-6">
			<div className="aximo-team-wrap">
				<div className="aximo-team-thumb" style={{aspectRatio:"1/1"}}>
					<img src={img} style ={{width:"100%",height:"100%",objectFit:"cover"}}alt={name} />
					<div className="aximo-social-icon team-social">
						{/* <ul>
							<li>
								<a href="">
									<i className="icon-twitter"></i>
								</a>
							</li>
							<li>
								<a href="">
									<i className="icon-facebook"></i>
								</a>
							</li>
							<li>
								<a href="">
									<i className="icon-instagram"></i>
								</a>
							</li>
							<li>
								<a href="">
									<i className="icon-linkedin"></i>
								</a>
							</li>
						</ul> */}
					</div>
				</div>
				<div className="aximo-team-data">
					<h3>{name}</h3>
					<p>{designation}</p>
				</div>
			</div>
		</div>
	);
}

export default TeamCard;

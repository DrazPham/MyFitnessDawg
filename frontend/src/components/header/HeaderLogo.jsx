import { Link } from "react-router-dom";
import Logo from "assets/images/logo/logo.png";
function HeaderLogo() {
	return (
		<div className="brand-logo">
			<Link to="/">
				<img src={Logo} alt="Logo" className="light-version-logo" style={{maxHeight:"50px"}}/>
				{/* <h2 style={{
					color: "rgb(44, 97, 209)",
				}}>WISE WORM</h2> */}
			</Link>
		</div>
	);
}

export default HeaderLogo;

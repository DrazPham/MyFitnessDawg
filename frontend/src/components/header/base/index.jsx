import { useTranslation } from "react-i18next";
import HeaderNavbar from "./elements/HeaderNavbar";
import "assets/css/header/index.css";
function Header() {
	return (
		<header className="site-header aximo-header4 base" id="sticky-menu" >
			<HeaderNavbar/>
		</header>
	);
}
export default Header;

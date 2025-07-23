import { useState } from "react";
import useMenu from "hooks/useMenu";
import HeaderLogo from "./HeaderLogo";
import LanguageSwitcher from "./LanguageDropdown";
function HeaderNavbar(){
    const {
		toggleMenu,
		mobileSubMenu,
		mobileSubMenuSub,
		handleSubMenu,
		handleSubMenuSub,
		handleGoBack,
		handleMenu,
		menuTitle,
		setToggleMenu,
	} = useMenu();
	const [showSideMenu, setShowSideMenu] = useState(false);
    return(
        <div className="container">
				<nav className="navbar site-navbar">
					<HeaderLogo />
					<LanguageSwitcher/>
				</nav>
			</div>
    )
}
export default HeaderNavbar
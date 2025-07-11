import { useState } from "react";
import useMenu from "hooks/useMenu";
import Navbar from "components/common/menu/Navbar";
import HeaderButton from "./HeaderButton";
import HeaderLogo from "./HeaderLogo";
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
					<div className="menu-block-wrapper">
					</div>
					<HeaderButton />
				</nav>
			</div>
    )
}

export default HeaderNavbar
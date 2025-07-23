import { useState } from "react";
import useMenu from "hooks/useMenu";
import { useTranslation } from "react-i18next";
import Navbar from "components/common/menu/Navbar";
import { Link } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import LanguageSwitcher from "./LanguageDropdown";

function HeaderNavbar() {
  const { t } = useTranslation();
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
  return (
    <div className="container">
      <nav className="navbar site-navbar">
        <HeaderLogo />
        <div className="menu-block-wrapper">
          <div
            className={`menu-overlay ${toggleMenu ? "active" : ""}`}
            onClick={handleMenu}
          ></div>
          <Navbar
            toggleMenu={toggleMenu}
            handleMenu={handleMenu}
            handleGoBack={handleGoBack}
            mobileSubMenu={mobileSubMenu}
            handleSubMenu={handleSubMenu}
            mobileSubMenuSub={mobileSubMenuSub}
            handleSubMenuSub={handleSubMenuSub}
            menuTitle={menuTitle}
          />
        </div>
        <div>
          <Link to="/" id = "signOutButton">
           { t("nav.signOut")}
          </Link>
        </div>
					<LanguageSwitcher/>

        <div
          className="mobile-menu-trigger light"
          onClick={() => setToggleMenu(true)}
        >
          <span></span>
        </div>
      </nav>
    </div>
  );
}

export default HeaderNavbar;

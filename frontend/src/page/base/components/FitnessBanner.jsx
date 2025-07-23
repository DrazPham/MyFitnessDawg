import { useTranslation } from "react-i18next";
import Banner from "assets/images/banner/Basebanner.png";
import "assets/css/base/FitnessBanner.css";
import HeaderButton from 'components/header/base/elements/HeaderButton';

const FitnessBanner = () => {
    const { t } = useTranslation();
  return (
    <div className="fitness-banner">
      <div className="banner-content">
        <h2>{t("bannerHashtag")}</h2>
      <h1>{t("bannerQuote")}</h1>
      <p>{t("bannerDescription")}</p>
        <HeaderButton Title={t("bannerButton")}/>
      </div>
      <div className="app-preview">
        <img src={Banner} alt="App Preview" />
      </div>
    </div>
  );
};

export default FitnessBanner;
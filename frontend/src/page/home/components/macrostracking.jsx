import { useContext } from "react";
import UserInfoContext from "components/functions/UserInfoContext";
import Progress from "./progress";
import calculateMacrosTotals from "components/functions/calculateMacrosTotals";
import { useTranslation } from "react-i18next";
function MacrosTracking() {
    const { t } = useTranslation();
	const userInfoData = useContext(UserInfoContext).userInfo;
	const totalMacros = calculateMacrosTotals(userInfoData);
	return (
		<div className="container aximo-all-section tracking">
        	<h1>Macros</h1>
			<div className = "macrostracker">
    <div>
        <p className="FoodMacros">{t("macros.carbs")}</p>
        <Progress current={totalMacros.carbs} goal={userInfoData.Macros.carbs} />
        <p className="remainingAmount">
          {userInfoData.Macros.carbs - totalMacros.carbs}g {t("macros.left")}
        </p>
      </div>

      <div>
        <p className="FoodMacros">{t("macros.protein")}</p>
        <Progress current={totalMacros.protein} goal={userInfoData.Macros.protein} />
        <p className="remainingAmount">
          {userInfoData.Macros.protein - totalMacros.protein}g {t("macros.left")}
        </p>
      </div>

      <div>
        <p className="FoodMacros">{t("macros.fat")}</p>
        <Progress current={totalMacros.fat} goal={userInfoData.Macros.fat} />
        <p className="remainingAmount">
          {userInfoData.Macros.fat - totalMacros.fat}g {t("macros.left")}
        </p>
      </div>
			</div>
		</div>
	);
}
export default MacrosTracking;
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import UserInfoContext from "components/functions/UserInfoContext";
import getUserImage from "components/functions/getUserImage";
import "assets/css/home/personal.css";
function Personal(){
    const { t } = useTranslation();
    const userInfoData = useContext(UserInfoContext).userInfo;
    return(
        <div className="personal container">
            <img src={getUserImage(
                userInfoData.gender
                )} alt="" />
            <div className="personal-right">
                <p>{t("calories.startedOn")}</p>
                <p>
                    {userInfoData.FirstLogIn}
                </p>
            </div>
        </div>
    )
}
export default Personal;
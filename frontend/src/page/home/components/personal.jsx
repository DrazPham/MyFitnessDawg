import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import UserInfoContext from "components/functions/UserInfoContext";
import getUserImage from "components/functions/getUserImage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "src/firebase"; // đảm bảo đúng đường dẫn Firebase
import "assets/css/home/personal.css";

function Personal() {
  const { t } = useTranslation();
  const userInfoData = useContext(UserInfoContext).userInfo;

  useEffect(() => {
    const checkAndResetIfNewDay = async () => {
      if (!userInfoData?.userID) return;

      const today = new Date().toISOString().split("T")[0];
      const userRef = doc(db, "users", userInfoData.userID);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.lastDate !== today) {
          console.log("New day! Resetting daily fields...");

          await updateDoc(userRef, {
            Exercise: [],
            Cart:[],
            lastDate: today,
          });
        }
      }
    };

    checkAndResetIfNewDay();
  }, [userInfoData?.userID]);

  return (
    <div className="personal container">
      <img src={getUserImage(userInfoData.gender)} alt="" />
      <div className="personal-right">
        <p>{t("calories.startedOn")}</p>
        <p>{userInfoData.FirstLogIn}</p>
      </div>
    </div>
  );
}

export default Personal;

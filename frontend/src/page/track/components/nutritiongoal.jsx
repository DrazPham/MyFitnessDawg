import { useContext, useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import UserInfoContext from "components/functions/UserInfoContext";
import NutritionItem from "./nutritionitems";
import Dropdown from "src/components/common/menu/Dropdown.jsx";
import getDropdownOptions from "./dropdownOptions";
import { useTranslation } from "react-i18next";

const NutritionGoalsCard = () => {
  const { t } = useTranslation();
  const userInfoData = useContext(UserInfoContext).userInfo;

  const [activityLevel, setActivityLevel] = useState(1.55);
  const [goals, setGoals] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const saveGoalsToFirestore = async (goalsData) => {
    try {
      const userId = localStorage.getItem("userID");
      if (!userId) return;

      const docRef = doc(db, "users", userId);
      await setDoc(docRef, { goals: goalsData }, { merge: true });
    } catch (error) {
      console.error("Error saving goals to Firestore:", error);
    }
  };

  useEffect(() => {
    setDropdownOptions(getDropdownOptions(t));
  }, [t]);

  useEffect(() => {
    if (!userInfoData?.BMR || !userInfoData?.Macros) return;

    const calories = userInfoData.BMR * activityLevel;
    const baseCalories = userInfoData.BMR;
    const scaleFactor = calories / baseCalories;

    const carbs = userInfoData.Macros.carbs * scaleFactor;
    const fat = userInfoData.Macros.fat * scaleFactor;
    const protein = userInfoData.Macros.protein * scaleFactor;

    const goalsData = {
      [t("macros.calories")]: {
        value: Math.round(calories),
        unit: "kcal",
        percentage: null,
      },
      [t("macros.carbs")]: {
        value: Math.round(carbs),
        unit: "g",
        percentage: (((carbs * 4) / calories) * 100).toFixed(0) + "%",
      },
      [t("macros.fat")]: {
        value: Math.round(fat),
        unit: "g",
        percentage: (((fat * 9) / calories) * 100).toFixed(0) + "%",
      },
      [t("macros.protein")]: {
        value: Math.round(protein),
        unit: "g",
        percentage: (((protein * 4) / calories) * 100).toFixed(0) + "%",
      },
    };

    setGoals(goalsData);
    saveGoalsToFirestore(goalsData);
  }, [activityLevel, userInfoData, t]);

  const handleDropdownChange = (value) => {
    setActivityLevel(parseFloat(value));
  };

  return (
    <div className="dailyGoals">
      <h2>{t("nutritionGoals.title")}</h2>
      {Object.entries(goals).map(([label, data]) => (
        <NutritionItem
          key={label}
          label={label}
          value={data.value}
          unit={data.unit}
          percentage={data.percentage}
        />
      ))}
      <Dropdown
        label={t("nutritionGoals.selectLevel")}
        options={dropdownOptions}
        onChange={handleDropdownChange}
      />
    </div>
  );
};

export default NutritionGoalsCard;

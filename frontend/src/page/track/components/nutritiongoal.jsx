import { useContext, useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import UserInfoContext from "components/functions/UserInfoContext";
import NutritionItem from "./nutritionitems";
import Dropdown from "src/components/common/menu/Dropdown.jsx";
import dropdownOptions from "./dropdownOptions";

const NutritionGoalsCard = () => {
  const userInfoData = useContext(UserInfoContext).userInfo;

  const [activityLevel, setActivityLevel] = useState(1.55);
  const [goals, setGoals] = useState({});
  const saveGoalsToFirestore = async (goalsData) => {
    try {
      const userId = localStorage.getItem("userID"); // hoặc field khác đại diện user ID

      if (!userId) return;

      const docRef = doc(db, "users", userId);
      await setDoc(docRef, { goals: goalsData }, { merge: true });
    } catch (error) {
      console.error("Error saving goals to Firestore:", error);
    }
  };

  useEffect(() => {
    if (!userInfoData?.BMR || !userInfoData?.Macros) return;

    const calories = userInfoData.BMR * activityLevel;
    const baseCalories = userInfoData.BMR;

    const scaleFactor = calories / baseCalories;

    const baseCarbs = userInfoData.Macros.carbs;
    const baseFat = userInfoData.Macros.fat;
    const baseProtein = userInfoData.Macros.protein;

    const carbs = baseCarbs * scaleFactor;
    const fat = baseFat * scaleFactor;
    const protein = baseProtein * scaleFactor;

    const goalsData = {
      Calories: { value: Math.round(calories), unit: "kcal", percentage: null },
      Carbohydrates: {
        value: Math.round(carbs),
        unit: "g",
        percentage: (((carbs * 4) / calories) * 100).toFixed(0) + "%",
      },
      Fat: {
        value: Math.round(fat),
        unit: "g",
        percentage: (((fat * 9) / calories) * 100).toFixed(0) + "%",
      },
      Protein: {
        value: Math.round(protein),
        unit: "g",
        percentage: (((protein * 4) / calories) * 100).toFixed(0) + "%",
      },
    };

    setGoals(goalsData);
    saveGoalsToFirestore(goalsData);
  }, [activityLevel, userInfoData]);

  const handleDropdownChange = (value) => {
    setActivityLevel(parseFloat(value));
  };
  return (
    <div className="dailyGoals">
      <h2>Daily Nutrition Goals</h2>
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
        label="Select your activity level:"
        options={dropdownOptions}
        onChange={handleDropdownChange}
      />
    </div>
  );
};
export default NutritionGoalsCard;

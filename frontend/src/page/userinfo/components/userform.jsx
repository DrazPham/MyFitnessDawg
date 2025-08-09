import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { db } from "src/firebase/index.jsx";
import { setDoc, doc } from "firebase/firestore";
import calculateAge from "components/functions/calculateAge";
import calculateBMR from "components/functions/calculateBMR";
import getActivityFactor from "components/functions/getActivityFactor";
import calculateCaloriesByGoal from "components/functions/calculateCaloriesByGoal";
import calculateMacros from "components/functions/calculateMacros";

import "assets/css/userform/index.css";

function UserForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstname: "",
    activity: "",
    goal: "",
    gender: "",
    birthdate: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    goalWeight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleHeightUnit = () => {
    setFormData((prev) => ({
      ...prev,
      heightUnit: prev.heightUnit === "cm" ? "ft/in" : "cm",
    }));
  };

  const toggleWeightUnit = () => {
    setFormData((prev) => ({
      ...prev,
      weightUnit: prev.weightUnit === "kg" ? "lbs" : "kg",
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const allFieldsFilled = Object.entries(formData).every(([key, value]) => {
    if (["heightUnit", "weightUnit"].includes(key)) return true;
    return value.trim() !== "";
  });

  if (!allFieldsFilled) {
    alert(t("userForm.fillAllFields"));
    return;
  }

  const userID = localStorage.getItem("userID");
  if (!userID) {
    alert(t("userForm.userIdMissing"));
    return;
  }

  const age = calculateAge(formData.birthdate);
  const bmr = calculateBMR(formData.gender, formData.weight, formData.height, age);
  const activityFactor = getActivityFactor(formData.activity);
  const tdee = bmr * activityFactor;
  const calories = calculateCaloriesByGoal(tdee, formData.goal);
  const macros = calculateMacros(calories, formData.goal);
  const today = new Date().toISOString().split("T")[0];

  try {
    await setDoc(doc(db, "users", userID), {
      ...formData,
      userID,
      FirstLogIn: today,
      lastDate: today, // ✅ Thêm dòng này để hỗ trợ kiểm tra ngày mới
      BMR: Math.round(bmr),
      TDEE: Math.round(tdee),
      Calories: Math.round(calories),
      Macros: macros,
      Exercise: [], // có thể reset mỗi ngày nếu cần
      Cart:[]
    });

    alert(
      `${t("userForm.dailyCalories")}: ${Math.round(calories)} kcal\n${t("userForm.macros")}: ${t("userForm.protein")}: ${macros.protein}, ${t("userForm.fat")}: ${macros.fat}, ${t("userForm.carbs")}: ${macros.carbs}`
    );
    navigate("/home");
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    alert(t("userForm.errorSaving"));
  }
};

  return (
    <form onSubmit={handleSubmit} className="userinfoform">
      <div className="group">
        <label>{t("userForm.firstname")}:</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          placeholder={t("userForm.firstnamePlaceholder")}
          onChange={handleChange}
        />
      </div>

      <div className="group">
        <label>{t("userForm.activityLevel")}:</label>
        <select name="activity" value={formData.activity} onChange={handleChange}>
          <option value="">{t("userForm.select")}</option>
          <option value="notVeryActive">{t("userForm.notVeryActive")}</option>
          <option value="lightlyActive">{t("userForm.lightlyActive")}</option>
          <option value="active">{t("userForm.active")}</option>
          <option value="veryActive">{t("userForm.veryActive")}</option>
        </select>
      </div>

      <div className="group">
        <label>{t("userForm.goal")}:</label>
        <select name="goal" value={formData.goal} onChange={handleChange}>
          <option value="">{t("userForm.select")}</option>
          <option value="WeightLoss">{t("userForm.WeightLoss")}</option>
          <option value="MuscleGain">{t("userForm.MuscleGain")}</option>
          <option value="Maintenance">{t("userForm.Maintenance")}</option>
          <option value="BodyRecomposition">{t("userForm.BodyRecomposition")}</option>
          <option value="Cutting">{t("userForm.Cutting")}</option>
        </select>
      </div>

      <div className="group">
        <label>{t("userForm.gender")}:</label>
        <div className="genderGroup">
          <label className="genderLabels">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            {t("userForm.male")}
          </label>
          <label className="genderLabels">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            {t("userForm.female")}
          </label>
        </div>
      </div>

      <div className="group">
        <label>{t("userForm.birthdate")}:</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
      </div>

      <div className="group">
        <label>{t("userForm.height", { unit: formData.heightUnit })}:</label>
        <input
          type="text"
          name="height"
          placeholder={t("userForm.heightPlaceholder")}
          value={formData.height}
          onChange={handleChange}
        />
        <button type="button" onClick={toggleHeightUnit}>
          {t("userForm.switchTo", {
            unit: formData.heightUnit === "cm" ? "ft/in" : "cm",
          })}
        </button>
      </div>

      <div className="group">
        <label>{t("userForm.weight", { unit: formData.weightUnit })}:</label>
        <input
          type="text"
          name="weight"
          placeholder={t("userForm.weightPlaceholder")}
          value={formData.weight}
          onChange={handleChange}
        />
        <button type="button" onClick={toggleWeightUnit}>
          {t("userForm.switchTo", {
            unit: formData.weightUnit === "kg" ? "lbs" : "kg",
          })}
        </button>
      </div>

      <div className="group">
        <label>{t("userForm.goalWeight", { unit: formData.weightUnit })}:</label>
        <input
          type="text"
          name="goalWeight"
          placeholder={t("userForm.goalWeightPlaceholder")}
          value={formData.goalWeight}
          onChange={handleChange}
        />
      </div>

      <button type="submit">{t("userForm.submit")}</button>
    </form>
  );
}

export default UserForm;

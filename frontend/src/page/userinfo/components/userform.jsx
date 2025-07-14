import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      alert("Please fill in all fields before submitting.");
      return;
    }

    const userID = localStorage.getItem("userID");
    if (!userID) {
      alert("User ID not found. Please log in again.");
      return;
    }

    const age = calculateAge(formData.birthdate);
    const bmr = calculateBMR(
      formData.gender,
      formData.weight,
      formData.height,
      age
    );
    const activityFactor = getActivityFactor(formData.activity);
    const tdee = bmr * activityFactor;
    const calories = calculateCaloriesByGoal(tdee, formData.goal);
    const macros = calculateMacros(calories, formData.goal);
    const FirstLogIn = new Date().toISOString().split("T")[0];

    try {
      await setDoc(doc(db, "users", userID), {
        ...formData,
        userID,
        FirstLogIn,
        BMR: Math.round(bmr),
        TDEE: Math.round(tdee),
        Calories: Math.round(calories),
        Macros: macros,
      });

      alert(
        `Your daily calories: ${Math.round(
          calories
        )} kcal\nMacros (g): Protein: ${macros.protein}, Fat: ${
          macros.fat
        }, Carbs: ${macros.carbs}`
      );
      navigate("/home");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      alert("Something went wrong while saving your data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="userinfoform">
      <div className="group">
        <label>Firstname:</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          placeholder="First Name"
          onChange={handleChange}
        />
      </div>

      <div className="group">
        <label>Activity Level:</label>
        <select
          name="activity"
          value={formData.activity}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="notVeryActive">
            Not Very Active — Sit most of the day (e.g., desk job)
          </option>
          <option value="lightlyActive">
            Lightly Active — On your feet a good part of the day (e.g., teacher)
          </option>
          <option value="active">
            Active — Some physical activity during the day (e.g., food server)
          </option>
          <option value="veryActive">
            Very Active — Heavy physical activity most of the day (e.g.,
            carpenter)
          </option>
        </select>
      </div>
      <div className="group">
        <label>Goal</label>
        <select name="goal" value={formData.goal} onChange={handleChange}>
          <option value="">Select</option>
          <option value="WeightLoss">
            Fat Loss / Weight Loss: Eat fewer calories than your TDEE to reduce
            body fat.
          </option>
          <option value="MuscleGain">
            Muscle Gain / Bulking: Eat more than your TDEE to build muscle mass
            and gain healthy weight.
          </option>
          <option value="Maintenance">
            Maintenance: Eat the same amount of calories as your body burns to
            maintain current weight.
          </option>
          <option value="BodyRecomposition">
            Body Recomposition: Aim to lose fat and gain muscle at the same
            time. Works best for beginners or those returning to training.
          </option>
          <option value="Cutting">
            Cutting: Focused fat loss while preserving as much muscle as
            possible. Typically follows a muscle gain phase.
          </option>
        </select>
      </div>
      <div className="group">
        <label>Gender:</label>
        <div className ="genderGroup">
          <label className="genderLabels">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="genderLabels">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
      </div>

      <div className="group">
        <label>Birthdate:</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
      </div>

      <div className="group">
        <label>Height ({formData.heightUnit}):</label>
        <input
          type="text"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
        />
        <button type="button" onClick={toggleHeightUnit}>
          Switch to {formData.heightUnit === "cm" ? "ft/in" : "cm"}
        </button>
      </div>

      <div className="group">
        <label>Weight ({formData.weightUnit}):</label>
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
        />
        <button type="button" onClick={toggleWeightUnit}>
          Switch to {formData.weightUnit === "kg" ? "lbs" : "kg"}
        </button>
      </div>

      <div className="group">
        <label>Goal Weight ({formData.weightUnit}):</label>
        <input
          type="text"
          name="goalWeight"
          placeholder="Goal Weight"
          value={formData.goalWeight}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;

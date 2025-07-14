import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "src/firebase/index.jsx";
import { collection, addDoc,setDoc,doc } from 'firebase/firestore';
import "assets/css/userform/index.css";

function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    activity: '',
    goal: '',
    gender: '',
    birthdate: '',
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    goalWeight: '',
    email: '',
    password: '',
  });

  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleHeightUnit = () => {
    setFormData(prev => ({
      ...prev,
      heightUnit: prev.heightUnit === 'cm' ? 'ft/in' : 'cm',
    }));
  };

  const toggleWeightUnit = () => {
    setFormData(prev => ({
      ...prev,
      weightUnit: prev.weightUnit === 'kg' ? 'lbs' : 'kg',
    }));
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateBMR = (gender, weight, height, age) => {
    weight = parseFloat(weight);
    height = parseFloat(height);
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const getActivityFactor = (level) => {
    switch (level) {
      case 'notVeryActive': return 1.2;
      case 'lightlyActive': return 1.375;
      case 'active': return 1.55;
      case 'veryActive': return 1.725;
      default: return 1.2;
    }
  };

  const calculateCaloriesByGoal = (tdee, goal) => {
    switch (goal) {
      case 'WeightLoss': return tdee - 500;
      case 'MuscleGain': return tdee + 500;
      case 'Maintenance': return tdee;
      case 'BodyRecomposition': return tdee - 200;
      case 'Cutting': return tdee - 700;
      default: return tdee;
    }
  };

  const calculateMacros = (calories, goal) => {
    let proteinRatio, fatRatio;
    switch (goal) {
      case 'MuscleGain':
        proteinRatio = 0.25;
        fatRatio = 0.25;
        break;
      case 'WeightLoss':
      case 'Cutting':
        proteinRatio = 0.35;
        fatRatio = 0.25;
        break;
      case 'BodyRecomposition':
        proteinRatio = 0.3;
        fatRatio = 0.25;
        break;
      default:
        proteinRatio = 0.25;
        fatRatio = 0.25;
    }
    const proteinCalories = calories * proteinRatio;
    const fatCalories = calories * fatRatio;
    const carbCalories = calories - (proteinCalories + fatCalories);

    return {
      protein: Math.round(proteinCalories / 4), // 1g protein = 4 kcal
      fat: Math.round(fatCalories / 9),         // 1g fat = 9 kcal
      carbs: Math.round(carbCalories / 4)       // 1g carb = 4 kcal
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      email: storedEmail || '',
      password: storedPassword || '',
    };

    setFormData(updatedFormData);

    const allFieldsFilled = Object.entries(formData).every(([key, value]) => {
      if (['heightUnit', 'weightUnit'].includes(key)) return true;
      return value.trim() !== '';
    });

    if (allFieldsFilled) {
      const age = calculateAge(formData.birthdate);
      const bmr = calculateBMR(formData.gender, formData.weight, formData.height, age);
      const activityFactor = getActivityFactor(formData.activity);
      const tdee = bmr * activityFactor;
      const calories = calculateCaloriesByGoal(tdee, formData.goal);
      const macros = calculateMacros(calories, formData.goal);
      const FirstLogIn = new Date().toISOString().split('T')[0];;

      try {
        const docRef = doc(collection(db, 'users')); 
        await setDoc(docRef, {
  ...formData,
  userID: docRef.id,
  FirstLogIn: FirstLogIn,
  BMR: Math.round(bmr),
  TDEE: Math.round(tdee),
  Calories: Math.round(calories),
  Macros: macros,
});

        localStorage.setItem('userID', docRef.id);

        alert(`Your daily calories: ${Math.round(calories)} kcal\nMacros (g): Protein: ${macros.protein}, Fat: ${macros.fat}, Carbs: ${macros.carbs}`);
        navigate('/home');

      } catch (error) {
        console.error('Error saving to Firebase:', error);
        alert('Something went wrong while saving your data.');
      }
    } else {
      alert('Please fill in all fields before submitting.');
      console.log(formData);
    }
  };




  return (
    <form onSubmit={handleSubmit} className="userinfoform">
  <div className="group">
    <label>Firstname:</label>
    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
  </div>

  <div className="group">
    <label>Activity Level:</label>
    <select name="activity" value={formData.activity} onChange={handleChange}>
      <option value="">Select</option>
      <option value="notVeryActive">Not Very Active — Sit most of the day (e.g., desk job)</option>
      <option value="lightlyActive">Lightly Active — On your feet a good part of the day (e.g., teacher)</option>
      <option value="active">Active — Some physical activity during the day (e.g., food server)</option>
      <option value="veryActive">Very Active — Heavy physical activity most of the day (e.g., carpenter)</option>
    </select>
  </div>
  <div className="group">
    <label>Goal</label>
    <select name="goal" value={formData.goal} onChange={handleChange}>
      <option value="">Select</option>
      <option value="WeightLoss">Fat Loss / Weight Loss: Eat fewer calories than your TDEE to reduce body fat.</option>
      <option value="MuscleGain">Muscle Gain / Bulking: Eat more than your TDEE to build muscle mass and gain healthy weight.</option>
      <option value="Maintenance">Maintenance: Eat the same amount of calories as your body burns to maintain current weight.</option>
      <option value="BodyRecomposition">Body Recomposition: Aim to lose fat and gain muscle at the same time. Works best for beginners or those returning to training.</option>
      <option value="Cutting">Cutting: Focused fat loss while preserving as much muscle as possible. Typically follows a muscle gain phase.</option>
    </select>
  </div>
  <div className="group">
  <label>Gender:</label>
  <div style={{ display: 'flex', gap: '20px', }}>
    <label>
      <input
        type="radio"
        name="gender"
        value="male"
        checked={formData.gender === "male"}
        onChange={handleChange}
      />
      Male
    </label>
    <label>
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
    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
  </div>


  <div className="group">
    <label>Height ({formData.heightUnit}):</label>
    <input type="text" name="height" value={formData.height} onChange={handleChange} />
    <button type="button" onClick={toggleHeightUnit}>
      Switch to {formData.heightUnit === 'cm' ? 'ft/in' : 'cm'}
    </button>
  </div>

  <div className="group">
    <label>Weight ({formData.weightUnit}):</label>
    <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
    <button type="button" onClick={toggleWeightUnit}>
      Switch to {formData.weightUnit === 'kg' ? 'lbs' : 'kg'}
    </button>
  </div>

  <div className="group">
    <label>Goal Weight ({formData.weightUnit}):</label>
    <input type="text" name="goalWeight" value={formData.goalWeight} onChange={handleChange} />
  </div>

  <button type="submit">Submit</button>
</form>
  );
}

export default UserForm;
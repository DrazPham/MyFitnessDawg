import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from "src/firebase/index.jsx";
import { collection, addDoc } from 'firebase/firestore';
import "assets/css/userform/index.css";

function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    activity: '',
    gender: '',
    birthdate: '',
    country: '',
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
    try {
      await addDoc(collection(db, 'users'), formData);
      navigate('/home');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      console.error('Firebase error details:', error.message);
      alert('Something went wrong while saving your data.');
    }
  } else {
    alert('Please fill in all fields before submitting.');
    console.log(formData)
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
    <label>Country:</label>
    <input type="text" name="country" value={formData.country} onChange={handleChange} />
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
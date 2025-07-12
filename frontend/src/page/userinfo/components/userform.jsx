import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.entries(formData).every(([key, value]) => {
      // Only check for actual data fields, not units
      if (['heightUnit', 'weightUnit'].includes(key)) return true;
      return value.trim() !== '';
    });

    if (allFieldsFilled) {
      navigate('/home');
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <label>
        Firstname:
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
      </label>

      <label>
        Activity Level:
        <select name="activity" value={formData.activity} onChange={handleChange}>
          <option value="">Select</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Birthdate:
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
      </label>

      <label>
        Country:
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
      </label>

      <label>
        Height ({formData.heightUnit}):
        <input type="text" name="height" value={formData.height} onChange={handleChange} />
        <button type="button" onClick={toggleHeightUnit}>Switch to {formData.heightUnit === 'cm' ? 'ft/in' : 'cm'}</button>
      </label>

      <label>
        Weight ({formData.weightUnit}):
        <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
        <button type="button" onClick={toggleWeightUnit}>Switch to {formData.weightUnit === 'kg' ? 'lbs' : 'kg'}</button>
      </label>

      <label>
        Goal Weight ({formData.weightUnit}):
        <input type="text" name="goalWeight" value={formData.goalWeight} onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
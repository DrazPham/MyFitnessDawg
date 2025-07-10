import { useState } from 'react';

const MeasurementForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    weight: '',
    neck: '',
    waist: '',
    hips: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // You can store this in localStorage, send to an API, etc.
  };

  return (
    <form onSubmit={handleSubmit} className="measurement-form">
      <h2>📝 Body Measurement Tracker</h2>

      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </label>

      <label>
        Weight (kg):
        <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
      </label>

      <label>
        Neck (cm):
        <input type="number" name="neck" value={formData.neck} onChange={handleChange} />
      </label>

      <label>
        Waist (cm):
        <input type="number" name="waist" value={formData.waist} onChange={handleChange} />
      </label>

      <label>
        Hips (cm):
        <input type="number" name="hips" value={formData.hips} onChange={handleChange} />
      </label>

      {/* <label>
        Note:
        <textarea name="note" value={formData.note} onChange={handleChange} />
      </label> */}

      <button type="submit">Save</button>
    </form>
  );
};

export default MeasurementForm;
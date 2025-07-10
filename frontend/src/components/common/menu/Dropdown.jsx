import React, { useState } from 'react';

const Dropdown = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">{label || 'Choose an option:'}</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">--Please choose--</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
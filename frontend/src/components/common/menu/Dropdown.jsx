import React, { useState } from 'react';

const Dropdown = ({ label, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (onChange) {
      onChange(value); // 👈 Gọi hàm callback từ cha
    }
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
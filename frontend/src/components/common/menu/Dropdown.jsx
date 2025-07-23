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
    <div style={{display:"flex", gap:"1rem"}}>
      <label htmlFor="dropdown">{label || 'Choose an option:'}</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value=""></option>
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
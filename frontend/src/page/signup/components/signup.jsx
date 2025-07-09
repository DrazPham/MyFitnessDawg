import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    dob: "",
    gender: "",
    location: "",
    height: "",
    weight: "",
    targetWeight: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can integrate with backend or validation
  };

  return (
    <div style={styles.container}>
      <h2>Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Ngày sinh:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        <label>Giới tính:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">-- Chọn --</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>

        <label>Nơi ở:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Chiều cao (cm):</label>
        <input type="number" name="height" value={formData.height} onChange={handleChange} required />

        <label>Cân nặng hiện tại (kg):</label>
        <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

        <label>Mục tiêu cân nặng (kg):</label>
        <input type="number" name="targetWeight" value={formData.targetWeight} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Mật khẩu:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" style={styles.button}>Đăng ký</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default SignupForm;
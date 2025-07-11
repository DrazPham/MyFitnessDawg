import React, { useState } from "react";
import { db, auth } from "src/firebase/index.jsx";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";  

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
    username: "",
    userID: ""
  });

  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username, userID } = formData;

    if (!email || !password || !username || !userID) {
      setNotification("Please fill all the required fields");
      return;
    }

    try {
      const role = email.includes("admin") ? "admin" : "user";
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;

      // const userInfo = {
      //   email,
      //   password,
      //   Username: username,
      //   UserID: userID,
      //   role,
      //   phone: "",
      //   birthday: formData.dob,
      //   bio: "",
      //   date: "",
      //   location: formData.location,
      //   gender: formData.gender,
      //   height: formData.height,
      //   weight: formData.weight,
      //   targetWeight: formData.targetWeight
      // };

      // localStorage.setItem("userID", JSON.stringify(userInfo));

      // await setDoc(doc(db, "users", user.uid), {
      //   ...userInfo,
      //   checkBreed: true,
      //   level: 1,
      //   levelTracking: 0,
      //   createdAt: new Date()
      // });

      // if (role === "admin") {
      //   window.location.replace("/content/Admin/admin-home.html");
      // } else {
      //   window.location.replace("/content/User/user-home.html");
      // }

    } catch (error) {
      console.error("Error creating user:", error.code, error.message);
      setNotification("Email has been used");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Đăng Ký Tài Khoản</h2>
      {notification && <p style={{ color: "red" }}>{notification}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="username" placeholder="Tên người dùng" value={formData.username} onChange={handleChange} required />
        <input type="text" name="userID" placeholder="ID người dùng" value={formData.userID} onChange={handleChange} required />
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
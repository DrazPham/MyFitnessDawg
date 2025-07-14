import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "src/firebase/index.jsx";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "firebase/auth";
import "assets/css/account/index.css";

function AccountForm() {
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    "confirm-password": "",
  });

  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};


  useEffect(() => {
    if (notification) {
      alert(notification);
      setNotification("");
    }
  }, [notification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setNotification("Please fill all the required fields");
      return;
    }

    if (formData.password !== formData["confirm-password"]) {
      setNotification("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      localStorage.setItem("userID", uid);
      setNotification("Registration successful!");
      navigate("/userinfo");
    } catch (error) {
      console.error("Error creating user:", error.code, error.message);
      setNotification("Email has been used");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setNotification("Please enter both email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      localStorage.setItem("userID", uid);
      setNotification("Welcome back!");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      setNotification("Invalid credentials");
    }
  };

  return (
    <div
      className={`LogInContainer ${isSignUpActive ? "right-panel-active" : ""}`}
      id="LogInContainer"
    >
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>Fresh Start!</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirm-password"
            value={formData["confirm-password"] ?? ""}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <button type="submit">Hop In!</button>
          {notification && <p className="notification">{notification}</p>}
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Welcome Back!</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit">Let's go</button>
          {notification && <p className="notification">{notification}</p>}
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Back on Track</h1>
            <p>Got an Form? Let's reconnect—log in now!</p>
            <button className="ghost" onClick={() => setIsSignUpActive(false)}>
              Jump Back In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hey there!</h1>
            <p>
              Jump into your health journey—just fill in your details to begin.
            </p>
            <button className="ghost" onClick={() => setIsSignUpActive(true)}>
              Become a Tracker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountForm;

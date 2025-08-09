import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "src/firebase/index.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "assets/css/account/index.css";

function AccountForm() {
  const { t } = useTranslation();
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    setNotification(t("notify.fillRequired"));
    return;
  }

  if (formData.password !== formData["confirm-password"]) {
    setNotification(t("notify.passwordMismatch"));
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
    setNotification(t("notify.registrationSuccess"));
    navigate("/userinfo");
  } catch (error) {
    console.error("Error creating user:", error.code, error.message);
    setNotification(t("notify.emailUsed"));
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = formData;

  if (!email || !password) {
    setNotification(t("notify.enterEmailPassword"));
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
    setNotification(t("notify.welcomeBack"));
    navigate("/home");
  } catch (error) {
    console.error("Login error:", error.code, error.message);
    setNotification(t("notify.invalidCredentials"));
  }
};


  return (
    <div
      className={`LogInContainer ${isSignUpActive ? "right-panel-active" : ""}`}
      id="LogInContainer"
    >
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>{t("auth.signup.title")}</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder={t("auth.email")}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder={t("auth.password")}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirm-password"
            value={formData["confirm-password"] ?? ""}
            placeholder={t("auth.confirm")}
            onChange={handleChange}
          />
          <button type="submit">{t("auth.signup.button")}</button>
          {notification && <p className="notification">{notification}</p>}
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>{t("auth.signin.title")}</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder={t("auth.email")}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder={t("auth.password")}
            onChange={handleChange}
          />
          <button type="submit">{t("auth.signin.button")}</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>{t("auth.overlay.leftTitle")}</h1>
            <p>{t("auth.overlay.leftDesc")}</p>
            <button className="ghost" onClick={() => setIsSignUpActive(false)}>
              {t("auth.overlay.leftBtn")}
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>{t("auth.overlay.rightTitle")}</h1>
            <p>{t("auth.overlay.rightDesc")}</p>
            <button className="ghost" onClick={() => setIsSignUpActive(true)}>
              {t("auth.overlay.rightBtn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountForm;

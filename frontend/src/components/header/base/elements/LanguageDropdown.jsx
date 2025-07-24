import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  };

  return (
    <div className="selectContainer">
      <span className="languageLabel">🌐 Language:</span>
      <select
        className="selectBox"
        onChange={handleChange}
        value={i18n.language || localStorage.getItem("lang") || "en"}
      >
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

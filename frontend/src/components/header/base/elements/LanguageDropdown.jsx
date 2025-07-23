import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className = "selectContainer">
      <span className = "languageLabel">🌐 Language:</span>
      <select className = "selectBox"
        onChange={handleChange}
        value={i18n.language}
      >
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

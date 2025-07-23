import { useTranslation } from "react-i18next";

const AnalyzeButton = ({ onAnalyze }) => {
  const { t } = useTranslation();
  return <button onClick={onAnalyze}>{t("button.analyze")}</button>;
};

export default AnalyzeButton;

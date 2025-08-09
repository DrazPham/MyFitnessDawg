import { useTranslation } from "react-i18next";

const ReportSelector = ({ selectedReport, onChange }) => {
  const { t } = useTranslation();

  return (
    <select value={selectedReport} onChange={(e) => onChange(e.target.value)}>
      <option value="weight">{t("report.weight")}</option>
      <option value="neck">{t("report.neck")}</option>
      <option value="waist">{t("report.waist")}</option>
      <option value="hips">{t("report.hip")}</option>
    </select>
  );
};

export default ReportSelector;

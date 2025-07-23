const getDropdownOptions = (t) => [
  { label: t("activity.sedentary"), value: "1.2" },
  { label: t("activity.light"), value: "1.375" },
  { label: t("activity.moderate"), value: "1.55" },
  { label: t("activity.heavy"), value: "1.725" },
  { label: t("activity.veryIntense"), value: "1.9" },
];

export default getDropdownOptions;
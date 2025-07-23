import { useState, useContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import { useTranslation } from "react-i18next";
import UserInfoContext from "components/functions/UserInfoContext";

const MeasurementForm = () => {
    const { t } = useTranslation();
  const [formData, setFormData] = useState({
    date: "",
    weight: "",
    neck: "",
    waist: "",
    hips: "",
  });
  const userInfoData = useContext(UserInfoContext).userInfo;
  const userID = userInfoData.userID;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("RecordForm");

    try {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);
      const today = new Date().toISOString().split("T")[0];

      const newEntry = {
        date: today,
        ...formData,
      };

      let updatedRecords = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        const records = data.records || [];
        const existingIndex = records.findIndex(
          (entry) => entry.date === today
        );

        if (existingIndex !== -1) {
          records[existingIndex] = newEntry;
        } else {
          records.push(newEntry);
        }

        updatedRecords = records;
      } else {
        updatedRecords = [newEntry];
      }

      await setDoc(docRef, { records: updatedRecords }, { merge: true });
      setFormData({
        date: "",
        weight: "",
        neck: "",
        waist: "",
        hips: "",
      });
      alert(`Cập nhật dữ liệu thành công cho ngày ${today}`);
    } catch (err) {
      alert("Lỗi khi cập nhật dữ liệu!");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="measurement-form" id="RecordForm">
      <h2>📝 {t("label.bodyMeasurementTracker")}</h2>


     <div className="checkInGroup">
        <label>{t("label.date")}:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="checkInGroup">
        <label>{t("label.weight")} (kg):</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>

      <div className="checkInGroup">
        <label>{t("label.neck")} (cm):</label>
        <input
          type="number"
          name="neck"
          value={formData.neck}
          onChange={handleChange}
        />
      </div>

      <div className="checkInGroup">
        <label>{t("label.waist")} (cm):</label>
        <input
          type="number"
          name="waist"
          value={formData.waist}
          onChange={handleChange}
        />
      </div>

      <div className="checkInGroup">
        <label>{t("label.hips")} (cm):</label>
        <input
          type="number"
          name="hips"
          value={formData.hips}
          onChange={handleChange}
        />
      </div>
            <button type="submit">{t("button.save")}</button>
    </form>
  );
};
export default MeasurementForm;

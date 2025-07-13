import { useState } from 'react';
import { getFirestore, collection, addDoc,doc, updateDoc, getDoc,setDoc  } from 'firebase/firestore';
import { db } from "src/firebase/index.jsx";

const MeasurementForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    weight: '',
    neck: '',
    waist: '',
    hips: '',
  });

  const userID = localStorage.getItem("userID")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const docRef = doc(db, 'users', userID);
    const docSnap = await getDoc(docRef);
          const form = document.getElementById('blogForm');


    // Lấy ngày hôm nay theo định dạng YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    console.log(today)
    
    // Dữ liệu mới
    const newEntry = {
      date: today,
      ...formData
    };
    

    let updatedRecords = [];

    if (docSnap.exists()) {
      const data = docSnap.data();
      const records = data.records || [];

      

      // Kiểm tra xem đã có entry nào cùng ngày chưa
      const existingIndex = records.findIndex(entry => entry.date === today);


      if (existingIndex !== -1) {
        // Nếu có, cập nhật entry cũ
        records[existingIndex] = newEntry;
      } else {
        // Nếu chưa, thêm mới vào cuối
        records.push(newEntry);
      }

      updatedRecords = records;
    } else {
      // Nếu document chưa tồn tại, tạo mới records
      updatedRecords = [newEntry];
    }

    // Cập nhật records lên Firestore
    await setDoc(docRef, { records: updatedRecords }, { merge: true });

    alert(`Cập nhật dữ liệu thành công cho ngày ${today}`);
    // form.reset();
  } catch (err) {
    console.error(err);
    alert('Lỗi khi cập nhật dữ liệu!');
  }
};


  return (
    <form onSubmit={handleSubmit} className="measurement-form" id = "RecordForm">
      <h2>📝 Body Measurement Tracker</h2>

      <div className="checkInGroup">
  <label>Date:</label>
  <input type="date" name="date" value={formData.date} onChange={handleChange} />
</div>

<div className="checkInGroup">
  <label>Weight (kg):</label>
  <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
</div>

<div className="checkInGroup">
  <label>Neck (cm):</label>
  <input type="number" name="neck" value={formData.neck} onChange={handleChange} />
</div>

<div className="checkInGroup">
  <label>Waist (cm):</label>
  <input type="number" name="waist" value={formData.waist} onChange={handleChange} />
</div>

<div className="checkInGroup">
  <label>Hips (cm):</label>
  <input type="number" name="hips" value={formData.hips} onChange={handleChange} />
</div>

      {/* <label>
        Note:
        <textarea name="note" value={formData.note} onChange={handleChange} />
      </label> */}

      <button type="submit">Save</button>
    </form>
  );
};

export default MeasurementForm;
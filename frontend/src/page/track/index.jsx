import NutritionGoalsCard from './components/nutritiongoal';
import MeasurementForm from './components/weightcheckin';
import WeightRecord from './components/weightRecord';
import "assets/css/track/index.css";


import { createContext } from "react";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";

const userInfoContext = createContext([]);

function Track() {
	const [CaloriesData, setCaloriesData] = useState(null);

  useEffect(() => {
	const userID = localStorage.getItem("userID");

	if (!userID) {
	  console.warn("⚠️ Không tìm thấy userID trong localStorage");
	  return;
	}

	const fetchCaloriesData = async () => {
	  try {
		const docRef = doc(db, "users", userID); // 🔍 Truy cập document bằng ID
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
		  const userData = docSnap.data();
		  setCaloriesData(userData); // ✅ Gán dữ liệu vào state
		  console.log("🔥 Dữ liệu người dùng:", userData);
		} else {
		  console.warn("❌ Không tìm thấy người dùng với ID này");
		}
	  } catch (error) {
		console.error("🚨 Lỗi khi lấy dữ liệu người dùng:", error);
	  }
	};

	fetchCaloriesData(); // ⬅️ Gọi hàm fetch bên trong useEffect
  }, []);

	return (
		<main>
			<div className="wrapper aximo-all-section track">
			<userInfoContext.Provider value={CaloriesData}>
                <NutritionGoalsCard />
				<MeasurementForm/>
				<WeightRecord/>
			</userInfoContext.Provider>
			</div>
		</main>
	);
}

export { userInfoContext }
export default Track;
import Personal from "./components/personal";
import CaloriesTracking from "./components/caloriestracking";
import MacrosTracking from "./components/macrostracking";
import "assets/css/home/index.css";
import "assets/css/home/tracking.css";
import { createContext } from "react";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";

const userInfoContext = createContext([]);

function Home() {
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
          console.log("🔥 Dữ liệu người dùng 1:", userData);
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
			<div className="wrapper aximo-all-section home">
			<userInfoContext.Provider value={CaloriesData}>
				<Personal/>
				<CaloriesTracking />
				<MacrosTracking/>
			</userInfoContext.Provider>
			</div>
		</main>
	);
}

export { userInfoContext }
export default Home;
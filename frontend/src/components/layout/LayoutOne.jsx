import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import Footer from "components/footer/main";
import Header from "components/header/main";
import UserInfoContext from "components/functions/UserInfoContext";

function LayoutOne() {
	const [userInfo, setUserInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true); // 👈 Trạng thái tải dữ liệu

	useEffect(() => {
    const fetchUserInfo = async () => {
      const uid = localStorage.getItem("userID");
      if (!uid) {
        setIsLoading(false); // Không có UID, không cần đợi
        return;
      }

      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.warn("User data not found");
        }
      } catch (error) {
        console.error("Error loading user info:", error);
      } finally {
        setIsLoading(false); // ✅ Đảm bảo set false dù thành công hay lỗi
      }
    };

    fetchUserInfo();
  }, []);

  // 🔒 Không render gì nếu chưa có dữ liệu
  if (isLoading) {
    return <div>Loading...</div>; // hoặc spinner
  }
	console.log(userInfo)
	return (
		<UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
			<Header/>
			<Outlet />
			<Footer />
		</UserInfoContext.Provider>
	);
}

export default LayoutOne;

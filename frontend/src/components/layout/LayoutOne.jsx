import { useContext,useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import { getAuth } from "firebase/auth";
import Footer from "components/footer/main";
import Header from "components/header/main";
import UserInfoContext from "components/functions/UserInfoContext";

function LayoutOne() {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
    const userID = localStorage.getItem("userID");
	if (!userID) {
		console.warn("⚠️ Không tìm thấy userID trong localStorage");
    return;
    }
	const fetchUserInfo = async () => {
		try {
			const userDoc = await getDoc(doc(db, "users", userID));
			if (userDoc.exists()) {
			setUserInfo(userDoc.data());
			}
		} catch (error) {
			console.error("Lỗi khi tải user info:", error);
		} finally {
			setLoading(false);
		}
	};

		fetchUserInfo();
	}, []);
	return (
		<UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
			<Header />
			<Outlet />
			<Footer />
		</UserInfoContext.Provider>
	);
}

export default LayoutOne;

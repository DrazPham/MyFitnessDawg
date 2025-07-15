import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import UserInfoContext from "components/functions/UserInfoContext";
import Footer from "components/footer/main";
import Header from "components/header/main";

function LayoutOne() {
	const [userInfo, setUserInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true); 

	useEffect(() => {
    const fetchUserInfo = async () => {
      const uid = localStorage.getItem("userID");
      if (!uid) {
        setIsLoading(false); 
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
        setIsLoading(false); 
      }
    };

    fetchUserInfo();
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }
	return (
		<UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
			<Header/>
			<Outlet />
			<Footer />
		</UserInfoContext.Provider>
	);
}

export default LayoutOne;

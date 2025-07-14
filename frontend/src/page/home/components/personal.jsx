import "assets/css/home/personal.css";
import MaleUser from "assets/images/logo/maleuser.png";
import FemaleUser from "assets/images/logo/femaleuser.png";
import { useContext } from "react";
import UserInfoContext from "components/functions/UserInfoContext";

function Personal(){
    if (!UserInfoContext) {
    return <div>Loading user info...</div>; // fallback an toàn nếu muốn thêm
    }
    const userInfoData = useContext(UserInfoContext).userInfo;
    const getUserImage = (gender) => {
    return gender === "male" ? MaleUser : FemaleUser;
    };
    return(
        <div class="personal container">
            <img src={getUserImage(
                userInfoData.gender
                )} alt="" />
            <div className="personal-right">
                <p>Started on</p>
                <p>
                    {userInfoData.FirstLogIn}
                </p>
            </div>

        </div>
    )
}
export default Personal;
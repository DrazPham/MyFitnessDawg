import MaleUser from "assets/images/logo/maleuser.png";
import FemaleUser from "assets/images/logo/femaleuser.png";
const getUserImage = (gender) => {
    return gender === "male" ? MaleUser : FemaleUser;
};
export default getUserImage;

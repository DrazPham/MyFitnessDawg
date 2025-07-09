import "assets/css/home/personal.css";
import User from "assets/images/logo/maleuser.png";


function Personal(){
    return(
        <div class="personal container">
            <img src={User} alt="" />
            <div class = "daycount">
                <p>2</p>
                <div>
                    <p>DAYS</p>
                    <p>STREAKS</p>
                </div>
                
            </div>
        </div>
    )
}
export default Personal;
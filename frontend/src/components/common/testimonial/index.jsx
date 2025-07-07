import Star2Img from "../../../assets/images/v1/star2.png";
import Thumb1Img from "../../../assets/images/v1/t_thumb1.png";
import Thumb2Img from "../../../assets/images/v1/t_thumb2.png";
import Thumb3Img from "../../../assets/images/v1/t_thumb3.png";
import Thumb4Img from "../../../assets/images/v1/t_thumb4.png";
import TestimonialCard from "./TestimonialCard";

const testimonialsData = [
	{
		id: crypto.randomUUID(),
		source: "https://www.youtube.com/embed/TEfBTl0b_J0?si=gUyJ4s5ehH74FINM",
		author: "Anh Thơ",
		designation: "Lớp E3A",
	},
	{
		id: crypto.randomUUID(),
		source: "https://www.youtube.com/embed/L6e0IwCAZ9o?si=RLSzX7-Zn9Cm_dXT",
		author: "Việt Anh",
		designation: "Lớp E3A",
	},
	{
		id: crypto.randomUUID(),
		source: "https://www.youtube.com/embed/624DPAp542Q?si=Xkjf4vAVWU2XOofq",
		author: "Hoàng Tuấn",
		designation: "Lớp E3A",
	},
	{
		id: crypto.randomUUID(),
		source: "https://www.youtube.com/embed/PN0kfjyITFw?si=pitDTnxQWMoDAdaf",
		author: "Thanh Nhàn",
		designation: "Lớp E3A",
	},
	{
		id: crypto.randomUUID(),
		source: "https://www.youtube.com/embed/LISoxrup3g4?si=NG5JQZRpMTpQpR8L",
		author: "Tiến Sang",
		designation: "Lớp E3A",
	},
	{
		id: crypto.randomUUID(),
		source: "https://www.youtube.com/embed/5Y7hi7FCHfE?si=kWmzIPP11rhNnZDv",
		author: "Thanh Nhàn",
		designation: "Lớp E3B",
	},
];

function Testimonial() {
	return (
		<div className="section aximo-section-padding3">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						Cảm nhận của các em học sinh
					</h2>
				</div>
				<div className="row">
					{testimonialsData.map((testimonial) => (
						<TestimonialCard key={testimonial.id} testimonial={testimonial} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Testimonial;

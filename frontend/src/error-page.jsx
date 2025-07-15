import { Link } from "react-router-dom";
export default function ErrorPage() {
	return (
		<div className="section">
			<div className="container">
				<div className="aximo-errors-wrap">
					<div className="aximo-errors-title">
						<h2>
							Chúng tôi không thể
							<span className="aximo-title-animation">
								tìm được địa chỉ cần tìm
							</span>
						</h2>
					</div>
					<Link className="aximo-errors-btn" to="/">
						Quay trở lại trang chủ
					</Link>
				</div>
			</div>
		</div>
	);
}

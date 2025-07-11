import { Outlet } from "react-router-dom";
import Footer from "components/footer/main";
import Header from "components/header/main";
function LayoutOne() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default LayoutOne;

import { Outlet } from "react-router-dom";
import Footer from "components/footer";
import Header from "components/header";
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

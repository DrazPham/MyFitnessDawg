import { Outlet } from "react-router-dom";
import Footer from "components/footer/base";
import Header from "components/header/base";
function LayoutBase() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
export default LayoutBase;

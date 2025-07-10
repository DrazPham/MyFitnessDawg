import { Outlet } from "react-router-dom";
import useScrollTop from "hooks/useScrollTop";
import Preloader from "components/common/Preloader";
import ScrollToTop from "components/common/ScrollToTop";
function Layout() {
	useScrollTop();
	return (
		<>
			<Preloader />
			<Outlet />
			<ScrollToTop />
		</>
	);
}

export default Layout;

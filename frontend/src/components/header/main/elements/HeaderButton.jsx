function HeaderButton({ setShowSideMenu, showSideMenu }) {
	return (
		<div className="header-btn header-btn-l1 ms-auto d-none d-lg-inline-flex">
			<button
				className="aximo-default-btn outline-btn pill barger-menu"
				// onClick={() => setShowSideMenu(!showSideMenu)}
			>
				
				Get Started
			</button>
		</div>
	);
}

export default HeaderButton;

import React from 'react';
import { Link } from 'react-router-dom';

function HeaderButton({ Title,route, depthLevel }) {
  return (
    <div className="header-btn header-btn-l1 ms-auto d-none d-lg-inline-flex">
		<button className="aximo-default-btn outline-btn pill barger-menu">
      {/* Login button */}
      <Link
        to="/account"
        className="aximo-default-btn outline-btn pill ms-2"
      >
        {Title}
      </Link>
	  </button>
    </div>
  );
}

export default HeaderButton;
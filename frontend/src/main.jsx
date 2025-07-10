import React from 'react';
import ReactDOM from 'react-dom/client';

// fonts dùng font.js hoặc boostrap cx đc
import "./assets/css/fontawesome.css";
import "./assets/css/icomoon.css";
// import "./font.js"

// main css
import "./assets/css/app.css";
import "./assets/css/main.css";
import "./assets/css/index.css";

import "./index"


// React Router Dom
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    	<RouterProvider router={router} />
	</React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';

// fonts
// import "./assets/css/fontawesome.css";
// import "./assets/css/icomoon.css";
// import "./font.js"

// main css
// import "./assets/css/app.css";
// import "./assets/css/main.css";

// React Router Dom
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    	<RouterProvider router={router} />
	</React.StrictMode>
);

console.log("ho")
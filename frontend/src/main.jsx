//REACT
import React from 'react';
import ReactDOM from 'react-dom/client';
//LINK BOOSTRAP
import 'bootstrap/dist/js/bootstrap.bundle.min';
//LINK CSS
import "./assets/css/app.css";
import "./assets/css/main.css";
import "./assets/css/index.css";
//ROUTER
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    	<RouterProvider router={router} />
	</React.StrictMode>
);

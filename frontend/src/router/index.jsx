import { createBrowserRouter } from "react-router-dom";
import LayoutOne from "components/layout/LayoutOne.jsx";
import LayoutBase from "components/layout/LayoutBase.jsx";
import Layout from "components/layout/index.jsx";
import Base from "page/Base";
import Home from "page/Home";
import Chat from "page/Chat";
import Track from "page/Track";
import Exercise from "page/Exercise";
import Report from "page/Report";
import PrivacyPolicy from "page/privacypolicy";
import Login from "page/login";
import Signup from "page/signup"
import ErrorPage from "../error-page";
import Blog from "page/blog";
import SingleBlogPage from "page/blog/SingleBlog.jsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LayoutBase />,
				children: [
					{
						path: "/",
						element: <Base />,
					}]
			},
			{
				path: "/",
				element: <LayoutOne />,
				children: [
					{
						path: "/home",
						element: <Home />,
					},
					{
						path: "/chat",
						element: <Chat />,
					},
					{
						path: "/track",
						element: <Track />,
					},
					{
						path: "/exercise",
						element: <Exercise />,
					},
					{
						path: "/report",
						element: <Report />,
					},
					{
						path: "/blog",
						element: <Blog />,
					},
					{
						path: "/privacypolicy",
						element: <PrivacyPolicy />,
					},
					{
						path: "/login",
						element: <Login />,
					},
					{
						path: "/signup",
						element: <Signup />,
					},
					{
						path: "*",
						element: <ErrorPage />,
					},
					{
						path: "/blog/:id",
						element: <SingleBlogPage />,
					},
				],
			},
		],
	},
]);

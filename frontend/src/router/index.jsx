import { createBrowserRouter } from "react-router-dom";
import LayoutOne from "components/layout/LayoutOne.jsx";
import LayoutBase from "components/layout/LayoutBase.jsx";
import Layout from "components/layout/index.jsx";
import Base from "page/Base";
import Home from "page/Home";
import Chat from "page/Chat";
import Track from "page/Track";
import Exercise from "page/Exercise";
import PrivacyPolicy from "page/privacypolicy";
import Account from "page/account";
import ErrorPage from "../error-page";
import Blog from "page/blog";
import SingleBlogPage from "page/blog/SingleBlog.jsx";
import UserInfo from "page/userinfo";
import Test from "page/test"

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
					},
					{
						path: "/account",
						element: <Account />,
					},
					{
						path: "/userinfo",
						element: <UserInfo />,
					},
				]
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
						path: "/blog",
						element: <Blog />,
					},
					{
						path: "/privacypolicy",
						element: <PrivacyPolicy />,
					},
					{
						path: "*",
						element: <ErrorPage />,
					},
					{
						path: "/test",
						element: <Test />,
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

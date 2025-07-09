import { createBrowserRouter } from "react-router-dom";
import LayoutOne from "components/layout/LayoutOne.jsx";
import Layout from "components/layout/index.jsx";
import Home from "page/Home";
import Chat from "page/Chat";
import Track from "page/Track";
import Exercise from "page/Exercise";
import Report from "page/Report";
import Blog from "page/blog";
import PrivacyPolicy from "page/privacypolicy";
import Login from "page/login";
import Signup from "page/signup"

// import ContactUs from "page/contact/ContactUs";
// import BlogGridPage from "page/blog/BlogGridPage.jsx";
// import SingleBlogPage from "page/blog/SingleBlog.jsx";
// import Moments from "page/moments/Moments";
// import MomentsDetail from "page/moments-detail/SingleMoment"
// import SingleTeam from "page/team-detail/SingleTeam.jsx";
// import Faq from "page/utility/Faq.jsx";
// // import TestimonialPage from "page/utility/Testimonial.jsx";
// import Events from "page/events";
// import 'bootstrap/dist/css/bootstrap.min.css';


export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LayoutOne />,
				children: [
					{
						path: "/",
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
					// {
					// 	path: "/blog/:id",
					// 	element: <SingleBlogPage />,
					// },
					// {
					// 	path: "/blog-grid",
					// 	element: <BlogGridPage />,
					// },
					// {
					// 	path: "/single-team",
					// 	element: <SingleTeam />,
					// },

					// {
					// 	path: "/single-portfolio",
					// 	element: <MomentsDetail />,
					// },
					// {
					// 	path: "*",
					// 	element: <ErrorPage />,
					// },
				],
			},
		],
	},
]);

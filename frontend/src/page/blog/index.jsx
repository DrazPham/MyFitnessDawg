import { createContext } from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query,orderBy } from 'firebase/firestore';
import { db } from "src/firebase/index.jsx";
import Carousel from "src/components/common/Carousel";
import GridBlog from "./components/grid-blog";
import timestampToDateString from "components/functions/timestampToDateString";
import imageList from "./components/imageList";

const BlogGridContext = createContext([]);
function BlogGridPage() {
	const [gridBlogData, setGridBlogData] = useState([]);
	useEffect(() => {
		const fetchBlogData = async () => {
			try {
				const q = query(collection(db, 'blog'), orderBy('meta.publishedDate', 'desc')); 				
				const querySnapshot = await getDocs(q);				
				const blogs = querySnapshot.docs.map(doc => {
					const data = doc.data();
					return {
						id: doc.id,
						...data,
						meta: {
							publishedDate: timestampToDateString(data.meta.publishedDate.seconds).slice(0,-15),
							timeRead: data.meta.timeRead,
							author:data.meta.author
						}
					};
				});
				setGridBlogData(blogs);
			} 
			catch (error) {
				console.error('Error fetching blog posts:', error);
			}
		};
		fetchBlogData();
	}, []);
	return (
		<BlogGridContext.Provider value={gridBlogData}>
			<Carousel images={imageList}/>
			<GridBlog />
		</BlogGridContext.Provider>
	);
}
export default BlogGridPage;
export { BlogGridContext }

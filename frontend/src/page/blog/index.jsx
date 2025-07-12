import { createContext } from "react";
import { useState, useEffect } from "react";
import Carousel from "src/components/common/Carousel";
import GridBlog from "./components/grid-blog";
import { collection, getDocs, query,orderBy } from 'firebase/firestore';
import { db } from "src/firebase/index.jsx";

const BlogGridContext = createContext([]);

const timestampToDate = (timestamp) => {
	if (timestamp && timestamp.seconds !== undefined) {
		const date = new Date(timestamp.seconds * 1000);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
	return null;
};

function timestampToDateString(seconds) {
	const date = new Date(seconds * 1000); // Convert seconds to milliseconds
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
}


function BlogGridPage() {

	const [gridBlogData, setGridBlogData] = useState([]);
	
	useEffect(() => {
		const fetchBlogData = async () => {
			try {
				// Create a query with orderBy on 'date'
				const q = query(collection(db, 'blog'), orderBy('meta.publishedDate', 'desc')); // or 'desc' for newest to oldest				
				const querySnapshot = await getDocs(q);				
				const blogs = querySnapshot.docs.map(doc => {
					const data = doc.data();
					return {
						id: doc.id,
						...data,
						meta: {
							publishedDate: timestampToDateString(data.meta.publishedDate.seconds).slice(0,-15),// Assuming Firestore timestamp
							timeRead: data.meta.timeRead,
							author:data.meta.author
						}
					};
				});
	
				setGridBlogData(blogs);
				console.log(blogs)
			} 
			catch (error) {
				console.error('Error fetching blog posts:', error);
			}
		};
		fetchBlogData();
	}, []);


	const imageList = [
    'https://aylohealth.com/wp-content/uploads/2022/12/10-Healthy-Tips-for-National-Nutrition-Month_Body-Image-1024x578.jpeg',
    'https://www.arizonacollege.edu/wp-content/uploads/2022/05/Healtheir-Eating-Tips-1024x773.jpg',
    'https://elibrecher.co.uk/wp-content/uploads/2021/08/6-simple-steps-to-improve-gut-health.png',
];

	return (
		<BlogGridContext.Provider value={gridBlogData}>
			<Carousel images={imageList}/>
			<GridBlog />
		</BlogGridContext.Provider>
	);
}

export default BlogGridPage;
export { BlogGridContext }

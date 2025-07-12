import { LazyLoadImage } from "react-lazy-load-image-component";
import PostMeta from "./PostMeta";
import React, { useEffect, useState } from 'react';
import PostTags from "./PostTags";
import ReactMarkdown from 'react-markdown';
import { useContext } from "react";
import { BlogContext } from "../../SingleBlog";
function BlogDetails() {
	const [blogContent, setBlogContent] = useState([]);

	useEffect(() => {
		const fetchStoryContent = async () => {
			const q = query(collection(db, 'blog'), orderBy('date', 'desc'));
			const querySnapshot = await getDocs(q);
			const contentArray = querySnapshot.docs.map(doc => doc.data());
			setBlogContent(contentArray);		
		};

		fetchStoryContent();
	}, []);

	if (blogContent.length === 0) {
		return <div>Loading...</div>;
	}

	let blogInfo = blogContent[0];
	
	return (
		<div className="single-post-content-wrap">
			<PostMeta/>
			<div className="entry-content">
				<h3>{blogInfo.title}</h3>
				<img style={{aspectRatio:"16/9",objectFit:"cover",borderRadius:"20px"}} src = {blogInfo.image}></img>
				{blogInfo.content.map((item, index) => (
					<div key={index}>
						<ReactMarkdown breaks>{item.text}</ReactMarkdown>
						<img src={item.image} alt={`Image ${index + 1}`} onError={(e) => { e.target.style.display = 'none'; }} />
					</div>
				))}
				<PostTags tags={blogContent[0].tags} />
			</div>
		</div>
	);
}


export default BlogDetails;

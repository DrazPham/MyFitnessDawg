import GridBlogCard from "./GridBlogCard";
import { BlogGridContext } from "../../index";
import { useContext } from "react";
import "assets/css/blog/index.css"
function GridBlog() {
	const BlogGridData = useContext(BlogGridContext);
	console.log(BlogGridData)
	return (
		<div className="section gridblogsection"  style = {{margin:"30px 0 100px"}}>
			<div className="gridblogcontainer">
						{BlogGridData.map((blog) => (
							<GridBlogCard key={blog.id} blog={blog} />
						))}
			</div>
		</div>
	);
}

export default GridBlog;

import { useContext } from "react";
import GridBlogCard from "./GridBlogCard";
import { BlogGridContext } from "../../index";
import "assets/css/blog/index.css"
function GridBlog() {
	const BlogGridData = useContext(BlogGridContext);
	return (
		<div className="section gridblogsection">
			<div className="gridblogcontainer">
						{BlogGridData.map((blog) => (
							<GridBlogCard key={blog.id} blog={blog} />
						))}
			</div>
		</div>
	);
}
export default GridBlog;

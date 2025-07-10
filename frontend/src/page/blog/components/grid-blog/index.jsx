import GridBlogCard from "./GridBlogCard";
import { BlogGridContext } from "../../index";
import { useContext } from "react";

function GridBlog() {
	const BlogGridData = useContext(BlogGridContext);
	return (
		<div className="section"  style = {{margin:"30px 0 100px"}}>
			<div className="container">
				<div className="col-lg-12">
					<div className="row">
						{BlogGridData.map((blog) => (
							<GridBlogCard key={blog.id} blog={blog} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GridBlog;

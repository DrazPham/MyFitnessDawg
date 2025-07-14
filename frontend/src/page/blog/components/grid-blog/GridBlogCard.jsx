import { Link } from "react-router-dom";
import ArrayRightImg from "assets/images/icon/arrow-right.svg";
function GridBlogCard({ blog: { id, imagePreview, title, meta } }) {
	return (
		<div className = "gridBlogContainer">
			<div className="single-post-item">
			<div className="post-thumbnail">
				<img className ="gridBlogImage"
					src={imagePreview}
					alt={title}
				/>
				</div>
				<div className="post-content">
					<Link to={`/blog/${id}`}>
					<h3 className="entry-title">{title}</h3>
					</Link>
					<div className="post-date" >{meta.timeRead} minutes</div>
					</div>
					<Link className="post-read-more" to={`/blog/${id}`}>
						Read more <img src={ArrayRightImg} alt="Arrow" />
					</Link>
			</div>
		</div>
	);
}
export default GridBlogCard;

import { Link } from "react-router-dom";
import ArrayRightImg from "assets/images/icon/arrow-right.svg";

function GridBlogCard({ blog: { id, imagePreview, title, meta } }) {
	return (
		<div className="col-xl-4" style={{position:"relative",margin:"10px 0"}}>
			<div className="single-post-item" style={{height:"100%"}}>
			<div className="post-thumbnail" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
				<img
					src={imagePreview}
					alt={title}
					style={{
					width: "100%",
					height: "100%",
					objectFit: "cover", 
					}}
				/>
				</div>
				<div className="post-content">
					<Link to={`/blog/${id}`}>
					<h3 className="entry-title">{title}</h3>
					</Link>
					<div className="post-date"  style = {{position:"absolute",bottom:"30px"}}>{meta.timeRead} minutes</div>
					</div>
					<Link className="post-read-more" to={`/blog/${id}`} style = {{position:"absolute",bottom:"10px"}}>
						Read more <img src={ArrayRightImg} alt="Arrow" />
					</Link>
			</div>
		</div>
	);
}

export default GridBlogCard;

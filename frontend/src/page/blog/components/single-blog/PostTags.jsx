function PostTags({ tags }) {
	return (
		<div className="post-tag-wrap">
			<div className="post-tag">
				<h3>Tags:</h3>
				<div className="wp-block-tag-cloud">
					{tags.map((tag, index) => (
						<a key={index}>
							{tag}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}


export default PostTags;

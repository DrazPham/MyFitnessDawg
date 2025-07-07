function TestimonialCard({ testimonial: { source, author, designation} }) {
	return (
		<div className="col-lg-6">
			<div className="aximo-testimonial-wrap">
				<div className="aximo-testimonial-data" style={{aspectRatio:"16/9"}}>
				<iframe style = {{borderRadius:"15px"}}width="100%" height="100%" src={source} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
				</div>
				<div className="aximo-testimonial-author">
					<div className="aximo-testimonial-author-data">
						<p>
							Học sinh: {author} - <span>{designation}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TestimonialCard;

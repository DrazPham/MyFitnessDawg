function Video() {
	return (
		<div className="aximo-video-wrap">
			<iframe
        src="https://www.youtube.com/embed/Og5xAdC8EUI?si=G5fddYnLosWIxp52"
        title="Nutrition & Health"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
    		position: 'absolute',
    		top: 0,
    		left: 0,
    		width: '100%',
    		height: '100%'
        }}
  		/>
		</div>
	);
}
export default Video;

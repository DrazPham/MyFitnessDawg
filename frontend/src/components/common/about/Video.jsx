import { useState } from "react";
import PlayBtnImg from "assets/images/v1/play-btn.svg";

function Video() {
	const [isOpen, setOpen] = useState(false);

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
			<button className="aximo-video-popup play-btn1 video-init" onClick={() => setOpen(true)}>
				<img src={PlayBtnImg} alt="PlayBtnImg" />
			</button>
		</div>
	);
}

export default Video;

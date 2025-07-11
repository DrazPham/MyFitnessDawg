import FooterCopyright from "./elements/FooterCopyright";
import FooterMain from "./elements/FooterMain"
import "assets/css/footer/index.css";
function Footer() {
	return (
		<footer>
			<div className="aximo-footer-bottom four base">
				<FooterCopyright />
			</div>
		</footer>
	);
}

export default Footer;

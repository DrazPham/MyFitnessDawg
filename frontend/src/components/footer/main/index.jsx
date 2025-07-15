import FooterCopyright from "./elements/FooterCopyright";
import FooterMain from "./elements/FooterMain"
import "assets/css/footer/index.css";
function Footer() {
	return (
		<footer>
			<FooterMain />
			<div className="aximo-footer-bottom four">
				<FooterCopyright />
			</div>
		</footer>
	);
}
export default Footer;

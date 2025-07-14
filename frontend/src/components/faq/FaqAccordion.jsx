import { useState } from "react";
import "assets/css/base/faq.css"
import faqItems from "./components/faqItems";

export default function FAQAccordion() {
	const [activeIndex, setActiveIndex] = useState(null);
	const toggleItem = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};
	return (
		<div className="faq-section faq">
			<h2 style={{ textAlign: "center", marginBottom: "24px" }}>
				Frequently Asked Questions
			</h2>
			<div className="faq-list">
				{faqItems.map((item, index) => (
					<div key={index} className="faq-item">
						<button
							className="faq-question"
							onClick={() => toggleItem(index)}
						>
							{item.question}
						</button>
						{activeIndex === index && (
							<div className="faq-answer">{item.answer}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
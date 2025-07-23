import { useState } from "react";
import { useTranslation } from "react-i18next";
import faqItems from "./components/faqItems";
import "assets/css/base/faq.css"

export default function FAQAccordion() {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(null);
	const toggleItem = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};
	return (
			<div className="faq-section faq">
			<h2 className="faq-title">{t("faq.title")}</h2>
			<div className="faq-list">
				{faqItems.map((item, index) => (
					<div key={index} className="faq-item">
						<button
							className="faq-question"
							onClick={() => toggleItem(index)}
						>
							{t(item.question)}
						</button>
						{activeIndex === index && (
							<div className="faq-answer">{t(item.answer)}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
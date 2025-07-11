import { useState } from "react";
import "assets/css/base/faq.css"
const faqItems = [
	{
		question: "Is the app free to use?",
		answer: "Yes, our application is completely free for everyone. No charge, no hidden fees.",
	},
	{
		question: "How can I track my calories and nutrients?",
		answer: "You can use our built-in chatbot to keep track of your calories, macros, and daily nutrition intake with ease.",
	},
	{
		question: "Does the app support barcode scanning?",
		answer: "Currently, barcode scanning is not supported — but we’re working on exciting updates!",
	},
	{
		question: "Can I view my body progress over time?",
		answer: "The app can save your weekly body stats including weight, hip, waist, and belly measurements to help you track your journey.",
	},
	{
		question: "How does the app personalize nutrition recommendations?",
		answer: "We collect basic appearance data like your height, weight, and exercise intensity to calculate your personal TDEE and BMR.",
	},
	{
		question: "Is my personal data secure?",
		answer: "Absolutely. Your health and nutrition data is stored securely and will never be shared without your permission.",
	},
];

export default function FAQAccordion() {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleItem = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

	return (
		<div className="faq-section faq">
			<h2 style={{ textAlign: "center" }}>Frequently Asked Questions</h2>
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
							<div
								className="faq-answer"
							>
								{item.answer}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
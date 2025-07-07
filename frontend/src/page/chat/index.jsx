// import Blogs from "./components/blogs";
// import BrandLogo from "./components/brand-logo";
// import Hero from "./components/hero";
// import Instagrams from "./components/instagrams";
// import MissionVision from "./components/mission-vission";
// import NumberBox from "./components/number-box";
// import Projects from "./components/projects";
// import Services from "./components/services";
// import Testimonials from "./components/testimonials";
// import WhyChooseUs from "./components/why-choose-us";
import { useState } from "react"; 
import axios from "axios";

function Chat() {
	const [userInput, setUserInput] = useState("");
  const [botReply, setBotReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    console.log("📤 Đang gửi request:", userInput);
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5050/chat", {
  prompt: userInput,
});

      console.log("📥 Phản hồi từ server:", res.data);
      setBotReply(res.data.reply);
    } catch (error) {
  console.error("❌ Lỗi khi gửi request:", error.message);
  if (error.response) {
    console.error("📄 Response data:", error.response.data);
    console.error("📄 Status:", error.response.status);
  } else if (error.request) {
    console.error("🛰 Không có phản hồi từ server:", error.request);
  } else {
    console.error("💥 Lỗi khác:", error.message);
  }
  setBotReply("⚠️ Không thể kết nối đến máy chủ.");
}}

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>NutriBot 🍎</h1>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Nhập câu hỏi về dinh dưỡng..."
        style={{ padding: "0.5rem", width: "300px", marginRight: "1rem" }}
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Đang gửi..." : "Gửi"}
      </button>
      <div style={{ marginTop: "1rem" }}>
        <strong>Bot:</strong> {botReply}
      </div>
    </div>
  );
}
export default Chat;

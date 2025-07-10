import { useState } from "react"; 
import axios from "axios";

function Exercise() {
	const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5050/exercise", {
        prompt: userInput,
      });

      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: "⚠️ Không thể kết nối đến máy chủ.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Lỗi khi gửi request:", error);
    }

    setUserInput("");
    setLoading(false);
  };

  return (
    <main>
    <div className ="wrapper aximo-all-section exercise"
      style={{
        width: "100%",
        height: "80vh",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "0.75rem 1rem",
                borderRadius: "15px",
                backgroundColor: msg.sender === "user" ? "#cce5ff" : "#d4edda",
                color: "#333",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid #ccc",
          padding: "0.75rem",
          display: "flex",
        }}
      >
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "20px",
            border: "1px solid #ccc",
            marginRight: "0.5rem",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "..." : "Gửi"}
        </button>
      </div>
    </div>
    </main>
  );
};


export default Exercise;
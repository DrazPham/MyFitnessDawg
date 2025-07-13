import { useState, useEffect } from "react"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import ReactMarkdown from "react-markdown";
import axios from "axios";

function Exercise() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exercise, setExercise] = useState([]);
  const userID = localStorage.getItem("userID");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:2020/exercise", {
        prompt: userInput,
      });

      const botText = res.data.reply;
      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);

      // ✅ Regex mới dành cho bài tập thể dục
      const match = botText.match(
  /Thông tin về bài tập \*\*(.+?)\*\* trong (\d+(?:\.\d+)?) phút:\s*- Calories tiêu hao: \*\*(\d+(?:\.\d+)?) kcal\*\*/i
);
      console.log(botText)
      console.log(match)

      if (match) {
        const name = match[1];
        const minutes = parseFloat(match[2]);
        const calories = parseFloat(match[3]);

        const exerciseItem = { name, minutes, calories };
        setExercise((prev) => [...prev, exerciseItem]);
      }

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

  // ✅ Lưu vào Firestore khi có dữ liệu mới
  useEffect(() => {
    const updateFirestoreExercise = async () => {
      if (!userID || exercise.length === 0) return;

      try {
        const docRef = doc(db, 'users', userID);
        const docSnap = await getDoc(docRef);

        let updatedExercise = [];

        if (docSnap.exists()) {
          const data = docSnap.data();
          const existing = data.Exercise || [];
          updatedExercise = [...existing, ...exercise];
        } else {
          updatedExercise = [...exercise];
        }

        await setDoc(docRef, { Exercise: updatedExercise }, { merge: true });
        console.log("✅ Firestore cập nhật thành công:", updatedExercise);
      } catch (err) {
        console.error("❌ Lỗi khi cập nhật Firestore:", err);
      }
    };

    updateFirestoreExercise();
  }, [exercise]);

  return (
    <main>
      <div className="wrapper aximo-all-section chat"
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
                  whiteSpace: "pre-wrap",
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
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
            placeholder="Nhập tên bài tập (VD: chạy 30 phút)..."
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
}

export default Exercise;

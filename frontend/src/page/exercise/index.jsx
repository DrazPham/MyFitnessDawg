import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import SpeakTextButton from "../../components/common/speakTextButton";
import "assets/css/chat/index.css";


function Exercise() {
    const { i18n } = useTranslation();
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      if (i18n.language === "vi") {
        setMessages([{
          sender: "bot",
          text: "Xin chào! Bạn có thể nhập một hoạt động thể chất kèm theo thời gian thực hiện tính bằng phút. Nếu không ghi rõ thời gian, tôi sẽ mặc định là 60 phút. Ví dụ: Nếu chưa biết chọn hoạt động nào, hãy nhập 'danh sách' hoặc 'hoạt động', chúng tôi sẽ đề xuất các  hoạt động có sẵn  ",
        }]);
      } else {
        setMessages([{
          sender: "bot",
          text: "Hello! You can enter a physical activity along with the duration in minutes. If no time is provided, I will assume 60 minutes by default.\n\nIf you are not sure what to choose, type 'list' and we will suggest available options.",
        }]);
      }
    }, [i18n.language]);
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

const caloriesMatch = botText.match(/(\d+(?:\.\d+)?)\s*(?:kcal|calories|calo|Calo)/i);
const minutesMatch = botText.match(/(\d+(?:\.\d+)?)\s*(?:minutes?|mins?)/i);

if (caloriesMatch) {
  const calories = parseFloat(caloriesMatch[1]);
  const minutes = minutesMatch ? parseFloat(minutesMatch[1]) : 60;

  const exerciseItem = { calories, minutes };
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

  useEffect(() => {
  const updateFirestoreCart = async () => {
    if (!userID || exercise.length === 0) return;

    try {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      const today = new Date().toISOString().split("T")[0]; // Lấy định dạng yyyy-mm-dd
      let resetCart = false;
      let updatedExercise = [];

      if (docSnap.exists()) {
        const data = docSnap.data();
        const existingCart = data.Cart || [];
        const lastUpdatedDate = data.lastCartUpdate?.toDate?.().toISOString().split("T")[0];

        if (lastUpdatedDate !== today) {
          // Ngày mới => reset exercise
          resetCart = true;
          updatedExercise = [...exercise];
        } else {
          updatedExercise = [...existingCart, ...exercise];
        }
      } else {
        updatedExercise = [...exercise];
        resetCart = true;
      }

      await setDoc(docRef, {
        Exercise: updatedExercise,
        lastCartUpdate: serverTimestamp()
      }, { merge: true });

      if (resetCart) {
        console.log("🗓 Cart được reset do ngày mới:", today);
      }

      console.log("✅ Firestore cập nhật thành công:", updatedExercise);
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật Firestore:", err);
    }
  };

  updateFirestoreCart();
}, [exercise]);

  return (
    <main>
      <div className="wrapper aximo-all-section chat">
        <div className="chatTop">
          {messages.map((msg, idx) => (
            <div
              className="chatElementsOutter"
              key={idx}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <div className="chatElements">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                <SpeakTextButton text={msg.text} lang={i18n.language} />
              </div>
            </div>
          ))}
        </div>

        <div className="chatBottomGroup">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Nhập tên bài tập (VD: chạy 30 phút)..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="chatInput"
          />
          <button
            className="chatButton"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "..." : "Gửi"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Exercise;

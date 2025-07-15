import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "assets/css/chat/index.css"

function Chat() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: " Hello! Please enter a food item along with the amount in grams, and I will add its nutritional values to your cart. If no amount is specified, I will assume 100 grams by default.\n\nExample: *White rice 50g*",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const userID = localStorage.getItem("userID");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:2020/chat", {
        prompt: userInput,
      });

      const botText = res.data.reply;
      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);

      // ✅ Regex phù hợp với định dạng phản hồi thực tế
      const match = botText.match(
        /Thông tin về (.+?) \(trên ([\d.]+)g\):\s*- Calories: ([\d.]+) kcal\s*- Protein: ([\d.]+)g\s*- Fat: ([\d.]+)g\s*- Carbs: ([\d.]+)g/i
      );

      if (match) {
        const name = match[1];
        const grams = parseFloat(match[2]);
        const calories = parseFloat(match[3]);
        const protein = parseFloat(match[4]);
        const fat = parseFloat(match[5]);
        const carbs = parseFloat(match[6]);

        const foodItem = { name, grams, calories, protein, fat, carbs };
        setCart((prev) => [...prev, foodItem]); // ✅ Tự động thêm vào giỏ
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

  // ✅ useEffect tách riêng ở ngoài function
  useEffect(() => {
    const updateFirestoreCart = async () => {
      if (!userID || cart.length === 0) return;

      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);

        let updatedCart = [];

        if (docSnap.exists()) {
          const data = docSnap.data();
          const existingCart = data.Cart || [];

          updatedCart = [...existingCart, ...cart];
        } else {
          updatedCart = [...cart];
        }

        await setDoc(docRef, { Cart: updatedCart }, { merge: true });

        console.log("✅ Firestore cập nhật thành công:", updatedCart);
      } catch (err) {
        console.error("❌ Lỗi khi cập nhật Firestore:", err);
      }
    };

    updateFirestoreCart();
  }, [cart]); // Chạy mỗi khi `cart` thay đổi

  return (
    <main>
      <div
        className="wrapper aximo-all-section chat">
        <div className ="chatTop">
          {messages.map((msg, idx) => (
            <div className = "chatElementsOutter"
              key={idx}
              style={{
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div className = "chatElements"
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        <div className ="chatBottomGroup">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className = "chatInput"
          />
          <button className = "chatButton"
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
export default Chat;

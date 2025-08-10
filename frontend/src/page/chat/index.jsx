import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "src/firebase/index.jsx";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import SpeakTextButton from "../../components/common/speakTextButton";
import "assets/css/chat/index.css";

function Chat() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (i18n.language === "vi") {
      setMessages([{
        sender: "bot",
        text: "Xin chào! Vui lòng nhập tên thực phẩm kèm theo số lượng tính bằng gam, tôi sẽ thêm giá trị dinh dưỡng của nó vào giỏ hàng của bạn. Nếu không ghi rõ số lượng, tôi sẽ mặc định là 100 gam.\n\n Nếu chưa biết chọn món gì hãy nhập 'món' hoặc 'thực đơn', chúng tôi sẽ đề xuất các món ăn có sẵn  ",
      }]);
    } else {
      setMessages([{
        sender: "bot",
        text: "Hello! Please enter a food item along with the amount in grams, and I will add its nutritional values to your cart. If no amount is specified, I will assume 100 grams by default.\n\nIf you are not sure what to choose, type “menu” and we will suggest available options.",
      }]);
    }
  }, [i18n.language]);

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
      const test = res.data;
      console.log(test);
      
      
      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);
      const gramsMatch = botText.match(/(\d+(?:\.\d+)?)\s*(?:g|gram|grams)/i);
      const proteinMatch = botText.match(
        /(\d+(?:\.\d+)?)\s*(?:g|gram|grams)\s+of\s+protein/i
      );
      const fatMatch = botText.match(
        /(\d+(?:\.\d+)?)\s*(?:g|gram|grams)[^.\d]*?fat/i
      );
      const carbsMatch = botText.match(
        /(\d+(?:\.\d+)?)\s*(?:g|gram|grams)\s+of\s+carbs|no\s+carbs|carb[-\s]?free|completely\s+carb[-\s]?free/i
      );
      const caloriesMatch = botText.match(
        /(\d+(?:\.\d+)?)\s*(?:kcal|calories)/i
      );      
      if (proteinMatch && fatMatch && caloriesMatch && gramsMatch) {
  const grams = parseFloat(gramsMatch[1]);
  const protein = parseFloat(proteinMatch[1]);
  const fat = parseFloat(fatMatch[1]);
  const carbs = carbsMatch
    ? carbsMatch[1]
      ? parseFloat(carbsMatch[1])
      : 0
    : 0;
  const calories = parseFloat(caloriesMatch[1]);

  const foodItem = { calories, protein, fat, carbs, grams };
  setCart((prev) => [...prev, foodItem]);}
  
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
      if (!userID || cart.length === 0) return;

      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);

        const today = new Date().toISOString().split("T")[0]; // Lấy định dạng yyyy-mm-dd
        let resetCart = false;
        let updatedCart = [];

        if (docSnap.exists()) {
          const data = docSnap.data();
          const existingCart = data.Cart || [];
          const lastUpdatedDate = data.lastCartUpdate
            ?.toDate?.()
            .toISOString()
            .split("T")[0];

          if (lastUpdatedDate !== today) {
            resetCart = true;
            updatedCart = [...cart];
          } else {
            updatedCart = [...existingCart, ...cart];
          }
        } else {
          updatedCart = [...cart];
          resetCart = true;
        }

        await setDoc(
          docRef,
          {
            Cart: updatedCart,
            lastCartUpdate: serverTimestamp(),
          },
          { merge: true }
        );

        if (resetCart) {
          console.log("🗓 Cart được reset do ngày mới:", today);
        }

        console.log("✅ Firestore cập nhật thành công:", updatedCart);
      } catch (err) {
        console.error("❌ Lỗi khi cập nhật Firestore:", err);
      }
    };

    updateFirestoreCart();
  }, [cart]);

  return (
    <main>
      <div className="wrapper aximo-all-section chat">
        <div className="chatTop">
          {messages.map((msg, idx) => (
            <div
              className="chatElementsOutter"
              key={idx}
              style={{
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
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
            placeholder={t("placeholderChat")}
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
export default Chat;

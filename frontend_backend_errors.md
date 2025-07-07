# 🔧 Tổng hợp các lỗi thường gặp khi kết nối Frontend (React) và Backend (Flask)

## ✅ Mục tiêu
Danh sách các lỗi phổ biến, nguyên nhân, và cách xử lý khi kết nối frontend React với backend Flask trong dự án như NutriBot.

---

## 🔴 I. Lỗi kết nối mạng

| Tên lỗi | Triệu chứng | Nguyên nhân |
|--------|-------------|-------------|
| `Network Error` (axios) | React không nhận được phản hồi nào | - Flask chưa chạy<br>- Gọi sai port<br>- Firewall chặn<br>- Backend crash |
| `ERR_CONNECTION_REFUSED` (browser) | Trình duyệt báo không thể kết nối | - Flask chưa chạy<br>- Sai địa chỉ (localhost vs 127.0.0.1)<br>- Port sai |
| `CORS error` | Console: "Access-Control-Allow-Origin" | - Flask chưa bật CORS<br>- Sai config trong `CORS(app, ...)` |
| Không phản hồi hoặc loading mãi | Button click không có kết quả | - Flask bị treo hoặc đang gọi API tốn thời gian |

---

## 🔴 II. Lỗi gọi API sai (React)

| Tên lỗi | Triệu chứng | Nguyên nhân |
|--------|-------------|-------------|
| `500 Internal Server Error` | Console báo `500` | - Flask code bị lỗi (ví dụ `get_reply()` lỗi) |
| `404 Not Found` | Gọi `/chat` mà trả về `404` | - Sai route<br>- Sai method (POST vs GET)<br>- Flask chưa định nghĩa route |
| `Method Not Allowed (405)` | Gọi `/chat` nhưng GET thay vì POST | - React dùng nhầm `GET` cho route chỉ cho phép `POST` |

---

## 🔴 III. Lỗi cấu hình Flask

| Tên lỗi | Triệu chứng | Nguyên nhân |
|--------|-------------|-------------|
| Flask không lắng nghe đúng IP | React không kết nối được dù Flask chạy | - Thiếu `host="0.0.0.0"` trong `app.run()` |
| Không cho phép frontend gọi | Lỗi CORS hoặc không phản hồi | - Thiếu `CORS(app, origins=[...])` |
| Flask crash lúc khởi động | Terminal bị lỗi, React báo `Network Error` | - Lỗi import (ví dụ file `chatbot.py` sai đường dẫn, lỗi cú pháp) |
| Lỗi `get_reply()` không hiển thị | React báo lỗi chung | - Flask bị lỗi nhưng không có `try-except`, khiến server dừng |

---

## 🔴 IV. Lỗi do thiếu file hoặc môi trường

| Tên lỗi | Triệu chứng | Nguyên nhân |
|--------|-------------|-------------|
| File `menu.csv` không tồn tại | Gọi menu bị lỗi | - Sai đường dẫn CSV<br>- Không kiểm tra lỗi khi load CSV |
| Thiếu `.env` hoặc API Key | Lỗi khi gọi Gemini API | - `os.getenv("GOOGLE_API_KEY")` trả về `None` |
| Không có mạng khi gọi Gemini | Flask treo hoặc lỗi | - Gọi Gemini mà mất mạng → `generate_content()` lỗi |

---

## ✅ Cách debug hiệu quả

| Việc cần làm | Mục đích |
|--------------|----------|
| Mở DevTools Console (F12) | Xem lỗi chính xác từ React |
| Kiểm tra Terminal Flask | Xem server có crash không |
| Gọi API trực tiếp bằng trình duyệt / Postman / curl | Xác minh backend hoạt động |
| Thêm `try-except` quanh `get_reply()` | Tránh làm server chết khi lỗi |
| In log từ cả frontend và backend | Xác định chính xác lỗi ở đâu |

---

## ✅ Ví dụ cấu hình đúng

### 📁 `app.py` (Flask backend)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_reply

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")
        reply = get_reply(prompt)
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"reply": f"Lỗi: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5050)
```

---

### 📄 `React frontend`

```jsx
const sendMessage = async () => {
  try {
    const res = await axios.post("http://127.0.0.1:5050/chat", {
      prompt: userInput,
    });
    setBotReply(res.data.reply);
  } catch (error) {
    console.error("❌ Lỗi khi gọi API:", error.message);
    setBotReply("⚠️ Không thể kết nối đến server.");
  }
};
```

---

> 📘 Ghi chú: Đây là tài liệu kiểm tra lỗi nhanh cho dự án như NutriBot. Có thể dùng cho mọi dự án fullstack nhỏ kết hợp Flask backend + React frontend.


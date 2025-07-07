from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_reply  # Đảm bảo file chatbot.py tồn tại và có hàm get_reply()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Cho phép frontend React kết nối

@app.route("/", methods=["GET"])
def index():
    return "NutriBot backend is running!"

@app.route("/api/ping", methods=["GET"])  # thêm route để test nhanh từ FE
def ping():
    return jsonify({"message": "pong"})

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("prompt", "")
    reply = get_reply(prompt)  # gọi chatbot xử lý
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5050)  # để React gọi được

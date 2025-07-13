from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_reply  # Đảm bảo file chatbot.py tồn tại và có hàm get_reply()

app = Flask(__name__)
CORS(app)  # Cho phép mọi origin – chỉ dùng tạm để debug

@app.route("/", methods=["GET"])
def index():
    return "NutriBot backend is running!"

@app.route("/api/ping", methods=["GET"])
def ping():
    return jsonify({"message": "pong"})

@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify(message="Hello from Flask!")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    # prompt = data.get("prompt", "")
    prompt = "Chicken breast"
    reply = get_reply(prompt)  # Hàm xử lý chatbot
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=2020) 

import os
import json
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv

# =============================
# 🔧 1. Load biến môi trường và cấu hình Gemini API
# =============================
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("⚠️ GOOGLE_API_KEY chưa được thiết lập trong .env")

genai.configure(api_key=api_key)

#  📋 2. Load cấu hình hệ thống và menu
# =============================
# Load config ban đầu (nếu có)
try:
    with open("config.json", "r", encoding="utf-8") as f:
        config = json.load(f)
        initial_bot_message = config.get("initial_bot_message", "Xin chào! Bạn cần hỗ trợ gì?")
except Exception:
    initial_bot_message = "Xin chào! Bạn cần hỗ trợ gì?"

# Load menu từ CSV
menu_path = "data/chatbot/menu.csv"
try:
    menu_df = pd.read_csv(menu_path, index_col=0)
except Exception as e:
    menu_df = pd.DataFrame()
    print(f"⚠️ Không thể đọc file menu: {e}")


    # =============================
# 🧠 3. Khởi tạo model Gemini
# =============================
model = genai.GenerativeModel(
    "gemini-2.5-flash",
    system_instruction="""
    You are NutriBot, an intelligent AI chatbot built with ChatbotAI tools and powered by the Gemini API. Your mission is to help users:
    - Track their calorie intake by analyzing any ingredient or meal they enter, then reporting total calories plus macronutrients (fat, carbs, protein) per serving.
    - Estimate calories burned through exercise based on user-provided workout details and suggest appropriate routines to meet their goals.
    - Advise on each user's daily nutritional needs, crafting calorie and macronutrient targets tailored to their age, weight, activity level, and dietary preferences.
    Communication style:
    • Clarity - give crisp, accurate answers.
    • Friendliness - stay encouraging and patient, never judgmental.
    • Passion - show genuine enthusiasm for healthy living and data-driven tracking.
    • Adaptability - simplify explanations for beginners; dive into detailed metrics for experts.
    • Bilingual fluency - respond in English or Vietnamese to match the user's language.
    Always steer the conversation toward actionable insights—whether logging a meal, reviewing progress, or planning an exercise—and keep users motivated to stay on track.
    """
)

model_name = 'models/text-embedding-004'


# =============================
# Hàm trả lời
def get_reply(prompt: str) -> str:
    try:
        prompt_lower = prompt.lower()
        if "menu" in prompt_lower or "món" in prompt_lower:
            if menu_df.empty:
                return "📭 Menu hiện đang trống."
            return '\n'.join(f"- {row['name']}" for _, row in menu_df.iterrows())
        else:
            response = model.generate_content(prompt)
            return response.text.strip() if response.text else "🤖 Bot không hiểu yêu cầu của bạn."
    except Exception as e:
        return f"⚠️ Lỗi trong chatbot: {str(e)}"

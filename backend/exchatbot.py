import os
import json
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv
import re
import difflib

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
menu_path = "data/chatbot/exercise.csv"
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



def extract_exercise_and_minutes(prompt):
    """
    Tách tên bài tập và số phút từ chuỗi nhập. Mặc định 60 phút nếu không có số.
    """
    prompt = prompt.strip().lower()
    match = re.search(r"(.*?)(?:\s+(\d+(?:\.\d+)?)\s*(?:minutes|minute|m)?)?$", prompt)
    if match:
        name = match.group(1).strip()
        minutes = float(match.group(2)) if match.group(2) else 60
        return name, minutes
    return prompt, 60

def get_ex_reply(prompt):
    name, minutes = extract_exercise_and_minutes(prompt)

    if 'name' not in menu_df.columns or 'calories' not in menu_df.columns:
        return "❌ Dữ liệu chưa được chuẩn bị đúng định dạng."

    matched = menu_df[menu_df['name'].str.lower() == name]

    if not matched.empty:
        row = matched.iloc[0]
        factor = minutes / 60
        return (
            f"🔍 Thông tin về bài tập **{row['name']}** trong {minutes} phút:\n"
            f"- Calories tiêu hao: **{round(row['calories'] * factor, 1)} kcal**\n"
        )
    else:
        similar = menu_df[menu_df['name'].str.lower().str.contains(name)]
        if not similar.empty:
            options = "\n".join(f"- {item}" for item in similar['name'].tolist())
            return f"❓ Không tìm thấy bài tập '{name}' chính xác. Có thể bạn muốn chọn một trong các bài sau:\n{options}"
        else:
            all_names = menu_df['name'].str.lower().tolist()
            close_matches = difflib.get_close_matches(name, all_names, n=5, cutoff=0.5)
            if close_matches:
                suggestions = "\n".join(f"- {match}" for match in close_matches)
                return f"❓ Không tìm thấy '{name}'. Có phải bạn muốn nói đến:\n{suggestions}"
            return "❌ Không có thông tin về bài tập này."
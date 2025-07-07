import os
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

menu_df = pd.read_csv("./data/chatbot/menu.csv", index_col=[0])
print(menu_df)
model = genai.GenerativeModel("gemini-2.5-flash")

def get_reply(prompt):
    try:
        if "menu" in prompt.lower() or "món" in prompt.lower():
            return '\n\n'.join([f"{row['name']}" for _, row in menu_df.iterrows()])
        else:
            response = model.generate_content(prompt)
            return response.text
    except Exception as e:
        return f"⚠️ Lỗi trong chatbot: {str(e)}"

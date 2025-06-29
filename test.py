import toml
import requests 

# 1. Load config
conf = toml.load("/.streamlit/secrets.toml")
APP_ID  = conf["api"]["nutritionix_app_id"]
APP_KEY = conf["api"]["nutritionix_app_key"]

print(APP_ID,APP_KEY)
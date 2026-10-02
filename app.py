from flask import Flask, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/")
def home():
    return "CurricuForge AI Backend Running 🚀"

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    skills = data.get("skills")

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an AI curriculum designer."},
            {"role": "user", "content": f"Analyze these skills and suggest a learning path: {skills}"}
        ]
    )

    return jsonify({
        "result": response.choices[0].message.content
    })

if __name__ == "__main__":
    app.run(debug=True)

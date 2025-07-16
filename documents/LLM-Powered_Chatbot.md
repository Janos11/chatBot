# Plan: Upgrade PlumberBot to LLM-Powered Chatbot

## Objective
Fork the current rule-based PlumberBot repo and integrate an LLM (using Ollama) to handle user conversations more intelligently.

---

## Step-by-Step Plan

### 1. Fork the Existing GitHub Repository
- Go to the current GitHub repo of PlumberBot.
- Click “Fork” and create your own copy under your GitHub account.

### 2. Clone the Forked Repo
```bash
git clone https://github.com/your-username/plumberbot.git
cd plumberbot
```

### 3. Set Up the Development Environment
- Ensure Python, Docker, and Ollama are installed.
- Create a Python virtual environment and install required dependencies.
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Replace Rule-Based Logic with LLM Integration
- Identify the Python script handling the chatbot logic (e.g., `chatbot.py`).
- Replace rule-based responses with calls to the LLM API (served by Ollama).
- Example using `requests`:
```python
import requests

def query_llm(prompt):
    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "llama2",
        "prompt": prompt,
        "stream": False
    })
    return response.json()["response"]
```

### 5. Update the Chat Endpoint
- Modify the route (Flask/FastAPI) that receives user input.
- Replace rule-based routing with an LLM call using the function above.

### 6. Keep Form Submission to Backend as Is
- Retain existing logic to collect and save name, contact, and issue.
- LLM will extract these details using natural language parsing.

### 7. Run and Test the Application
- Run the Docker containers (including Ollama and your app).
```bash
docker-compose up --build
```
- Interact with the bot via the frontend.
- Validate that LLM answers naturally and collects data.

### 8. Commit and Push Changes
```bash
git add .
git commit -m "Replaced rule-based bot with LLM-powered version"
git push origin main
```

### 9. (Optional) Add More Intelligence
- Implement prompt templates.
- Add memory or context management.
- Integrate external tools (calendar booking, FAQs, etc).

---

## Outcome
You’ll have a smarter PlumberBot that understands user queries using LLMs and still sends structured data to your backend for processing.
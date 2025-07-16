# ChatBot Frontend–Backend Communication Guide

This document explains how the frontend JavaScript-based ChatBot sends customer information to the backend Flask server, which stores the data in a JSON Lines log file.

---

## 🔁 Overview of Communication Flow

1. **User interacts** with the chatbot in the browser.
2. The chatbot collects user data into a `userData` object.
3. The function `sendLeadToServer()` sends this data to the backend via HTTP POST to `/send-lead`.
4. The **Flask server** receives the request, appends a timestamp, and logs the lead data into `leads.jsonl`.

---

## 📦 Frontend (JavaScript)

The key function that sends customer data to the backend is:

```js
// Save Lead with customer info
function sendLeadToServer() {
  fetch('/send-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  .then(res => res.text())
  .then(msg => console.log(msg))
  .catch(err => console.error("Error sending lead:", err));
}
```

- **`userData`**: An object that contains the information collected from the user.
- **POST Request**: Sent to `/send-lead` endpoint on the Flask server.

---

## 🐍 Backend (Python Flask)

Flask server that listens on port `5000` (exposed to host as `5001`):

```python
from flask import Flask, request
from datetime import datetime
import json

app = Flask(__name__)

LOG_FILE = "/usr/local/apache2/htdocs/leads.jsonl"

@app.route('/send-lead', methods=['POST'])
def send_lead():
    data = request.json
    data['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    with open(LOG_FILE, 'a') as f:
        f.write(json.dumps(data) + '\n')

    return 'Lead saved', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

- Adds a `timestamp` to every entry.
- Saves each record as a new line in `leads.jsonl`.

---

## 🐳 Docker Setup

Your Docker Compose service is configured like this:

```yaml
services:
  web_server:
    build: .
    container_name: chatBot
    ports:
      - "85:80"         # Apache for chatbot frontend
      - "5001:5000"     # Flask backend API
    volumes:
      - ./frontend:/usr/local/apache2/htdocs
      - ./backend:/usr/local/apache2/cgi-bin
    restart: unless-stopped
```

- Flask runs inside container on port `5000`, exposed as `5001` on host.
- Frontend served by Apache from `/usr/local/apache2/htdocs`.

---



## ✅ Tips

- Ensure `userData` is correctly populated before calling `sendLeadToServer()`.
- To avoid CORS issues, serve both frontend and backend from the same container or configure CORS headers.
- Mount volumes correctly so `leads.jsonl` is stored persistently.<br/>
[README.md](../README.md)

---
## 🤝 Contributors

<table style="font-family: Arial, sans-serif; line-height: 1.6;">
  <tr>
    <td><strong>János Rostás</strong></td>
    <td>
      👨‍💻 Electronic & Computer Engineer<br>
      🛠️ Tinkerer with a Purpose<br>
      🐳 Docker Enthusiast<br>
      🌐 <a href="https://janosrostas.co.uk" target="_blank">janosrostas.co.uk</a><br>
      🔗 <a href="https://www.linkedin.com/in/janos-rostas/" target="_blank">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td><strong>ChatGPT</strong></td>
    <td>
      🤖 AI Pair Programmer by OpenAI<br>
      💡 Supports brainstorming, prototyping, and debugging<br>
      📚 Backed by years of programming knowledge and best practices
    </td>
  </tr>
</table>

# Save customer info

**Date:** 8 July 2025
🌐 <a href="https://janosrostas.co.uk" target="_blank">janosrostas.co.uk</a>

Here are 3 solid alternatives you can use instead of relying on your own Gmail SMTP setup:

## ✅ 1. Use a Free Email API Service (like Resend, Brevo, Mailgun)

These services let you send emails via API, no SMTP pain.

Example using Mailgun with Python:

```python
import requests

def send_lead_via_mailgun(data):
    return requests.post(
        "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
        auth=("api", "YOUR_API_KEY"),
        data={
            "from": "PlumberBot <bot@yourdomain.com>",
            "to": "you@yourdomain.com",
            "subject": "New Plumbing Lead",
            "text": f"""New Lead:
Name: {data['name']}
Phone: {data['phone']}
Email: {data['email']}
Postcode: {data['postcode']}
Issue: {data['issue']}
Time: {data['timestamp']}
"""
        }
    )
```

You can call this from your /send-lead Flask route.

## ✅ 2. Send a Telegram Message Instead (Easy + Real-Time)

This is an underrated approach — create a Telegram bot and send yourself messages.

```python
import requests

def notify_via_telegram(data):
    message = f"""
🔧 New Lead:
Name: {data['name']}
Phone: {data['phone']}
Email: {data['email']}
Postcode: {data['postcode']}
Issue: {data['issue']}
Time: {data['timestamp']}
"""
    requests.get(f"https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage", params={
        "chat_id": "<YOUR_CHAT_ID>",
        "text": message
    })
```

No email setup, and you get it instantly on your phone.

## ✅ 3. Save to File / Log for Later Review

You can save leads to a CSV or JSON file for later use:

```python
import json

@app.route('/send-lead', methods=['POST'])
def send_lead():
    data = request.json
    with open('leads.json', 'a') as f:
        f.write(json.dumps(data) + "\n")
    return 'Saved', 200
```
    
Final Thought
If you really want to go with email, and you’re hosting your site on a VPS or Pi, consider using msmtp or Postfix, 
configured to relay through a mail API like Mailgun. But in most cases, Telegram + log file backup is simplest and most reliable.
[ChatBot Communication Guide](documents/chatbot_comm.md)

---
# Save to File:
# 📋 PlumberBot Lead Capture: Frontend + Backend Integration

This guide explains how to collect user info through a JavaScript-based chatbot and save it using a Python (Flask) backend.

---

## 🔁 Flow Overview

1. User interacts with the chatbot in the browser (frontend).
2. JavaScript collects user data (name, phone, email, postcode, issue).
3. The data is sent to the backend Flask server via HTTP POST.
4. Flask receives it, adds a timestamp, and saves it to a local file (`leads.jsonl`).

---

## 🖥️ Frontend (JavaScript)

### Example Data Object:
```javascript
let userData = {
  name: "",
  issue: "",
  phone: "",
  email: "",
  postcode: "",
  timestamp: "",
};
```

### Sending Data to Backend:
```javascript
function sendLeadToServer() {
  fetch('/send-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  .then(response => response.text())
  .then(console.log)
  .catch(console.error);
}
```

This function sends the `userData` to the Flask server via HTTP POST.

---

## 🐍 Backend (Python Flask)

### `save_lead.py`:

```python
from flask import Flask, request
from datetime import datetime
import json

app = Flask(__name__)

@app.route('/send-lead', methods=['POST'])
def send_lead():
    data = request.json
    data['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    with open("leads.jsonl", 'a') as f:
        f.write(json.dumps(data) + '\n')

    return 'OK', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### How It Works:
- Accepts POST requests at `/send-lead`
- Parses JSON from the frontend
- Appends a timestamp
- Writes the data to `leads.jsonl`, one JSON object per line

---

## 📁 `leads.jsonl` Example Content:
```json
{"name": "Jane", "phone": "07123456789", "email": "jane@example.com", "postcode": "CT1 2AB", "issue": "Leaking pipe", "timestamp": "2025-07-07 15:30:22"}
```

---

## 🌐 Connecting Frontend & Backend

### If Flask is on the same server:
```javascript
fetch('/send-lead', { ... })
```

### If Flask is on a different port or domain:
```javascript
fetch('http://localhost:5000/send-lead', { ... })
```

> Ensure CORS settings or proxy are configured properly if needed.

--- 
## Modify the Docker container
## Add save leads to the chat bot Backend
1. Modify the `Dockerfile` and add

```dockerfile
# Install Flask and requests for save_leads.py
RUN /opt/venv/bin/pip install flask requests
```

2. We need a new port to the container for the connection `nano docker-compose.yml`

```yml
    ports:
      - "83:80"          # Apache
      - "8787:8787"      # Existing websocket for robot control
      - "5000:5000"      # Flask save_lead app
```

3. Modify the `supervisord.conf`

```conf
[program:save_lead]
command=/opt/venv/bin/python3 /usr/local/apache2/cgi-bin/save_lead.py
autorestart=true
stdout_logfile=/dev/stdout
stderr_logfile=/dev/stderr
```

Rebuild the container:
`docker compose down && docker compose up -d`

---

## 🧪 Testing

### Run the Flask app:
```bash
python3 save_lead.py
```

### Test via browser console:
```bash
curl -X POST http://192.168.1.189:5000/send-lead \
  -H "Content-Type: application/json" \
  -d '{"name":"John", "email":"john@example.com"}'
```

Then check `leads.jsonl` for the entry.

---

## ✅ What You Need
- A running Flask server
- JavaScript on the webpage to collect/send data
- No firewalls blocking access

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

  
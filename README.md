# 🤖 AI-Enhanced ChatBot

A containerized full-stack chatbot application powered by **Docker**, built for seamless integration into any website. 
Designed with scalability in mind, it connects a lightweight front-end to a Python back-end and an **Ollama** LLM server. 
Perfect for embedding a responsive, smart chat assistant into existing websites — hosted on a Raspberry Pi or any 
Docker-compatible environment.

Future updates will include **RAG (Retrieval-Augmented Generation)** capabilities, 
allowing the chatbot to serve domain-specific answers from uploaded documents or manuals.

---


---

## 🌐 Frontend

| Feature              | Description                                 |
|----------------------|---------------------------------------------|
| `index.html`         | Chat UI, can be embedded into any website   |
| `style.css`          | Handles layout and responsiveness           |
| `script.js`          | Sends/receives chat messages via AJAX       |

- Works standalone (basic responses) or connected to the Flask API.
- Built for ease of customization — simply copy to your website.

---

## 🧠 Backend

| Feature            | Description                                     |
|--------------------|-------------------------------------------------|
| `app.py`           | Flask app exposing chat API via `/chat`        |
| `chatbot_logic.py` | Handles request logic, communicates with Ollama|
| Apache2            | Used for routing requests (custom `httpd.conf`)|
| yaml               | Serves frontend, CGI backend, and Flask in one |

- Modular Python code with future RAG support via document ingestion.
- Prepares for integration with external tools like LangChain or Haystack.

---

## 🧪 LLM Integration with Ollama

| Component    | Port  | Description                           |
|--------------|-------|---------------------------------------|
| Ollama API   | 11434 | Local LLM model server (e.g., llama3) |

- Supports pulling and running open LLMs like `llama3`, `mistral`, etc.
- Models are downloaded once and stored in Docker volume (`ollama_models`).

---

## 🐳 Docker Setup

[docker-compose.yml](docker-compose.yml)



---

### 🚀 Getting Started

```bash
git clone https://github.com/Janos11/chatBot.git
cd open-webui
docker compose up -d
```

Build and run with Docker Compose:

```bash
docker compose up --build
```

Access the chat interface in your browser:
Then open your browser: 👉 `http://localhost:85` or `http://<your-pi-ip>:85`



---
### 🧾 Technologies Used

| Technology       | Purpose                                | Link |
|------------------|----------------------------------------|------|
| Docker          | Containerization                      | [docker.com](https://www.docker.com) |
| Flask           | Lightweight backend API               | [Flask](https://flask.palletsprojects.com) |
| Ollama          | LLM API and model hosting             | [ollama.com](https://ollama.com) |
| Apache2         | Web server and reverse proxy          | [httpd.apache.org](https://httpd.apache.org) |
| HTML/CSS/JS     | Frontend interface                    | - |
| Raspberry Pi    | Target embedded deployment platform   | [raspberrypi.com](https://www.raspberrypi.com) |

## 📌 Documentation

| Section                          | Status                                                                                                 |
|----------------------------------|--------------------------------------------------------------------------------------------------------|
| 🔧 Deployment Guide              | Coming soon                                                                                            |
| 📚 How to Add Documents for RAG  | Coming soon                                                                                            |
| 🧪 Testing Instructions          | Coming soon                                                                                            |
| ✅ Full Stack Summary            | Coming soon                                                                                            |
| 🗂️ Git Commands        | [git\_cheat\_sheet.md](https://github.com/Janos11/Robot_Web_Controller/blob/master/git_cheat_sheet.md) |
| Docker Network                   | [docker_network.md](documents/docker_network.md)


## ✅ Full Stack Summary

This project qualifies as a full-stack chatbot system:

| Component       | Technology/Description                     |
|-----------------|--------------------------------------------|
| **Frontend**    | Interactive, embeddable UI (HTML/CSS/JS)   |
| **Backend**     | Flask + CGI logic                          |
| **AI Layer**    | Local LLM via Ollama                       |
| **Deployment**  | Docker Compose orchestration               |
| **Hosting**     | Raspberry Pi or cloud VPS                  |

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
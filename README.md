# 🤖 ChatBot – Open WebUI Edition

A full-stack, containerized chatbot interface, now powered by **Open WebUI** and **Ollama** for local Large Language Model (LLM) interactions. This version builds on the original rule-based chatbot and integrates a modern web-based LLM interface backed by Docker.

> 🧠 This branch merges the original chatbot UI with the [Open WebUI](https://github.com/open-webui/open-webui) project and connects it to models like **TinyLlama**, **Mistral**, or **Phi** running via [Ollama](https://ollama.com/).


---

## 🌐 Frontend

- A clean HTML/CSS/JS-based chat interface for easy embedding in existing websites.
- Connects via HTTP to a running **Ollama** backend through Open WebUI.
- You can still use `frontend/index.html` for embedding or override the default WebUI interface.

---

## 🧠 LLM Backend: Ollama + Open WebUI

Open WebUI serves as a sleek local interface to interact with your LLMs running via Ollama.

### ✅ Prerequisites

- Docker & Docker Compose installed
- Ollama installed and running locally (accessible via `http://ollama:11434` or LAN IP)

### 🚀 Getting Started

```bash
git clone https://github.com/Janos11/chatBot/tree/open-webui
cd open-webui
docker compose up -d
```

Then open your browser: 👉 `http://localhost:3010` or `http://<your-pi-ip>:3010`

---

## 🔧 Configuration Notes

If Ollama is running as a separate container or service, update the environment in `docker-compose.yml` accordingly:

```yaml
environment:
  - OLLAMA_BASE_URL=http://ollama:11434
```

---

## 📦 Volumes

Open WebUI persists data using Docker volume:

```yaml
volumes:
  - open-webui-data:/app/backend/data
```

---

## 📄 Technologies Used

| Component      | Description                   | Links                                              |
| -------------- | ----------------------------- | -------------------------------------------------- |
| Raspberry Pi   | Low-cost SBC for deployment   | [raspberrypi.org](https://www.raspberrypi.com)     |
| Docker         | Containerization engine       | [docker.com](https://www.docker.com)               |
| Docker Compose | Multi-container orchestration | [Compose docs](https://docs.docker.com/compose/)   |
| Apache2        | Web server and reverse proxy  | [Apache HTTP Server](https://httpd.apache.org)     |
| Flask (Legacy) | Optional Python backend       | [Flask](https://flask.palletsprojects.com)         |
| HTML/CSS/JS    | Static UI components          | -                                                  |
| Ollama         | Local LLM serving engine      | [ollama.com](https://ollama.com)                   |
| Open WebUI     | Local chat interface          | [GitHub](https://github.com/open-webui/open-webui) |

---

## 📌 Documentation

| Section                 | Link                                                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ⚙️ Setup Guide (LLM)    | (coming soon)                                                                 |
| 🧪 Testing & Benchmarks | (coming soon)                                                                                                                |
| 🗂️ Git Commands        | [git\_cheat\_sheet.md](https://github.com/Janos11/Robot_Web_Controller/blob/master/git_cheat_sheet.md)                       |

---

## 💻 Full Stack Highlights

This version qualifies as a full-stack deployment:

- **Frontend**: Custom and WebUI-based interfaces.
- **Backend**: LLMs via Ollama, Flask API (optional).
- **Deployment**: Fully Dockerized.
- **Hosting**: Raspberry Pi running Apache2 & Docker Compose.

Great for showcasing:

- Embedded Linux experience
- Docker container orchestration
- Custom UI with modern LLM capabilities

---

## 🤝 Contributors
<table style="font-family: Arial, sans-serif; line-height: 1.6;">
  <tr>
    <td><strong>János Rostás</strong></td>
    <td>
      👨‍💻 Electronic & Computer Engineer<br>
      🛠️ Creator of ChatBot - Open WebUI Edition<br>
      🐳 Docker & Containerization Specialist<br>
      🌐 <a href="https://janosrostas.co.uk" target="_blank">janosrostas.co.uk</a><br>
      🔗 <a href="https://www.linkedin.com/in/janos-rostas/" target="_blank">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td><strong>Open WebUI</strong></td>
    <td>
      🖥️ Original WebUI Framework<br>
      💡 Local LLM chat interface<br>
      📦 <a href="https://github.com/open-webui/open-webui" target="_blank">github.com/open-webui/open-webui</a>
    </td>
  </tr>
  <tr>
    <td><strong>ChatGPT</strong></td>
    <td>
      🤖 AI Pair Programmer by OpenAI<br>
      💡 Supports brainstorming and debugging<br>
      📚 Backed by programming knowledge and best practices
    </td>
  </tr>
</table>
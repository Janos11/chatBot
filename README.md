# 🤖 ChatBot

A lightweight, containerized full-stack chatbot web application — built from scratch, deployed on a Raspberry Pi 
using Docker and Apache2. This project includes both front-end and back-end 
components and is designed to evolve from a rule-based chatbot to a more intelligent AI-driven assistant. 
Ideal for personal projects, prototyping conversational interfaces, 
or learning modern development practices in embedded environments.

---

## 📁 Project Structure

```
~/docker/chatbot_interface/
                ├── backend/
                │   ├── app.py              # Flask or FastAPI backend
                │   ├── requirements.txt    # Python dependencies
                │   └── chatbot_logic.py    # Core chatbot logic
                ├── frontend/
                │   ├── index.html          # Basic UI
                │   ├── style.css           # Styling
                │   └── script.js           # JS to send/receive messages
                ├── documents/
                ├── screenshots/
                ├── docker-compose.yml
                ├── Dockerfile              # Builds both frontend/backend
                └── README.md
```

---

## 🌐 Frontend

- Built with standard **HTML**, **CSS**, and **JavaScript**.
- A simple chat interface located at `frontend/index.html`.
- CSS (`style.css`) handles layout and visual styling.
- JavaScript (`script.js`) implements a **basic rule-based chatbot** for demonstration purposes. This bot is fully functional without a backend to showcase UI interactions and client-side logic.
- In the future, the front-end will connect via HTTP to the Flask API in `backend/app.py` for real-time interaction with a more sophisticated chatbot.

---

## 🧠 Backend

- Powered by **Flask** (or **FastAPI**, if preferred) in Python.
- `app.py` handles API routes and communication with front-end via AJAX.
- `chatbot_logic.py` is a modular Python script that will evolve to include ML/NLP logic (e.g., via spaCy, NLTK, or OpenAI APIs).
- Containerized with Docker, using a unified `Dockerfile` to package the backend with Apache for serving static content and reverse proxying API calls.

---

## 🚀 Deployment

- Deployed and tested on a **Raspberry Pi 4 Model B** running Raspberry Pi OS.
- Managed via **Docker Compose** for ease of orchestration and service isolation.
- Web server hosted using **Apache2** inside a container (acts as reverse proxy for the backend and serves static front-end files).

---

## 📄 Technologies Used

| Component       | Description | Links |
|----------------|-------------|-------|
| Raspberry Pi   | Low-cost SBC for deployment | [raspberrypi.org](https://www.raspberrypi.com) |
| Docker         | Containerization engine | [docker.com](https://www.docker.com) |
| Docker Compose | Multi-container orchestration | [Compose docs](https://docs.docker.com/compose/) |
| Apache2        | Web server and reverse proxy | [Apache HTTP Server](https://httpd.apache.org) |
| Flask          | Python web framework for backend API | [Flask](https://flask.palletsprojects.com) |
| HTML/CSS/JS    | Standard front-end stack | - |
| Git & GitHub   | Version control and collaboration | [github.com](https://github.com) |

---

## 💻 Is This Full Stack?

**Yes.** This project qualifies as a full-stack application:

- **Frontend**: UI, client-side JS logic.
- **Backend**: Python API and chatbot logic.
- **Deployment**: Dockerized for portability and system independence.
- **Hosting**: Deployed on a real embedded Linux system with a production-grade web server.

Great for showcasing:
- Full-stack capability
- Embedded development familiarity
- Docker & DevOps practices





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

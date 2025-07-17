# 🤖 ChatBot

A lightweight, containerized full-stack chatbot web application — built from scratch, deployed on a Raspberry Pi using Docker and Apache2. This project includes both front-end and back-end components and is designed to evolve from a **rule-based chatbot** to a more intelligent **LLM-powered** assistant.

Great for:
- Testing the front-end interface with a working rule-based chatbot
- Saving customer data through simple interactions
- Learning and experimenting with full-stack deployment in embedded environments

---

## 🧪 Current Functionality

- ✅ A user interface built in **HTML**, **CSS**, and **JavaScript**
- ✅ A **rule-based** chatbot for demonstration (not very intelligent)
- ✅ Can **save customer details** to the backend using:
  - [📄 ChatBot Communication Guide](documents/chatbot_comm.md)
  - [🧾 Save Customer Info](documents/Save_customer_info.md)
- ⚠️ *Will be further developed with LLM-based responses in another branch (`main`)*
- 📦 This branch (`rule-based-chat`) serves as a working **backup**

---

---

## 🌐 Frontend

| Feature | Description |
|--------|-------------|
| UI | Clean and simple chat interface (`index.html`) |
| Styling | CSS for layout, responsiveness, and theme |
| Interaction | JavaScript sends messages, handles responses |
| Logic | Built-in rule-based responses for testing |
| Dev Plan | Will later connect to Python backend via HTTP |

---

## 🧠 Backend

| Feature | Description                                                 |
|--------|-------------------------------------------------------------|
| Framework | Built in **Flask** (FastAPI compatible)                     |
| API | Accepts POST requests from frontend                         |
| Logic | Simple rule-matching from [chatbot.js](frontend/chatbot.js) |
| Future | Can be extended with NLP / OpenAI / spaCy etc.              |
| Docker | .yaml for serving both backend and frontend                 |

---

## 🚀 Deployment

| Environment | Notes |
|-------------|-------|
| ✅ Raspberry Pi 4 | Runs with Docker and Apache2 |
| ✅ Docker Compose | For service orchestration |
| ✅ Apache2 | Serves front-end, proxies API requests |

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

## 📌 Documentation

| Section                   | Link |
|---------------------------|------|
| 📜 Chat Communication API | [chatbot_comm.md](documents/chatbot_comm.md) |
| 📥 Save Customer Info     | [Save_customer_info.md](documents/Save_customer_info.md) |
| 🔧 Git Cheat Sheet        | [git_cheat_sheet.md](https://github.com/Janos11/Robot_Web_Controller/blob/master/git_cheat_sheet.md) |
| ⚙️ Deployment Guide       | _(coming soon)_ |
| 🧪 Testing & Benchmarks   | _(coming soon)_ |
| 🔍 In-Depth Architecture  | _(coming soon)_ |

---

## 💻 Is This Full Stack?

**Yes.** This project demonstrates a full-stack deployment:

| Layer      | Tool/Tech |
|------------|-----------|
| Frontend   | HTML, CSS, JS |
| Backend    | Python Flask API |
| Data Saving| JSON files or future DB integration |
| Deployment | Docker & Apache2 |
| Hosting    | Embedded system (Raspberry Pi) |

Perfect for:
- Showcasing full-stack engineering
- Building interactive UIs on embedded devices
- Practicing DevOps (Docker, Git, Apache, Pi)

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

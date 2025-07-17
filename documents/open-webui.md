# Open WebUI + Ollama

This containerized setup provides a web interface to interact with locally hosted Ollama models (like TinyLlama, Phi, Mistral, etc.).

## 🔧 Setup

### 1. Prerequisites

- Docker & Docker Compose installed
- Ollama running on the host (accessible via `http://host.docker.internal:11434` or your Pi’s IP)

### 2. Clone and Launch

```bash
git clone https://your-repo-or-local-path/open-webui
cd open-webui
docker compose up -d
```

Then open your browser:
👉 http://localhost:3000 or http://192.168.1.189:3000

### 3. Configuration

[docker-compose.yml file](../docker-compose.yml)

✅ This setup assumes your Ollama container is running and accessible via host.docker.internal.
If you're accessing Ollama via the Pi’s LAN IP (e.g. 192.168.1.189), just replace the OLLAMA_BASE_URL.



### 📁 Volumes

Data is persisted in a named Docker volume: open-webui-data


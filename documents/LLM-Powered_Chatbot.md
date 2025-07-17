# Plan: Upgrade PlumberBot to LLM-Powered Chatbot

## Objective
Fork the current rule-based PlumberBot repo and integrate an LLM (using Ollama) to handle user conversations more intelligently.

---

## Step-by-Step Plan


### 1. Teast the backend in terminal

```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "tinyllama",
    "prompt": "What is Docker?"
  }'
```
🔁 Replace "llama3" with the actual model you've pulled (like "mistral" or "llama2"), if different.

If you'd prefer a full answer all at once in your script, you can set:
```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "tinyllama3",
    "prompt": "What is Docker?",
    "stream": false
  }'
```


### 2. Set up proxy to avoid browser CROSS




### (Optional) Add More Intelligence
- Implement prompt templates.
- Add memory or context management.
- Integrate external tools (calendar booking, FAQs, etc).

---

## Outcome
You’ll have a smarter PlumberBot that understands user queries using LLMs and still sends structured data to your backend for processing.

## Architecture

```mermaid
flowchart TD
  subgraph Frontend
    A[Web App]
    B[Mobile App]
  end
  subgraph Backend
    C[API Gateway]
    D[(Database)]
    E[Service]
  end
  A --> C
  B --> C
  C --> D
  C --> E
```

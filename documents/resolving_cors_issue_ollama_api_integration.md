

# Resolving CORS Issue for Ollama API Integration

## Overview
This document details the CORS (Cross-Origin Resource Sharing) issue encountered when integrating a JavaScript-based chat interface with an Ollama API running on a Raspberry Pi, and provides a step-by-step solution using an Apache reverse proxy to bypass CORS.

<div style="display: flex; justify-content: space-between;">
    <img src="../screenshots/Screenshot_2025-07-19_at_09.33.29.png" 
         alt="Screenshot - chatBot working, OK" 
         style="width: 48%; height: auto;"/>
    <img src="../screenshots/Screenshot_2025-07-19_at_09.42.37.png" 
         alt="Screenshot - chatBot not working, CORS issue" 
         style="width: 48%; height: auto;"/>
</div>

### Environment
- **Web Server**: Apache running in a Docker container, exposed on `http://192.168.1.189:85`.
- **Ollama API**: Running in a Docker container, exposed on `http://192.168.1.189:11434`.
- **Flask Backend**: Running on `http://192.168.1.189:5001`, reserved for handling customer information from a previous rule-based chat implementation.
- **Client Access**: Webpage accessed from local (Raspberry Pi, `http://localhost:85`) and remote devices (e.g., MacBook, `http://192.168.1.189:85`).
- **Issue**: Browser throws a CORS error when JavaScript tries to fetch from `http://192.168.1.189:11434/api/generate`:
  ```bash
  [Error] Preflight response is not successful. Status code: 403
  [Error] Fetch API cannot load http://192.168.1.189:11434/api/generate due to access control checks.
  [Error] Failed to load resource: Preflight response is not successful. Status code: 403
  [Error] Error communicating with Ollama: – TypeError: Load failed
  ```
---

## Understanding CORS

### What is CORS?
- CORS is a browser security mechanism that restricts how web pages from one origin (e.g., `http://192.168.1.189:85`) can request resources from another origin (e.g., `http://192.168.1.189:11434`).
- An **origin** is defined by protocol, hostname, and port. Different ports (`85` vs `11434`) make these distinct origins.
- The browser requires the server (Ollama) to include headers like `Access-Control-Allow-Origin` to permit cross-origin requests.

### What is a Preflight Request?
- A **preflight request** is an `OPTIONS` HTTP request sent by the browser before a complex request (e.g., `POST` with `Content-Type: application/json`).
- It asks the server: "Is `http://192.168.1.189:85` allowed to send a `POST` request with these headers?"
- The server must respond with:
  ```http
  Access-Control-Allow-Origin: http://192.168.1.189:85
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```
- Ollama’s server does not include these headers, resulting in a 403 Forbidden response for the preflight request.

### Why It Happens

- The JavaScript [chatbot.js](../frontend/chatbot.js) runs on `http://192.168.1.189:85` and tries to fetch from `http://192.168.1.189:11434`.
- The browser detects the different ports, triggers a preflight request, and Ollama rejects it because it lacks CORS configuration.
- This only occurs in browsers; tools like `curl` bypass CORS, which is why your curl commands worked.

### Visual Analogy
Imagine the browser as a security guard:
- You (JavaScript on `http://192.168.1.189:85`) want to talk to a VIP (Ollama on `http://192.168.1.189:11434`).
- The guard sends a permission slip (`OPTIONS` request) to the VIP’s manager (Ollama server).
- If the manager doesn’t approve (no CORS headers or 403), the guard blocks you, and you get the error.





---

## Solution: Apache Reverse Proxy
Apache reverse proxy was successfully configured to forward requests to the Ollama API. 
A curl test confirmed that the proxy setup works correctly. However, browser requests were initially blocked 
with a 403 or 405 response because browsers automatically include an Origin header, 
which the backend API rejected. This issue was resolved by modifying the Apache reverse proxy configuration to 
remove the Origin header from incoming requests.

### Why This Works
- Makes API requests appear same-origin by routing through the web server
- Avoids modifying Ollama's CORS configuration
- Maintains security while solving the cross-origin problem

### Implementation Steps

**Modify Apache Configuration** Add Reverse Proxy Configuration:

Append the following to [httpd.conf](../backend/httpd.conf):

```apache
        # Remove the Origin header from HTTP requests
        RequestHeader unset Origin
```

```apache
# Reverse proxy for Ollama API with proper CORS
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot /usr/local/apache2/htdocs

    # Enable required modules
    LoadModule proxy_module modules/mod_proxy.so
    LoadModule proxy_http_module modules/mod_proxy_http.so
    LoadModule headers_module modules/mod_headers.so
    LoadModule rewrite_module modules/mod_rewrite.so

    # Reverse proxy to Ollama's API
    <Location /api/ollama>
        Require all granted

        # Remove the Origin header from HTTP requests
        RequestHeader unset Origin


        # Proxy to the Ollama container (adjust IP if needed)
        ProxyPass http://192.168.1.189:11434/api/chat
        ProxyPassReverse http://192.168.1.189:11434/api/chat

        # CORS headers
        #Header always set Access-Control-Allow-Origin "https://janosrostas.co.uk"
        #Header always set Access-Control-Allow-Origin "http://192.168.1.130"
        #Header always set Access-Control-Allow-Origin "http://192.168.1.189:85"
        Header always set Access-Control-Allow-Origin "*"
        Header always set Vary "Origin"
        Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
        Header always set Access-Control-Max-Age "86400"

        # Handle preflight OPTIONS requests
        <If "%{REQUEST_METHOD} == 'OPTIONS'">
            Header always set Content-Length "0"
            Header always set Content-Type "text/plain; charset=UTF-8"
            RewriteEngine On
            RewriteRule ^ - [R=204,L]
        </If>
    </Location>
</VirtualHost>
```

---
## 🤝 Contributors

<table style="font-family: Arial, sans-serif; line-height: 1.6;">
  <tr>
    <td><strong>János Rostás</strong></td>
    <td>
      👨‍💻 Electronic & Computer Engineer<br>
      🧠 Passionate about AI, LLMs, and RAG systems<br>
      🐳 Docker & Linux Power User<br>
      🔧 Raspberry Pi Builder | Automation Fanatic<br>
      💻 Git & GitHub DevOps Explorer<br>
      📦 Loves tinkering with Ollama, containerized models, and APIs<br>
      🌐 <a href="https://janosrostas.co.uk" target="_blank">janosrostas.co.uk</a><br>
      🔗 <a href="https://www.linkedin.com/in/janos-rostas/" target="_blank">LinkedIn</a><br>
      🐙 <a href="https://github.com/Janos11" target="_blank">GitHub</a> |
      🐋 <a href="https://hub.docker.com/u/janos11" target="_blank">Docker Hub</a>
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
  <tr>
    <td><strong>Grok</strong></td>
    <td>
      🤖 AI Assistant by xAI<br>
      🚀 Accelerates human scientific discovery<br>
      💬 Provides helpful and truthful answers<br>
      🌐 Accessible on <a href="https://grok.com" target="_blank">grok.com</a> and X platforms
    </td>
  </tr>
</table>
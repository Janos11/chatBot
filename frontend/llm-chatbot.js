const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const chatContainer = document.getElementById("plumber-chat");
const chatLauncher = document.getElementById("chat-launcher");

let messageHistory = [];

// Add message to chat window
function addMessage(msg, sender = "bot") {
  const div = document.createElement("div");
  div.className = sender;
  div.innerHTML = msg;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Send message to Ollama backend and handle response
async function talkToBackend(userText) {
  // Construct prompt from message history
  const prompt = messageHistory
    .map(msg => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n") + `\nUser: ${userText}`;

  const requestBody = {
    model: "tinyllama",
    prompt: prompt,
    stream: false
  };

  try {
    const res = await fetch("http://192.168.1.189:85/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const botReply = data.response || "Sorry, something went wrong.";

    // Update conversation history
    messageHistory.push({ role: "user", content: userText });
    messageHistory.push({ role: "assistant", content: botReply });

    addMessage(botReply, "bot");
  } catch (err) {
    console.error("Backend error:", err);
    addMessage("⚠️ Sorry, I couldn’t reach the server. Please try again later.", "bot");
  }
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userText = input.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");
  input.value = "";

  // Send to backend
  talkToBackend(userText);
});

// Show/hide chat
function toggleChat() {
  const isOpen = chatContainer.classList.contains("visible");

  if (isOpen) {
    chatContainer.classList.remove("visible");
    setTimeout(() => {
      chatContainer.style.display = "none";
      chatLauncher.classList.remove("hidden");
    }, 300);
  } else {
    chatContainer.style.display = "flex";
    setTimeout(() => {
      chatContainer.classList.add("visible");
    }, 10);
    chatLauncher.classList.add("hidden");

    // Welcome message on first open
    if (messageHistory.length === 0) {
      const welcome = "👋 Hello! I'm PlumberBot. How can I assist you today?";
      addMessage(welcome);
      messageHistory.push({ role: "assistant", content: welcome });
    }
  }
}

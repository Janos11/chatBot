const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const chatContainer = document.getElementById("plumber-chat");
const chatLauncher = document.getElementById("chat-launcher");

// Determine the Ollama API host dynamically
const ollamaHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:11434'
  : `http://${window.location.hostname}:11434`;
console.log('ollamaHost:', ollamaHost);

// Add message to chat
function addMessage(msg, sender = "bot") {
  const div = document.createElement("div");
  div.className = sender;
  div.innerHTML = msg;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
  return div; // Return the div so we can modify it later
}

// Function to send message to Ollama API and handle streaming response
async function sendToOllama(message) {
  try {
    // Create a bot message element that we'll update
    const botMessage = addMessage("...", "bot");
    let fullResponse = '';

    const response = await fetch('/api/ollama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tinyllama',
        messages: [{ role: 'user', content: message }],
        stream: true,
        options: {
          num_predict: 42, // Limits response to ~42 tokens
          temperature: 0.7, // Controls randomness (0-1, lower is more deterministic)
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.message?.content) {
            fullResponse += data.message.content;
            // Update the bot message in real-time
            botMessage.innerHTML = fullResponse;
            chatbox.scrollTop = chatbox.scrollHeight;
          }
        } catch (e) {
          console.error('Error parsing JSON chunk:', e);
        }
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Error communicating with Ollama:', error);
    return "Oops, something went wrong. Please try again later.";
  }
}

// Handle form submission
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userText = input.value.trim();
  if (userText === "") return;

  // Display user message
  addMessage(userText, "user");
  input.value = "";

  // Get response from Ollama (will stream automatically)
  await sendToOllama(userText);
});


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// State Variable
let stage = 0;
const goTopBtn = document.querySelector('.go-top');

// Chat show/hide toggle
function toggleChat() {
    const isOpen = chatContainer.classList.contains('visible');

    if (isOpen) {
      // Hide chat
      chatContainer.classList.remove('visible');
      setTimeout(() => {
        chatContainer.style.display = 'none';
        chatLauncher.classList.remove('hidden');
        goTopBtn.classList.add('show'); // show go to top button
      }, 300);
    } else {
      // Show chat
      chatContainer.style.display = 'flex';
      setTimeout(() => {
        chatContainer.classList.add('visible');
        goTopBtn.classList.remove('show'); // hide go to top button
      }, 10);
      chatLauncher.classList.add('hidden');

      // Initial message
      if (stage === 0) {
        setTimeout(() => {
          addMessage("👋 Hello! I'm PlumberBot. Say hi to get started!");
          stage += 1;
        }, 1000);
      }
    }
}

// customer info variable
let userData = {
  name: "",
  issue: "",
  phone: "",
  email: "",
  postcode: "",
  timestamp_frontend: "",
  timestamp_backend: "",
};

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

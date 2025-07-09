const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const chatContainer = document.getElementById("plumber-chat");
const chatLauncher = document.getElementById("chat-launcher");

// State Variables
let stage = 0;
let userData = {
  name: "",
  issue: "",
  phone: "",
  email: "",
  postcode: "",
  timestamp: "",
};

// Response logic
const responses = {
  greetings: [
    "Hi there! 👋 I'm PlumberBot, your virtual assistant.",
    "Hello! Need a plumber today?",
    "Good to see you! I’m here to help with any plumbing issues.",
  ],
  askIssue: [
    "Could you describe the problem? Leak, blockage, no hot water, installation or something else?",
    "Where’s the issue – kitchen, bathroom, or outdoors?",
    "Let me know what’s going wrong so I can match you with the right plumber.",
  ],
  buildTrust: [
    "You're in good hands. We've served hundreds in your area. 🛠️",
    "Our team is fully certified and usually available same-day. 🚚",
    "No worries, we’ll handle it quickly and professionally.",
  ],
  leadPrompt: [
    "Can you please share your name so we can log your request?",
    "First, what's your full name?",
  ],
  askPhone: [
    "Got it! Could you also share your phone number?",
    "Perfect. What’s the best number to reach you on?",
  ],
  askEmail: [
    "Thanks. Do you have an email we can use for the quote confirmation?",
    "Almost there. Could you enter your email address too?",
  ],
  askPostcode: [
    "Just one last thing — what’s your postcode so we can check local availability?",
    "Finally, can you let us know your postcode?",
  ],
  confirmation: [
    () => `
      Thanks! Here’s what we got:
      <ul>
        <li><strong>Name:</strong> ${userData.name}</li>
        <li><strong>Phone:</strong> ${userData.phone}</li>
        <li><strong>Email:</strong> ${userData.email}</li>
        <li><strong>Postcode:</strong> ${userData.postcode}</li>
        <li><strong>Issue:</strong> ${userData.issue}</li>
        <li><strong>Time:</strong> ${userData.timestamp}</li>
      </ul>
      We’ll be in touch shortly. ✅
    `,
  ],
  fallback: [
    "Hmm, I didn’t quite get that. Can you rephrase it?",
    "Sorry, could you say that again in a different way?",
  ],
  ending: [
    "Is there anything else I can help with today? 😊",
    "Need anything else while I’m here?",
  ],
  goodbye: [
    "Take care! If you need us again, just send a message.",
    "Goodbye for now! 👋 Stay safe and dry!",
  ],
};

// Helper
//function randomItem(arr) {
//  return typeof arr[0] === "function" ? arr[0]() : arr[Math.floor(Math.random() * arr.length)];
//}
function randomItem(arr) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  return typeof item === "function" ? item() : item;
}

// Add message to chat
function addMessage(msg, sender = "bot") {
  const div = document.createElement("div");
  div.className = sender;
  div.innerHTML = msg;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Main bot logic
function botResponse(userMsg) {
  const text = userMsg.toLowerCase();

  if (stage === 0) {
    userData.timestamp = new Date().toLocaleString();  // Logs current date & time
    if (/hi|hello|hey|good (morning|afternoon|evening)/.test(text)) {
      addMessage(randomItem(responses.greetings));
      stage = 1;
      setTimeout(() => addMessage(randomItem(responses.askIssue)), 2000);
    } else {
      addMessage("👋 Just say hi to begin.");
    }

  } else if (stage === 1) {
    const keywords = new RegExp(
      [
        'leak', 'leaking', 'drip', 'blocked', 'clogged',
        'toilet', 'bath', 'shower', 'installation', 'pipe',
        'boiler', 'radiator', 'burst', 'sink', 'water', 'no hot water',
        'flood', 'flooded', 'washing machine', 'dishwasher',
        'tap', 'faucet', 'overflow', 'sewage', 'backflow',
        'water heater', 'tank', 'stopcock', 'pressure', 'valve',
        'outdoor tap', 'wet wall', 'damp', 'pipe burst'
      ].join('|'),
      'i'
    );
    if (keywords.test(text)) {
      userData.issue = userMsg;
      addMessage(randomItem(responses.buildTrust));
      stage = 2;
      setTimeout(() => addMessage(randomItem(responses.leadPrompt)), 2000);
    } else {
      addMessage(randomItem(responses.fallback));
    }

  } else if (stage === 2) {
    if (userMsg.length > 2) {
      userData.name = userMsg;
      stage = 3;
      addMessage(randomItem(responses.askPhone));
    } else {
      addMessage("Can you please type your full name?");
    }

  } else if (stage === 3) {
    const phoneMatch = userMsg.match(/\+?\d{10,15}/);
    if (phoneMatch) {
      userData.phone = phoneMatch[0];
      stage = 4;
      addMessage(randomItem(responses.askEmail));
    } else if (/no|don’t have|don’t have|dont have one|do not have|none/i.test(text)) {
      userData.phone = "Not provided";
      stage = 4;
      addMessage("No problem! We’ll use email to get in touch.");
      setTimeout(() => addMessage(randomItem(responses.askEmail)), 2000);
    } else {
      addMessage("Hmm, that doesn't look like a valid phone number.");
    }

  } else if (stage === 4) {
    const emailMatch = userMsg.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      userData.email = emailMatch[0];
      stage = 5;
      addMessage(randomItem(responses.askPostcode));
    } else if (/no|don’t have|dont have|do not have|none/i.test(text)) {
      userData.email = "Not provided";
      stage = 5;
      addMessage("No problem! We’ll contact you by phone instead.");
      setTimeout(() => addMessage(randomItem(responses.askPostcode)), 1500);
    } else {
      addMessage("Can you check that email? It doesn't look valid.");
    }

  } else if (stage === 5) {
    if (/^[a-z]{1,2}\d[a-z\d]?\s?\d[a-z]{2}$/i.test(text)) {
      userData.postcode = userMsg.toUpperCase();
      stage = 6;
      addMessage(randomItem(responses.confirmation));
      setTimeout(() => addMessage(randomItem(responses.ending)), 3000);
    } else if (/no|don’t have|don’t have|do not have|none/i.test(text)) {
      userData.postcode = "Not provided";
      stage = 6;
      addMessage("That’s okay! We’ll get in touch and sort things out together. ✅");
      setTimeout(() => addMessage(randomItem(responses.confirmation)), 2000);
      setTimeout(() => addMessage(randomItem(responses.ending)), 5000);
    } else {
      addMessage("That doesn't look like a UK postcode. Can you double-check?");
    }

  } else if (stage === 6) {
    sendLeadToServer();
    if (/no|nothing|okay|ok|alright|thanks|thank you|see you|have a nice|bye|exit/i.test(text)) {
      addMessage(randomItem(responses.goodbye));
      stage = 7;
    } else if (/when|who|call|coming|come|fix|available|time|contact/i.test(text)) {
      addMessage("One of our plumbers will contact you shortly to confirm the details and arrange a time that works best for you. 🛠️");
    } else {
      addMessage("I can also help with boiler service, emergency leaks, or new installations.");
    }
  }
}

// Submit text
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userText = input.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");
  input.value = "";
  setTimeout(() => botResponse(userText), 1000);
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// Chat show/hide toggle
function toggleChat() {
    const isOpen = chatContainer.classList.contains('visible');

    if (isOpen) {
      // Hide chat
      chatContainer.classList.remove('visible');
      setTimeout(() => {
        chatContainer.style.display = 'none';
        chatLauncher.classList.remove('hidden');
      }, 300);
    } else {
      // Show chat
      chatContainer.style.display = 'flex';
      setTimeout(() => {
        chatContainer.classList.add('visible');
      }, 10);
      chatLauncher.classList.add('hidden');

      // Initial message
      if (stage === 0) {
        setTimeout(() => {
          addMessage("👋 Hello! I'm PlumberBot. Say hi to get started!");
        }, 1000);
      }
    }
}

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

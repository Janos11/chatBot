// WebSocket for robot movement
const socket = new WebSocket("ws://192.168.1.189:8787");
const responseDiv = document.getElementById("response");

socket.onopen = () => {
    console.log("WebSocket connected");
    responseDiv.className = "response success";
    responseDiv.innerHTML = "✅ Connected to WebSocket";
};

socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    responseDiv.className = "response error";
    responseDiv.innerHTML = "❌ WebSocket connection error";
};

socket.onmessage = (event) => {
    console.log("Server says:", event.data);
    responseDiv.className = "response success";
    responseDiv.innerHTML = `<strong>Server:</strong> ${event.data}`;
};

function sendCommand(direction) {
    if (socket.readyState === WebSocket.OPEN) {
        console.log(`Sending command: ${direction}`);
        socket.send(direction);
        responseDiv.className = "response loading";
        responseDiv.innerHTML = `➡️ Command sent: <strong>${direction}</strong>`;
    } else {
        alert("WebSocket not connected!");
        responseDiv.className = "response error";
        responseDiv.innerHTML = "❌ WebSocket not connected!";
    }
}

// Map keyboard to robot commands
document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            sendCommand("forward");
            break;
        case "ArrowDown":
            sendCommand("backward");
            break;
        case "ArrowLeft":
            sendCommand("left");
            break;
        case "ArrowRight":
            sendCommand("right");
            break;
        case "a":
            sendCommand("rotate_left");
            break;
        case "d":
            sendCommand("rotate_right");
            break;
    }
});


// Navigation Menu v1
const toggleBtn1 = document.getElementById('mobile-nav-toggle1');
const nav1 = document.getElementById('navmenu1');

toggleBtn1.addEventListener('click', () => {
nav1.classList.toggle('hidden');
toggleBtn1.classList.toggle("menu-open");
});


// <!-- Go To Top Button Simple -->
//document.addEventListener('DOMContentLoaded', () => {
//    const goTopBtn = document.querySelector('.go-top');
    //console.log('Scroll button loaded:', !!goTopBtn); // Should log true

//    function toggleGoTop() {
      //console.log('scrollY:', window.scrollY); // See if it logs while scrolling
//      if (window.scrollY > 100) {
//        goTopBtn.classList.add('show');
//      } else {
//        goTopBtn.classList.remove('show');
//      }
//    }

//    window.addEventListener('scroll', toggleGoTop);
//    toggleGoTop();

//    goTopBtn.addEventListener('click', (e) => {
//      e.preventDefault();
//      window.scrollTo({ top: 0, behavior: 'smooth' });
//    });
//  });

// <!-- Go To Top Button With progress circle -->
document.addEventListener('DOMContentLoaded', () => {
    const goTopBtn = document.querySelector('.go-top');
    const progressCircle = document.querySelector('.progress-circle .progress');
    const circumference = 2 * Math.PI * 20; // 2πr for r=20

    // Update scroll position
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      const offset = circumference * (1 - progress);
      progressCircle.style.strokeDashoffset = offset;

      // Toggle button visibility
      if (scrollTop > 100) {
        goTopBtn.classList.add('show');
      } else {
        goTopBtn.classList.remove('show');
      }
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    goTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Log In modern page
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});


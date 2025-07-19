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


// Fade in animation wait for it to be in frame
document.addEventListener("DOMContentLoaded", () => {
const animatedElements = document.querySelectorAll('.fade-in-10, .fade-in-15, .fade-in-20, .fade-in-25, .fade-in-r');

const observerOptions = {
  root: null, // viewport
  rootMargin: "0px",
  threshold: 0.1 // 10% of element visible triggers the callback
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the class that triggers the animation by removing the 'opacity:0' block
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target); // stop watching once animated
    }
  });
}, observerOptions);

animatedElements.forEach(el => {
  // Pause animation by default
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
});

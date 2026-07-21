// Remove the unused loadComponent function since Hugo handles this server-side now.

function initHeader() {
    const currentPath = window.location.pathname;

    // Active nav link
    document.querySelectorAll('.navbar a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
    });

    // Mobile menu toggle (hamburger)
    const toggle = document.getElementById('menu');
    const nav = document.getElementById('navbar') || document.getElementsByTagName('nav')[0];
    
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.style.display = (nav.style.display === 'block') ? 'none' : 'block';
        });
    }
}

function initFooter() {
    // Note: You can also just use {{ now.Format "2006" }} directly in Hugo's footer.html layout!
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// PWA Service worker
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js", {
        scope: "/",
      });
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// --- INITIALIZATION ---
// Wrap execution in DOMContentLoaded to ensure elements exist before selecting them
document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initFooter();
    registerServiceWorker();
    
    // Disable right click on website
    document.addEventListener('contextmenu', event => event.preventDefault());
});
// Get the current theme from localStorage or default to dark
let currentTheme = localStorage.getItem("theme") || "dark";

// Apply the theme to the body
document.body.classList.add(`${currentTheme}-theme`);

// Function to toggle themes
function toggleTheme() {
  const themeToggleButton = document.querySelector("#theme-toggle");

  if (document.body.classList.contains("dark-theme")) {
    // Switch to light theme
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light"); // Save the theme in localStorage

    // Change button text
    themeToggleButton.textContent = "Dark Mode";
  } else {
    // Switch to dark theme
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark"); // Save the theme in localStorage

    // Change button text
    themeToggleButton.textContent = "Light Mode";
  }
}

// Add an event listener to the button that switches the theme
document.querySelector("#theme-toggle").addEventListener("click", toggleTheme);

// Set the initial button text based on the current theme
const themeToggleButton = document.querySelector("#theme-toggle");
if (currentTheme === "dark") {
  themeToggleButton.textContent = "Light Mode";
} else {
  themeToggleButton.textContent = "Dark Mode";
}
// تعامل دکمه برای تغییر متن
const button = document.querySelector(".cta-btn");
const h1 = document.querySelector(".section-title");
const h2 = document.querySelector(".section-subtitle");

button.addEventListener("click", () => {
  h1.textContent = "Button Clicked!";
  h2.textContent = "Enjoy the Experience even more!";
});
// main.js
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("open");
});

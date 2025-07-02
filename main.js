const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

const track = document.querySelector(".carousel-track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let index = 0;

nextBtn.addEventListener("click", () => {
    index = (index + 1) % 3;
    track.style.transform = `translateX(-${index * 300}px)`;
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + 3) % 3;
    track.style.transform = `translateX(-${index * 300}px)`;
});

const scrollTopBtn = document.getElementById("scrollTop");
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

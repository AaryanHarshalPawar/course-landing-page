scrollToTopBtn.style.borderRadius = '5px';
scrollToTopBtn.style.backgroundColor = '#49796b';
scrollToTopBtn.style.color = '#fff';
scrollToTopBtn.style.cursor = 'pointer';
document.body.appendChild(scrollToTopBtn);
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Form Validation (Assuming you have a form in your HTML)
const contactForm = document.querySelector('form'); // Update selector based on your form
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (!emailInput.value) {
            e.preventDefault();
            alert('Please enter your email address.');
        } else {
            alert('Thank you for your message!');
        }
    });
}
function nextCard() {
  showCard((current + 1) % cards.length);
}

function prevCard() {
  showCard((current - 1 + cards.length) % cards.length);
}

// Create dots
dotsContainer.innerHTML = '';
for (let i = 0; i < cards.length; i++) {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Go to course ${i+1}`);
  dot.onclick = () => { showCard(i, true); resetAutoPlay(); };
  dot.tabIndex = 0;
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
  cards[i].setAttribute('tabindex', '-1');
  cards[i].setAttribute('role', 'group');
  cards[i].setAttribute('aria-label', `Course ${i+1} of ${cards.length}`);
  cards[i].setAttribute('aria-hidden', i !== 0);
}

// Navigation
prevBtn.onclick = () => { prevCard(); resetAutoPlay(); };
nextBtn.onclick = () => { nextCard(); resetAutoPlay(); };

// Keyboard navigation
carousel.parentElement.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { prevCard(); resetAutoPlay(); }
  if (e.key === 'ArrowRight') { nextCard(); resetAutoPlay(); }
  // Enter/Space on dots
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.parentElement === dotsContainer) {
    let idx = Array.from(dotsContainer.children).indexOf(document.activeElement);
    if (idx !== -1) showCard(idx, true);
    resetAutoPlay();
  }
});

// Auto-play functionality
function startAutoPlay() {
  autoPlayTimer = setInterval(nextCard, AUTO_PLAY_INTERVAL);
}
function stopAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
}
function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}
carousel.parentElement.addEventListener('mouseenter', stopAutoPlay);
carousel.parentElement.addEventListener('mouseleave', startAutoPlay);
carousel.parentElement.addEventListener('focusin', stopAutoPlay);
carousel.parentElement.addEventListener('focusout', startAutoPlay);

// Show first card
showCard(0);
startAutoPlay();

// --- Dark Mode Toggle ---
const darkBtn = document.getElementById('darkModeToggle');
const body = document.body;
const DARK_KEY = 'yoganidra_dark_mode';
function setDarkMode(on) {
  if (on) {
    body.classList.add('dark-mode');
    darkBtn.textContent = '☀️';
    darkBtn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    body.classList.remove('dark-mode');
    darkBtn.textContent = '🌙';
    darkBtn.setAttribute('aria-label', 'Switch to dark mode');
  }
  localStorage.setItem(DARK_KEY, on ? '1' : '0');
}
darkBtn.onclick = () => setDarkMode(!body.classList.contains('dark-mode'));
if (localStorage.getItem(DARK_KEY) === '1' ||
    (localStorage.getItem(DARK_KEY) === null &&
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setDarkMode(true);
} else {
  setDarkMode(false);
}

// Optional: Polyfill for smooth scroll in older browsers
if ('scrollBehavior' in document.documentElement.style === false) {
  // Polyfill could be added here if needed
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode'))

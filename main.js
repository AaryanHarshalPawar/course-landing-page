document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling for Navigation Links
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
    if (document.body.classList.contains('dark-mode')) {
      darkModeToggle.textContent = '🌞'; // Sun icon for light mode
    } else {
      darkModeToggle.textContent = '🌙'; // Moon icon for dark mode
    }
  });

  // Carousel Auto-Slide
  let currentCarouselIndex = 1;
  const totalCarouselItems = 3; // Update this if you add more items
  setInterval(() => {
    currentCarouselIndex = (currentCarouselIndex % totalCarouselItems) + 1;
    const radio = document.getElementById(`carousel${currentCarouselIndex}`);
    if (radio) radio.checked = true;
  }, 5000); // Change slide every 5 seconds

  // Scroll to Top Button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.textContent = '↑';
  scrollToTopBtn.id = 'scrollToTopBtn';
  scrollToTopBtn.style.position = 'fixed';
  scrollToTopBtn.style.bottom = '20px';
  scrollToTopBtn.style.right = '20px';
  scrollToTopBtn.style.display = 'none';
  scrollToTopBtn.style.padding = '10px';
  scrollToTopBtn.style.border = 'none';
  scrollToTopBtn.style.borderRadius = '5px';
  scrollToTopBtn.style.backgroundColor = '#49796b';
  scrollToTopBtn.style.color = '#fff';
  scrollToTopBtn.style.cursor = 'pointer';
  scrollToTopBtn.style.fontSize = '1.5rem';
  scrollToTopBtn.style.zIndex = '100';
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

  // Form Validation
  const contactForm = document.getElementById('contactForm');
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
});

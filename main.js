document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate the position to scroll to
        const headerHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        // Smooth scroll to the target position
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // Dark Mode Toggle with localStorage
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    // Initialize from localStorage
    const savedMode = localStorage.getItem('darkMode') === 'true';
    if (savedMode) {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = '🌞';
    }

    // Toggle handler
    darkModeToggle.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode');
      darkModeToggle.textContent = isDark ? '🌞' : '🌙';
      localStorage.setItem('darkMode', isDark);
    });
  }

  // Scroll-to-top Button
  const scrollBtn = document.getElementById('scrollToTopBtn');
  
  function toggleScrollButton() {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  }

  window.addEventListener('scroll', toggleScrollButton);
  toggleScrollButton(); // Initialize

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    scrollBtn.blur(); // Remove focus after click
  });

  // Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const email = formData.get('email');
      
      // Simple validation
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      
      // In a real app, you would send this to a server
      alert('Thank you for your message! We\'ll be in touch soon.');
      contactForm.reset();
    });
  }
});

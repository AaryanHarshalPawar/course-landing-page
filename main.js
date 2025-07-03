document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
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

  // Enhanced Carousel with Auto-Advance
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const radioButtons = carousel.querySelectorAll('input[type="radio"]');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;
    let autoAdvanceInterval;

    function showSlide(index) {
      // Ensure index is within bounds
      index = (index + radioButtons.length) % radioButtons.length;
      radioButtons[index].checked = true;
      currentIndex = index;
    }

    function startAutoAdvance() {
      autoAdvanceInterval = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 5000);
    }

    function stopAutoAdvance() {
      clearInterval(autoAdvanceInterval);
    }

    // Manual navigation
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        stopAutoAdvance();
        startAutoAdvance();
      });

      prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        stopAutoAdvance();
        startAutoAdvance();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (document.activeElement.closest('.carousel')) {
        if (e.key === 'ArrowRight') {
          showSlide(currentIndex + 1);
          stopAutoAdvance();
          startAutoAdvance();
        } else if (e.key === 'ArrowLeft') {
          showSlide(currentIndex - 1);
          stopAutoAdvance();
          startAutoAdvance();
        }
      }
    });

    // Start auto-advance
    startAutoAdvance();

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
  }

  // Scroll-to-top Button
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTopBtn';
  scrollBtn.innerHTML = '&uarr;';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);

  function toggleScrollButton() {
    scrollBtn.style.display = window.scrollY > 100 ? 'block' : 'none';
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
      console.log('Form submitted with email:', email);
      alert('Thank you for your message! We\'ll be in touch soon.');
      contactForm.reset();
    });
  }

  // Focus styles for keyboard navigation
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.documentElement.classList.remove('keyboard-nav');
  });
});

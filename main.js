document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
  });

  const track = document.querySelector('.carousel-track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let index = 0;

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % 3;
    track.style.transform = `translateX(-${index * 100}%)`;
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + 3) % 3;
    track.style.transform = `translateX(-${index * 100}%)`;
  });

  setInterval(() => {
    index = (index + 1) % 3;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 5000);

  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTopBtn';
  scrollBtn.textContent = '↑';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 100 ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

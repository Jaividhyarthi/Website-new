// script.js - Digital Storybook

document.addEventListener('DOMContentLoaded', function() {
  
  // Create floating particles
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 25; i++) {
      let p = document.createElement('div');
      p.className = 'particle';
      let size = Math.random() * 70 + 30;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(p);
    }
  }
  createParticles();

  // Page navigation
  const pages = document.querySelectorAll('.page');
  const nextBtns = document.querySelectorAll('.next-page-btn');
  const openBtn = document.getElementById('openBookBtn');
  const sendBtn = document.getElementById('sendLoveBtn');
  const spotifyBtn = document.getElementById('spotifySongBtn');
  const musicBtn = document.getElementById('musicToggleBtn');
  const music = document.getElementById('bgMusic');

  function showPage(index) {
    pages.forEach((p, i) => {
      p.classList.toggle('active-page', i === index);
    });
  }

  // Next buttons
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let next = parseInt(btn.dataset.next, 10);
      showPage(next);
    });
  });

  // Open book
  if (openBtn) {
    openBtn.addEventListener('click', () => showPage(1));
  }

  // Send love animation
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const animDiv = document.getElementById('loveAnimation');
      if (animDiv) {
        animDiv.innerHTML = '';
        for (let i = 0; i < 8; i++) {
          let heart = document.createElement('span');
          heart.className = 'heart';
          heart.innerHTML = '❤️';
          heart.style.animationDelay = (i * 0.2) + 's';
          animDiv.appendChild(heart);
        }
      }
    });
  }

  // Spotify button
  if (spotifyBtn) {
    spotifyBtn.addEventListener('click', () => {
      window.open('https://open.spotify.com/track/2G3RDVqTbaK13d6BaizAxa', '_blank');
    });
  }

  // Music toggle
  if (musicBtn && music) {
    music.volume = 0.2;
    let playing = false;
    
    musicBtn.addEventListener('click', () => {
      if (playing) {
        music.pause();
        musicBtn.textContent = '🔈 play';
      } else {
        music.play().catch(() => {});
        musicBtn.textContent = '🎵 pause';
      }
      playing = !playing;
    });
  }

  // Local storage
  for (let i = 1; i <= 7; i++) {
    let input = document.getElementById(`q${i}`);
    if (input) {
      // Load saved
      let saved = localStorage.getItem(`q${i}`);
      if (saved) input.value = saved;
      
      // Save on input
      input.addEventListener('input', () => {
        localStorage.setItem(`q${i}`, input.value);
      });
    }
  }

  // Start on landing
  showPage(0);
});
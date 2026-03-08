// script.js - Digital Storybook for Amma

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== CREATE FLOATING PARTICLES =====
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
      let particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 20px and 100px
      let size = Math.random() * 80 + 20;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 8 + 's';
      
      // Random opacity/color variation
      let opacity = Math.random() * 0.3 + 0.1;
      let colorVar = Math.floor(Math.random() * 40) + 160;
      particle.style.background = `rgba(255, ${colorVar}, 150, ${opacity})`;
      
      container.appendChild(particle);
    }
  }
  
  // Initialize particles
  createParticles();
  
  // ===== PAGE NAVIGATION =====
  const pages = document.querySelectorAll('.page');
  const nextButtons = document.querySelectorAll('.next-page-btn');
  const openBookBtn = document.getElementById('openBookBtn');
  const sendLoveBtn = document.getElementById('sendLoveBtn');
  const spotifyBtn = document.getElementById('spotifySongBtn');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const bgMusic = document.getElementById('bgMusic');
  
  let currentPage = 0; // 0 = landing page
  let musicPlaying = false;
  
  // Function to show a specific page
  function showPage(index) {
    if (index < 0 || index >= pages.length) return;
    
    pages.forEach((page, i) => {
      if (i === index) {
        page.classList.add('active-page');
      } else {
        page.classList.remove('active-page');
      }
    });
    
    currentPage = index;
    
    // Save answers when turning pages (except from landing)
    if (index > 0) {
      saveAllAnswers();
    }
  }
  
  // ===== LOCAL STORAGE FUNCTIONS =====
  function saveAnswer(questionId, value) {
    if (value) {
      localStorage.setItem(questionId, value);
    }
  }
  
  function saveAllAnswers() {
    for (let i = 1; i <= 7; i++) {
      let input = document.getElementById(`q${i}`);
      if (input) {
        localStorage.setItem(`memory_q${i}`, input.value);
      }
    }
  }
  
  function loadAllAnswers() {
    for (let i = 1; i <= 7; i++) {
      let input = document.getElementById(`q${i}`);
      let savedValue = localStorage.getItem(`memory_q${i}`);
      if (input && savedValue) {
        input.value = savedValue;
      }
    }
  }
  
  // Load saved answers on startup
  loadAllAnswers();
  
  // ===== EVENT LISTENERS =====
  
  // Next page buttons
  nextButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      let nextPage = parseInt(this.getAttribute('data-next'), 10);
      
      // Save current answers
      saveAllAnswers();
      
      // Show next page
      showPage(nextPage);
      
      // Smooth scroll to top of container
      document.querySelector('.pages-container').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  });
  
  // Open book button (landing page)
  if (openBookBtn) {
    openBookBtn.addEventListener('click', function() {
      showPage(1);
      
      // Smooth scroll
      document.querySelector('.pages-container').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  }
  
  // Send love button (final page)
  if (sendLoveBtn) {
    sendLoveBtn.addEventListener('click', function() {
      // Create love animation
      const animContainer = document.getElementById('loveAnimation');
      if (animContainer) {
        // Clear previous animation
        animContainer.innerHTML = '';
        
        // Create floating hearts
        const heartSymbols = ['❤️', '✨', '💫', '🌸', '🌺', '💖', '💗', '🌹'];
        
        for (let i = 0; i < 12; i++) {
          let heart = document.createElement('span');
          heart.className = 'heart';
          
          // Random heart symbol
          let randomHeart = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
          heart.innerHTML = randomHeart;
          
          // Random animation delay
          heart.style.animationDelay = (i * 0.15) + 's';
          
          // Random size variation
          let size = Math.random() * 1 + 0.8;
          heart.style.transform = `scale(${size})`;
          
          animContainer.appendChild(heart);
        }
      }
      
      // Save all answers one last time
      saveAllAnswers();
    });
  }
  
  // Spotify button
  if (spotifyBtn) {
    spotifyBtn.addEventListener('click', function() {
      // Open Spotify track in new tab
      window.open('https://open.spotify.com/track/2G3RDVqTbaK13d6BaizAxa?si=uPIaHFR6Shy8MCadyXMG9Q', '_blank');
    });
  }
  
  // ===== MUSIC TOGGLE =====
  if (musicToggleBtn && bgMusic) {
    // Set volume low for gentle background
    bgMusic.volume = 0.2;
    
    musicToggleBtn.addEventListener('click', function() {
      if (musicPlaying) {
        bgMusic.pause();
        musicToggleBtn.textContent = '🔈 play';
        musicToggleBtn.style.background = '#ffe1c6';
      } else {
        // Play music (catch autoplay errors)
        bgMusic.play().catch(error => {
          console.log('Music autoplay prevented:', error);
          // Show message that user needs to interact
          alert('Click anywhere on the page to start the music');
          
          // Try playing again on next user interaction
          document.body.addEventListener('click', function playOnClick() {
            bgMusic.play().catch(e => {});
            document.body.removeEventListener('click', playOnClick);
          }, { once: true });
        });
        
        musicToggleBtn.textContent = '🎵 pause';
        musicToggleBtn.style.background = '#fecb9e';
      }
      musicPlaying = !musicPlaying;
    });
  }
  
  // ===== AUTO-SAVE ON INPUT =====
  for (let i = 1; i <= 7; i++) {
    let input = document.getElementById(`q${i}`);
    if (input) {
      input.addEventListener('input', function() {
        saveAnswer(`memory_q${i}`, this.value);
      });
    }
  }
  
  // ===== KEYBOARD NAVIGATION (optional) =====
  document.addEventListener('keydown', function(e) {
    // Right arrow for next page
    if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
      e.preventDefault();
      showPage(currentPage + 1);
    }
    
    // Left arrow for previous page (if needed)
    if (e.key === 'ArrowLeft' && currentPage > 0) {
      e.preventDefault();
      showPage(currentPage - 1);
    }
  });
  
  // ===== SAVE BEFORE UNLOAD =====
  window.addEventListener('beforeunload', function() {
    saveAllAnswers();
  });
  
  // ===== INITIAL PAGE =====
  // Make sure landing page is active
  showPage(0);
  
  // ===== RESPONSIVE ADJUSTMENTS =====
  function adjustForMobile() {
    if (window.innerWidth <= 560) {
      // Any mobile-specific adjustments can go here
      console.log('Mobile view activated');
    }
  }
  
  window.addEventListener('resize', adjustForMobile);
  adjustForMobile();
  
  // ===== ADD PLACEHOLDER FOR EMPTY INPUTS =====
  const inputs = document.querySelectorAll('.memory-input');
  inputs.forEach(input => {
    if (!input.value) {
      // Keep placeholder as is
    }
  });
  
  console.log('✨ Digital Storybook loaded successfully ✨');
});
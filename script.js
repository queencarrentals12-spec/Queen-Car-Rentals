document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Main page: Book Now button
  const bookNowBtn = document.getElementById('book-now-btn');
  if (bookNowBtn) {
    bookNowBtn.addEventListener('click', () => {
      console.log('Main Book Now clicked');
      window.location.href = 'tel:+94776884282';
    });
  }

  // Main page: Car grid buttons
  const carButtons = document.querySelectorAll('.car-btn');
  carButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = button.getAttribute('data-href');
    });
  });

  // Car model pages: Book Now buttons
  const bookButtons = [
    document.getElementById('book-compact-btn'),
    document.getElementById('book-family-hatch-btn'),
    document.getElementById('book-family-sedan-btn')
  ];

  bookButtons.forEach(button => {
    if (button) {
      console.log('Attached listener to:', button.id);
      button.addEventListener('click', () => {
        console.log(`${button.id} clicked`);
        window.location.href = 'tel:+94776884282';
      });
    } else {
      console.log('Button not found:', button);
    }
  });

  // Particles animation with mouse interaction
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.3})`;
      }

      update(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.speedX += dx / 100;
          this.speedY += dy / 100;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update(canvas.width / 2, canvas.height / 2);
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      particles.forEach(particle => particle.update(mouseX, mouseY));
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // Intro transition
  const intro = document.querySelector('.intro');
  const startBtn = document.getElementById('start-btn');
  const mainContent = document.querySelectorAll('.hidden');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      intro.style.display = 'none';
      mainContent.forEach(element => {
        element.classList.remove('hidden');
      });
    });
  }

  // Auto-transition after 5 seconds (optional)
  setTimeout(() => {
    if (intro.style.display !== 'none') {
      intro.style.display = 'none';
      mainContent.forEach(element => {
        element.classList.remove('hidden');
      });
    }
  }, 5000);

  // Text animation for welcome message
  const welcomeText = document.getElementById('welcome-text');
  if (welcomeText) {
    const text = "Welcome to Queen Car Rentals";
    let index = 0;
    let isDeleting = false;

    function type() {
      const currentText = isDeleting ? text.substring(0, index) : text.substring(0, index + 1);
      welcomeText.textContent = currentText;
      if (!isDeleting && index < text.length) {
        index++;
        setTimeout(type, 150);
      } else if (isDeleting && index > 0) {
        index--;
        setTimeout(type, 100);
      } else if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else {
        isDeleting = false;
        index = 0;
        setTimeout(type, 500);
      }
    }
    type();
  }

  // Testimonials carousel
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.remove('active');
      if (i === index) {
        testimonial.classList.add('active');
      }
    });
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }

  // Start carousel
  showTestimonial(currentTestimonial);
  setInterval(nextTestimonial, 5000);

  // Review submission
  const reviewText = document.getElementById('review-text');
  const submitReview = document.getElementById('submit-review');
  const seeReviewsBtn = document.getElementById('see-reviews-btn');

  if (submitReview && reviewText) {
    submitReview.addEventListener('click', () => {
      const reviewContent = reviewText.value.trim();
      if (reviewContent) {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push({ text: reviewContent, timestamp: new Date().toISOString() });
        localStorage.setItem('reviews', JSON.stringify(reviews));
        reviewText.value = '';
        console.log('Review submitted:', reviewContent);
      }
    });
  }

  if (seeReviewsBtn) {
    seeReviewsBtn.addEventListener('click', () => {
      window.location.href = 'reviews.html';
    });
  }

  // Load and display reviews on reviews.html
  if (window.location.pathname.includes('reviews.html')) {
    const reviewsList = document.getElementById('reviews-list');
    if (reviewsList) {
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      reviewsList.innerHTML = '';
      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `<p>${review.text} <small>(${new Date(review.timestamp).toLocaleString()})</small></p>`;
        reviewsList.appendChild(reviewElement);
      });
    }
  }

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Lightbox functionality for images
  const lightbox = document.getElementById('lightbox');
  const closeLightbox = document.getElementById('close-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox && closeLightbox && lightboxImg) {
    const galleryImages = document.querySelectorAll('.gallery-img, .main-car-img');
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      });
    });

    closeLightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }
});

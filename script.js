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

  // Particles animation
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
      }

      update() {
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
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

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
});

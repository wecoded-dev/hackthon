// Initialize animations
AOS.init({
  duration: 1000,
  once: true,
  easing: 'ease-in-out-quad'
});

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById('particles-js');
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random properties
    const size = Math.random() * 10 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.5 + 0.1;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = opacity;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
  }
}

// Form submission handling
document.getElementById('submission-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const successMessage = document.getElementById('success-message');

  // Show loading state
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  submitButton.disabled = true;

  // Submit to web3forms
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Hide form and show success message
        form.style.opacity = '0';
        form.style.transform = 'translateY(20px)';
        form.style.pointerEvents = 'none';
        form.style.transition = 'all 0.5s ease';

        setTimeout(() => {
          form.style.display = 'none';
          successMessage.style.display = 'block';
          setTimeout(() => {
            successMessage.classList.add('show');
          }, 50);
        }, 500);
      } else {
        throw new Error('Submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Try Again';
      submitButton.disabled = false;
    });
});

// Initialize particles
createParticles();

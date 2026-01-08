document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.getElementById('navbarNav');
  const contactForm = document.getElementById('contactForm');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.9)';
      navbar.style.boxShadow = 'none';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bootstrapCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bootstrapCollapse) {
          bootstrapCollapse.hide();
        }
      }
    });
  });

  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(li => {
      li.classList.remove('active');
      if (li.getAttribute('href').includes(current)) {
        li.classList.add('active');
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;

      submitBtn.disabled = true;
      submitBtn.innerText = 'Sending...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert('Message sent successfully! I will get back to you soon.');
          contactForm.reset();
        } else {
          const data = await response.json();
          if (Object.hasOwn(data, 'errors')) {
            alert(data["errors"].map(error => error["message"]).join(", "));
          } else {
            alert('Oops! There was a problem submitting your form');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Oops! There was a problem submitting your form');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    });
  }
});
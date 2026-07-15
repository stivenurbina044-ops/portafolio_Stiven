// ---------- Menú móvil ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Resaltar enlace de sección activa ----------
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(section => observer.observe(section));

// ---------- Fecha dinámica en el panel de estado ----------
const statusDate = document.getElementById('statusDate');
if (statusDate) {
  const now = new Date();
  const formatted = now.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
  statusDate.textContent = formatted;
}

// ---------- Formulario de contacto ----------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Por favor completa todos los campos.';
      return;
    }

    const subject = encodeURIComponent(`Contacto desde el portafolio — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:tucorreo@ejemplo.com?subject=${subject}&body=${body}`;

    formNote.textContent = 'Abriendo tu cliente de correo…';
    contactForm.reset();
  });
}

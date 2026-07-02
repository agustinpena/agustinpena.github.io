document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ---------- Smooth scroll for anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Terminal typing effect ---------- */
  const typed = document.getElementById('typed');
  const output = document.getElementById('output');
  if (typed && output) {
    const command = 'agustin --init portfolio';
    const lines = [
      'loading skills.json ...',
      'stack: [HTML, CSS, JS, React, Node]',
      'status: available',
      'ready to build something great ✓'
    ];
    let i = 0;
    const type = () => {
      if (i <= command.length) {
        typed.textContent = command.slice(0, i);
        i++;
        setTimeout(type, 60 + Math.random() * 40);
      } else {
        setTimeout(showOutput, 400);
      }
    };
    const showOutput = () => {
      lines.forEach((line, idx) => {
        setTimeout(() => {
          const span = document.createElement('span');
          span.className = 'line';
          span.textContent = line;
          output.appendChild(span);
        }, idx * 300);
      });
    };
    setTimeout(type, 600);
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---------- FAQ: close others on open (accordion) ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- Contact form (demo) ---------- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  if (form && submitBtn) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      // Basic validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const original = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn__dot"></span> sending...';

      // Simulate network request
      setTimeout(() => {
        submitBtn.innerHTML = '<span class="btn__dot"></span> sent ✓';
        submitBtn.style.background = '#00d9a3';
        form.reset();
        setTimeout(() => {
          submitBtn.innerHTML = original;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 2800);
      }, 1400);
    });
  }

});
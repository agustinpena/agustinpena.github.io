// ===== Mobile Menu =====
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuOverlay = document.getElementById("menu-overlay");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("open");
  menuOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  menuOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

// ===== Navbar background on scroll =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("glass");
    navbar.style.borderBottom = "1px solid rgba(14, 165, 233, 0.08)";
  } else {
    navbar.classList.remove("glass");
    navbar.style.borderBottom = "none";
  }
});

// ===== Back to Top Button =====
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.remove(
      "opacity-0",
      "translate-y-4",
      "pointer-events-none",
    );
    backToTop.classList.add("opacity-100", "translate-y-0");
  } else {
    backToTop.classList.add(
      "opacity-0",
      "translate-y-4",
      "pointer-events-none",
    );
    backToTop.classList.remove("opacity-100", "translate-y-0");
  }
});

// ===== FAQ Toggle =====
function toggleFaq(element) {
  const answer = element.querySelector(".faq-answer");
  const icon = element.querySelector(".faq-icon");

  // Close other open FAQs
  document.querySelectorAll(".faq-answer.open").forEach((a) => {
    if (a !== answer) {
      a.classList.remove("open");
      a.parentElement.querySelector(".faq-icon").classList.remove("rotated");
    }
  });

  answer.classList.toggle("open");
  icon.classList.toggle("rotated");
}

// ===== Scroll Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// ===== Stat Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    if (!target) return;
    const increment = target / 60;
    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current) + (target === 100 ? "%" : "+");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (target === 100 ? "%" : "+");
      }
    };
    updateCounter();
  });
}

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const heroSection = document.getElementById("hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ===== Contact Form Handler (Formspree) =====
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const btn = form.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;

    // Obtener los valores de los campos
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validaciones básicas
    if (!data.nombre || !data.apellido || !data.email || !data.mensaje) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Deshabilitar el botón y mostrar estado de "enviando"
    btn.innerHTML =
      '<span class="inline-flex items-center gap-2"><svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enviando...</span>';
    btn.disabled = true;

    // Enviar los datos a Formspree
    fetch("https://formspree.io/f/mykqlyen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al enviar el mensaje. Intenta de nuevo.");
        }
      })
      .then(() => {
        // Éxito: mostrar mensaje de confirmación
        btn.innerHTML =
          '<span class="inline-flex items-center gap-2"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> Mensaje Enviado!</span>';
        btn.classList.remove("bg-primary", "hover:bg-accent");
        btn.classList.add("bg-green-500");

        // Limpiar el formulario
        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.disabled = false;
          btn.classList.remove("bg-green-500");
          btn.classList.add("bg-primary", "hover:bg-accent");
        }, 3000);
      })
      .catch((error) => {
        // Error: mostrar mensaje de fallo
        btn.innerHTML =
          '<span class="inline-flex items-center gap-2 text-red-400"><i class="fas fa-exclamation-circle"></i> Error, intenta de nuevo</span>';
        btn.classList.add("bg-red-600");

        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.disabled = false;
          btn.classList.remove("bg-red-600");
          btn.classList.add("bg-primary", "hover:bg-accent");
        }, 3000);
      });
  });

// ===== Smooth Scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

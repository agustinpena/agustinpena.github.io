// ---- Menú móvil ----
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");
const mobileLinks = document.querySelectorAll(".mobile-link");

function openMenu() {
  mobileMenu.classList.add("open");
  overlay.classList.remove("hidden");
  hamburgerBtn.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenuFn() {
  mobileMenu.classList.remove("open");
  overlay.classList.add("hidden");
  hamburgerBtn.classList.remove("active");
  document.body.style.overflow = "";
}

hamburgerBtn.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFn);
overlay.addEventListener("click", closeMenuFn);
mobileLinks.forEach((link) => link.addEventListener("click", closeMenuFn));

// ---- Efecto de scroll en navbar ----
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 80) {
    navbar.style.background = "rgba(253, 248, 240, 0.95)";
    navbar.style.backdropFilter = "blur(12px)";
    navbar.style.boxShadow = "0 1px 12px rgba(51, 26, 12, 0.08)";
  } else {
    navbar.style.background = "transparent";
    navbar.style.backdropFilter = "none";
    navbar.style.boxShadow = "none";
  }
});

// ---- Animación al hacer scroll ----
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

// ---- Máscara de teléfono ----
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");

  if (value.startsWith("7") || value.startsWith("8")) {
    value = value.substring(1);
  }

  let formatted = "+7";
  if (value.length > 0) formatted += " (" + value.substring(0, 3);
  if (value.length >= 3) formatted += ") " + value.substring(3, 6);
  if (value.length >= 6) formatted += "-" + value.substring(6, 8);
  if (value.length >= 8) formatted += "-" + value.substring(8, 10);

  e.target.value = value.length > 0 ? formatted : "";
});

// ---- Envío del formulario ----
const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const errorMsgs = contactForm.querySelectorAll(".error-msg");
  let isValid = true;

  // Resetear errores
  errorMsgs.forEach((msg) => msg.classList.add("hidden"));
  [name, phone].forEach((input) => (input.style.borderColor = ""));

  // Validar nombre
  if (!name.value.trim()) {
    name.nextElementSibling.classList.remove("hidden");
    name.style.borderColor = "#ef4444";
    isValid = false;
  }

  // Validar teléfono
  const phoneDigits = phone.value.replace(/\D/g, "");
  if (phoneDigits.length < 11) {
    phone.nextElementSibling.classList.remove("hidden");
    phone.style.borderColor = "#ef4444";
    isValid = false;
  }

  if (isValid) {
    contactForm.style.opacity = "0";
    contactForm.style.transform = "scale(0.95)";
    contactForm.style.transition = "all 0.3s ease";

    setTimeout(() => {
      contactForm.classList.add("hidden");
      successMsg.classList.remove("hidden");
      successMsg.style.opacity = "0";
      successMsg.style.transform = "scale(0.95)";

      requestAnimationFrame(() => {
        successMsg.style.transition = "all 0.4s ease";
        successMsg.style.opacity = "1";
        successMsg.style.transform = "scale(1)";
      });
    }, 300);
  }
});

// ---- Scroll suave para enlaces de ancla ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Ignorar enlaces vacíos o que solo tengan "#"
    if (href === "#" || href === "" || href.length < 2) return;

    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

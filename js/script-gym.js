/* --------------------------------------------
           Application Object
           -------------------------------------------- */
const app = {
  // Initialize the app
  init() {
    this.setupRouter();
    this.setupMobileMenu();
    this.setupClassFilters();
    this.setupContactForm();
    this.setupActionButtons();
    this.setupScrollNavbar();
  },

  /* --------------------------------------------
               Hash-Based Router
               -------------------------------------------- */
  setupRouter() {
    // Handle hash changes
    window.addEventListener("hashchange", () => this.handleRoute());

    // Handle initial load
    // Use setImmediate equivalent to ensure DOM is fully parsed
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.handleRoute());
    } else {
      this.handleRoute();
    }
  },

  handleRoute() {
    // Default to home if no hash present
    let targetId = window.location.hash.replace("#", "") || "home";

    // Validate target exists, fallback to home
    const targetSection = document.getElementById(targetId);
    if (!targetSection) {
      targetId = "home";
    }

    // Hide all page sections
    const sections = document.querySelectorAll(".page-section");
    sections.forEach((section) => section.classList.remove("active"));

    // Show target section
    const activeSection = document.getElementById(targetId);
    if (activeSection) {
      activeSection.classList.add("active");
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update active nav state
    this.updateActiveNav(targetId);

    // Close mobile menu on route change
    document.body.classList.remove("menu-open");
    const navLinks = document.getElementById("navLinks");
    if (navLinks) navLinks.classList.remove("active");
  },

  navigate(pageId) {
    // Programmatic navigation used by onclick handlers
    window.location.hash = pageId;
  },

  updateActiveNav(pageId) {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      const linkTarget = link.getAttribute("href").replace("#", "");
      if (linkTarget === pageId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  },

  /* --------------------------------------------
               Mobile Menu Toggle -------------------------------------------- */
  setupMobileMenu() {
    const hamburger = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  },

  /* --------------------------------------------
               Class Filter System
               -------------------------------------------- */
  setupClassFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const classCards = document.querySelectorAll(".class-card");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filterValue = btn.getAttribute("data-filter");

        // Update active button state
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Filter cards
        classCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filterValue === "all" || category === filterValue) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  },

  /* --------------------------------------------
               Contact Form Validation & Dummy Submission
 -------------------------------------------- */
  setupContactForm() {
    const form = document.getElementById("contactForm");
    const statusDiv = document.getElementById("formStatus");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Retrieve field values
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();

      // Basic validation
      if (!nombre || !email || !mensaje) {
        this.showFormStatus(
          "Por favor completa todos los campos obligatorios.",
          "error",
        );
        return;
      }

      // Email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.showFormStatus(
          "Por favor ingresa un correo electrónico válido.",
          "error",
        );
        return;
      }

      // Simulate network request
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Enviando...";
      submitBtn.disabled = true;

      setTimeout(() => {
        this.showFormStatus(
          "¡Mensaje enviado! Nos pondremos en contacto contigo pronto.",
          "success",
        );
        form.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  },

  showFormStatus(message, type) {
    const statusDiv = document.getElementById("formStatus");
    if (!statusDiv) return;
    statusDiv.textContent = message;
    statusDiv.className = `form-status show ${type}`;

    // Auto-hide error messages after 5 seconds
    if (type === "error") {
      setTimeout(() => {
        statusDiv.classList.remove("show");
      }, 5000);
    }
  },

  /* --------------------------------------------
               Generic Action Buttons (Reservar / Inscribirse)
               -------------------------------------------- */
  setupActionButtons() {
    // Reservation buttons                const reserveBtns = document.querySelectorAll('.action-reserve');
    reserveBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.showToast(
          "Clase reservada con éxito. ¡Te esperamos en Iron Forge Gym!",
        );
      });
    });

    // Enrollment buttons
    const enrollBtns = document.querySelectorAll(".action-enroll");
    enrollBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.showToast("Redirigiendo al portal de pagos...");
      });
    });
  },

  /* --------------------------------------------
               Toast Notification System
 -------------------------------------------- */
  showToast(message) {
    const toast = document.getElementById("toastContainer");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    // Clear existing timeout if any (simple approach)
    if (this.toastTimeout) clearTimeout(this.toastTimeout);

    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  },

  /* --------------------------------------------
               Navbar Scroll Effect
 -------------------------------------------- */
  setupScrollNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
      } else {
        navbar.style.boxShadow = "none";
      }
    });
  },
};

// Boot the application
app.init();

/* ---------- Data (translated to English) ---------- */
const musicData = [
  {
    title: "Nocturne in E Major",
    year: "2024",
    img: "/assets/images/music/music/nocturno.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Memories of the South",
    year: "2023",
    img: "/assets/images/music/music/memorias.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Prelude in Blue",
    year: "2022",
    img: "/assets/images/music/music/preludio.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Waltz for Elena",
    year: "2021",
    img: "/assets/images/music/music/vals.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Rain at the Window",
    year: "2020",
    img: "/assets/images/music/music/lluvia.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Lullaby",
    year: "2019",
    img: "/assets/images/music/music/cuna.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Reflections",
    year: "2018",
    img: "/assets/images/music/music/reflejos.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "The Last Goodbye",
    year: "2017",
    img: "/assets/images/music/music/adios.jpg?auto=format&fit=crop&w=600&q=80",
  },
];

const videoData = [
  {
    title: "Nocturne in E Major — Sala Nezahualcóyotl",
    type: "Live Concert 2024",
    thumb: "/assets/images/music/videos/live-nocturno.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "jFbWGBV8kcI",
  },
  {
    title: "Memories of the South — Teatro Colón Recital",
    type: "Live Concert 2024",
    thumb: "/assets/images/music/videos/live-memorias.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "HEFNBpbGg5M",
  },
  {
    title: "Prelude in Blue — Studio Session",
    type: "Studio Recording 2023",
    thumb: "/assets/images/music/videos/live-preludio.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "4Tr0otuiQuU",
  },
  {
    title: "Waltz for Elena — Winter Festival",
    type: "Live Concert 2023",
    thumb: "/assets/images/music/videos/live-vals.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "lTRiuFIWV54",
  },
  {
    title: "Rain at the Window — Cultural Center",
    type: "Live Concert 2022",
    thumb: "/assets/images/music/videos/live-lluvia.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "9B3QQSXbBP0",
  },
  {
    title: "Reflections — Intimate Recital",
    type: "Live Concert 2022",
    thumb: "/assets/images/music/videos/live-reflejos.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "MPE5MfLu2AE",
  },
];

const concertData = [
  {
    day: "28",
    month: "Aug",
    title: "Nocturnes — Solo Recital",
    venue: "Sala Nezahualcóyotl",
    city: "Mexico City, MX",
    time: "20:00",
  },
  {
    day: "14",
    month: "Sep",
    title: "Memories of the South — Album Launch",
    venue: "Teatro Colón",
    city: "Buenos Aires, AR",
    time: "21:00",
  },
  {
    day: "05",
    month: "Oct",
    title: "A Night with Chopin",
    venue: "Palau de la Música",
    city: "Barcelona, ES",
    time: "19:30",
  },
];

const galleryImages = [
  "/assets/images/music/gallery/gallery-01.jpg?auto=format&fit=crop&w=900&q=80",
  "/assets/images/music/gallery/gallery-02.jpg?auto=format&fit=crop&w=600&q=80",
  "/assets/images/music/gallery/gallery-03.jpg?auto=format&fit=crop&w=600&q=80",
  "/assets/images/music/gallery/gallery-04.jpg?auto=format&fit=crop&w=600&q=80",
  "/assets/images/music/gallery/gallery-05.jpg?auto=format&fit=crop&w=600&q=80",
  "/assets/images/music/gallery/gallery-06.jpg?auto=format&fit=crop&w=900&q=80",
  "/assets/images/music/gallery/gallery-07.jpg?auto=format&fit=crop&w=600&q=80",
  "/assets/images/music/gallery/gallery-08.jpg?auto=format&fit=crop&w=600&q=80",
];

/* ---------- Render dynamic sections ---------- */
function renderMusic() {
  const grid = document.getElementById("musicGrid");
  grid.innerHTML = musicData
    .map(
      (m) => `
    <article class="music-card fade-in">
      <div class="music-art">
        <img src="${m.img}" alt="${m.title}" loading="lazy" />
        <button class="play-btn" aria-label="Play ${m.title}"><i class="fas fa-play"></i></button>
      </div>
      <div class="music-info">
        <h3>${m.title}</h3>
        <span class="year">Composed in ${m.year}</span>
      </div>
    </article>
  `,
    )
    .join("");
}

function renderVideos() {
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = videoData
    .map(
      (v, i) => `
    <article class="video-card fade-in" data-yt="${v.ytId}">
      <div class="video-thumb">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy" />
      </div>
      <div class="video-info">
        <h3>${v.title}</h3>
        <span class="event-type">${v.type}</span>
      </div>
    </article>
  `,
    )
    .join("");

  grid.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => openVideoModal(card.dataset.yt));
  });
}

function renderConcerts() {
  const list = document.getElementById("concertList");
  list.innerHTML = concertData
    .map(
      (c) => `
    <div class="concert-item fade-in">
      <div class="concert-date">
        <span class="day">${c.day}</span>
        <span class="month">${c.month}</span>
      </div>
      <div class="concert-details">
        <h3>${c.title}</h3>
        <div class="concert-meta">
          <span><i class="fas fa-map-marker-alt"></i>${c.venue}, ${c.city}</span>
          <span><i class="fas fa-clock"></i>${c.time}</span>
        </div>
      </div>
      <a href="#" class="btn btn-primary btn-sm">Buy Tickets</a>
    </div>
  `,
    )
    .join("");
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = galleryImages
    .map(
      (src, i) => `
    <div class="gallery-item fade-in">
      <img src="${src}" alt="Gallery image ${i + 1}" loading="lazy" />
    </div>
  `,
    )
    .join("");
}

/* ---------- Routing ---------- */
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll("[data-link]");

function navigateTo(pageId) {
  pages.forEach((p) => p.classList.toggle("active", p.id === pageId));
  document.querySelectorAll(".nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.link === pageId);
  });
  window.scrollTo({ top: 0, behavior: "instant" });
  // close mobile menu
  document.getElementById("nav").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
  // re-trigger fade-ins
  setTimeout(initFadeObserver, 50);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.link;
    if (target) {
      history.pushState({ page: target }, "", `#${target}`);
      navigateTo(target);
    }
  });
});

window.addEventListener("popstate", () => {
  const hash = location.hash.replace("#", "") || "home";
  navigateTo(hash);
});

/* ---------- Header scroll ---------- */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

/* ---------- Mobile menu ---------- */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  nav.classList.toggle("open");
});

/* ---------- Fade-in on scroll ---------- */
let fadeObserver;
function initFadeObserver() {
  if (fadeObserver) fadeObserver.disconnect();
  fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  document
    .querySelectorAll(".fade-in:not(.visible)")
    .forEach((el) => fadeObserver.observe(el));
}

/* ---------- Video modal ---------- */
const modal = document.getElementById("videoModal");
const modalIframe = document.getElementById("modalIframe");
const modalClose = document.getElementById("modalClose");

function openVideoModal(ytId) {
  modalIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeVideoModal() {
  modal.classList.remove("active");
  modalIframe.src = "";
  document.body.style.overflow = "";
}
modalClose.addEventListener("click", closeVideoModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeVideoModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideoModal();
});

/* ---------- Contact form ---------- */
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formStatus.className = "form-status error";
    formStatus.textContent = "Please fill in all fields.";
    return;
  }
  if (!emailRe.test(email)) {
    formStatus.className = "form-status error";
    formStatus.textContent = "Please enter a valid email address.";
    return;
  }

  // Simulate sending
  formStatus.className = "form-status success";
  formStatus.textContent =
    "✓ Thank you, " + name + ". Your message has been sent. I'll respond within 48 hours.";
  form.reset();
  setTimeout(() => {
    formStatus.className = "form-status";
    formStatus.textContent = "";
  }, 6000);
});

/* ---------- Init ---------- */
renderMusic();
renderVideos();
renderConcerts();
renderGallery();
initFadeObserver();

// Handle initial hash
const initialHash = location.hash.replace("#", "") || "home";
if (initialHash !== "home") navigateTo(initialHash);
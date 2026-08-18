const headerLinks = document.querySelectorAll(".nav a");
const heroPhoto = document.querySelector(".hero-photo");
const heroImage = heroPhoto?.querySelector("img");

if (heroImage) {
  const markFallback = () => heroPhoto.classList.add("is-fallback");
  heroImage.addEventListener("error", markFallback);
  if (heroImage.complete && heroImage.naturalWidth === 0) markFallback();
}
const sections = document.querySelectorAll("main section[id]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
const languages = document.querySelectorAll(".language");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

headerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      headerLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

const languageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const level = entry.target.dataset.level || "0";
      const bar = entry.target.querySelector(".bar span");
      if (bar) bar.style.width = `${level}%`;
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

languages.forEach((item) => languageObserver.observe(item));

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("is-active", item === button));

    projects.forEach((project) => {
      const categories = project.dataset.category.split(" ");
      const show = selected === "todos" || categories.includes(selected);
      project.classList.toggle("is-hidden", !show);
    });
  });
});

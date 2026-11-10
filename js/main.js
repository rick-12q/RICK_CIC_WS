
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const links = config.links || {};

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================================================
     LINKS EXTERNOS
  ===================================================== */

  function setExternalLink(id, url, options = {}) {
    const element = document.getElementById(id);
    if (!element) return;

    const valid = typeof url === "string" &&
      url.trim() !== "" &&
      !url.includes("COLOCAR_");

    if (!valid) {
      if (options.keepVisible) {
        element.href = "#";
        element.addEventListener("click", event => {
          event.preventDefault();
          alert("Adicione o endereço deste link no arquivo config.js.");
        });
      } else {
        element.remove();
      }
      return;
    }

    element.href = url;

    if (options.external) {
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  }

  setExternalLink("videoLink", links.video, {
    keepVisible: true,
    external: true
  });

  setExternalLink("votingLink", links.voting, {
    external: true
  });

  setExternalLink("labLink", links.laboratory, {
    external: true
  });

  setExternalLink("instagramLink", links.instagram, {
    external: true
  });

  setExternalLink("linkedinLink", links.linkedin, {
    external: true
  });

  setExternalLink("emailLink", links.email);

  /* =====================================================
     TEMA CLARO / ESCURO
  ===================================================== */

  const themeToggle = $("#themeToggle");
  const themeIcon = $("#themeIcon");

  const sunIcon = `
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>
  `;

  const moonIcon = `
    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"></path>
  `;

  function setTheme(theme) {
    const light = theme === "light";

    document.body.classList.toggle("light-theme", light);

    if (themeIcon) {
      themeIcon.innerHTML = light ? moonIcon : sunIcon;
    }

    document.documentElement.style.colorScheme =
      light ? "light" : "dark";

    const metaTheme = $('meta[name="theme-color"]');

    if (metaTheme) {
      metaTheme.content = light ? "#f0f0e9" : "#111310";
    }

    try {
      localStorage.setItem("cic2026-theme", theme);
    } catch (error) {
      // O site continua funcionando sem armazenamento.
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("cic2026-theme") || "dark";
  } catch (error) {
    savedTheme = "dark";
  }

  setTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const current = document.body.classList.contains("light-theme");
    setTheme(current ? "dark" : "light");
  });

  /* =====================================================
     MENU EXPOGLASS / MOBILE
  ===================================================== */

  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");

  function openMenu() {
    if (!mainNav || !menuToggle) return;

    mainNav.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
  }

  function closeMenu() {
    if (!mainNav || !menuToggle) return;

    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $$("#mainNav a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", event => {
    if (
      mainNav &&
      menuToggle &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  /* =====================================================
     REVEAL — ENTRADA DOS ELEMENTOS
  ===================================================== */

  const revealElements = $$(".reveal");

  if (reducedMotion) {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  }

  /* =====================================================
     SCROLL PROGRESS + HEADER
  ===================================================== */

  const progressBar = $("#scrollProgress");
  const header = $("#siteHeader");

  let scrollTicking = false;

  function updateScroll() {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
      ? window.scrollY / scrollHeight
      : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    header?.classList.toggle("scrolled", window.scrollY > 35);

    updateParallax();

    scrollTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;

    window.requestAnimationFrame(updateScroll);
    scrollTicking = true;
  }, { passive: true });

  /* =====================================================
     PARALLAX
  ===================================================== */

  const parallaxElements = $$("[data-parallax]");

  function updateParallax() {
    if (reducedMotion || window.innerWidth < 760) {
      parallaxElements.forEach(element => {
        element.style.setProperty("--parallax-y", "0px");
      });
      return;
    }

    const viewportHeight = window.innerHeight;

    parallaxElements.forEach(element => {
      const speed = Number(element.dataset.parallax) || 0.06;
      const rect = element.getBoundingClientRect();

      if (
        rect.bottom < 0 ||
        rect.top > viewportHeight
      ) return;

      const center = rect.top + rect.height / 2;
      const distance = center - viewportHeight / 2;
      const movement = distance * speed;

      element.style.setProperty(
        "--parallax-y",
        `${movement}px`
      );

      element.style.transform =
        `translate3d(0, ${movement}px, 0)`;
    });
  }

  if (!reducedMotion) {
    updateScroll();

    window.addEventListener("resize", () => {
      updateParallax();
    });
  }

  /* =====================================================
     NAVEGAÇÃO ATIVA
  ===================================================== */

  const sections = $$(
    "#about, #research, #methodology, #results, #collaborators, #contact"
  );

  const navLinks = $$("#mainNav a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          navLinks.forEach(link => {
            const active = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", active);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  /* =====================================================
     MOVIMENTO 3D DOS CARTÕES
  ===================================================== */

  const hoverEnabled = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (!reducedMotion && hoverEnabled) {
    $$(".method-card, .result-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 3;
        const rotateX = (0.5 - y) * 3;

        if (card.classList.contains("method-card")) {
          card.style.transform =
            `translateY(-9px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        card.style.setProperty("--pointer-x", `${x * 100}%`);
        card.style.setProperty("--pointer-y", `${y * 100}%`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("transform");
      });
    });
  }

  /* =====================================================
     MICROINTERAÇÃO DO RETRATO
  ===================================================== */

  const portrait = $(".portrait-frame");

  if (!reducedMotion && hoverEnabled && portrait) {
    portrait.addEventListener("pointermove", event => {
      const rect = portrait.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 3;
      const rotateX = (0.5 - y) * 3;

      portrait.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    portrait.addEventListener("pointerleave", () => {
      portrait.style.removeProperty("transform");
    });
  }

  /* =====================================================
     ANIMAÇÃO DO LETREIRO
  ===================================================== */

  const marquee = $(".top-marquee-track");

  if (marquee && !reducedMotion) {
    marquee.addEventListener("mouseenter", () => {
      marquee.style.animationPlayState = "paused";
    });

    marquee.addEventListener("mouseleave", () => {
      marquee.style.animationPlayState = "running";
    });
  }

  /* =====================================================
     VALIDAÇÃO DAS IMAGENS
  ===================================================== */

  $$("img").forEach(img => {
    img.addEventListener("error", () => {
      console.warn(
        "Imagem não encontrada:",
        img.getAttribute("src")
      );

      img.classList.add("image-load-error");
    });
  });

  /* =====================================================
     INICIALIZAÇÃO
  ===================================================== */

  updateScroll();

  console.info("CIC 2026 — interface inicializada.");
});

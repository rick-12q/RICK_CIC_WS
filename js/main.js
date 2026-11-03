document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const config = window.SITE_CONFIG || {};
    const links = config.links || {};

    /* =====================================================
       LINKS
    ===================================================== */

    function setExternalLink(id, url, options = {}) {
        const element = document.getElementById(id);
        if (!element) return;

        if (url && String(url).trim()) {
            element.href = options.email ? `mailto:${url}` : url;
            element.style.display = "";
            element.removeAttribute("aria-disabled");
        } else if (options.keepVisible) {
            element.href = "#";
            element.addEventListener("click", event => {
                event.preventDefault();
                alert("Adicione o endereço deste link no arquivo config.js.");
            });
        } else {
            element.style.display = "none";
        }
    }

    setExternalLink("videoLink", links.video, { keepVisible: true });
    setExternalLink("votingLink", links.voting);
    setExternalLink("labLink", links.laboratory);
    setExternalLink("instagramLink", links.instagram);
    setExternalLink("linkedinLink", links.linkedin);
    setExternalLink("emailLink", links.email, { email: true });


    /* =====================================================
       TEMA CLARO / ESCURO
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    function setTheme(theme) {
        const isLight = theme === "light";

        document.body.classList.toggle("light-theme", isLight);
        themeIcon.textContent = isLight ? "☾" : "☼";

        document.documentElement.style.colorScheme =
            isLight ? "light" : "dark";

        try {
            localStorage.setItem("cic2026-theme", theme);
        } catch (error) {
            // O site continua funcionando sem armazenamento local.
        }
    }

    let initialTheme = "dark";

    try {
        initialTheme = localStorage.getItem("cic2026-theme") || "dark";
    } catch (error) {
        // Mantém o tema escuro como padrão.
    }

    setTheme(initialTheme);

    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-theme");
        setTheme(isLight ? "dark" : "light");
    });


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    function closeMenu() {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });


    /* =====================================================
       REVEAL — ANIMAÇÕES VINCULADAS À ROLAGEM
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
    const supportsViewTimeline = window.CSS && CSS.supports("animation-timeline: view()");

    // Navegadores sem scroll-driven animations usam IntersectionObserver como fallback.
    if (prefersReducedMotion || !supportsViewTimeline) {
        if ("IntersectionObserver" in window && !prefersReducedMotion) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            });

            revealElements.forEach(element => revealObserver.observe(element));
        } else {
            revealElements.forEach(element => element.classList.add("is-visible"));
        }
    } else {
        document.documentElement.classList.add("has-view-timeline");
    }


    /* =====================================================
       SCROLL PROGRESS + HEADER
    ===================================================== */

    const progressBar = document.getElementById("scrollProgress");
    const header = document.getElementById("siteHeader");

    let scrollTicking = false;

    function updateScrollEffects() {
        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = maxScroll > 0
            ? (window.scrollY / maxScroll) * 100
            : 0;

        progressBar.style.transform = `scaleX(${progress / 100})`;
        header.classList.toggle("scrolled", window.scrollY > 35);

        updateParallax();

        scrollTicking = false;
    }

    window.addEventListener("scroll", () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateScrollEffects);
            scrollTicking = true;
        }
    }, { passive: true });


    /* =====================================================
       PARALLAX — MOVIMENTO CONTÍNUO VINCULADO AO SCROLL
    ===================================================== */

    const parallaxElements = document.querySelectorAll("[data-parallax]");

    function updateParallax() {
        if (prefersReducedMotion || window.innerWidth < 760) {
            parallaxElements.forEach(element => {
                element.style.setProperty("--parallax-y", "0px");
                element.dataset.parallaxCurrent = "0";
            });
            return;
        }

        const viewportHeight = window.innerHeight;

        parallaxElements.forEach(element => {
            const speed = Number(element.dataset.parallax) || 0.08;
            const rect = element.getBoundingClientRect();
            const previousMovement = Number(element.dataset.parallaxCurrent || 0);
            const naturalTop = rect.top - previousMovement;
            const naturalCenter = naturalTop + rect.height / 2;

            if (naturalTop + rect.height < 0 || naturalTop > viewportHeight) return;

            const distanceFromCenter = naturalCenter - viewportHeight / 2;
            const movement = distanceFromCenter * speed;

            element.style.setProperty("--parallax-y", `${movement}px`);
            element.dataset.parallaxCurrent = String(movement);
        });
    }

    updateScrollEffects();


    /* =====================================================
       ACTIVE NAV — INDICA A SEÇÃO VISÍVEL
    ===================================================== */

    const observedSections = document.querySelectorAll(
        "#about, #research, #methodology, #results, #collaborators"
    );

    const navLinks = document.querySelectorAll(".main-nav a");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const sectionId = entry.target.id;

                navLinks.forEach(link => {
                    const active = link.getAttribute("href") === `#${sectionId}`;
                    link.classList.toggle("active", active);
                });
            });
        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        observedSections.forEach(section => sectionObserver.observe(section));
    }


    /* =====================================================
       MICROINTERAÇÃO DE MOVIMENTO NOS CARTÕES
    ===================================================== */

    if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
        document.querySelectorAll(".method-card, .result-card").forEach(card => {
            card.addEventListener("pointermove", event => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                card.style.setProperty("--pointer-x", `${x * 100}%`);
                card.style.setProperty("--pointer-y", `${y * 100}%`);
            });
        });
    }


    /* =====================================================
       IMAGENS — AVISO NO CONSOLE PARA ARQUIVOS AUSENTES
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            console.warn("Imagem não encontrada:", img.getAttribute("src"));
            img.classList.add("image-load-error");
        });
    });


    console.info("CIC 2026 — site inicializado.");
});
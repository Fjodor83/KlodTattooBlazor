(function () {
    'use strict';

    // ============================================================
    // 1. NAVBAR DINAMICA (Transparent → Glass)
    // ============================================================
    function initDynamicNavbar() {
        const navbar = document.querySelector('.navbar[data-dynamic-navbar="true"]');
        if (!navbar) return;

        // Rimuovi eventuali listener precedenti
        if (window._navbarScrollHandler) {
            window.removeEventListener('scroll', window._navbarScrollHandler);
        }

        window._navbarScrollHandler = () => {
            if (window.scrollY > 50) {
                navbar.classList.remove("navbar-transparent");
                navbar.classList.add("navbar-glass");
            } else {
                navbar.classList.add("navbar-transparent");
                navbar.classList.remove("navbar-glass");
            }
        };

        window.addEventListener("scroll", window._navbarScrollHandler, { passive: true });
        window._navbarScrollHandler();
    }

    // ============================================================
    // 2. BACK TO TOP BUTTON
    // ============================================================
    function initBackToTop() {
        let btn = document.getElementById("backToTop");

        if (!btn) {
            btn = document.createElement("button");
            btn.id = "backToTop";
            btn.className = "btn-back-to-top";
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.style.display = "none";
            document.body.appendChild(btn);
        }

        window.addEventListener("scroll", () => {
            btn.style.display = (window.scrollY > 300) ? "flex" : "none";
        }, { passive: true });

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ============================================================
    // 3. ACTIVE NAV LINK
    // ============================================================
    function highlightActiveNavLink() {
        const current = window.location.pathname;
        document.querySelectorAll('.nav-link-custom').forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === current || (current === '/' && href === ''));
        });
    }

    // ============================================================
    // 4. SMOOTH SCROLL
    // ============================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        });
    }

    // ============================================================
    // 5. LAYOUT FIX (Navbar height → padding)
    // ============================================================
    function applyLayoutFix() {
        const navbar = document.querySelector('.navbar');
        const pageContent = document.querySelector('.page-content-wrapper');
        const hero = document.querySelector('.hero-page-wrapper');

        if (!navbar) return;

        const isMobile = window.innerWidth <= 768;
        const height = isMobile ? 70 : 80;

        navbar.style.height = height + "px";
        navbar.style.minHeight = height + "px";

        if (pageContent && !hero) {
            pageContent.style.paddingTop = height + "px";
        }
    }

    // ============================================================
    // 6. INIZIALIZZAZIONE COMPLETA
    // ============================================================
    function initAll() {
        initDynamicNavbar();
        initBackToTop();
        highlightActiveNavLink();
        initSmoothScroll();
        applyLayoutFix();
    }

    // DOM Ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }

    // Re-init dopo navigazione Blazor
    if (typeof Blazor !== "undefined") {
        Blazor.addEventListener("enhancedload", () => {
            setTimeout(initAll, 50);
        });
    }

    // Re-init su resize
    window.addEventListener("resize", () => {
        setTimeout(applyLayoutFix, 150);
    });

})();

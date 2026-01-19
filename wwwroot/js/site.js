// ============================================
// KLOD TATTOO - MAIN JAVASCRIPT
// ============================================

(function () {
    'use strict';

    // ============================================
    // 1. DYNAMIC NAVBAR (Transparent → Glass)
    // ============================================
    function initDynamicNavbar() {
        const navbar = document.querySelector('.navbar[data-dynamic-navbar="true"], .navbar[data-dynamic-navbar="True"]');

        if (!navbar) return;

        // Remove existing listener
        if (window.navbarScrollHandler) {
            window.removeEventListener('scroll', window.navbarScrollHandler);
        }

        // Create scroll handler
        window.navbarScrollHandler = function () {
            if (window.scrollY > 50) {
                navbar.classList.remove("navbar-transparent");
                navbar.classList.add("navbar-glass");
            } else {
                navbar.classList.add("navbar-transparent");
                navbar.classList.remove("navbar-glass");
            }
        };

        window.addEventListener("scroll", window.navbarScrollHandler, { passive: true });
        window.navbarScrollHandler(); // Init state
    }

    // ============================================
    // 2. BACK TO TOP BUTTON
    // ============================================
    function initBackToTop() {
        let backToTopBtn = document.getElementById("backToTop");

        if (!backToTopBtn) {
            // Create button if doesn't exist
            backToTopBtn = document.createElement("button");
            backToTopBtn.id = "backToTop";
            backToTopBtn.className = "btn-back-to-top";
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTopBtn.setAttribute("aria-label", "Back to top");
            backToTopBtn.style.display = "none";
            document.body.appendChild(backToTopBtn);
        }

        // Show/hide on scroll
        window.addEventListener("scroll", function () {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        }, { passive: true });

        // Click handler
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 3. ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    function highlightActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link-custom');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Remove existing active class
            link.classList.remove('active');

            // Add active class to matching link
            if (href === currentPath || (currentPath === '/' && href === '')) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // 4. GLIGHTBOX INITIALIZATION
    // ============================================
    window.initGLightbox = function () {
        if (typeof GLightbox === 'undefined') {
            console.warn('GLightbox not loaded yet');
            return false;
        }

        try {
            const lightbox = GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                closeButton: true,
                zoomable: true,
                draggable: true,
                dragAutoSnap: true,
                preload: true
            });

            console.log('GLightbox initialized successfully');
            return true;
        } catch (error) {
            console.error('GLightbox initialization error:', error);
            return false;
        }
    };

    // ============================================
    // 5. FLATPICKR INITIALIZATION
    // ============================================
    window.initFlatpickr = function (elementId, locale = 'en') {
        if (typeof flatpickr === 'undefined') {
            console.warn('Flatpickr not loaded yet');
            return null;
        }

        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element ${elementId} not found`);
            return null;
        }

        try {
            return flatpickr(element, {
                locale: locale,
                dateFormat: "Y-m-d",
                minDate: "today",
                theme: "dark",
                disableMobile: false,
                time_24hr: true
            });
        } catch (error) {
            console.error('Flatpickr initialization error:', error);
            return null;
        }
    };

    // ============================================
    // 6. LAZY LOADING IMAGES (Legacy support)
    // ============================================
    // Note: Main lazy loading is handled by lazy-load.js
    // This is kept for backward compatibility
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img.lazy:not([data-lazy-handled]), img[loading="lazy"]:not([data-lazy-handled])');

        if (lazyImages.length === 0) return;

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;

                        // Load actual image
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }

                        // Load srcset if exists
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }

                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        img.setAttribute('data-lazy-handled', 'true');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(img => {
                img.setAttribute('data-lazy-handled', 'true');
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                if (img.dataset.src) img.src = img.dataset.src;
                if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                img.setAttribute('data-lazy-handled', 'true');
            });
        }
    }

    // ============================================
    // 7. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // 8. FORM VALIDATION ENHANCEMENT
    // ============================================
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                // Add real-time validation
                input.addEventListener('blur', function () {
                    if (this.validity.valid) {
                        this.classList.remove('invalid');
                        this.classList.add('valid');
                    } else {
                        this.classList.remove('valid');
                        this.classList.add('invalid');
                    }
                });

                // Remove validation classes on input
                input.addEventListener('input', function () {
                    this.classList.remove('valid', 'invalid');
                });
            });
        });
    }

    // ============================================
    // 9. PERFORMANCE OPTIMIZATION
    // ============================================
    function optimizePerformance() {
        // Preload critical resources
        const criticalResources = [
            '/css/site.min.css',
            '/js/site.min.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            link.href = resource;
            document.head.appendChild(link);
        });

        // Defer non-critical CSS
        const deferredStyles = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
        deferredStyles.forEach(style => {
            style.media = 'print';
            style.onload = function () {
                this.media = 'all';
            };
        });
    }

    // ============================================
    // 10. ACCESSIBILITY IMPROVEMENTS
    // ============================================
    function improveAccessibility() {
        // Add skip to main content link
        if (!document.querySelector('.skip-to-main')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-to-main sr-only';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
            skipLink.addEventListener('focus', function () {
                this.style.cssText = `
                position: fixed;
                left: 0;
                top: 0;
                width: auto;
                height: auto;
                background: #d4af37;
                color: #000;
                padding: 10px 20px;
                z-index: 10000;
            `;
            });
            skipLink.addEventListener('blur', function () {
                this.style.cssText = `
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            });
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Add main landmark if missing
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    function initAll() {
        initDynamicNavbar();
        initBackToTop();
        highlightActiveNavLink();
        initLazyLoading();
        initSmoothScroll();
        enhanceFormValidation();
        optimizePerformance();
        improveAccessibility();

        console.log('🎨 Klod Tattoo - All scripts initialized');
    }

    // DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    // Re-init after Blazor navigation
    if (typeof Blazor !== 'undefined') {
        Blazor.addEventListener('enhancedload', function () {
            setTimeout(initAll, 100);
        });
    }

    // MutationObserver for dynamic content
    const observer = new MutationObserver(function (mutations) {
        let shouldReinit = false;

        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                const navbar = document.querySelector('.navbar[data-dynamic-navbar]');
                if (navbar) shouldReinit = true;
            }
        });

        if (shouldReinit) {
            setTimeout(initDynamicNavbar, 50);
        }
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Export for global access
    window.scrollToTop = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Export init functions
    window.klodTattoo = {
        initDynamicNavbar,
        initBackToTop,
        initGLightbox,
        initFlatpickr,
        highlightActiveNavLink
    };

})();

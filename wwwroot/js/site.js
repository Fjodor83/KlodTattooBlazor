// Dynamic Navbar - Transparent to Glass effect on scroll
// This function works with Blazor SPA navigation
function initDynamicNavbar() {
    const navbar = document.querySelector('.navbar[data-dynamic-navbar="true"], .navbar[data-dynamic-navbar="True"]');

    if (navbar) {
        // Remove any existing scroll listener to avoid duplicates
        if (window.navbarScrollHandler) {
            window.removeEventListener('scroll', window.navbarScrollHandler);
        }

        // Create and store the scroll handler
        window.navbarScrollHandler = function () {
            if (window.scrollY > 50) {
                // Scrolled down: Glass effect
                navbar.classList.remove("navbar-transparent");
                navbar.classList.add("navbar-glass");
            } else {
                // At top: Transparent
                navbar.classList.add("navbar-transparent");
                navbar.classList.remove("navbar-glass");
            }
        };

        window.addEventListener("scroll", window.navbarScrollHandler);

        // Trigger once on load to set initial state
        window.navbarScrollHandler();
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initDynamicNavbar);

// Re-initialize after Blazor navigation (for SPA)
if (typeof Blazor !== 'undefined') {
    Blazor.addEventListener('enhancedload', initDynamicNavbar);
}

// Also try after a short delay to catch late-loaded content
setTimeout(initDynamicNavbar, 100);

// MutationObserver to catch navbar when it's added to DOM
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
            const navbar = document.querySelector('.navbar[data-dynamic-navbar="true"], .navbar[data-dynamic-navbar="True"]');
            if (navbar) {
                initDynamicNavbar();
            }
        }
    });
});

// Start observing
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
} else {
    document.addEventListener('DOMContentLoaded', function () {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// Back to Top Button
window.onscroll = function () {
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Active nav link highlighting
document.addEventListener('DOMContentLoaded', function () {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link-custom');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation) {
            link.classList.add('active');
        }
    });
});

// GLightbox initialization (will be called after GLightbox is loaded)
window.initGLightbox = function () {
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            touchNavigation: true,
            loop: true,
            closeButton: true,
            zoomable: true,
        });
        return true;
    }
    return false;
};

// Flatpickr initialization helper (FIXED SYNTAX ERROR)
window.initFlatpickr = function (elementId, locale = 'en') {
    if (typeof flatpickr !== 'undefined') {
        const element = document.getElementById(elementId);
        if (element) {
            return flatpickr(element, {
                locale: locale,
                dateFormat: "Y-m-d",
                minDate: "today",
                theme: "dark"
            });
        }
    }
    return null;
};

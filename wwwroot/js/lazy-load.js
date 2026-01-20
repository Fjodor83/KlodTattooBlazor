// ========================================
// Lazy Loading Images with IntersectionObserver
// ========================================

(function () {
    'use strict';

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        loadAllImages();
        return;
    }

    // Configuration for IntersectionObserver
    const config = {
        // Start loading 200px before image enters viewport
        rootMargin: '200px 0px',
        threshold: 0.01
    };

    // Create observer instance
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, config);

    /**
     * Load a single image
     * @param {HTMLImageElement} img - Image element to load
     */
    function loadImage(img) {
        // Get the actual source from data-src
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (!src) return;

        // Add loading class for transition
        img.classList.add('lazy-loading');

        // Load the image
        const tempImage = new Image();

        tempImage.onload = function () {
            // Set the actual source
            img.src = src;
            if (srcset) img.srcset = srcset;

            // Add loaded class and remove lazy classes
            img.classList.remove('lazy', 'lazy-loading');
            img.classList.add('lazy-loaded');
        };

        tempImage.onerror = function () {
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-error');
        };

        tempImage.src = src;
        if (srcset) tempImage.srcset = srcset;
    }

    /**
     * Fallback: Load all images immediately (for older browsers)
     */
    function loadAllImages() {
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => loadImage(img));
    }

    /**
     * Initialize lazy loading
     */
    function initLazyLoading() {
        // Find all lazy images
        const lazyImages = document.querySelectorAll('img.lazy');

        // Observe each image
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Add dynamic lazy loading support for Blazor SPAs
     * Re-scan for new images after navigation
     */
    function setupBlazorIntegration() {
        // Listen for Blazor navigation events
        if (window.Blazor) {
            // After each navigation, re-initialize lazy loading
            const originalNavigateTo = window.Blazor.navigateTo;
            window.Blazor.navigateTo = function () {
                originalNavigateTo.apply(this, arguments);
                setTimeout(initLazyLoading, 100);
            };
        }

        // Also observe DOM mutations for dynamically added images
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check if the node itself is a lazy image
                        if (node.tagName === 'IMG' && node.classList.contains('lazy')) {
                            imageObserver.observe(node);
                        }
                        // Check for lazy images within the node
                        const lazyImages = node.querySelectorAll('img.lazy');
                        lazyImages.forEach(img => imageObserver.observe(img));
                    }
                });
            });
        });

        // Observe the app container
        const appContainer = document.getElementById('app');
        if (appContainer) {
            mutationObserver.observe(appContainer, {
                childList: true,
                subtree: true
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initLazyLoading();
            setupBlazorIntegration();
        });
    } else {
        // DOM is already loaded
        initLazyLoading();
        setupBlazorIntegration();
    }

    // NOTE: Blazor auto-starts, no need to call Blazor.start()
    // Removed to prevent "Blazor has already started" error

})();

// ========================================
// CSS for Lazy Loading Effects
// ========================================
// Add this to your app.css or create inline styles:
/*
img.lazy {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

img.lazy-loading {
    opacity: 0.5;
    filter: blur(5px);
}

img.lazy-loaded {
    opacity: 1;
    filter: blur(0);
}

img.lazy-error {
    opacity: 0.3;
    border: 2px solid #dc3545;
}
*/

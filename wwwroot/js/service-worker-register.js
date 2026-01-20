// ========================================
// Service Worker Registration
// ========================================

(function () {
    'use strict';

    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            registerServiceWorker();
        });
    } else {
    }

    /**
     * Register the service worker
     */
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
            });

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {

                        // Optional: Show update notification to user
                        showUpdateNotification(newWorker);
                    }
                });
            });

            // Check for updates every hour
            setInterval(() => {
                registration.update();
            }, 60 * 60 * 1000);

        } catch (error) {
        }
    }

    /**
     * Show update notification to user (optional)
     */
    function showUpdateNotification(worker) {
        // You can implement a custom UI here

        // Auto-refresh after 5 seconds (optional)
        // setTimeout(() => {
        //     worker.postMessage({ type: 'SKIP_WAITING' });
        //     window.location.reload();
        // }, 5000);
    }

    /**
     * Listen for messages from service worker
     */
    if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
            }
        });
    }

})();

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
        console.warn('Service Workers are not supported in this browser');
    }

    /**
     * Register the service worker
     */
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
            });

            console.log('✅ Service Worker registered successfully');
            console.log('   Scope:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('🔄 Service Worker update found');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        console.log('✨ New content available; please refresh.');

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
            console.error('❌ Service Worker registration failed:', error);
        }
    }

    /**
     * Show update notification to user (optional)
     */
    function showUpdateNotification(worker) {
        // You can implement a custom UI here
        // For now, we'll just log it
        console.log('New version available. Refresh to update.');

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
                console.log('Update available:', event.data.message);
            }
        });
    }

})();

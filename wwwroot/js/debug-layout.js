// ========================================
// SCRIPT DIAGNOSTICO LAYOUT
// Aggiungi questo a wwwroot/js/debug-layout.js
// ========================================

(function () {
    'use strict';

    console.log('🔍 LAYOUT DIAGNOSTIC STARTED');
    console.log('='.repeat(50));

    function diagnoseLayout() {
        // 1. Check Navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const navbarHeight = navbar.offsetHeight;
            const navbarComputedHeight = window.getComputedStyle(navbar).height;
            const navbarPosition = window.getComputedStyle(navbar).position;

            console.log('📊 NAVBAR INFO:');
            console.log('  - Actual Height (offsetHeight):', navbarHeight + 'px');
            console.log('  - Computed Height:', navbarComputedHeight);
            console.log('  - Position:', navbarPosition);
            console.log('  - Top:', window.getComputedStyle(navbar).top);
            console.log('  - Classes:', navbar.className);
        } else {
            console.error('❌ NAVBAR NOT FOUND!');
        }

        // 2. Check Main Content
        const mainContent = document.querySelector('.page-content-wrapper');
        if (mainContent) {
            const paddingTop = window.getComputedStyle(mainContent).paddingTop;
            const marginTop = window.getComputedStyle(mainContent).marginTop;

            console.log('\n📊 MAIN CONTENT INFO:');
            console.log('  - Padding Top:', paddingTop);
            console.log('  - Margin Top:', marginTop);
            console.log('  - Classes:', mainContent.className);
        } else {
            console.log('\n⚠️ page-content-wrapper NOT FOUND');
        }

        // 3. Check Hero (if exists)
        const hero = document.querySelector('.hero-page-wrapper');
        if (hero) {
            const paddingTop = window.getComputedStyle(hero).paddingTop;
            console.log('\n📊 HERO INFO:');
            console.log('  - Padding Top:', paddingTop);
            console.log('  - Classes:', hero.className);
        }

        // 4. Check Main element
        const main = document.querySelector('main');
        if (main) {
            const paddingTop = window.getComputedStyle(main).paddingTop;
            const marginTop = window.getComputedStyle(main).marginTop;

            console.log('\n📊 MAIN ELEMENT INFO:');
            console.log('  - Padding Top:', paddingTop);
            console.log('  - Margin Top:', marginTop);
            console.log('  - Classes:', main.className);
        }

        // 5. Check CSS Files Loaded
        console.log('\n📄 CSS FILES LOADED:');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach((sheet, index) => {
            console.log(`  ${index + 1}. ${sheet.href}`);
        });

        // 6. Check if styles are applied
        console.log('\n🎨 APPLIED STYLES CHECK:');
        if (navbar) {
            const allStyles = window.getComputedStyle(navbar);
            console.log('  - Navbar background:', allStyles.backgroundColor);
            console.log('  - Navbar z-index:', allStyles.zIndex);
        }

        // 7. Viewport info
        console.log('\n📱 VIEWPORT INFO:');
        console.log('  - Window Width:', window.innerWidth + 'px');
        console.log('  - Window Height:', window.innerHeight + 'px');
        console.log('  - Zoom Level:', Math.round(window.devicePixelRatio * 100) + '%');

        // 8. Check for conflicting styles
        console.log('\n⚠️ POTENTIAL CONFLICTS:');
        const bodyStyles = window.getComputedStyle(document.body);
        console.log('  - Body margin-top:', bodyStyles.marginTop);
        console.log('  - Body padding-top:', bodyStyles.paddingTop);

        console.log('\n' + '='.repeat(50));
        console.log('✅ DIAGNOSTIC COMPLETE - Check values above');
        console.log('Expected: Navbar height should match content padding-top');

        // Visual indicator
        if (navbar && mainContent) {
            const navHeight = navbar.offsetHeight;
            const contentPadding = parseInt(window.getComputedStyle(mainContent).paddingTop);
            const difference = Math.abs(navHeight - contentPadding);

            console.log('\n🎯 ALIGNMENT CHECK:');
            console.log('  - Navbar Height:', navHeight + 'px');
            console.log('  - Content Padding:', contentPadding + 'px');
            console.log('  - Difference:', difference + 'px');

            if (difference > 5) {
                console.error('  ❌ MISALIGNMENT DETECTED! Gap of ' + difference + 'px');
            } else {
                console.log('  ✅ ALIGNMENT OK');
            }
        }
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', diagnoseLayout);
    } else {
        diagnoseLayout();
    }

    // Run on resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            console.clear();
            diagnoseLayout();
        }, 250);
    });

    // Make it available globally for manual runs
    window.diagnoseLayout = diagnoseLayout;

})();

// ========================================
// HOW TO USE:
// 1. Add this file to wwwroot/js/debug-layout.js
// 2. Add to index.html: <script src="js/debug-layout.js"></script>
// 3. Open browser console (F12)
// 4. Check the diagnostic output
// 5. Or run manually: diagnoseLayout()
// ========================================
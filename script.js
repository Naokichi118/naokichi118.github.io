// Language switching functionality
(function() {
    'use strict';

    // Get DOM elements
    const languageOptions = document.querySelectorAll('.language-option');
    const body = document.body;
    const currentYearElement = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Get saved language preference or default to English
    function getLanguagePreference() {
        for (const key of ['language', 'preferred-language']) {
            try {
                const lang = localStorage.getItem(key);
                if (lang === 'en' || lang === 'ja') return lang;
            } catch (_) {
                // Storage may be unavailable; switching still works in this page.
            }
        }
        return 'en';
    }

    // Save language preference
    function setLanguagePreference(lang) {
        if (lang !== 'en' && lang !== 'ja') return;
        for (const key of ['preferred-language', 'language']) {
            try {
                localStorage.setItem(key, lang);
            } catch (_) {
                // Keep the selected language even when it cannot be persisted.
            }
        }
    }

    // Update the page language
    function updateLanguage(lang) {
        if (lang !== 'en' && lang !== 'ja') lang = 'en';
        body.setAttribute('data-lang', lang);
        document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
        languageOptions.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === lang)));
    }

    // Initialize page with saved or default language
    function initializeLanguage() {
        const savedLang = getLanguagePreference();
        updateLanguage(savedLang);
    }

    // Set paper numbering from bottom to top (bottom = 1)
    function initializePaperOrder() {
        const paperSelectors = ['.preprint-card', '.published-card'];

        paperSelectors.forEach((selector) => {
            const cards = document.querySelectorAll(selector);
            const total = cards.length;

            cards.forEach((card, index) => {
                card.setAttribute('data-order', String(total - index));
            });
        });
    }

    languageOptions.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.language;
            updateLanguage(lang);
            setLanguagePreference(lang);
        });
    });

    // Initialize on page load
    initializeLanguage();
    initializePaperOrder();
})();

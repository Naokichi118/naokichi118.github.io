// Language switching functionality
(function() {
    'use strict';

    // Get DOM elements
    const languageSwitch = document.querySelector('.language-switch');
    const body = document.body;
    const currentYearElement = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Get saved language preference or default to English
    function getLanguagePreference() {
        return localStorage.getItem('language') || localStorage.getItem('preferred-language') || 'en';
    }

    // Save language preference
    function setLanguagePreference(lang) {
        localStorage.setItem('preferred-language', lang);
        localStorage.setItem('language', lang);
    }

    // Update the page language
    function updateLanguage(lang) {
        body.setAttribute('data-lang', lang);
        document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
        if (languageSwitch) languageSwitch.setAttribute('aria-checked', String(lang === 'ja'));
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

    if (languageSwitch) {
        languageSwitch.addEventListener('click', () => {
            const lang = body.getAttribute('data-lang') === 'ja' ? 'en' : 'ja';
            updateLanguage(lang);
            setLanguagePreference(lang);
        });
    }

    // Initialize on page load
    initializeLanguage();
    initializePaperOrder();
})();

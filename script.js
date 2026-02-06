// Language switching functionality
(function() {
    'use strict';

    // Get DOM elements
    const languageToggle = document.getElementById('language-toggle');
    const body = document.body;
    const currentYearElement = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Get saved language preference or default to English
    function getLanguagePreference() {
        return localStorage.getItem('preferred-language') || 'en';
    }

    // Save language preference
    function setLanguagePreference(lang) {
        localStorage.setItem('preferred-language', lang);
    }

    // Update the page language
    function updateLanguage(lang) {
        body.setAttribute('data-lang', lang);
        document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
    }

    // Toggle between languages
    function toggleLanguage() {
        const currentLang = body.getAttribute('data-lang');
        const newLang = currentLang === 'en' ? 'ja' : 'en';
        updateLanguage(newLang);
        setLanguagePreference(newLang);
    }

    // Initialize page with saved or default language
    function initializeLanguage() {
        const savedLang = getLanguagePreference();
        updateLanguage(savedLang);
    }

    // Event listener for language toggle button
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }

    // Initialize on page load
    initializeLanguage();
})();

// script.js - Minimal, no external dependencies
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Obfuscate email to prevent scraping
    const emailParts = ['suvashish991', 'gmail.com'];
    const email = emailParts[0] + '@' + emailParts[1];
    document.getElementById('email').textContent = email;

    // Copy email to clipboard
    document.getElementById('copyEmail') ? .addEventListener('click', async() => {
        try {
            await navigator.clipboard.writeText(email);
            const btn = document.getElementById('copyEmail');
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = original, 2000);
        } catch (err) {
            console.warn('Clipboard copy failed:', err);
        }
    });
});
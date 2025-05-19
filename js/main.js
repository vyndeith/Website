/**
 * main.js
 * Główny plik JavaScript dla strony CyberSecurity Insights
 * Zawiera implementację przełącznika trybu jasny/ciemny oraz akordeonu
 */

// Przełącznik trybu jasny/ciemny
document.addEventListener('DOMContentLoaded', function() {
    // Pobranie elementów DOM
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Sprawdzenie zapisanego trybu w localStorage
    const savedTheme = localStorage.getItem('theme');

    // Zastosowanie zapisanego trybu lub domyślnego (jasnego)
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Obsługa kliknięcia w przycisk przełącznika
    themeToggle.addEventListener('click', function() {
        // Przełączanie klas trybów
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        // Przełączanie ikony
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');

        // Zapisanie wybranego trybu w localStorage
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
});

// Implementacja akordeonu
document.addEventListener('DOMContentLoaded', function() {
    // Pobranie wszystkich nagłówków akordeonu
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Dodanie obsługi kliknięcia dla każdego nagłówka
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Pobranie rodzica (elementu akordeonu)
            const accordionItem = this.parentElement;

            // Przełączanie klasy active
            accordionItem.classList.toggle('active');

            // Płynne rozwijanie/zwijanie treści
            const content = this.nextElementSibling;

            // Jeśli element jest aktywny, rozwijamy go
            if (accordionItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                // W przeciwnym razie zwijamy
                content.style.maxHeight = 0;
            }
        });
    });

    // Opcjonalnie: Otwarcie pierwszego elementu akordeonu na starcie
    if (accordionHeaders.length > 0) {
        const firstItem = accordionHeaders[0].parentElement;
        firstItem.classList.add('active');
        const firstContent = accordionHeaders[0].nextElementSibling;
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
});
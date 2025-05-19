/**
 * gallery.js
 * Obsługa galerii zdjęć z podglądem dla strony CyberSecurity Insights
 */

// Zmienne globalne dla galerii
let currentImageIndex = 0;
const images = []; // Tablica obiektów z informacjami o obrazach
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');

// Inicjalizacja galerii po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    // Pobranie wszystkich elementów galerii
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Wypełnienie tablicy images informacjami o obrazach
    galleryItems.forEach((img, index) => {
        images.push({
            src: img.src,
            alt: img.alt
        });
    });

    // Dodanie nasłuchiwania klawiatury dla galerii
    document.addEventListener('keydown', handleKeyPress);
});

/**
 * Otwiera modal z wybranym obrazem
 * @param {number} index - Indeks obrazu w tablicy images
 */
function openModal(index) {
    modal.style.display = 'block';
    currentImageIndex = index;
    updateModalImage();
}

/**
 * Zamyka modal galerii
 */
function closeModal() {
    modal.style.display = 'none';
}

/**
 * Zmienia wyświetlany obraz w modalnym oknie
 * @param {number} step - Kierunek zmiany (-1 dla poprzedniego, 1 dla następnego)
 */
function changeImage(step) {
    currentImageIndex += step;

    // Zapętlenie galerii
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    updateModalImage();
}

/**
 * Aktualizuje zawartość modalnego okna na podstawie bieżącego indeksu obrazu
 */
function updateModalImage() {
    const currentImage = images[currentImageIndex];
    modalImg.src = currentImage.src;
    captionText.innerHTML = currentImage.alt;
}

/**
 * Obsługuje nawigację po galerii za pomocą klawiszy
 * @param {KeyboardEvent} event - Zdarzenie naciśnięcia klawisza
 */
function handleKeyPress(event) {
    // Sprawdzenie czy modal jest otwarty
    if (modal.style.display === 'block') {
        switch (event.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                changeImage(-1);
                break;
            case 'ArrowRight':
                changeImage(1);
                break;
        }
    }
}

// Obsługa kliknięcia poza obrazem w modalu - zamknięcie galerii
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});
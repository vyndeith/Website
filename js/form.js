/**
 * form.js
 * Obsługa walidacji formularza kontaktowego dla strony CyberSecurity Insights
 * Szczególny nacisk na walidację emaila przy użyciu regex oraz walidację w czasie rzeczywistym
 */

document.addEventListener('DOMContentLoaded', () => {
    // Pobranie elementów formularza
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('form-success');

    // Funkcja walidująca imię
    function validateName() {
        const name = nameInput.value.trim();
        const nameRegex = /^[A-Za-z\s]{2,}$/;
        if (!name) {
            nameError.textContent = 'Imię jest wymagane.';
            return false;
        } else if (!nameRegex.test(name)) {
            nameError.textContent = 'Imię może zawierać tylko litery i spacje (min. 2 znaki).';
            return false;
        }
        nameError.textContent = '';
        return true;
    }

    // Funkcja walidująca email z dokładnym regex
    function validateEmail() {
        const email = emailInput.value.trim();
        // Regex dla walidacji emaila: obsługuje większość standardowych formatów
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!email) {
            emailError.textContent = 'Email jest wymagany.';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Podaj poprawny adres email (np. user@domain.com).';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    // Funkcja walidująca wiadomość
    function validateMessage() {
        const message = messageInput.value.trim();
        if (!message) {
            messageError.textContent = 'Wiadomość jest wymagana.';
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Wiadomość musi mieć co najmniej 10 znaków.';
            return false;
        }
        messageError.textContent = '';
        return true;
    }

    // Obsługa submit formularza
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Zapobiega domyślnemu wysyłaniu formularza

        // Walidacja wszystkich pól
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            // Symulacja wysyłania formularza
            successMessage.style.display = 'block';
            form.reset(); // Resetowanie formularza
            // Ukrycie komunikatu po 3 sekundach
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            // Dodatkowe podświetlenie błędu emaila
            if (!isEmailValid) {
                emailInput.focus();
            }
        }
    });

    // Walidacja w czasie rzeczywistym
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
});
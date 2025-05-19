/**
 * quiz.js
 * Obsługa quizu dla strony CyberSecurity Insights
 * Zawiera logikę wyświetlania pytań, walidacji odpowiedzi i podsumowania wyników
 */

document.addEventListener('DOMContentLoaded', () => {
            // Lista pytań quizu
            const questions = [{
                    question: "Co to jest Reverse Engineering?",
                    options: [
                        "Tworzenie oprogramowania od podstaw",
                        "Analiza kodu źródłowego w celu zrozumienia jego działania",
                        "Testowanie aplikacji webowych",
                        "Szyfrowanie danych"
                    ],
                    correct: 1
                },
                {
                    question: "Jakie narzędzie jest najczęściej używane do skanowania portów w pentestingu?",
                    options: ["Metasploit", "Nmap", "Wireshark", "Burp Suite"],
                    correct: 1
                },
                {
                    question: "Czym jest Bug Bounty Hunting?",
                    options: [
                        "Tworzenie złośliwego oprogramowania",
                        "Zgłaszanie luk w zabezpieczeniach za nagrody",
                        "Skanowanie sieci",
                        "Analiza logów systemowych"
                    ],
                    correct: 1
                },
                {
                    question: "Które z poniższych jest techniką Reverse Engineering?",
                    options: ["Phishing", "Deasemblacja", "SQL Injection", "DDoS"],
                    correct: 1
                },
                {
                    question: "Co to jest OSINT w pentestingu?",
                    options: [
                        "Oprogramowanie do szyfrowania",
                        "Zbieranie publicznie dostępnych informacji",
                        "Atak siłowy na hasła",
                        "Wstrzykiwanie kodu"
                    ],
                    correct: 1
                },
                {
                    question: "Jak nazywa się platforma Bug Bounty z największą liczbą programów?",
                    options: ["Bugcrowd", "Intigriti", "HackerOne", "Synack"],
                    correct: 2
                },
                {
                    question: "Które narzędzie służy do analizy pakietów sieciowych?",
                    options: ["Nmap", "Wireshark", "Hashcat", "OWASP ZAP"],
                    correct: 1
                },
                {
                    question: "Co to jest eskalacja uprawnień w pentestingu?",
                    options: [
                        "Zmiana hasła użytkownika",
                        "Uzyskanie wyższych uprawnień w systemie",
                        "Skanowanie portów",
                        "Tworzenie kopii zapasowej"
                    ],
                    correct: 1
                },
                {
                    question: "Jakie narzędzie Reverse Engineering służy do debugowania?",
                    options: ["Ghidra", "IDA Pro", "Radare2", "Wszystkie powyższe"],
                    correct: 3
                },
                {
                    question: "Co to jest atak Phishing?",
                    options: [
                        "Wyłudzanie danych poprzez fałszywe wiadomości",
                        "Wstrzykiwanie kodu SQL",
                        "Przeciążenie serwera",
                        "Analiza kodu binarnego"
                    ],
                    correct: 0
                },
                {
                    question: "Które narzędzie służy do testowania aplikacji webowych?",
                    options: ["Metasploit", "Burp Suite", "Nmap", "Nessus"],
                    correct: 1
                },
                {
                    question: "Co to jest Zero-day exploit?",
                    options: [
                        "Atak na znaną lukę",
                        "Wykorzystanie nieznanej luki",
                        "Skanowanie sieci",
                        "Tworzenie backdoora"
                    ],
                    correct: 1
                },
                {
                    question: "Jak nazywa się proces przemieszczania się w sieci po uzyskaniu dostępu?",
                    options: ["Lateral movement", "Backdooring", "Enumeration", "Exfiltration"],
                    correct: 0
                },
                {
                    question: "Które narzędzie Reverse Engineering jest open-source?",
                    options: ["IDA Pro", "Ghidra", "Binary Ninja", "Hopper"],
                    correct: 1
                },
                {
                    question: "Co to jest zasada minimalnej inwazyjności w cyberbezpieczeństwie?",
                    options: [
                        "Używanie tylko niezbędnych technik podczas testów",
                        "Atakowanie bez zgody właściciela",
                        "Publiczne ujawnianie luk",
                        "Ignorowanie raportowania"
                    ],
                    correct: 0
                }
            ];

            // Zmienne globalne
            let currentQuestion = 0;
            let score = 0;
            let userAnswers = new Array(questions.length).fill(null);
            const quizContainer = document.getElementById('quiz-container');
            const prevButton = document.getElementById('prev-question');
            const nextButton = document.getElementById('next-question');
            const submitButton = document.getElementById('submit-quiz');
            const resultContainer = document.getElementById('quiz-result');
            const scoreDisplay = document.getElementById('score');
            const resultTable = document.getElementById('result-table');

            // Funkcja renderująca pytanie
            function renderQuestion() {
                const q = questions[currentQuestion];
                quizContainer.innerHTML = `
            <h3>Pytanie ${currentQuestion + 1}: ${q.question}</h3>
            <ul class="quiz-options">
                ${q.options.map((option, index) => `
                    <li>
                        <input type="radio" name="answer" value="${index}" id="option${index}" ${userAnswers[currentQuestion] === index ? 'checked' : ''}>
                        <label for="option${index}">${option}</label>
                    </li>
                `).join('')}
            </ul>
        `;
        prevButton.disabled = currentQuestion === 0;
        nextButton.style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
        submitButton.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
    }

    // Funkcja obsługująca wybór odpowiedzi
    function saveAnswer() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (selected) {
            userAnswers[currentQuestion] = parseInt(selected.value);
        }
    }

    // Obsługa przycisku "Poprzednie"
    prevButton.addEventListener('click', () => {
        saveAnswer();
        currentQuestion--;
        renderQuestion();
    });

    // Obsługa przycisku "Następne"
    nextButton.addEventListener('click', () => {
        saveAnswer();
        currentQuestion++;
        renderQuestion();
    });

    // Obsługa przycisku "Zakończ quiz"
    submitButton.addEventListener('click', () => {
        saveAnswer();
        score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].correct) {
                score++;
            }
        });
        quizContainer.style.display = 'none';
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        submitButton.style.display = 'none';
        resultContainer.style.display = 'block';
        scoreDisplay.textContent = `Twój wynik: ${score} z ${questions.length} (${(score / questions.length * 100).toFixed(2)}%)`;
        resultTable.innerHTML = questions.map((q, index) => `
            <tr>
                <td>${q.question}</td>
                <td>${userAnswers[index] !== null ? q.options[userAnswers[index]] : 'Brak odpowiedzi'}</td>
                <td>${q.options[q.correct]}</td>
                <td>${userAnswers[index] === q.correct ? 'Poprawna' : 'Niepoprawna'}</td>
            </tr>
        `).join('');
    });

    // Inicjalizacja quizu
    renderQuestion();
});
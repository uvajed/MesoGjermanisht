// ========================================
// Mëso Gjermanisht - Interactive Learning Platform
// JavaScript functionality for tabs, sections, and quizzes
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTabs();
    initializeSectionNavigation();
    initializeQuizzes();
    updateProgress();
});

// ===== Tab Navigation =====
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const levelContents = document.querySelectorAll('.level-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.dataset.level;

            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show corresponding content
            levelContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === level) {
                    content.classList.add('active');
                }
            });

            // Reset section navigation for the new level
            resetSectionNavigation(level);
        });
    });
}

// ===== Section Navigation =====
function initializeSectionNavigation() {
    const sectionNavs = document.querySelectorAll('.section-nav');

    sectionNavs.forEach(nav => {
        const buttons = nav.querySelectorAll('.section-btn');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.dataset.section;
                const parentLevel = nav.closest('.level-content');

                // Update active button
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Show corresponding section
                const sections = parentLevel.querySelectorAll('.section-content');
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === sectionId) {
                        section.classList.add('active');
                    }
                });
            });
        });
    });
}

function resetSectionNavigation(level) {
    const levelContent = document.getElementById(level);
    if (levelContent) {
        const buttons = levelContent.querySelectorAll('.section-btn');
        const sections = levelContent.querySelectorAll('.section-content');

        // Reset to first section
        buttons.forEach((btn, index) => {
            btn.classList.toggle('active', index === 0);
        });

        sections.forEach((section, index) => {
            section.classList.toggle('active', index === 0);
        });
    }
}

// ===== Quiz System =====
const quizData = {
    a1: [
        {
            question: "Si thuhet 'Mirëmëngjes' në gjermanisht?",
            options: ["Guten Abend", "Guten Morgen", "Guten Tag", "Gute Nacht"],
            correct: 1,
            explanation: "'Guten Morgen' do të thotë 'Mirëmëngjes'."
        },
        {
            question: "Cila nyje përdoret për emrat femërorë?",
            options: ["der", "die", "das", "den"],
            correct: 1,
            explanation: "'die' përdoret për emrat femërorë (p.sh. die Frau)."
        },
        {
            question: "Si konjugohet folja 'sein' për 'ich'?",
            options: ["bist", "ist", "bin", "sind"],
            correct: 2,
            explanation: "'ich bin' = 'unë jam'"
        },
        {
            question: "Si thuhet numri 7 në gjermanisht?",
            options: ["sechs", "sieben", "acht", "neun"],
            correct: 1,
            explanation: "'sieben' = shtatë"
        },
        {
            question: "Çfarë do të thotë 'die Mutter'?",
            options: ["babai", "motra", "nëna", "gjyshja"],
            correct: 2,
            explanation: "'die Mutter' = nëna"
        },
        {
            question: "Si thuhet 'blu' në gjermanisht?",
            options: ["rot", "grün", "blau", "gelb"],
            correct: 2,
            explanation: "'blau' = blu"
        },
        {
            question: "Plotëso: 'Ich ___ Student.' (Unë jam student)",
            options: ["bist", "ist", "bin", "sind"],
            correct: 2,
            explanation: "'Ich bin' = Unë jam"
        },
        {
            question: "Si thuhet 'Mirupafshim' në gjermanisht?",
            options: ["Hallo", "Tschüss", "Danke", "Bitte"],
            correct: 1,
            explanation: "'Tschüss' ose 'Auf Wiedersehen' = Mirupafshim"
        },
        {
            question: "Cila nyje përdoret për 'Kind' (fëmijë)?",
            options: ["der", "die", "das", "den"],
            correct: 2,
            explanation: "'das Kind' - Kind është asnjëanës."
        },
        {
            question: "Si konjugohet 'haben' për 'du'?",
            options: ["habe", "hast", "hat", "haben"],
            correct: 1,
            explanation: "'du hast' = ti ke"
        }
    ],
    a2: [
        {
            question: "Cila është forma e saktë e Akkusativ për 'der Mann'?",
            options: ["der Mann", "den Mann", "dem Mann", "des Mannes"],
            correct: 1,
            explanation: "Në Akkusativ, 'der' bëhet 'den' për mashkulloret."
        },
        {
            question: "Plotëso me Perfekt: 'Ich ___ Deutsch ___.' (Mësova gjermanisht)",
            options: ["bin gelernt", "habe gelernt", "habe gelearnt", "bin gelarnt"],
            correct: 1,
            explanation: "'lernen' formon Perfekt me 'haben': habe gelernt"
        },
        {
            question: "Cila folje modale shpreh 'mund'?",
            options: ["müssen", "können", "sollen", "wollen"],
            correct: 1,
            explanation: "'können' = mund (aftësi)"
        },
        {
            question: "Si thuhet 'treni' në gjermanisht?",
            options: ["das Auto", "der Bus", "der Zug", "das Flugzeug"],
            correct: 2,
            explanation: "'der Zug' = treni"
        },
        {
            question: "Plotëso: 'Ich gebe ___ Frau das Buch.' (Dativ)",
            options: ["die", "der", "den", "dem"],
            correct: 1,
            explanation: "Në Dativ, 'die' (femërore) bëhet 'der'."
        },
        {
            question: "Si formohet Perfekt i 'fahren'?",
            options: ["habe gefahrt", "bin gefahren", "habe gefahren", "bin gefahrt"],
            correct: 1,
            explanation: "'fahren' (lëvizje) formon Perfekt me 'sein': bin gefahren"
        },
        {
            question: "Çfarë do të thotë 'müssen'?",
            options: ["mund", "dua", "duhet", "lejohet"],
            correct: 2,
            explanation: "'müssen' = duhet (detyrim)"
        },
        {
            question: "Si thuhet 'mëngjesi' në gjermanisht?",
            options: ["das Mittagessen", "das Abendessen", "das Frühstück", "die Mahlzeit"],
            correct: 2,
            explanation: "'das Frühstück' = mëngjesi"
        },
        {
            question: "Cila fjali është e saktë?",
            options: ["Ich möchte ein Kaffee.", "Ich möchte einen Kaffee.", "Ich möchte einer Kaffee.", "Ich möchte einem Kaffee."],
            correct: 1,
            explanation: "'Kaffee' është mashkullor, në Akkusativ: 'einen Kaffee'"
        },
        {
            question: "Si thuhet 'mjeku' në gjermanisht?",
            options: ["der Lehrer", "der Arzt", "der Kellner", "der Koch"],
            correct: 1,
            explanation: "'der Arzt' = mjeku"
        }
    ],
    b1: [
        {
            question: "Cila është forma Genitiv për 'der Mann'?",
            options: ["dem Mann", "den Mann", "des Mannes", "der Männer"],
            correct: 2,
            explanation: "Në Genitiv mashkullor: 'des' + emri + '-(e)s'"
        },
        {
            question: "Si formohet Passiv Präsens?",
            options: ["haben + Partizip II", "werden + Partizip II", "sein + Partizip II", "werden + Infinitiv"],
            correct: 1,
            explanation: "Passiv = werden + Partizip II"
        },
        {
            question: "Cila është forma Konjunktiv II e 'sein' për 'ich'?",
            options: ["bin", "sei", "wäre", "würde sein"],
            correct: 2,
            explanation: "'ich wäre' = do të isha (Konjunktiv II)"
        },
        {
            question: "Plotëso: 'Der Mann, ___ dort steht, ist mein Lehrer.'",
            options: ["das", "die", "der", "den"],
            correct: 2,
            explanation: "Përemri relativ për mashkullore Nominativ: 'der'"
        },
        {
            question: "Cili konnektor shpreh shkak?",
            options: ["obwohl", "weil", "wenn", "damit"],
            correct: 1,
            explanation: "'weil' = sepse (shkak)"
        },
        {
            question: "Plotëso: 'Wenn ich Zeit ___, ___ ich reisen.'",
            options: ["habe, werde", "hätte, würde", "hatte, würde", "habe, würde"],
            correct: 1,
            explanation: "Konjunktiv II: hätte... würde (situatë hipotetike)"
        },
        {
            question: "Si thuhet 'ndryshimet klimatike' në gjermanisht?",
            options: ["die Umwelt", "der Klimawandel", "die Nachhaltigkeit", "die Arbeitslosigkeit"],
            correct: 1,
            explanation: "'der Klimawandel' = ndryshimet klimatike"
        },
        {
            question: "Cila fjali është Passiv?",
            options: ["Ich koche das Essen.", "Das Essen wird gekocht.", "Ich habe gekocht.", "Das Essen ist gut."],
            correct: 1,
            explanation: "'wird gekocht' = gatuhet (Passiv)"
        },
        {
            question: "Plotëso: 'Meiner Meinung ___ ist das richtig.'",
            options: ["zu", "für", "nach", "von"],
            correct: 2,
            explanation: "'Meiner Meinung nach' = sipas mendimit tim"
        },
        {
            question: "Cila është forma Konjunktiv II e 'können' për 'Sie'?",
            options: ["können", "konnten", "könnten", "gekonnt"],
            correct: 2,
            explanation: "'Sie könnten' = Ju do të mundeshe (Konjunktiv II)"
        }
    ]
};

const quizState = {
    a1: { currentQuestion: 0, score: 0, answered: false },
    a2: { currentQuestion: 0, score: 0, answered: false },
    b1: { currentQuestion: 0, score: 0, answered: false }
};

function initializeQuizzes() {
    ['a1', 'a2', 'b1'].forEach(level => {
        loadQuestion(level);
        setupQuizControls(level);
    });
}

function loadQuestion(level) {
    const state = quizState[level];
    const questions = quizData[level];

    if (state.currentQuestion >= questions.length) {
        showResults(level);
        return;
    }

    const question = questions[state.currentQuestion];

    // Update UI
    document.getElementById(`${level}-question`).textContent = question.question;
    document.getElementById(`${level}-question-num`).textContent = state.currentQuestion + 1;
    document.getElementById(`${level}-score`).textContent = state.score;

    // Create options
    const optionsContainer = document.getElementById(`${level}-options`);
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'quiz-option';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => handleAnswer(level, index));
        optionsContainer.appendChild(optionBtn);
    });

    // Reset state
    state.answered = false;
    document.getElementById(`${level}-feedback`).classList.remove('show', 'correct', 'incorrect');
    document.getElementById(`${level}-next-btn`).style.display = 'none';
    document.getElementById(`${level}-results`).style.display = 'none';
    document.querySelector(`#quiz-${level}-game .quiz-question-container`).style.display = 'block';
}

function handleAnswer(level, selectedIndex) {
    const state = quizState[level];
    if (state.answered) return;

    state.answered = true;
    const question = quizData[level][state.currentQuestion];
    const options = document.querySelectorAll(`#${level}-options .quiz-option`);
    const feedback = document.getElementById(`${level}-feedback`);

    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));

    // Mark correct/incorrect
    options[question.correct].classList.add('correct');

    if (selectedIndex === question.correct) {
        state.score++;
        document.getElementById(`${level}-score`).textContent = state.score;
        feedback.textContent = `✅ Saktë! ${question.explanation}`;
        feedback.classList.add('correct');
    } else {
        options[selectedIndex].classList.add('incorrect');
        feedback.textContent = `❌ Gabim! ${question.explanation}`;
        feedback.classList.add('incorrect');
    }

    feedback.classList.add('show');
    document.getElementById(`${level}-next-btn`).style.display = 'inline-block';

    // Update progress
    updateProgress();
}

function setupQuizControls(level) {
    const nextBtn = document.getElementById(`${level}-next-btn`);
    const restartBtn = document.getElementById(`${level}-restart-btn`);

    nextBtn.addEventListener('click', () => {
        quizState[level].currentQuestion++;
        loadQuestion(level);
    });

    restartBtn.addEventListener('click', () => {
        quizState[level].currentQuestion = 0;
        quizState[level].score = 0;
        quizState[level].answered = false;
        document.getElementById(`${level}-restart-btn`).style.display = 'none';
        loadQuestion(level);
    });
}

function showResults(level) {
    const state = quizState[level];
    const questions = quizData[level];
    const percentage = Math.round((state.score / questions.length) * 100);

    // Hide question container, show results
    document.querySelector(`#quiz-${level}-game .quiz-question-container`).style.display = 'none';
    document.getElementById(`${level}-feedback`).classList.remove('show');
    document.getElementById(`${level}-next-btn`).style.display = 'none';

    const results = document.getElementById(`${level}-results`);
    results.style.display = 'block';

    document.getElementById(`${level}-final-score`).textContent = percentage;

    const message = document.getElementById(`${level}-results-message`);
    if (percentage >= 80) {
        message.textContent = '🎉 Shkëlqyeshëm! Je gati për nivelin tjetër!';
    } else if (percentage >= 60) {
        message.textContent = '👍 Mirë! Vazhdo të praktikosh!';
    } else if (percentage >= 40) {
        message.textContent = '📚 Duhet më shumë praktikë. Mos u dorëzo!';
    } else {
        message.textContent = '💪 Kthehu dhe mëso përsëri materialet!';
    }

    document.getElementById(`${level}-restart-btn`).style.display = 'inline-block';
}

// ===== Progress Tracking =====
function updateProgress() {
    ['a1', 'a2', 'b1'].forEach(level => {
        const state = quizState[level];
        const questions = quizData[level];
        const progress = (state.currentQuestion / questions.length) * 100;

        const progressBar = document.getElementById(`${level}-progress`);
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    });
}

// ===== Utility Functions =====

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Save progress to localStorage
function saveProgress() {
    const progress = {
        a1: quizState.a1,
        a2: quizState.a2,
        b1: quizState.b1
    };
    localStorage.setItem('mesoGjermanisht_progress', JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('mesoGjermanisht_progress');
    if (saved) {
        const progress = JSON.parse(saved);
        Object.assign(quizState, progress);
    }
}

// ===== Word Card Interactions =====
document.querySelectorAll('.word-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// ===== Smooth Scroll for Internal Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
    // Check if quiz is active
    const activeLevel = document.querySelector('.level-content.active');
    if (!activeLevel) return;

    const level = activeLevel.id;
    const state = quizState[level];

    // Number keys 1-4 for quiz answers
    if (e.key >= '1' && e.key <= '4' && !state.answered) {
        const index = parseInt(e.key) - 1;
        const options = document.querySelectorAll(`#${level}-options .quiz-option`);
        if (options[index]) {
            handleAnswer(level, index);
        }
    }

    // Enter or Space for next question
    if ((e.key === 'Enter' || e.key === ' ') && state.answered) {
        const nextBtn = document.getElementById(`${level}-next-btn`);
        if (nextBtn.style.display !== 'none') {
            quizState[level].currentQuestion++;
            loadQuestion(level);
        }
    }

    // Arrow keys for tab navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const tabs = document.querySelectorAll('.tab-btn');
        const activeTab = document.querySelector('.tab-btn.active');
        const currentIndex = Array.from(tabs).indexOf(activeTab);

        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        } else {
            newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }

        tabs[newIndex].click();
    }
});

// ===== Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.word-card, .grammar-topic, .example-category').forEach(el => {
    observer.observe(el);
});

// ===== Console Welcome Message =====
console.log('%c🇩🇪 Mëso Gjermanisht 🇦🇱', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cPlatforma për të mësuar gjermanisht!', 'font-size: 14px; color: #a0aec0;');
console.log('%cKrijuar me dashuri për komunitetin shqiptar.', 'font-size: 12px; color: #4fd1c5;');

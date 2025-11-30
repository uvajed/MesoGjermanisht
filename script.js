// Mëso Gjermanisht - Interactive Learning Platform
// New UI/UX Structure with Dashboard, Learn, Games, Dictionary

document.addEventListener('DOMContentLoaded', function() {
    initializeMainNavigation();
    initializeLevelSelectors();
    initializeContentTabs();
    initializeTopicCards();
    initializeDashboard();
    initializeGamesHub();
    initializeDictionary();
    loadProgress();
});

// ============================================
// MAIN NAVIGATION (Home, Learn, Games, Dictionary)
// ============================================
function initializeMainNavigation() {
    const navBtns = document.querySelectorAll('.main-nav-btn');
    const pageContents = document.querySelectorAll('.page-content');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;

            // Update nav buttons
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update page content
            pageContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === page) content.classList.add('active');
            });

            // Update theme based on page
            updatePageTheme(page);
        });
    });
}

function updatePageTheme(page) {
    if (page === 'home') {
        document.body.setAttribute('data-theme', 'home');
    } else if (page === 'learn') {
        const activeLevel = document.querySelector('#learn .level-btn.active');
        if (activeLevel) {
            document.body.setAttribute('data-theme', activeLevel.dataset.level);
        }
    } else if (page === 'games') {
        const activeLevel = document.querySelector('.game-level-btn.active');
        if (activeLevel) {
            document.body.setAttribute('data-theme', activeLevel.dataset.level);
        }
    } else if (page === 'dictionary') {
        document.body.setAttribute('data-theme', 'dictionary');
    }
}

// ============================================
// LEVEL SELECTORS (in Learn and Games sections)
// ============================================
function initializeLevelSelectors() {
    // Learn section level selector
    const learnLevelBtns = document.querySelectorAll('#learn .level-btn');
    const levelContents = document.querySelectorAll('.level-content');

    learnLevelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;

            // Update buttons
            learnLevelBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update level content
            levelContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `learn-${level}`) content.classList.add('active');
            });

            // Reset content tabs to first tab
            resetContentTabs(level);

            // Update theme
            document.body.setAttribute('data-theme', level);
        });
    });

    // Games section level selector
    const gameLevelBtns = document.querySelectorAll('.game-level-btn');

    gameLevelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;

            // Update buttons
            gameLevelBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update current game level
            currentGameLevel = level;

            // Update theme
            document.body.setAttribute('data-theme', level);
        });
    });
}

// ============================================
// CONTENT TABS (Vocabulary, Grammar, Examples)
// ============================================
function initializeContentTabs() {
    const contentTabs = document.querySelectorAll('.content-tab');

    contentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const contentType = tab.dataset.content;
            const activeLevel = document.querySelector('#learn .level-btn.active');
            const level = activeLevel ? activeLevel.dataset.level : 'a1';

            // Update tabs
            contentTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update content sections
            const levelContent = document.getElementById(`learn-${level}`);
            if (levelContent) {
                levelContent.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `${contentType}-${level}`) {
                        section.classList.add('active');
                    }
                });
            }
        });
    });
}

function resetContentTabs(level) {
    // Reset to vocabulary tab
    const contentTabs = document.querySelectorAll('.content-tab');
    contentTabs.forEach((tab, i) => tab.classList.toggle('active', i === 0));

    // Reset content sections
    const levelContent = document.getElementById(`learn-${level}`);
    if (levelContent) {
        levelContent.querySelectorAll('.content-section').forEach((section, i) => {
            section.classList.toggle('active', i === 0);
        });
    }
}

// ============================================
// DASHBOARD
// ============================================
const dailyWords = [
    { de: 'Willkommen', sq: 'Mirëseardhje', example: 'Willkommen in Deutschland!' },
    { de: 'Freundschaft', sq: 'Miqësi', example: 'Freundschaft ist wichtig.' },
    { de: 'Glücklich', sq: 'I/E lumtur', example: 'Ich bin sehr glücklich.' },
    { de: 'Lernen', sq: 'Mësoj', example: 'Ich lerne jeden Tag Deutsch.' },
    { de: 'Verstehen', sq: 'Kuptoj', example: 'Ich verstehe dich gut.' },
    { de: 'Sprechen', sq: 'Flas', example: 'Kannst du Deutsch sprechen?' },
    { de: 'Arbeiten', sq: 'Punoj', example: 'Ich arbeite gern.' },
    { de: 'Reisen', sq: 'Udhëtoj', example: 'Ich reise nach Berlin.' },
    { de: 'Zusammen', sq: 'Së bashku', example: 'Wir lernen zusammen.' },
    { de: 'Wunderbar', sq: 'I mrekullueshëm', example: 'Das Wetter ist wunderbar!' }
];

function initializeDashboard() {
    // Set initial daily word
    setDailyWord();

    // New word button
    const newWordBtn = document.getElementById('new-word-btn');
    if (newWordBtn) {
        newWordBtn.addEventListener('click', () => {
            setDailyWord(true);
        });
    }

    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            handleQuickAction(action);
        });
    });

    // Featured games
    const featuredGames = document.querySelectorAll('.featured-game');
    featuredGames.forEach(btn => {
        btn.addEventListener('click', () => {
            const game = btn.dataset.game;
            const level = btn.dataset.level;

            // Navigate to games page
            navigateToPage('games');

            // Set level and start game
            setTimeout(() => {
                setGameLevel(level);
                startGame(game);
            }, 100);
        });
    });
}

function setDailyWord(random = false) {
    let word;
    if (random) {
        word = dailyWords[Math.floor(Math.random() * dailyWords.length)];
    } else {
        // Use date-based selection for consistency throughout the day
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        word = dailyWords[dayOfYear % dailyWords.length];
    }

    const deEl = document.getElementById('daily-word-de');
    const sqEl = document.getElementById('daily-word-sq');
    const exEl = document.getElementById('daily-word-example');

    if (deEl) deEl.textContent = word.de;
    if (sqEl) sqEl.textContent = word.sq;
    if (exEl) exEl.textContent = `"${word.example}"`;
}

function handleQuickAction(action) {
    switch(action) {
        case 'learn-a1':
            navigateToPage('learn');
            setTimeout(() => {
                const a1Btn = document.querySelector('#learn .level-btn[data-level="a1"]');
                if (a1Btn) a1Btn.click();
            }, 100);
            break;
        case 'play-game':
            navigateToPage('games');
            break;
        case 'dictionary':
            navigateToPage('dictionary');
            setTimeout(() => {
                document.getElementById('dictionary-input')?.focus();
            }, 100);
            break;
        case 'random-topic':
            navigateToPage('learn');
            setTimeout(() => {
                const levels = ['a1', 'a2', 'b1'];
                const randomLevel = levels[Math.floor(Math.random() * levels.length)];
                const levelBtn = document.querySelector(`#learn .level-btn[data-level="${randomLevel}"]`);
                if (levelBtn) levelBtn.click();

                // Click random topic
                setTimeout(() => {
                    const topics = document.querySelectorAll(`#learn-${randomLevel} .topic-card`);
                    if (topics.length > 0) {
                        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
                        randomTopic.click();
                    }
                }, 200);
            }, 100);
            break;
    }
}

function navigateToPage(page) {
    const navBtn = document.querySelector(`.main-nav-btn[data-page="${page}"]`);
    if (navBtn) navBtn.click();
}

// ============================================
// GAMES HUB
// ============================================
let currentGameLevel = 'a1';

function initializeGamesHub() {
    // Game card click handlers
    const gameCards = document.querySelectorAll('.game-card-large');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            startGame(game);
        });
    });

    // Back to games hub button
    const backBtn = document.getElementById('back-to-games-hub');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            hideAllGames();
            document.getElementById('games-hub').style.display = 'block';
            document.getElementById('game-play-area').style.display = 'none';
        });
    }
}

function setGameLevel(level) {
    currentGameLevel = level;
    const levelBtns = document.querySelectorAll('.game-level-btn');
    levelBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === level);
    });
    document.body.setAttribute('data-theme', level);
}

function startGame(game) {
    // Hide games hub, show play area
    document.getElementById('games-hub').style.display = 'none';
    document.getElementById('game-play-area').style.display = 'block';

    // Hide all game areas
    hideAllGames();

    // Show and initialize selected game
    const gameElement = document.getElementById(`${game}-game`);
    if (gameElement) {
        gameElement.style.display = 'block';

        switch(game) {
            case 'quiz':
                initQuizGame();
                break;
            case 'matching':
                initMatchingGame();
                break;
            case 'memory':
                initMemoryGame();
                break;
            case 'fillblank':
                initFillBlankGame();
                break;
            case 'hangman':
                initHangmanGame();
                break;
            case 'scramble':
                initScrambleGame();
                break;
        }
    }
}

function hideAllGames() {
    document.querySelectorAll('.game-area').forEach(area => {
        area.style.display = 'none';
    });
}

// ============================================
// TOPIC CARDS & MODAL
// ============================================
function initializeTopicCards() {
    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(card.dataset.topic);
        });
    });

    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(topicId) {
    const content = topicContent[topicId];
    if (!content) return;
    document.getElementById('modal-breadcrumb').innerHTML = content.breadcrumb;
    document.getElementById('modal-content').innerHTML = content.html;
    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Re-attach event listeners for related links
    document.querySelectorAll('.related-link').forEach(link => {
        link.addEventListener('click', () => openModal(link.dataset.topic));
    });

    // Practice exercise answers
    document.querySelectorAll('.practice-exercise .answer').forEach(answer => {
        answer.addEventListener('click', () => answer.classList.toggle('revealed'));
    });
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// DICTIONARY
// ============================================
function initializeDictionary() {
    const input = document.getElementById('dictionary-input');
    const searchBtn = document.getElementById('dictionary-search-btn');
    const resultsDiv = document.getElementById('dictionary-results');
    const directionBtns = document.querySelectorAll('.direction-btn');

    let currentDirection = 'de-sq';

    // Direction toggle
    directionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            directionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDirection = btn.dataset.direction;
            if (input) {
                input.placeholder = currentDirection === 'de-sq'
                    ? 'Shkruaj fjalën në gjermanisht...'
                    : 'Shkruaj fjalën në shqip...';
            }
        });
    });

    // Search function
    function performSearch() {
        const term = input?.value.trim();
        if (!term) return;

        const dictUrl = currentDirection === 'de-sq'
            ? `https://de-sq.dict.cc/?s=${encodeURIComponent(term)}`
            : `https://sq-de.dict.cc/?s=${encodeURIComponent(term)}`;

        const glosbeUrl = currentDirection === 'de-sq'
            ? `https://glosbe.com/de/sq/${encodeURIComponent(term)}`
            : `https://glosbe.com/sq/de/${encodeURIComponent(term)}`;

        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="dictionary-external-link">
                    <div class="search-term-display">"${term}"</div>
                    <h3>Kërko në fjalorët e jashtëm:</h3>
                    <p>Për shkak të kufizimeve teknike, rezultatet hapen në një dritare të re.</p>
                    <div class="dict-buttons">
                        <a href="${dictUrl}" target="_blank" rel="noopener" class="dict-link-btn">
                            <span>📖</span> Hap në dict.cc
                        </a>
                        <a href="${glosbeUrl}" target="_blank" rel="noopener" class="dict-link-btn" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);">
                            <span>🌐</span> Hap në Glosbe
                        </a>
                    </div>
                    <div class="recent-searches" style="margin-top: 30px;">
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Këshillë: Mbaj Ctrl (ose Cmd) kur klikoni për ta hapur në sfondi.</p>
                    </div>
                </div>
            `;
        }
    }

    // Event listeners
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
}

// ============================================
// PROGRESS TRACKING
// ============================================
function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('mesoProgress') || '{}');

    // Update progress bars on dashboard
    ['a1', 'a2', 'b1'].forEach(level => {
        const progressBar = document.getElementById(`progress-${level}`);
        if (progressBar && progress[level]) {
            progressBar.style.width = `${progress[level]}%`;
        }
    });
}

function saveProgress(level, percentage) {
    const progress = JSON.parse(localStorage.getItem('mesoProgress') || '{}');
    progress[level] = percentage;
    localStorage.setItem('mesoProgress', JSON.stringify(progress));
    loadProgress();
}

// ============================================
// QUIZ GAME
// ============================================
const quizData = {
    a1: [
        { question: "Si thuhet 'Mirëmëngjes'?", options: ["Guten Abend", "Guten Morgen", "Guten Tag", "Gute Nacht"], correct: 1, explanation: "'Guten Morgen'" },
        { question: "Nyja për femërorë?", options: ["der", "die", "das", "den"], correct: 1, explanation: "'die'" },
        { question: "'sein' për 'ich'?", options: ["bist", "ist", "bin", "sind"], correct: 2, explanation: "'ich bin'" },
        { question: "Numri 7?", options: ["sechs", "sieben", "acht", "neun"], correct: 1, explanation: "'sieben'" },
        { question: "'die Mutter' =?", options: ["babai", "motra", "nëna", "gjyshja"], correct: 2, explanation: "nëna" },
        { question: "'blu' =?", options: ["rot", "grün", "blau", "gelb"], correct: 2, explanation: "'blau'" },
        { question: "'Ich ___ Student.'", options: ["bist", "ist", "bin", "sind"], correct: 2, explanation: "'bin'" },
        { question: "'Mirupafshim' =?", options: ["Hallo", "Tschüss", "Danke", "Bitte"], correct: 1, explanation: "'Tschüss'" },
        { question: "Nyja për 'Kind'?", options: ["der", "die", "das", "den"], correct: 2, explanation: "'das'" },
        { question: "'haben' për 'du'?", options: ["habe", "hast", "hat", "haben"], correct: 1, explanation: "'hast'" }
    ],
    a2: [
        { question: "Akkusativ 'der Mann'?", options: ["der", "den", "dem", "des"], correct: 1, explanation: "'den'" },
        { question: "'Ich ___ Deutsch ___.'", options: ["bin gelernt", "habe gelernt", "habe gelearnt", "bin gelarnt"], correct: 1, explanation: "'habe gelernt'" },
        { question: "'mund' =?", options: ["müssen", "können", "sollen", "wollen"], correct: 1, explanation: "'können'" },
        { question: "'treni' =?", options: ["Auto", "Bus", "Zug", "Flugzeug"], correct: 2, explanation: "'der Zug'" },
        { question: "'Ich gebe ___ Frau...' (Dat)", options: ["die", "der", "den", "dem"], correct: 1, explanation: "'der'" },
        { question: "Perfekt 'fahren'?", options: ["habe gefahrt", "bin gefahren", "habe gefahren", "bin gefahrt"], correct: 1, explanation: "'bin gefahren'" },
        { question: "'müssen' =?", options: ["mund", "dua", "duhet", "lejohet"], correct: 2, explanation: "'duhet'" },
        { question: "'mëngjesi' =?", options: ["Mittagessen", "Abendessen", "Frühstück", "Mahlzeit"], correct: 2, explanation: "'Frühstück'" },
        { question: "Saktë?", options: ["ein Kaffee", "einen Kaffee", "einer Kaffee", "einem Kaffee"], correct: 1, explanation: "'einen Kaffee'" },
        { question: "'mjeku' =?", options: ["Lehrer", "Arzt", "Kellner", "Koch"], correct: 1, explanation: "'der Arzt'" }
    ],
    b1: [
        { question: "Genitiv 'der Mann'?", options: ["dem", "den", "des Mannes", "der"], correct: 2, explanation: "'des Mannes'" },
        { question: "Passiv =?", options: ["haben+PII", "werden+PII", "sein+PII", "werden+Inf"], correct: 1, explanation: "'werden+PII'" },
        { question: "Konj.II 'sein' ich?", options: ["bin", "sei", "wäre", "würde"], correct: 2, explanation: "'wäre'" },
        { question: "'Der Mann, ___ dort steht'", options: ["das", "die", "der", "den"], correct: 2, explanation: "'der'" },
        { question: "Shkak =?", options: ["obwohl", "weil", "wenn", "damit"], correct: 1, explanation: "'weil'" },
        { question: "'Wenn ich Zeit ___'", options: ["habe", "hätte", "hatte", "haben"], correct: 1, explanation: "'hätte'" },
        { question: "'Klimawandel' =?", options: ["mjedisi", "ndryshime klimatike", "qëndrueshmëri", "papunësi"], correct: 1, explanation: "ndryshime klimatike" },
        { question: "Cila Passiv?", options: ["Ich koche", "Essen wird gekocht", "Ich habe gekocht", "Essen ist gut"], correct: 1, explanation: "'wird gekocht'" },
        { question: "'Meiner Meinung ___'", options: ["zu", "für", "nach", "von"], correct: 2, explanation: "'nach'" },
        { question: "Konj.II 'können' Sie?", options: ["können", "konnten", "könnten", "gekonnt"], correct: 2, explanation: "'könnten'" }
    ]
};

let quizState = { currentQuestion: 0, score: 0, answered: false };

function initQuizGame() {
    quizState = { currentQuestion: 0, score: 0, answered: false };
    loadQuizQuestion();

    const nextBtn = document.getElementById('game-next-btn');
    const restartBtn = document.getElementById('game-restart-btn');

    if (nextBtn) {
        nextBtn.onclick = () => {
            quizState.currentQuestion++;
            loadQuizQuestion();
        };
    }

    if (restartBtn) {
        restartBtn.onclick = () => {
            quizState = { currentQuestion: 0, score: 0, answered: false };
            restartBtn.style.display = 'none';
            loadQuizQuestion();
        };
    }
}

function loadQuizQuestion() {
    const data = quizData[currentGameLevel];

    if (quizState.currentQuestion >= data.length) {
        showQuizResults();
        return;
    }

    const q = data[quizState.currentQuestion];

    document.getElementById('game-question').textContent = q.question;
    document.getElementById('game-question-num').textContent = quizState.currentQuestion + 1;
    document.getElementById('game-score').textContent = quizState.score;

    const optsContainer = document.getElementById('game-options');
    optsContainer.innerHTML = '';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleQuizAnswer(i));
        optsContainer.appendChild(btn);
    });

    quizState.answered = false;

    const feedback = document.getElementById('game-feedback');
    feedback.className = 'quiz-feedback';
    feedback.textContent = '';

    document.getElementById('game-next-btn').style.display = 'none';
    document.getElementById('game-results').style.display = 'none';
    document.querySelector('#quiz-game .quiz-question-container').style.display = 'block';
}

function handleQuizAnswer(idx) {
    if (quizState.answered) return;
    quizState.answered = true;

    const data = quizData[currentGameLevel];
    const q = data[quizState.currentQuestion];
    const opts = document.querySelectorAll('#game-options .quiz-option');

    opts.forEach(o => o.classList.add('disabled'));
    opts[q.correct].classList.add('correct');

    const feedback = document.getElementById('game-feedback');

    if (idx === q.correct) {
        quizState.score++;
        document.getElementById('game-score').textContent = quizState.score;
        feedback.textContent = `✅ Saktë! ${q.explanation}`;
        feedback.className = 'quiz-feedback show correct';
    } else {
        opts[idx].classList.add('wrong');
        feedback.textContent = `❌ Gabim! ${q.explanation}`;
        feedback.className = 'quiz-feedback show wrong';
    }

    document.getElementById('game-next-btn').style.display = 'inline-block';
}

function showQuizResults() {
    const data = quizData[currentGameLevel];
    const pct = Math.round((quizState.score / data.length) * 100);

    document.querySelector('#quiz-game .quiz-question-container').style.display = 'none';
    document.getElementById('game-feedback').className = 'quiz-feedback';
    document.getElementById('game-next-btn').style.display = 'none';
    document.getElementById('game-results').style.display = 'block';
    document.getElementById('game-final-score').textContent = pct;

    let message;
    if (pct >= 80) message = '🎉 Shkëlqyeshëm!';
    else if (pct >= 60) message = '👍 Mirë!';
    else if (pct >= 40) message = '📚 Praktiko!';
    else message = '💪 Mëso përsëri!';

    document.getElementById('game-results-message').textContent = message;
    document.getElementById('game-restart-btn').style.display = 'inline-block';

    // Save progress
    saveProgress(currentGameLevel, Math.max(pct, JSON.parse(localStorage.getItem('mesoProgress') || '{}')[currentGameLevel] || 0));
}

// ============================================
// GAME VOCABULARY DATA
// ============================================
const gameVocab = {
    a1: [
        { de: 'Hallo', sq: 'Përshëndetje' },
        { de: 'Guten Morgen', sq: 'Mirëmëngjes' },
        { de: 'Danke', sq: 'Faleminderit' },
        { de: 'Bitte', sq: 'Ju lutem' },
        { de: 'Ja', sq: 'Po' },
        { de: 'Nein', sq: 'Jo' },
        { de: 'Eins', sq: 'Një' },
        { de: 'Zwei', sq: 'Dy' },
        { de: 'Drei', sq: 'Tre' },
        { de: 'Rot', sq: 'E kuqe' },
        { de: 'Blau', sq: 'Blu' },
        { de: 'Grün', sq: 'E gjelbër' },
        { de: 'Mutter', sq: 'Nëna' },
        { de: 'Vater', sq: 'Babai' },
        { de: 'Wasser', sq: 'Ujë' },
        { de: 'Brot', sq: 'Bukë' }
    ],
    a2: [
        { de: 'Arzt', sq: 'Mjek' },
        { de: 'Lehrer', sq: 'Mësues' },
        { de: 'Zug', sq: 'Tren' },
        { de: 'Flugzeug', sq: 'Aeroplan' },
        { de: 'Frühstück', sq: 'Mëngjes' },
        { de: 'Mittagessen', sq: 'Drekë' },
        { de: 'Kopf', sq: 'Kokë' },
        { de: 'Hand', sq: 'Dorë' },
        { de: 'Sonne', sq: 'Diell' },
        { de: 'Regen', sq: 'Shi' },
        { de: 'Hemd', sq: 'Këmishë' },
        { de: 'Hose', sq: 'Pantallona' },
        { de: 'Schule', sq: 'Shkollë' },
        { de: 'Arbeit', sq: 'Punë' },
        { de: 'Geld', sq: 'Para' },
        { de: 'Zeit', sq: 'Kohë' }
    ],
    b1: [
        { de: 'Meinung', sq: 'Mendim' },
        { de: 'Umwelt', sq: 'Mjedis' },
        { de: 'Gesellschaft', sq: 'Shoqëri' },
        { de: 'Erfahrung', sq: 'Përvojë' },
        { de: 'Entscheidung', sq: 'Vendim' },
        { de: 'Verantwortung', sq: 'Përgjegjësi' },
        { de: 'Entwicklung', sq: 'Zhvillim' },
        { de: 'Vorschlag', sq: 'Propozim' },
        { de: 'Zusammenhang', sq: 'Lidhje' },
        { de: 'Unterschied', sq: 'Dallim' },
        { de: 'Vergleich', sq: 'Krahasim' },
        { de: 'Bedeutung', sq: 'Kuptim' },
        { de: 'Lösung', sq: 'Zgjidhje' },
        { de: 'Vorteil', sq: 'Përparësi' },
        { de: 'Nachteil', sq: 'Disavantazh' },
        { de: 'Ziel', sq: 'Qëllim' }
    ]
};

// ============================================
// MATCHING GAME
// ============================================
let matchingState = { pairs: [], selected: null, matched: 0, startTime: 0 };
let matchingTimer = null;

function initMatchingGame() {
    const vocab = [...gameVocab[currentGameLevel]].sort(() => Math.random() - 0.5).slice(0, 8);
    matchingState = {
        pairs: vocab,
        selected: null,
        matched: 0,
        startTime: Date.now()
    };

    const leftCol = document.getElementById('match-left');
    const rightCol = document.getElementById('match-right');

    if (!leftCol || !rightCol) return;

    leftCol.innerHTML = '';
    rightCol.innerHTML = '';

    const leftItems = vocab.map((v, i) => ({ text: v.de, idx: i, type: 'de' })).sort(() => Math.random() - 0.5);
    const rightItems = vocab.map((v, i) => ({ text: v.sq, idx: i, type: 'sq' })).sort(() => Math.random() - 0.5);

    leftItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'match-item';
        div.textContent = item.text;
        div.dataset.idx = item.idx;
        div.dataset.type = item.type;
        div.addEventListener('click', () => handleMatchClick(div));
        leftCol.appendChild(div);
    });

    rightItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'match-item';
        div.textContent = item.text;
        div.dataset.idx = item.idx;
        div.dataset.type = item.type;
        div.addEventListener('click', () => handleMatchClick(div));
        rightCol.appendChild(div);
    });

    document.getElementById('match-score').textContent = '0';
    document.getElementById('match-result').style.display = 'none';

    // Start timer
    if (matchingTimer) clearInterval(matchingTimer);
    matchingTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - matchingState.startTime) / 1000);
        document.getElementById('match-time').textContent = elapsed;
    }, 1000);
}

function handleMatchClick(div) {
    if (div.classList.contains('matched')) return;

    if (!matchingState.selected) {
        matchingState.selected = div;
        div.classList.add('selected');
    } else {
        if (matchingState.selected === div) {
            div.classList.remove('selected');
            matchingState.selected = null;
            return;
        }

        // Check if match
        const idx1 = parseInt(matchingState.selected.dataset.idx);
        const idx2 = parseInt(div.dataset.idx);
        const type1 = matchingState.selected.dataset.type;
        const type2 = div.dataset.type;

        if (idx1 === idx2 && type1 !== type2) {
            // Correct match
            matchingState.selected.classList.remove('selected');
            matchingState.selected.classList.add('matched');
            div.classList.add('matched');
            matchingState.matched++;
            document.getElementById('match-score').textContent = matchingState.matched;

            if (matchingState.matched === 8) {
                clearInterval(matchingTimer);
                const time = Math.floor((Date.now() - matchingState.startTime) / 1000);
                document.getElementById('match-result').innerHTML = `<h4>🎉 Bravo!</h4><p>I përfundove të gjitha çiftet në ${time} sekonda!</p><button class="quiz-btn" onclick="initMatchingGame()">🔄 Luaj Përsëri</button>`;
                document.getElementById('match-result').style.display = 'block';
            }
        } else {
            // Wrong match
            matchingState.selected.classList.add('wrong');
            div.classList.add('wrong');

            setTimeout(() => {
                matchingState.selected.classList.remove('selected', 'wrong');
                div.classList.remove('wrong');
                matchingState.selected = null;
            }, 500);
            return;
        }

        matchingState.selected = null;
    }
}

// ============================================
// MEMORY GAME
// ============================================
let memoryState = { cards: [], flipped: [], matched: 0, moves: 0, canFlip: true };

function initMemoryGame() {
    const vocab = [...gameVocab[currentGameLevel]].sort(() => Math.random() - 0.5).slice(0, 6);

    // Create pairs (German and Albanian)
    const cards = [];
    vocab.forEach((v, i) => {
        cards.push({ id: i, text: v.de, pairId: i, type: 'de' });
        cards.push({ id: i, text: v.sq, pairId: i, type: 'sq' });
    });

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    memoryState = { cards, flipped: [], matched: 0, moves: 0, canFlip: true };

    const grid = document.getElementById('memory-grid');
    if (!grid) return;

    grid.innerHTML = '';

    cards.forEach((card, i) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'memory-card';
        cardEl.dataset.index = i;
        cardEl.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">?</div>
                <div class="memory-card-back">${card.text}</div>
            </div>
        `;
        cardEl.addEventListener('click', () => handleMemoryClick(i));
        grid.appendChild(cardEl);
    });

    document.getElementById('memory-moves').textContent = '0';
    document.getElementById('memory-pairs').textContent = '0';
    document.getElementById('memory-result').style.display = 'none';
}

function handleMemoryClick(index) {
    if (!memoryState.canFlip) return;

    const cardEl = document.querySelector(`.memory-card[data-index="${index}"]`);
    if (!cardEl || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    cardEl.classList.add('flipped');
    memoryState.flipped.push(index);

    if (memoryState.flipped.length === 2) {
        memoryState.moves++;
        document.getElementById('memory-moves').textContent = memoryState.moves;
        memoryState.canFlip = false;

        const [first, second] = memoryState.flipped;
        const card1 = memoryState.cards[first];
        const card2 = memoryState.cards[second];

        if (card1.pairId === card2.pairId && card1.type !== card2.type) {
            // Match!
            document.querySelector(`.memory-card[data-index="${first}"]`).classList.add('matched');
            document.querySelector(`.memory-card[data-index="${second}"]`).classList.add('matched');
            memoryState.matched++;
            document.getElementById('memory-pairs').textContent = memoryState.matched;
            memoryState.flipped = [];
            memoryState.canFlip = true;

            if (memoryState.matched === 6) {
                document.getElementById('memory-result').innerHTML = `<h4>🎉 Bravo!</h4><p>I gjete të gjitha çiftet me ${memoryState.moves} lëvizje!</p><button class="quiz-btn" onclick="initMemoryGame()">🔄 Luaj Përsëri</button>`;
                document.getElementById('memory-result').style.display = 'block';
            }
        } else {
            // No match
            setTimeout(() => {
                document.querySelector(`.memory-card[data-index="${first}"]`).classList.remove('flipped');
                document.querySelector(`.memory-card[data-index="${second}"]`).classList.remove('flipped');
                memoryState.flipped = [];
                memoryState.canFlip = true;
            }, 1000);
        }
    }
}

// ============================================
// FILL IN THE BLANK GAME
// ============================================
const fillBlankData = {
    a1: [
        { sentence: 'Ich ___ Student.', answer: 'bin', hint: 'folja "sein" për ich' },
        { sentence: 'Er ___ Lehrer.', answer: 'ist', hint: 'folja "sein" për er' },
        { sentence: 'Wir ___ aus Albanien.', answer: 'sind', hint: 'folja "sein" për wir' },
        { sentence: 'Du ___ ein Buch.', answer: 'hast', hint: 'folja "haben" për du' },
        { sentence: 'Ich ___ Wasser.', answer: 'trinke', hint: 'folja "trinken" për ich' },
        { sentence: 'Sie ___ Deutsch.', answer: 'spricht', hint: 'folja "sprechen" për sie' },
        { sentence: 'Das ist ___ Buch.', answer: 'ein', hint: 'nyja e pacaktuar' },
        { sentence: '___ Frau ist nett.', answer: 'Die', hint: 'nyja për femërore' }
    ],
    a2: [
        { sentence: 'Ich habe das Buch ___.', answer: 'gelesen', hint: 'Partizip II i "lesen"' },
        { sentence: 'Er ist nach Berlin ___.', answer: 'gefahren', hint: 'Partizip II i "fahren"' },
        { sentence: 'Ich ___ Deutsch lernen.', answer: 'möchte', hint: 'folje modale - dëshirë' },
        { sentence: 'Du ___ das machen.', answer: 'musst', hint: 'folje modale - detyrë' },
        { sentence: 'Ich gebe ___ Frau das Buch.', answer: 'der', hint: 'Dativ femërore' },
        { sentence: 'Ich sehe ___ Mann.', answer: 'den', hint: 'Akkusativ mashkullore' },
        { sentence: 'Ich lerne, ___ ich eine Prüfung habe.', answer: 'weil', hint: 'lidhëz shkaku' },
        { sentence: 'Ich weiß, ___ er kommt.', answer: 'dass', hint: 'lidhëz deklarative' }
    ],
    b1: [
        { sentence: 'Das Buch ___ Mannes ist interessant.', answer: 'des', hint: 'Genitiv mashkullore' },
        { sentence: 'Wenn ich reich ___, würde ich reisen.', answer: 'wäre', hint: 'Konjunktiv II i "sein"' },
        { sentence: 'Das Essen ___ gekocht.', answer: 'wird', hint: 'Passiv - "werden"' },
        { sentence: 'Der Mann, ___ dort steht, ist mein Vater.', answer: 'der', hint: 'Përemër relativ' },
        { sentence: 'Meiner Meinung ___ ist das richtig.', answer: 'nach', hint: 'parafjalë për opinion' },
        { sentence: 'Er sagte, er ___ krank.', answer: 'sei', hint: 'Konjunktiv I' },
        { sentence: 'Obwohl es regnet, ___ ich spazieren.', answer: 'gehe', hint: 'folja në fjali kryesore' },
        { sentence: 'Je mehr ich lerne, ___ besser verstehe ich.', answer: 'desto', hint: 'je... desto' }
    ]
};

let fillState = { current: 0, score: 0, questions: [] };

function initFillBlankGame() {
    fillState = {
        current: 0,
        score: 0,
        questions: [...fillBlankData[currentGameLevel]].sort(() => Math.random() - 0.5)
    };

    loadFillQuestion();

    const submitBtn = document.getElementById('fill-submit');
    const input = document.getElementById('fill-input');

    if (submitBtn) {
        submitBtn.onclick = checkFillAnswer;
    }

    if (input) {
        input.onkeypress = (e) => {
            if (e.key === 'Enter') checkFillAnswer();
        };
    }
}

function loadFillQuestion() {
    if (fillState.current >= fillState.questions.length) {
        showFillResults();
        return;
    }

    const q = fillState.questions[fillState.current];
    const display = q.sentence.replace('___', '<span class="fill-blank">_____</span>');

    document.getElementById('fill-question').innerHTML = display;
    document.getElementById('fill-hint').textContent = `💡 ${q.hint}`;
    document.getElementById('fill-num').textContent = fillState.current + 1;
    document.getElementById('fill-score').textContent = fillState.score;
    document.getElementById('fill-input').value = '';
    document.getElementById('fill-input').focus();
    document.getElementById('fill-feedback').className = 'fillblank-feedback';
    document.getElementById('fill-result').style.display = 'none';
}

function checkFillAnswer() {
    const input = document.getElementById('fill-input');
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = fillState.questions[fillState.current].answer.toLowerCase();

    const feedback = document.getElementById('fill-feedback');

    if (userAnswer === correctAnswer) {
        fillState.score++;
        document.getElementById('fill-score').textContent = fillState.score;
        feedback.textContent = '✅ Saktë!';
        feedback.className = 'fillblank-feedback show correct';
    } else {
        feedback.textContent = `❌ Gabim! Përgjigja: ${fillState.questions[fillState.current].answer}`;
        feedback.className = 'fillblank-feedback show wrong';
    }

    setTimeout(() => {
        fillState.current++;
        loadFillQuestion();
    }, 1500);
}

function showFillResults() {
    const pct = Math.round((fillState.score / fillState.questions.length) * 100);
    document.getElementById('fill-result').innerHTML = `<h4>🎉 Rezultati: ${pct}%</h4><p>${fillState.score}/${fillState.questions.length} përgjigje të sakta</p><button class="quiz-btn" onclick="initFillBlankGame()">🔄 Luaj Përsëri</button>`;
    document.getElementById('fill-result').style.display = 'block';
    document.getElementById('fill-question').innerHTML = '';
    document.getElementById('fill-hint').textContent = '';
    document.getElementById('fill-input').style.display = 'none';
    document.getElementById('fill-submit').style.display = 'none';
}

// ============================================
// HANGMAN GAME
// ============================================
let hangmanState = { word: '', hint: '', guessed: [], lives: 6, score: 0 };

function initHangmanGame() {
    const vocab = gameVocab[currentGameLevel];
    const item = vocab[Math.floor(Math.random() * vocab.length)];

    hangmanState = {
        word: item.de.toUpperCase(),
        hint: item.sq,
        guessed: [],
        lives: 6,
        score: 0
    };

    renderHangman();
    createKeyboard();
    document.getElementById('hang-result').style.display = 'none';
}

function renderHangman() {
    // Render lives
    document.getElementById('hang-lives').textContent = '❤️'.repeat(hangmanState.lives) + '🖤'.repeat(6 - hangmanState.lives);
    document.getElementById('hang-score').textContent = hangmanState.score;

    // Render hint
    document.getElementById('hang-hint').textContent = `Përkthimi: ${hangmanState.hint}`;

    // Render word
    const display = hangmanState.word.split('').map(letter => {
        if (letter === ' ') return ' ';
        return hangmanState.guessed.includes(letter) ? letter : '_';
    }).join(' ');

    document.getElementById('hang-word').textContent = display;
}

function createKeyboard() {
    const keyboard = document.getElementById('hang-keyboard');
    keyboard.innerHTML = '';

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß'.split('');

    letters.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'keyboard-key';
        btn.textContent = letter;
        btn.addEventListener('click', () => guessLetter(letter, btn));
        keyboard.appendChild(btn);
    });
}

function guessLetter(letter, btn) {
    if (hangmanState.guessed.includes(letter) || hangmanState.lives <= 0) return;

    hangmanState.guessed.push(letter);
    btn.disabled = true;

    if (hangmanState.word.includes(letter)) {
        btn.classList.add('correct');
        // Check win
        const won = hangmanState.word.split('').every(l => l === ' ' || hangmanState.guessed.includes(l));
        if (won) {
            hangmanState.score++;
            document.getElementById('hang-result').innerHTML = `<h4>🎉 Fitove!</h4><p>Fjala ishte: ${hangmanState.word}</p><button class="quiz-btn" onclick="initHangmanGame()">🔄 Fjala Tjetër</button>`;
            document.getElementById('hang-result').style.display = 'block';
        }
    } else {
        btn.classList.add('wrong');
        hangmanState.lives--;
        if (hangmanState.lives <= 0) {
            document.getElementById('hang-result').innerHTML = `<h4>😔 Humbje!</h4><p>Fjala ishte: ${hangmanState.word}</p><button class="quiz-btn" onclick="initHangmanGame()">🔄 Provo Përsëri</button>`;
            document.getElementById('hang-result').style.display = 'block';
        }
    }

    renderHangman();
}

// ============================================
// WORD SCRAMBLE GAME
// ============================================
let scrambleState = { word: '', hint: '', scrambled: [], answer: [], current: 0, score: 0, questions: [] };

function initScrambleGame() {
    const vocab = [...gameVocab[currentGameLevel]].sort(() => Math.random() - 0.5).slice(0, 8);
    scrambleState = {
        questions: vocab,
        current: 0,
        score: 0,
        word: '',
        hint: '',
        scrambled: [],
        answer: []
    };

    loadScrambleWord();

    document.getElementById('scramble-clear').onclick = clearScramble;
    document.getElementById('scramble-submit').onclick = checkScramble;
}

function loadScrambleWord() {
    if (scrambleState.current >= scrambleState.questions.length) {
        showScrambleResults();
        return;
    }

    const item = scrambleState.questions[scrambleState.current];
    scrambleState.word = item.de.toUpperCase();
    scrambleState.hint = item.sq;
    scrambleState.answer = [];

    // Scramble letters
    scrambleState.scrambled = scrambleState.word.split('').map((letter, i) => ({ letter, used: false, id: i }));
    scrambleState.scrambled.sort(() => Math.random() - 0.5);

    renderScramble();
    document.getElementById('scramble-num').textContent = scrambleState.current + 1;
    document.getElementById('scramble-score').textContent = scrambleState.score;
    document.getElementById('scramble-feedback').className = 'scramble-feedback';
    document.getElementById('scramble-result').style.display = 'none';
}

function renderScramble() {
    document.getElementById('scramble-hint').textContent = `Përkthimi: ${scrambleState.hint}`;

    const lettersDiv = document.getElementById('scramble-letters');
    lettersDiv.innerHTML = '';

    scrambleState.scrambled.forEach((item, i) => {
        const btn = document.createElement('button');
        btn.className = 'scramble-letter' + (item.used ? ' used' : '');
        btn.textContent = item.letter;
        btn.addEventListener('click', () => selectScrambleLetter(i));
        lettersDiv.appendChild(btn);
    });

    document.getElementById('scramble-answer').textContent = scrambleState.answer.map(i => scrambleState.scrambled[i].letter).join('');
}

function selectScrambleLetter(index) {
    if (scrambleState.scrambled[index].used) return;

    scrambleState.scrambled[index].used = true;
    scrambleState.answer.push(index);
    renderScramble();
}

function clearScramble() {
    scrambleState.scrambled.forEach(item => item.used = false);
    scrambleState.answer = [];
    renderScramble();
}

function checkScramble() {
    const userAnswer = scrambleState.answer.map(i => scrambleState.scrambled[i].letter).join('');
    const feedback = document.getElementById('scramble-feedback');

    if (userAnswer === scrambleState.word) {
        scrambleState.score++;
        document.getElementById('scramble-score').textContent = scrambleState.score;
        feedback.textContent = '✅ Saktë!';
        feedback.className = 'scramble-feedback show correct';
    } else {
        feedback.textContent = `❌ Gabim! Fjala: ${scrambleState.word}`;
        feedback.className = 'scramble-feedback show wrong';
    }

    setTimeout(() => {
        scrambleState.current++;
        loadScrambleWord();
    }, 1500);
}

function showScrambleResults() {
    const pct = Math.round((scrambleState.score / scrambleState.questions.length) * 100);
    document.getElementById('scramble-result').innerHTML = `<h4>🎉 Rezultati: ${pct}%</h4><p>${scrambleState.score}/${scrambleState.questions.length} fjalë të sakta</p><button class="quiz-btn" onclick="initScrambleGame()">🔄 Luaj Përsëri</button>`;
    document.getElementById('scramble-result').style.display = 'block';
    document.getElementById('scramble-letters').innerHTML = '';
    document.getElementById('scramble-answer').textContent = '';
    document.getElementById('scramble-hint').textContent = '';
}

// ============================================
// TOPIC CONTENT DATA
// ============================================
const topicContent = {
    'greetings-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Përshëndetjet</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">👋</span><div class="modal-header-text"><h2>Përshëndetjet - Begrüßungen</h2><p>Mëso si të përshëndetësh në gjermanisht</p></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">Hallo</div><div class="albanian">Përshëndetje</div><div class="pronunciation">🔊 /ˈhalo/</div><div class="example">"Hallo, wie geht's?"</div><div class="usage-note">💡 Joformal, për miq</div></div>
                <div class="modal-word-card"><div class="german">Guten Morgen</div><div class="albanian">Mirëmëngjes</div><div class="pronunciation">🔊 /ˈɡuːtn̩ ˈmɔʁɡn̩/</div><div class="example">"Guten Morgen, Herr Müller!"</div><div class="usage-note">💡 Deri në orën 10-11</div></div>
                <div class="modal-word-card"><div class="german">Guten Tag</div><div class="albanian">Mirëdita</div><div class="pronunciation">🔊 /ˈɡuːtn̩ taːk/</div><div class="example">"Guten Tag! Kann ich Ihnen helfen?"</div><div class="usage-note">💡 Formale, gjatë ditës</div></div>
                <div class="modal-word-card"><div class="german">Guten Abend</div><div class="albanian">Mirëmbrëma</div><div class="pronunciation">🔊 /ˈɡuːtn̩ ˈaːbn̩t/</div><div class="example">"Guten Abend zusammen!"</div><div class="usage-note">💡 Pas orës 18:00</div></div>
                <div class="modal-word-card"><div class="german">Auf Wiedersehen</div><div class="albanian">Mirupafshim</div><div class="pronunciation">🔊 /aʊ̯f ˈviːdɐˌzeːən/</div><div class="example">"Auf Wiedersehen und bis bald!"</div><div class="usage-note">💡 Formale</div></div>
                <div class="modal-word-card"><div class="german">Tschüss</div><div class="albanian">Çao</div><div class="pronunciation">🔊 /tʃʏs/</div><div class="example">"Tschüss, bis morgen!"</div><div class="usage-note">💡 Joformal</div></div>
            </div>
            <div class="practice-box"><h4>✏️ Praktikë</h4>
                <div class="practice-exercise"><div class="question">Si i thoni shefit "mirëdita"?</div><div class="answer">Guten Tag!</div></div>
                <div class="practice-exercise"><div class="question">Si i thoni mikut "çao"?</div><div class="answer">Tschüss!</div></div>
            </div>
            <div class="related-topics"><h4>Tema të ngjashme</h4><div class="related-links"><span class="related-link" data-topic="vorstellen-a1">🤝 Të prezantohesh</span><span class="related-link" data-topic="pronomen-a1">👤 Përemrat</span></div></div>`
    },
    'numbers-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Numrat</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🔢</span><div class="modal-header-text"><h2>Numrat 0-20 - Die Zahlen</h2><p>Mëso numrat bazë</p></div></div>
            <div class="grammar-deep-section"><h3>📌 Numrat 0-12</h3><div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">null</div><div class="albanian">0</div></div>
                <div class="modal-word-card"><div class="german">eins</div><div class="albanian">1</div></div>
                <div class="modal-word-card"><div class="german">zwei</div><div class="albanian">2</div></div>
                <div class="modal-word-card"><div class="german">drei</div><div class="albanian">3</div></div>
                <div class="modal-word-card"><div class="german">vier</div><div class="albanian">4</div></div>
                <div class="modal-word-card"><div class="german">fünf</div><div class="albanian">5</div></div>
                <div class="modal-word-card"><div class="german">sechs</div><div class="albanian">6</div></div>
                <div class="modal-word-card"><div class="german">sieben</div><div class="albanian">7</div></div>
                <div class="modal-word-card"><div class="german">acht</div><div class="albanian">8</div></div>
                <div class="modal-word-card"><div class="german">neun</div><div class="albanian">9</div></div>
                <div class="modal-word-card"><div class="german">zehn</div><div class="albanian">10</div></div>
                <div class="modal-word-card"><div class="german">elf</div><div class="albanian">11</div></div>
                <div class="modal-word-card"><div class="german">zwölf</div><div class="albanian">12</div></div>
            </div></div>
            <div class="grammar-rule-box"><h4>📐 Rregulli 13-19</h4><p>Numri + <strong>zehn</strong>: dreizehn, vierzehn...</p><p>⚠️ <strong>sechzehn</strong> (jo sechszehn), <strong>siebzehn</strong> (jo siebenzehn)</p></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">dreizehn</div><div class="albanian">13</div></div>
                <div class="modal-word-card"><div class="german">vierzehn</div><div class="albanian">14</div></div>
                <div class="modal-word-card"><div class="german">fünfzehn</div><div class="albanian">15</div></div>
                <div class="modal-word-card"><div class="german">sechzehn</div><div class="albanian">16</div></div>
                <div class="modal-word-card"><div class="german">siebzehn</div><div class="albanian">17</div></div>
                <div class="modal-word-card"><div class="german">achtzehn</div><div class="albanian">18</div></div>
                <div class="modal-word-card"><div class="german">neunzehn</div><div class="albanian">19</div></div>
                <div class="modal-word-card"><div class="german">zwanzig</div><div class="albanian">20</div></div>
            </div>`
    },
    'family-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Familja</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">👨‍👩‍👧‍👦</span><div class="modal-header-text"><h2>Familja - Die Familie</h2><p>Anëtarët e familjes</p></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">die Mutter</div><div class="albanian">nëna</div><div class="example">"Meine Mutter kocht sehr gut."</div><div class="usage-note">💡 Joformal: die Mama</div></div>
                <div class="modal-word-card"><div class="german">der Vater</div><div class="albanian">babai</div><div class="example">"Mein Vater arbeitet viel."</div><div class="usage-note">💡 Joformal: der Papa</div></div>
                <div class="modal-word-card"><div class="german">der Bruder</div><div class="albanian">vëllai</div><div class="example">"Ich habe einen Bruder."</div></div>
                <div class="modal-word-card"><div class="german">die Schwester</div><div class="albanian">motra</div><div class="example">"Meine Schwester ist älter."</div></div>
                <div class="modal-word-card"><div class="german">die Oma</div><div class="albanian">gjyshja</div><div class="example">"Die Oma erzählt Geschichten."</div></div>
                <div class="modal-word-card"><div class="german">der Opa</div><div class="albanian">gjyshi</div><div class="example">"Der Opa liest die Zeitung."</div></div>
            </div>
            <div class="grammar-rule-box"><h4>📐 Nyjet</h4><p><strong>der</strong> = mashkullore | <strong>die</strong> = femërore</p></div>`
    },
    'colors-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Ngjyrat</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🎨</span><div class="modal-header-text"><h2>Ngjyrat - Die Farben</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card" style="border-left-color:#e74c3c"><div class="german">rot</div><div class="albanian">i kuq</div></div>
                <div class="modal-word-card" style="border-left-color:#3498db"><div class="german">blau</div><div class="albanian">blu</div></div>
                <div class="modal-word-card" style="border-left-color:#2ecc71"><div class="german">grün</div><div class="albanian">jeshil</div></div>
                <div class="modal-word-card" style="border-left-color:#f1c40f"><div class="german">gelb</div><div class="albanian">verdhë</div></div>
                <div class="modal-word-card" style="border-left-color:#e67e22"><div class="german">orange</div><div class="albanian">portokalli</div></div>
                <div class="modal-word-card" style="border-left-color:#9b59b6"><div class="german">lila</div><div class="albanian">vjollcë</div></div>
                <div class="modal-word-card" style="border-left-color:#1a1a1a"><div class="german">schwarz</div><div class="albanian">i zi</div></div>
                <div class="modal-word-card" style="border-left-color:#bdc3c7"><div class="german">weiß</div><div class="albanian">i bardhë</div></div>
            </div>`
    },
    'days-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Ditët</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📅</span><div class="modal-header-text"><h2>Ditët e Javës - Die Wochentage</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">der Montag</div><div class="albanian">E hëna</div></div>
                <div class="modal-word-card"><div class="german">der Dienstag</div><div class="albanian">E marta</div></div>
                <div class="modal-word-card"><div class="german">der Mittwoch</div><div class="albanian">E mërkura</div></div>
                <div class="modal-word-card"><div class="german">der Donnerstag</div><div class="albanian">E enjtja</div></div>
                <div class="modal-word-card"><div class="german">der Freitag</div><div class="albanian">E premtja</div></div>
                <div class="modal-word-card"><div class="german">der Samstag</div><div class="albanian">E shtuna</div></div>
                <div class="modal-word-card"><div class="german">der Sonntag</div><div class="albanian">E diela</div></div>
            </div>
            <div class="grammar-rule-box"><h4>📐 Të gjitha ditët janë <strong>der</strong> (mashkullore)</h4><p>"Am Montag gehe ich arbeiten." = Të hënën shkoj në punë.</p></div>`
    },
    'food-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Ushqimi</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🍎</span><div class="modal-header-text"><h2>Ushqimi - Grundnahrungsmittel</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">das Brot</div><div class="albanian">buka</div></div>
                <div class="modal-word-card"><div class="german">das Wasser</div><div class="albanian">uji</div></div>
                <div class="modal-word-card"><div class="german">die Milch</div><div class="albanian">qumështi</div></div>
                <div class="modal-word-card"><div class="german">der Käse</div><div class="albanian">djathi</div></div>
                <div class="modal-word-card"><div class="german">das Ei</div><div class="albanian">veza</div></div>
                <div class="modal-word-card"><div class="german">das Fleisch</div><div class="albanian">mishi</div></div>
                <div class="modal-word-card"><div class="german">der Fisch</div><div class="albanian">peshku</div></div>
                <div class="modal-word-card"><div class="german">das Obst</div><div class="albanian">frutat</div></div>
                <div class="modal-word-card"><div class="german">das Gemüse</div><div class="albanian">perimet</div></div>
                <div class="modal-word-card"><div class="german">der Kaffee</div><div class="albanian">kafeja</div></div>
            </div>`
    },
    'artikel-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Nyjet</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🔤</span><div class="modal-header-text"><h2>Nyjet - Die Artikel</h2><p>der, die, das</p></div></div>
            <div class="grammar-rule-box"><h4>🎯 Rregulli Kryesor</h4><p>Çdo emër ka gjini. Mëso nyjen bashkë me fjalën!</p></div>
            <div class="grammar-deep-section"><h3>📌 Tre gjinitë</h3><ul class="grammar-examples-list">
                <li><span class="de">der</span><span class="al">= mashkullore (der Mann, der Tisch)</span></li>
                <li><span class="de">die</span><span class="al">= femërore (die Frau, die Lampe)</span></li>
                <li><span class="de">das</span><span class="al">= asnjëanëse (das Kind, das Buch)</span></li>
                <li><span class="de">die</span><span class="al">= shumës (die Kinder, die Bücher)</span></li>
            </ul></div>
            <div class="grammar-rule-box"><h4>💡 Këshilla</h4><p><strong>der:</strong> ditët, muajt, stinët</p><p><strong>die:</strong> -ung, -heit, -keit, -schaft</p><p><strong>das:</strong> -chen, -lein, -um, -ment</p></div>
            <div class="practice-box"><h4>✏️ Praktikë</h4>
                <div class="practice-exercise"><div class="question">___ Buch</div><div class="answer">das Buch</div></div>
                <div class="practice-exercise"><div class="question">___ Frau</div><div class="answer">die Frau</div></div>
                <div class="practice-exercise"><div class="question">___ Mann</div><div class="answer">der Mann</div></div>
            </div>`
    },
    'pronomen-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Përemrat</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">👤</span><div class="modal-header-text"><h2>Përemrat Vetorë - Personalpronomen</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">ich</div><div class="albanian">unë</div><div class="example">"Ich bin Student."</div></div>
                <div class="modal-word-card"><div class="german">du</div><div class="albanian">ti</div><div class="example">"Du bist nett."</div><div class="usage-note">💡 Joformal</div></div>
                <div class="modal-word-card"><div class="german">er</div><div class="albanian">ai</div><div class="example">"Er arbeitet."</div></div>
                <div class="modal-word-card"><div class="german">sie</div><div class="albanian">ajo</div><div class="example">"Sie ist Ärztin."</div></div>
                <div class="modal-word-card"><div class="german">es</div><div class="albanian">ajo (sende)</div><div class="example">"Es ist kalt."</div></div>
                <div class="modal-word-card"><div class="german">wir</div><div class="albanian">ne</div><div class="example">"Wir lernen Deutsch."</div></div>
                <div class="modal-word-card"><div class="german">ihr</div><div class="albanian">ju (joformal)</div><div class="example">"Ihr seid Freunde."</div></div>
                <div class="modal-word-card"><div class="german">sie</div><div class="albanian">ata/ato</div><div class="example">"Sie kommen aus Albanien."</div></div>
                <div class="modal-word-card"><div class="german">Sie</div><div class="albanian">Ju (formal)</div><div class="example">"Sie sind freundlich."</div><div class="usage-note">💡 Me shkronjë të madhe!</div></div>
            </div>
            <div class="grammar-rule-box"><h4>⚠️ "sie" ka 3 kuptime!</h4><p>1. ajo (njëjës) | 2. ata/ato (shumës) | 3. Sie = Ju (formal)</p></div>`
    },
    'sein-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">sein</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🏃</span><div class="modal-header-text"><h2>Folja "sein" - të jesh</h2></div></div>
            <div class="grammar-rule-box"><h4>⚠️ Folje e parregullt - memorizoje!</h4></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">ich bin</div><div class="albanian">unë jam</div></div>
                <div class="modal-word-card"><div class="german">du bist</div><div class="albanian">ti je</div></div>
                <div class="modal-word-card"><div class="german">er/sie/es ist</div><div class="albanian">ai/ajo është</div></div>
                <div class="modal-word-card"><div class="german">wir sind</div><div class="albanian">ne jemi</div></div>
                <div class="modal-word-card"><div class="german">ihr seid</div><div class="albanian">ju jeni</div></div>
                <div class="modal-word-card"><div class="german">sie/Sie sind</div><div class="albanian">ata janë / Ju jeni</div></div>
            </div>
            <div class="practice-box"><h4>✏️ Praktikë</h4>
                <div class="practice-exercise"><div class="question">Ich ___ Student.</div><div class="answer">bin</div></div>
                <div class="practice-exercise"><div class="question">Du ___ nett.</div><div class="answer">bist</div></div>
                <div class="practice-exercise"><div class="question">Wir ___ aus Albanien.</div><div class="answer">sind</div></div>
            </div>`
    },
    'haben-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">haben</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📝</span><div class="modal-header-text"><h2>Folja "haben" - të kesh</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">ich habe</div><div class="albanian">unë kam</div></div>
                <div class="modal-word-card"><div class="german">du hast</div><div class="albanian">ti ke</div></div>
                <div class="modal-word-card"><div class="german">er/sie/es hat</div><div class="albanian">ai/ajo ka</div></div>
                <div class="modal-word-card"><div class="german">wir haben</div><div class="albanian">ne kemi</div></div>
                <div class="modal-word-card"><div class="german">ihr habt</div><div class="albanian">ju keni</div></div>
                <div class="modal-word-card"><div class="german">sie/Sie haben</div><div class="albanian">ata kanë / Ju keni</div></div>
            </div>
            <div class="practice-box"><h4>✏️ Praktikë</h4>
                <div class="practice-exercise"><div class="question">Er ___ viel Arbeit.</div><div class="answer">hat</div></div>
                <div class="practice-exercise"><div class="question">Wir ___ keine Zeit.</div><div class="answer">haben</div></div>
            </div>`
    },
    'verben-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Foljet</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">⚡</span><div class="modal-header-text"><h2>Foljet e Rregullta</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 Rregulli</h4><p>Hiq <strong>-en</strong> + mbaresa: ich lern<strong>e</strong>, du lern<strong>st</strong>, er lern<strong>t</strong>...</p></div>
            <div class="grammar-deep-section"><h3>📌 Mbaresat</h3><ul class="grammar-examples-list">
                <li><span class="de">ich → -e</span><span class="al">ich lerne</span></li>
                <li><span class="de">du → -st</span><span class="al">du lernst</span></li>
                <li><span class="de">er/sie/es → -t</span><span class="al">er lernt</span></li>
                <li><span class="de">wir → -en</span><span class="al">wir lernen</span></li>
                <li><span class="de">ihr → -t</span><span class="al">ihr lernt</span></li>
                <li><span class="de">sie/Sie → -en</span><span class="al">sie lernen</span></li>
            </ul></div>`
    },
    'satzbau-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Satzbau</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🧱</span><div class="modal-header-text"><h2>Rendi i Fjalëve - Satzbau</h2></div></div>
            <div class="grammar-rule-box"><h4>🎯 Folja në pozitën e DYTË!</h4></div>
            <div class="grammar-deep-section"><h3>📌 Fjali dëftore</h3><ul class="grammar-examples-list">
                <li><span class="de">Ich <strong>lerne</strong> Deutsch.</span><span class="al">Unë mësoj gjermanisht.</span></li>
                <li><span class="de">Heute <strong>lerne</strong> ich Deutsch.</span><span class="al">Sot mësoj gjermanisht.</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Fjali pyetëse</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>Lernst</strong> du Deutsch?</span><span class="al">A mëson gjermanisht?</span></li>
                <li><span class="de"><strong>Was</strong> lernst du?</span><span class="al">Çfarë mëson?</span></li>
            </ul></div>
            <div class="grammar-rule-box"><h4>💡 W-Fragen</h4><p>Wer? Was? Wo? Wann? Wie? Warum?</p></div>`
    },
    'vorstellen-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Prezantim</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🤝</span><div class="modal-header-text"><h2>Të prezantohesh - Sich vorstellen</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-a">Anna:</span><span class="german">Hallo! Ich heiße Anna. Wie heißt du?</span><span class="albanian">Përshëndetje! Quhem Anna. Si quhesh?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Besnik:</span><span class="german">Hallo! Ich bin Besnik. Freut mich!</span><span class="albanian">Përshëndetje! Jam Besnik. Gëzohem!</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Anna:</span><span class="german">Woher kommst du?</span><span class="albanian">Nga vjen ti?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Besnik:</span><span class="german">Ich komme aus Albanien.</span><span class="albanian">Vij nga Shqipëria.</span></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Frazat kyçe</h4>
                <p><strong>Ich heiße...</strong> = Unë quhem...</p>
                <p><strong>Woher kommst du?</strong> = Nga vjen?</p>
                <p><strong>Ich komme aus...</strong> = Vij nga...</p>
            </div>`
    },
    'einkaufen-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Dyqan</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🛒</span><div class="modal-header-text"><h2>Në dyqan - Im Geschäft</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-a">Verkäufer:</span><span class="german">Kann ich Ihnen helfen?</span><span class="albanian">A mund t'ju ndihmoj?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Kunde:</span><span class="german">Was kostet das Brot?</span><span class="albanian">Sa kushton buka?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Verkäufer:</span><span class="german">Zwei Euro fünfzig.</span><span class="albanian">Dy euro e pesëdhjetë.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Kunde:</span><span class="german">Ich nehme es. Danke!</span><span class="albanian">E marr. Faleminderit!</span></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Frazat e dobishme</h4><p><strong>Was kostet...?</strong> = Sa kushton...?</p><p><strong>Ich nehme...</strong> = E marr...</p></div>`
    },
    'zuhause-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Shtëpi</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🏠</span><div class="modal-header-text"><h2>Në shtëpi - Zu Hause</h2></div></div>
            <div class="grammar-deep-section"><ul class="grammar-examples-list">
                <li><span class="de">Das ist mein Haus.</span><span class="al">Kjo është shtëpia ime.</span></li>
                <li><span class="de">Die Küche ist groß.</span><span class="al">Kuzhina është e madhe.</span></li>
                <li><span class="de">Ich wohne in einer Wohnung.</span><span class="al">Banoj në apartament.</span></li>
            </ul></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">das Haus</div><div class="albanian">shtëpia</div></div>
                <div class="modal-word-card"><div class="german">die Wohnung</div><div class="albanian">apartamenti</div></div>
                <div class="modal-word-card"><div class="german">die Küche</div><div class="albanian">kuzhina</div></div>
                <div class="modal-word-card"><div class="german">das Schlafzimmer</div><div class="albanian">dhoma e gjumit</div></div>
                <div class="modal-word-card"><div class="german">das Badezimmer</div><div class="albanian">banjo</div></div>
            </div>`
    },
    'cafe-a1': {
        breadcrumb: '<span class="breadcrumb-item">A1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Kafene</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">☕</span><div class="modal-header-text"><h2>Në kafene - Im Café</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-a">Kellner:</span><span class="german">Was möchten Sie bestellen?</span><span class="albanian">Çfarë dëshironi?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Gast:</span><span class="german">Ich möchte einen Kaffee, bitte.</span><span class="albanian">Do të doja një kafe.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Kellner:</span><span class="german">Mit Milch?</span><span class="albanian">Me qumësht?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Gast:</span><span class="german">Ja, bitte.</span><span class="albanian">Po, ju lutem.</span></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Frazat kyçe</h4><p><strong>Ich möchte...</strong> = Do të doja...</p><p><strong>mit</strong> = me | <strong>ohne</strong> = pa</p></div>`
    },
    // A2 Topics
    'berufe-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Profesionet</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">💼</span><div class="modal-header-text"><h2>Profesionet - Die Berufe</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 Mashkullore → Femërore: shto -in</h4><p>der Arzt → die Ärzt<strong>in</strong></p></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">der Arzt / die Ärztin</div><div class="albanian">mjeku</div></div>
                <div class="modal-word-card"><div class="german">der Lehrer / die Lehrerin</div><div class="albanian">mësuesi</div></div>
                <div class="modal-word-card"><div class="german">der Ingenieur</div><div class="albanian">inxhinieri</div></div>
                <div class="modal-word-card"><div class="german">der Koch / die Köchin</div><div class="albanian">kuzhinieri</div></div>
                <div class="modal-word-card"><div class="german">der Kellner</div><div class="albanian">kamarieri</div></div>
                <div class="modal-word-card"><div class="german">der Polizist</div><div class="albanian">polici</div></div>
            </div>`
    },
    'verkehr-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Transporti</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🚗</span><div class="modal-header-text"><h2>Transporti - Verkehrsmittel</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">das Auto</div><div class="albanian">makina</div></div>
                <div class="modal-word-card"><div class="german">der Zug</div><div class="albanian">treni</div></div>
                <div class="modal-word-card"><div class="german">das Flugzeug</div><div class="albanian">aeroplani</div></div>
                <div class="modal-word-card"><div class="german">das Fahrrad</div><div class="albanian">biçikleta</div></div>
                <div class="modal-word-card"><div class="german">die U-Bahn</div><div class="albanian">metroja</div></div>
                <div class="modal-word-card"><div class="german">der Bus</div><div class="albanian">autobusi</div></div>
            </div>`
    },
    'falle-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Rasat</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📍</span><div class="modal-header-text"><h2>Rasat - Die Fälle</h2></div></div>
            <div class="grammar-deep-section"><h3>📌 Nominativ (Kryefjala)</h3><p>Wer? Was? → <strong>Der Mann</strong> liest.</p></div>
            <div class="grammar-deep-section"><h3>📌 Akkusativ (Kundrina e drejtë)</h3><p>Wen? Was? → Ich sehe <strong>den Mann</strong>.</p><p>⚠️ Vetëm der → den ndryshon!</p></div>
            <div class="grammar-deep-section"><h3>📌 Dativ (Kundrina e zhdrejtë)</h3><p>Wem? → Ich gebe <strong>dem Mann</strong> das Buch.</p></div>`
    },
    'perfekt-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Perfekt</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">⏰</span><div class="modal-header-text"><h2>E kaluara - Das Perfekt</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 haben/sein + Partizip II</h4></div>
            <div class="grammar-deep-section"><h3>Me "haben"</h3><ul class="grammar-examples-list">
                <li><span class="de">Ich <strong>habe</strong> gelernt.</span><span class="al">Kam mësuar.</span></li>
                <li><span class="de">Er <strong>hat</strong> gelesen.</span><span class="al">Ka lexuar.</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>Me "sein" (lëvizje)</h3><ul class="grammar-examples-list">
                <li><span class="de">Sie <strong>ist</strong> gefahren.</span><span class="al">Ka shkuar.</span></li>
                <li><span class="de">Wir <strong>sind</strong> gekommen.</span><span class="al">Kemi ardhur.</span></li>
            </ul></div>`
    },
    'modalverben-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Modalverben</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🔗</span><div class="modal-header-text"><h2>Foljet Modale</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">können</div><div class="albanian">mund</div><div class="example">"Ich kann Deutsch sprechen."</div></div>
                <div class="modal-word-card"><div class="german">müssen</div><div class="albanian">duhet</div><div class="example">"Du musst lernen."</div></div>
                <div class="modal-word-card"><div class="german">wollen</div><div class="albanian">dua</div><div class="example">"Er will Arzt werden."</div></div>
                <div class="modal-word-card"><div class="german">sollen</div><div class="albanian">duhet (rekomandim)</div><div class="example">"Sie soll mehr schlafen."</div></div>
                <div class="modal-word-card"><div class="german">dürfen</div><div class="albanian">lejohet</div><div class="example">"Hier darf man nicht rauchen."</div></div>
                <div class="modal-word-card"><div class="german">möchten</div><div class="albanian">do të doja</div><div class="example">"Ich möchte einen Kaffee."</div></div>
            </div>
            <div class="grammar-rule-box"><h4>📐 Struktura</h4><p>Modalverb + ... + <strong>Infinitiv</strong> (në fund)</p></div>`
    },
    'arzt-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Mjeku</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🏥</span><div class="modal-header-text"><h2>Tek mjeku - Beim Arzt</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-a">Arzt:</span><span class="german">Was fehlt Ihnen?</span><span class="albanian">Çfarë keni?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Patient:</span><span class="german">Ich habe Kopfschmerzen.</span><span class="albanian">Kam dhimbje koke.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Arzt:</span><span class="german">Haben Sie auch Fieber?</span><span class="albanian">Keni temperaturë?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Patient:</span><span class="german">Ja, ein bisschen.</span><span class="albanian">Po, pak.</span></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Fjalor</h4><p>Kopfschmerzen = dhimbje koke | Fieber = temperaturë | Husten = kollë</p></div>`
    },
    'bahnhof-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Stacion</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🚉</span><div class="modal-header-text"><h2>Në stacion - Am Bahnhof</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-b">Reisender:</span><span class="german">Wann fährt der Zug nach München?</span><span class="albanian">Kur niset treni për Mynih?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Beamter:</span><span class="german">Um 14:30 von Gleis 5.</span><span class="albanian">Në 14:30, binarët 5.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Reisender:</span><span class="german">Muss ich umsteigen?</span><span class="albanian">Duhet të ndërroj?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Beamter:</span><span class="german">Nein, es ist direkt.</span><span class="albanian">Jo, është direkt.</span></div>
            </div>`
    },
    // B1 Topics
    'konjunktiv-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Konjunktiv II</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🌀</span><div class="modal-header-text"><h2>Konjunktiv II</h2><p>Situata hipotetike</p></div></div>
            <div class="grammar-deep-section"><h3>📌 Përdorimet</h3><ul class="grammar-examples-list">
                <li><span class="de">Ich <strong>wäre</strong> gern reich.</span><span class="al">Do të doja të isha i pasur.</span></li>
                <li><span class="de">Wenn ich Zeit <strong>hätte</strong>, <strong>würde</strong> ich reisen.</span><span class="al">Sikur të kisha kohë, do të udhëtoja.</span></li>
                <li><span class="de"><strong>Könnten</strong> Sie mir helfen?</span><span class="al">A do të mundeshe të më ndihmoni?</span></li>
            </ul></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">wäre</div><div class="albanian">do të isha</div></div>
                <div class="modal-word-card"><div class="german">hätte</div><div class="albanian">do të kisha</div></div>
                <div class="modal-word-card"><div class="german">könnte</div><div class="albanian">do të mundja</div></div>
                <div class="modal-word-card"><div class="german">müsste</div><div class="albanian">do të duhej</div></div>
            </div>`
    },
    'passiv-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Passiv</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🔄</span><div class="modal-header-text"><h2>Pësore - Das Passiv</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 werden + Partizip II</h4>
                <p><strong>Aktiv:</strong> Der Koch kocht das Essen.</p>
                <p><strong>Passiv:</strong> Das Essen wird gekocht.</p>
            </div>
            <div class="grammar-deep-section"><ul class="grammar-examples-list">
                <li><span class="de">Das Haus <strong>wird</strong> gebaut.</span><span class="al">Shtëpia po ndërtohet.</span></li>
                <li><span class="de">Die E-Mail <strong>wurde</strong> gesendet.</span><span class="al">E-maili u dërgua.</span></li>
            </ul></div>`
    },
    'bewerbung-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Intervistë</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">💼</span><div class="modal-header-text"><h2>Intervistë pune - Bewerbungsgespräch</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-a">Chef:</span><span class="german">Erzählen Sie über sich.</span><span class="albanian">Tregoni për veten.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Bewerber:</span><span class="german">Ich bin 28 und habe Informatik studiert.</span><span class="albanian">Jam 28 vjeç, kam studiuar informatikë.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Chef:</span><span class="german">Was sind Ihre Stärken?</span><span class="albanian">Cilat janë pikat e forta?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Bewerber:</span><span class="german">Ich arbeite gut im Team.</span><span class="albanian">Punoj mirë në grup.</span></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Frazat kyçe</h4><p>"Zu meinen Stärken gehört..." = Ndër pikat e mia të forta...</p></div>`
    }
};

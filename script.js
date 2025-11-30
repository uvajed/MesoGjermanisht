// Mëso Gjermanisht - Interactive Learning Platform
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeSectionNavigation();
    initializeQuizzes();
    initializeTopicCards();
    initializeDictionary();
    updateProgress();
});

// Tab Navigation
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const levelContents = document.querySelectorAll('.level-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.dataset.level;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            levelContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === level) content.classList.add('active');
            });
            resetSectionNavigation(level);
        });
    });
}

// Section Navigation
function initializeSectionNavigation() {
    document.querySelectorAll('.section-nav').forEach(nav => {
        nav.querySelectorAll('.section-btn').forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.dataset.section;
                const parentLevel = nav.closest('.level-content');
                nav.querySelectorAll('.section-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                parentLevel.querySelectorAll('.section-content').forEach(section => {
                    section.classList.remove('active');
                    if (section.id === sectionId) section.classList.add('active');
                });
            });
        });
    });
}

function resetSectionNavigation(level) {
    const levelContent = document.getElementById(level);
    if (levelContent) {
        levelContent.querySelectorAll('.section-btn').forEach((btn, i) => btn.classList.toggle('active', i === 0));
        levelContent.querySelectorAll('.section-content').forEach((section, i) => section.classList.toggle('active', i === 0));
    }
}

// Topic Cards & Modal
function initializeTopicCards() {
    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(card.dataset.topic);
        });
    });
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'modal-overlay') closeModal();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

function openModal(topicId) {
    const content = topicContent[topicId];
    if (!content) return;
    document.getElementById('modal-breadcrumb').innerHTML = content.breadcrumb;
    document.getElementById('modal-content').innerHTML = content.html;
    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.querySelectorAll('.related-link').forEach(link => {
        link.addEventListener('click', () => openModal(link.dataset.topic));
    });
    document.querySelectorAll('.practice-exercise .answer').forEach(answer => {
        answer.addEventListener('click', () => answer.classList.toggle('revealed'));
    });
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Topic Content Data
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
    },
    // A2 Vocabulary - Essen
    'essen-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Ushqimi</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🍽️</span><div class="modal-header-text"><h2>Ushqimi - Das Essen</h2><p>Fjalor i zgjeruar për ushqimin</p></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">das Frühstück</div><div class="albanian">mëngjesi</div><div class="example">"Zum Frühstück esse ich Brot."</div></div>
                <div class="modal-word-card"><div class="german">das Mittagessen</div><div class="albanian">dreka</div><div class="example">"Das Mittagessen ist um 12 Uhr."</div></div>
                <div class="modal-word-card"><div class="german">das Abendessen</div><div class="albanian">darka</div><div class="example">"Was gibt es zum Abendessen?"</div></div>
                <div class="modal-word-card"><div class="german">die Suppe</div><div class="albanian">supa</div><div class="example">"Die Suppe ist heiß."</div></div>
                <div class="modal-word-card"><div class="german">der Salat</div><div class="albanian">sallata</div><div class="example">"Ich möchte einen Salat."</div></div>
                <div class="modal-word-card"><div class="german">das Hähnchen</div><div class="albanian">pula</div><div class="example">"Das Hähnchen schmeckt gut."</div></div>
                <div class="modal-word-card"><div class="german">die Kartoffel</div><div class="albanian">patatja</div><div class="example">"Kartoffeln mit Soße."</div></div>
                <div class="modal-word-card"><div class="german">der Reis</div><div class="albanian">orizi</div><div class="example">"Reis oder Nudeln?"</div></div>
                <div class="modal-word-card"><div class="german">die Nudeln</div><div class="albanian">makaronat</div><div class="example">"Nudeln mit Tomatensoße."</div></div>
                <div class="modal-word-card"><div class="german">der Kuchen</div><div class="albanian">torta</div><div class="example">"Zum Nachtisch gibt es Kuchen."</div></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Shprehje të dobishme</h4><p><strong>Guten Appetit!</strong> = Të bëftë mirë!</p><p><strong>Es schmeckt gut!</strong> = Ka shije të mirë!</p></div>`
    },
    // A2 Vocabulary - Körper
    'korper-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Trupi</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🏃</span><div class="modal-header-text"><h2>Trupi - Der Körper</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">der Kopf</div><div class="albanian">koka</div></div>
                <div class="modal-word-card"><div class="german">das Auge</div><div class="albanian">syri</div></div>
                <div class="modal-word-card"><div class="german">die Nase</div><div class="albanian">hunda</div></div>
                <div class="modal-word-card"><div class="german">der Mund</div><div class="albanian">goja</div></div>
                <div class="modal-word-card"><div class="german">das Ohr</div><div class="albanian">veshi</div></div>
                <div class="modal-word-card"><div class="german">die Hand</div><div class="albanian">dora</div></div>
                <div class="modal-word-card"><div class="german">der Arm</div><div class="albanian">krahu</div></div>
                <div class="modal-word-card"><div class="german">das Bein</div><div class="albanian">këmba</div></div>
                <div class="modal-word-card"><div class="german">der Fuß</div><div class="albanian">këmba (shputa)</div></div>
                <div class="modal-word-card"><div class="german">der Bauch</div><div class="albanian">barku</div></div>
                <div class="modal-word-card"><div class="german">der Rücken</div><div class="albanian">shpina</div></div>
                <div class="modal-word-card"><div class="german">das Herz</div><div class="albanian">zemra</div></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Për dhimbje</h4><p><strong>Ich habe Kopfschmerzen</strong> = Kam dhimbje koke</p><p><strong>Mein Arm tut weh</strong> = Më dhemb krahu</p></div>`
    },
    // A2 Vocabulary - Wetter
    'wetter-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Moti</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🌤️</span><div class="modal-header-text"><h2>Moti - Das Wetter</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">die Sonne</div><div class="albanian">dielli</div><div class="example">"Die Sonne scheint."</div></div>
                <div class="modal-word-card"><div class="german">der Regen</div><div class="albanian">shiu</div><div class="example">"Es regnet."</div></div>
                <div class="modal-word-card"><div class="german">der Schnee</div><div class="albanian">bora</div><div class="example">"Es schneit."</div></div>
                <div class="modal-word-card"><div class="german">der Wind</div><div class="albanian">era</div><div class="example">"Der Wind ist stark."</div></div>
                <div class="modal-word-card"><div class="german">die Wolke</div><div class="albanian">reja</div><div class="example">"Viele Wolken am Himmel."</div></div>
                <div class="modal-word-card"><div class="german">heiß</div><div class="albanian">nxehtë</div><div class="example">"Es ist heiß."</div></div>
                <div class="modal-word-card"><div class="german">kalt</div><div class="albanian">ftohtë</div><div class="example">"Es ist kalt."</div></div>
                <div class="modal-word-card"><div class="german">warm</div><div class="albanian">ngrohtë</div><div class="example">"Es ist warm."</div></div>
                <div class="modal-word-card"><div class="german">das Gewitter</div><div class="albanian">stuhia</div><div class="example">"Ein Gewitter kommt."</div></div>
                <div class="modal-word-card"><div class="german">der Nebel</div><div class="albanian">mjegulla</div><div class="example">"Heute ist Nebel."</div></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Pyetje për motin</h4><p><strong>Wie ist das Wetter?</strong> = Si është moti?</p><p><strong>Wie wird das Wetter morgen?</strong> = Si do të jetë moti nesër?</p></div>`
    },
    // A2 Vocabulary - Kleidung
    'kleidung-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Veshjet</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">👔</span><div class="modal-header-text"><h2>Veshjet - Die Kleidung</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">das Hemd</div><div class="albanian">këmisha</div></div>
                <div class="modal-word-card"><div class="german">die Hose</div><div class="albanian">pantallona</div></div>
                <div class="modal-word-card"><div class="german">das Kleid</div><div class="albanian">fustani</div></div>
                <div class="modal-word-card"><div class="german">der Rock</div><div class="albanian">fundi</div></div>
                <div class="modal-word-card"><div class="german">die Jacke</div><div class="albanian">xhaketa</div></div>
                <div class="modal-word-card"><div class="german">der Mantel</div><div class="albanian">pallto</div></div>
                <div class="modal-word-card"><div class="german">die Schuhe</div><div class="albanian">këpucët</div></div>
                <div class="modal-word-card"><div class="german">die Socken</div><div class="albanian">çorapet</div></div>
                <div class="modal-word-card"><div class="german">der Pullover</div><div class="albanian">triko</div></div>
                <div class="modal-word-card"><div class="german">die Mütze</div><div class="albanian">kapela</div></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Në dyqan</h4><p><strong>Kann ich das anprobieren?</strong> = A mund ta provoj?</p><p><strong>Das passt mir gut.</strong> = Më shkon mirë.</p></div>`
    },
    // A2 Grammar - Präpositionen
    'prapositionen-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Parafjalët</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📌</span><div class="modal-header-text"><h2>Parafjalët - Präpositionen</h2></div></div>
            <div class="grammar-deep-section"><h3>📌 Akkusativ Präpositionen</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>für</strong></span><span class="al">për - Das ist für dich.</span></li>
                <li><span class="de"><strong>gegen</strong></span><span class="al">kundër - gegen die Wand</span></li>
                <li><span class="de"><strong>ohne</strong></span><span class="al">pa - ohne mich</span></li>
                <li><span class="de"><strong>durch</strong></span><span class="al">përmes - durch die Stadt</span></li>
                <li><span class="de"><strong>um</strong></span><span class="al">rreth - um den Tisch</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Dativ Präpositionen</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>mit</strong></span><span class="al">me - mit dem Auto</span></li>
                <li><span class="de"><strong>bei</strong></span><span class="al">tek - bei mir</span></li>
                <li><span class="de"><strong>nach</strong></span><span class="al">pas, drejt - nach Hause</span></li>
                <li><span class="de"><strong>von</strong></span><span class="al">nga - von der Arbeit</span></li>
                <li><span class="de"><strong>zu</strong></span><span class="al">te, drejt - zum Arzt</span></li>
                <li><span class="de"><strong>aus</strong></span><span class="al">nga - aus Albanien</span></li>
                <li><span class="de"><strong>seit</strong></span><span class="al">që nga - seit zwei Jahren</span></li>
            </ul></div>
            <div class="grammar-rule-box"><h4>💡 Këshillë</h4><p>Mëso: <strong>für, gegen, ohne, durch, um</strong> = Akkusativ</p><p><strong>mit, bei, nach, von, zu, aus, seit</strong> = Dativ</p></div>`
    },
    // A2 Grammar - Nebensätze
    'nebensatze-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Fjali Dytësore</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🔀</span><div class="modal-header-text"><h2>Fjali Dytësore - Nebensätze</h2><p>Folja shkon në fund!</p></div></div>
            <div class="grammar-rule-box"><h4>🎯 Rregulli kryesor</h4><p>Në fjalitë dytësore, folja shkon në <strong>FUND</strong> të fjalisë!</p></div>
            <div class="grammar-deep-section"><h3>📌 weil (sepse)</h3><ul class="grammar-examples-list">
                <li><span class="de">Ich lerne Deutsch, <strong>weil</strong> ich in Deutschland arbeiten <strong>will</strong>.</span><span class="al">Mësoj gjermanisht sepse dua të punoj në Gjermani.</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 dass (që)</h3><ul class="grammar-examples-list">
                <li><span class="de">Ich denke, <strong>dass</strong> er nett <strong>ist</strong>.</span><span class="al">Mendoj që ai është i mirë.</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 wenn (kur, nëse)</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>Wenn</strong> ich Zeit <strong>habe</strong>, gehe ich ins Kino.</span><span class="al">Kur kam kohë, shkoj në kinema.</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 obwohl (megjithëse)</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>Obwohl</strong> es regnet, gehe ich <strong>spazieren</strong>.</span><span class="al">Megjithëse bie shi, shkoj në shëtitje.</span></li>
            </ul></div>`
    },
    // A2 Grammar - Komparativ
    'komparativ-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Krahasimi</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📊</span><div class="modal-header-text"><h2>Krahasimi - Komparativ & Superlativ</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 Formimi</h4><p><strong>Komparativ:</strong> + er (schneller, größer)</p><p><strong>Superlativ:</strong> am + sten (am schnellsten)</p></div>
            <div class="grammar-deep-section"><h3>📌 Shembuj</h3><ul class="grammar-examples-list">
                <li><span class="de">schnell → schnell<strong>er</strong> → am schnell<strong>sten</strong></span><span class="al">shpejt → më shpejt → më i shpejti</span></li>
                <li><span class="de">groß → größ<strong>er</strong> → am größ<strong>ten</strong></span><span class="al">i madh → më i madh → më i madhi</span></li>
                <li><span class="de">alt →ält<strong>er</strong> → amält<strong>esten</strong></span><span class="al">i vjetër → më i vjetër → më i vjetri</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>⚠️ Të parregullt</h3><ul class="grammar-examples-list">
                <li><span class="de">gut → besser → am besten</span><span class="al">mirë → më mirë → më i miri</span></li>
                <li><span class="de">viel → mehr → am meisten</span><span class="al">shumë → më shumë → më së shumti</span></li>
                <li><span class="de">gern → lieber → am liebsten</span><span class="al">me qejf → më me qejf → më së shumti</span></li>
            </ul></div>
            <div class="grammar-rule-box"><h4>📌 Krahasim me "als" dhe "wie"</h4><p><strong>so ... wie</strong> = aq ... sa (barazim)</p><p><strong>...er als</strong> = më ... se (ndryshim)</p></div>`
    },
    // A2 Examples - Restaurant
    'restaurant-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Restorant</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🍴</span><div class="modal-header-text"><h2>Në restorant - Im Restaurant</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-a">Kellner:</span><span class="german">Haben Sie reserviert?</span><span class="albanian">Keni rezervuar?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Gast:</span><span class="german">Ja, auf den Namen Müller.</span><span class="albanian">Po, me emrin Müller.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Kellner:</span><span class="german">Was möchten Sie bestellen?</span><span class="albanian">Çfarë dëshironi të porosisni?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Gast:</span><span class="german">Ich hätte gern das Schnitzel mit Pommes.</span><span class="albanian">Do të doja shnicëllin me patate.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Kellner:</span><span class="german">Und zu trinken?</span><span class="albanian">Dhe për të pirë?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Gast:</span><span class="german">Ein Glas Wasser, bitte.</span><span class="albanian">Një gotë ujë, ju lutem.</span></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Frazat kyçe</h4><p><strong>Die Rechnung, bitte!</strong> = Faturën, ju lutem!</p><p><strong>Stimmt so.</strong> = Mbaje kushurin (bakshishin).</p></div>`
    },
    // A2 Examples - Telefon
    'telefon-a2': {
        breadcrumb: '<span class="breadcrumb-item">A2</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Telefon</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📞</span><div class="modal-header-text"><h2>Në telefon - Am Telefon</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-a">Anna:</span><span class="german">Hallo, hier ist Anna Meier.</span><span class="albanian">Alo, këtu është Anna Meier.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Sekretärin:</span><span class="german">Guten Tag, wie kann ich Ihnen helfen?</span><span class="albanian">Mirëdita, si mund t'ju ndihmoj?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Anna:</span><span class="german">Ich möchte einen Termin machen.</span><span class="albanian">Dua të caktoj një takim.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Sekretärin:</span><span class="german">Einen Moment, bitte. Ich verbinde Sie.</span><span class="albanian">Një moment, ju lutem. Po ju lidh.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Anna:</span><span class="german">Danke, ich warte.</span><span class="albanian">Faleminderit, pres.</span></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Frazat kyçe</h4><p><strong>Kann ich eine Nachricht hinterlassen?</strong> = A mund të lë një mesazh?</p><p><strong>Können Sie das buchstabieren?</strong> = A mund ta shkruani shkronjë për shkronjë?</p></div>`
    },
    // B1 Vocabulary - Meinung
    'meinung-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Opinioni</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">💭</span><div class="modal-header-text"><h2>Shprehje Opinioni - Meinungsäußerung</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">Meiner Meinung nach...</div><div class="albanian">Sipas mendimit tim...</div></div>
                <div class="modal-word-card"><div class="german">Ich denke, dass...</div><div class="albanian">Mendoj që...</div></div>
                <div class="modal-word-card"><div class="german">Ich bin der Meinung...</div><div class="albanian">Jam i mendimit...</div></div>
                <div class="modal-word-card"><div class="german">Ich finde...</div><div class="albanian">Gjej/Mendoj...</div></div>
                <div class="modal-word-card"><div class="german">Ich glaube...</div><div class="albanian">Besoj...</div></div>
                <div class="modal-word-card"><div class="german">Es scheint mir...</div><div class="albanian">Më duket...</div></div>
                <div class="modal-word-card"><div class="german">Ich stimme zu.</div><div class="albanian">Pajtohem.</div></div>
                <div class="modal-word-card"><div class="german">Ich bin dagegen.</div><div class="albanian">Jam kundër.</div></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Për të kundërshtuar</h4><p><strong>Das sehe ich anders.</strong> = E shoh ndryshe.</p><p><strong>Da bin ich anderer Meinung.</strong> = Kam mendim tjetër.</p></div>`
    },
    // B1 Vocabulary - Umwelt
    'umwelt-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Mjedisi</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🌍</span><div class="modal-header-text"><h2>Mjedisi & Shoqëria - Umwelt & Gesellschaft</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">die Umwelt</div><div class="albanian">mjedisi</div></div>
                <div class="modal-word-card"><div class="german">der Klimawandel</div><div class="albanian">ndryshimet klimatike</div></div>
                <div class="modal-word-card"><div class="german">die Verschmutzung</div><div class="albanian">ndotja</div></div>
                <div class="modal-word-card"><div class="german">recyceln</div><div class="albanian">ricikloj</div></div>
                <div class="modal-word-card"><div class="german">die Energie</div><div class="albanian">energjia</div></div>
                <div class="modal-word-card"><div class="german">erneuerbar</div><div class="albanian">i rinovueshëm</div></div>
                <div class="modal-word-card"><div class="german">die Gesellschaft</div><div class="albanian">shoqëria</div></div>
                <div class="modal-word-card"><div class="german">die Arbeitslosigkeit</div><div class="albanian">papunësia</div></div>
                <div class="modal-word-card"><div class="german">die Gleichberechtigung</div><div class="albanian">barazia</div></div>
                <div class="modal-word-card"><div class="german">nachhaltig</div><div class="albanian">i qëndrueshëm</div></div>
            </div>`
    },
    // B1 Vocabulary - Konnektoren
    'konnektoren-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Lidhëzat</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📊</span><div class="modal-header-text"><h2>Fjalë Lidhëse - Konnektoren</h2></div></div>
            <div class="grammar-deep-section"><h3>📌 Shkak & Pasojë</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>deshalb / deswegen</strong></span><span class="al">prandaj</span></li>
                <li><span class="de"><strong>darum / daher</strong></span><span class="al">për këtë arsye</span></li>
                <li><span class="de"><strong>trotzdem</strong></span><span class="al">megjithatë</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Shtim & Kundërshtim</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>außerdem</strong></span><span class="al">përveç kësaj</span></li>
                <li><span class="de"><strong>jedoch / allerdings</strong></span><span class="al">megjithatë</span></li>
                <li><span class="de"><strong>einerseits ... andererseits</strong></span><span class="al">nga njëra anë ... nga ana tjetër</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Kohë</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>bevor</strong></span><span class="al">para se</span></li>
                <li><span class="de"><strong>nachdem</strong></span><span class="al">pasi</span></li>
                <li><span class="de"><strong>während</strong></span><span class="al">ndërsa</span></li>
                <li><span class="de"><strong>sobald</strong></span><span class="al">sapo</span></li>
            </ul></div>`
    },
    // B1 Vocabulary - Arbeit
    'arbeit-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Puna</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">💼</span><div class="modal-header-text"><h2>Puna & Karriera - Arbeit & Karriere</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">die Bewerbung</div><div class="albanian">aplikimi</div></div>
                <div class="modal-word-card"><div class="german">der Lebenslauf</div><div class="albanian">CV-ja</div></div>
                <div class="modal-word-card"><div class="german">das Vorstellungsgespräch</div><div class="albanian">intervista</div></div>
                <div class="modal-word-card"><div class="german">der Vertrag</div><div class="albanian">kontrata</div></div>
                <div class="modal-word-card"><div class="german">das Gehalt</div><div class="albanian">paga</div></div>
                <div class="modal-word-card"><div class="german">die Überstunden</div><div class="albanian">orët shtesë</div></div>
                <div class="modal-word-card"><div class="german">der Urlaub</div><div class="albanian">pushimet</div></div>
                <div class="modal-word-card"><div class="german">kündigen</div><div class="albanian">jap dorëheqjen</div></div>
                <div class="modal-word-card"><div class="german">befördern</div><div class="albanian">promovoj</div></div>
                <div class="modal-word-card"><div class="german">die Erfahrung</div><div class="albanian">përvoja</div></div>
            </div>`
    },
    // B1 Vocabulary - Medien
    'medien-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Media</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📱</span><div class="modal-header-text"><h2>Media & Teknologjia - Medien & Technologie</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">das Internet</div><div class="albanian">interneti</div></div>
                <div class="modal-word-card"><div class="german">die sozialen Medien</div><div class="albanian">rrjetet sociale</div></div>
                <div class="modal-word-card"><div class="german">die Nachricht</div><div class="albanian">lajmi</div></div>
                <div class="modal-word-card"><div class="german">die Werbung</div><div class="albanian">reklama</div></div>
                <div class="modal-word-card"><div class="german">herunterladen</div><div class="albanian">shkarkoj</div></div>
                <div class="modal-word-card"><div class="german">hochladen</div><div class="albanian">ngarkoj</div></div>
                <div class="modal-word-card"><div class="german">teilen</div><div class="albanian">ndaj</div></div>
                <div class="modal-word-card"><div class="german">die App</div><div class="albanian">aplikacioni</div></div>
                <div class="modal-word-card"><div class="german">das Passwort</div><div class="albanian">fjalëkalimi</div></div>
                <div class="modal-word-card"><div class="german">der Datenschutz</div><div class="albanian">mbrojtja e të dhënave</div></div>
            </div>`
    },
    // B1 Vocabulary - Redewendungen
    'redewendungen-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Fjalor</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Shprehje</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">💬</span><div class="modal-header-text"><h2>Shprehje Idiomatike - Redewendungen</h2></div></div>
            <div class="modal-word-grid">
                <div class="modal-word-card"><div class="german">Daumen drücken</div><div class="albanian">Të uroj fat (fjalë për fjalë: shtyp gishtin)</div><div class="example">"Ich drücke dir die Daumen!"</div></div>
                <div class="modal-word-card"><div class="german">ins Fettnäpfchen treten</div><div class="albanian">Bëj gafë</div><div class="example">"Er ist ins Fettnäpfchen getreten."</div></div>
                <div class="modal-word-card"><div class="german">Schwein haben</div><div class="albanian">Kam fat</div><div class="example">"Da hast du Schwein gehabt!"</div></div>
                <div class="modal-word-card"><div class="german">die Nase voll haben</div><div class="albanian">Më ka ardhur në majë të hundës</div><div class="example">"Ich habe die Nase voll!"</div></div>
                <div class="modal-word-card"><div class="german">unter vier Augen</div><div class="albanian">Sy më sy (privatisht)</div><div class="example">"Lass uns unter vier Augen reden."</div></div>
                <div class="modal-word-card"><div class="german">jemanden auf den Arm nehmen</div><div class="albanian">Tall dikë</div><div class="example">"Du nimmst mich auf den Arm!"</div></div>
            </div>`
    },
    // B1 Grammar - Genitiv
    'genitiv-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Genitiv</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📍</span><div class="modal-header-text"><h2>Rasa Gjinore - Der Genitiv</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 Formimi</h4><p><strong>der/das</strong> → des + (e)s | <strong>die</strong> → der</p></div>
            <div class="grammar-deep-section"><h3>📌 Shembuj</h3><ul class="grammar-examples-list">
                <li><span class="de">Das Auto <strong>des Mannes</strong></span><span class="al">Makina e burrit</span></li>
                <li><span class="de">Die Tasche <strong>der Frau</strong></span><span class="al">Çanta e gruas</span></li>
                <li><span class="de">Das Spielzeug <strong>des Kindes</strong></span><span class="al">Lodra e fëmijës</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Parafjalë me Genitiv</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>wegen</strong></span><span class="al">për shkak të - wegen des Wetters</span></li>
                <li><span class="de"><strong>trotz</strong></span><span class="al">pavarësisht - trotz des Regens</span></li>
                <li><span class="de"><strong>während</strong></span><span class="al">gjatë - während der Arbeit</span></li>
                <li><span class="de"><strong>statt</strong></span><span class="al">në vend të - statt des Autos</span></li>
            </ul></div>`
    },
    // B1 Grammar - Relativsätze
    'relativsatze-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Fjali Relative</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📝</span><div class="modal-header-text"><h2>Fjali Relative - Relativsätze</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 Përemrat relativë</h4><p>Nominativ: der, die, das | Akkusativ: den, die, das | Dativ: dem, der, dem</p></div>
            <div class="grammar-deep-section"><h3>📌 Shembuj Nominativ</h3><ul class="grammar-examples-list">
                <li><span class="de">Der Mann, <strong>der</strong> dort steht, ist mein Bruder.</span><span class="al">Burri që qëndron atje është vëllai im.</span></li>
                <li><span class="de">Die Frau, <strong>die</strong> singt, ist Lehrerin.</span><span class="al">Gruaja që këndon është mësuese.</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Shembuj Akkusativ</h3><ul class="grammar-examples-list">
                <li><span class="de">Das Buch, <strong>das</strong> ich lese, ist interessant.</span><span class="al">Libri që po lexoj është interesant.</span></li>
                <li><span class="de">Der Film, <strong>den</strong> wir gesehen haben, war gut.</span><span class="al">Filmi që pamë ishte i mirë.</span></li>
            </ul></div>`
    },
    // B1 Grammar - Indirekte Rede
    'indirekte-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Ligjërata e Zhdrejtë</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">💬</span><div class="modal-header-text"><h2>Ligjërata e Zhdrejtë - Indirekte Rede</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 Formimi</h4><p>Përdor <strong>Konjunktiv I</strong> ose <strong>würde + Infinitiv</strong></p></div>
            <div class="grammar-deep-section"><h3>📌 Direkte → Indirekte</h3><ul class="grammar-examples-list">
                <li><span class="de">Er sagt: "Ich <strong>bin</strong> müde."</span><span class="al">Ai thotë: "Jam i lodhur."</span></li>
                <li><span class="de">Er sagt, er <strong>sei</strong> müde.</span><span class="al">Ai thotë që është i lodhur.</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Me würde (më e thjeshtë)</h3><ul class="grammar-examples-list">
                <li><span class="de">Sie sagt, sie <strong>würde</strong> morgen kommen.</span><span class="al">Ajo thotë që do të vinte nesër.</span></li>
            </ul></div>`
    },
    // B1 Grammar - Plusquamperfekt
    'plusquamperfekt-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Gramatikë</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Plusquamperfekt</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">⏪</span><div class="modal-header-text"><h2>E kryera e tejshkuar - Das Plusquamperfekt</h2></div></div>
            <div class="grammar-rule-box"><h4>📐 Formimi</h4><p><strong>hatte/war</strong> + Partizip II</p></div>
            <div class="grammar-deep-section"><h3>📌 Përdorimi</h3><p>Për veprime që ndodhën <strong>para</strong> një veprimi tjetër në të kaluarën.</p></div>
            <div class="grammar-deep-section"><h3>📌 Shembuj</h3><ul class="grammar-examples-list">
                <li><span class="de">Nachdem ich gegessen <strong>hatte</strong>, ging ich spazieren.</span><span class="al">Pasi kisha ngrënë, shkova në shëtitje.</span></li>
                <li><span class="de">Als er ankam, <strong>waren</strong> wir schon gegangen.</span><span class="al">Kur mbërriti, ne kishim ikur tashmë.</span></li>
                <li><span class="de">Sie <strong>hatte</strong> das Buch schon gelesen.</span><span class="al">Ajo e kishte lexuar tashmë librin.</span></li>
            </ul></div>`
    },
    // B1 Examples - Diskussion
    'diskussion-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Diskutim</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📰</span><div class="modal-header-text"><h2>Diskutim - Diskussion</h2></div></div>
            <div class="dialogue-box">
                <div class="dialogue-line"><span class="speaker speaker-a">Maria:</span><span class="german">Meiner Meinung nach sollten wir mehr recyceln.</span><span class="albanian">Sipas mendimit tim duhet të riciklojmë më shumë.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Peter:</span><span class="german">Da stimme ich dir zu, aber es ist nicht so einfach.</span><span class="albanian">Pajtohem, por nuk është aq e thjeshtë.</span></div>
                <div class="dialogue-line"><span class="speaker speaker-a">Maria:</span><span class="german">Warum denkst du das?</span><span class="albanian">Pse mendon kështu?</span></div>
                <div class="dialogue-line"><span class="speaker speaker-b">Peter:</span><span class="german">Einerseits fehlt die Infrastruktur, andererseits sind viele Leute nicht informiert.</span><span class="albanian">Nga njëra anë mungon infrastruktura, nga ana tjetër shumë njerëz nuk janë të informuar.</span></div>
            </div>
            <div class="grammar-rule-box"><h4>📌 Frazat kyçe</h4><p><strong>Ich bin der Meinung, dass...</strong> = Jam i mendimit që...</p><p><strong>Das sehe ich anders.</strong> = E shoh ndryshe.</p></div>`
    },
    // B1 Examples - Beschwerde
    'beschwerde-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Ankesë</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">📝</span><div class="modal-header-text"><h2>Ankesë formale - Formelle Beschwerde</h2></div></div>
            <div class="grammar-deep-section"><h3>📌 Struktura e letrës</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>Sehr geehrte Damen und Herren,</strong></span><span class="al">Të nderuar zonja dhe zotërinj,</span></li>
                <li><span class="de"><strong>ich schreibe Ihnen, weil...</strong></span><span class="al">Ju shkruaj sepse...</span></li>
                <li><span class="de"><strong>Ich möchte mich beschweren über...</strong></span><span class="al">Dua të ankohem për...</span></li>
                <li><span class="de"><strong>Ich erwarte eine baldige Antwort.</strong></span><span class="al">Pres një përgjigje të shpejtë.</span></li>
                <li><span class="de"><strong>Mit freundlichen Grüßen</strong></span><span class="al">Me respekt</span></li>
            </ul></div>
            <div class="grammar-rule-box"><h4>📌 Frazat e dobishme</h4><p><strong>Das ist inakzeptabel.</strong> = Kjo është e papranueshme.</p><p><strong>Ich fordere eine Erstattung.</strong> = Kërkoj rimbursim.</p></div>`
    },
    // B1 Examples - Präsentation
    'praesentation-b1': {
        breadcrumb: '<span class="breadcrumb-item">B1</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item">Shembuj</span><span class="breadcrumb-separator">→</span><span class="breadcrumb-item current">Prezantim</span>',
        html: `<div class="modal-header"><span class="modal-header-icon">🎤</span><div class="modal-header-text"><h2>Prezantim - Präsentation</h2></div></div>
            <div class="grammar-deep-section"><h3>📌 Hyrja</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>Heute möchte ich über... sprechen.</strong></span><span class="al">Sot dua të flas për...</span></li>
                <li><span class="de"><strong>Mein Thema heute ist...</strong></span><span class="al">Tema ime sot është...</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Struktura</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>Zuerst werde ich... erklären.</strong></span><span class="al">Së pari do të shpjegoj...</span></li>
                <li><span class="de"><strong>Dann möchte ich... zeigen.</strong></span><span class="al">Pastaj dua të tregoj...</span></li>
                <li><span class="de"><strong>Zum Schluss...</strong></span><span class="al">Në fund...</span></li>
            </ul></div>
            <div class="grammar-deep-section"><h3>📌 Përfundimi</h3><ul class="grammar-examples-list">
                <li><span class="de"><strong>Zusammenfassend kann man sagen...</strong></span><span class="al">Duke përmbledhur mund të thuhet...</span></li>
                <li><span class="de"><strong>Haben Sie noch Fragen?</strong></span><span class="al">Keni pyetje?</span></li>
                <li><span class="de"><strong>Vielen Dank für Ihre Aufmerksamkeit!</strong></span><span class="al">Faleminderit për vëmendjen tuaj!</span></li>
            </ul></div>`
    }
};

// Dictionary Functionality
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
            input.placeholder = currentDirection === 'de-sq'
                ? 'Shkruaj fjalën në gjermanisht...'
                : 'Shkruaj fjalën në shqip...';
        });
    });

    // Search function
    function performSearch() {
        const term = input.value.trim();
        if (!term) return;

        const dictUrl = currentDirection === 'de-sq'
            ? `https://de-sq.dict.cc/?s=${encodeURIComponent(term)}`
            : `https://sq-de.dict.cc/?s=${encodeURIComponent(term)}`;

        const glosbeUrl = currentDirection === 'de-sq'
            ? `https://glosbe.com/de/sq/${encodeURIComponent(term)}`
            : `https://glosbe.com/sq/de/${encodeURIComponent(term)}`;

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

    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// Quiz System
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

const quizState = { a1: { currentQuestion: 0, score: 0, answered: false }, a2: { currentQuestion: 0, score: 0, answered: false }, b1: { currentQuestion: 0, score: 0, answered: false } };

function initializeQuizzes() {
    ['a1', 'a2', 'b1'].forEach(level => {
        loadQuestion(level);
        document.getElementById(`${level}-next-btn`).addEventListener('click', () => { quizState[level].currentQuestion++; loadQuestion(level); });
        document.getElementById(`${level}-restart-btn`).addEventListener('click', () => { quizState[level] = { currentQuestion: 0, score: 0, answered: false }; document.getElementById(`${level}-restart-btn`).style.display = 'none'; loadQuestion(level); });
    });
}

function loadQuestion(level) {
    const state = quizState[level];
    if (state.currentQuestion >= quizData[level].length) { showResults(level); return; }
    const q = quizData[level][state.currentQuestion];
    document.getElementById(`${level}-question`).textContent = q.question;
    document.getElementById(`${level}-question-num`).textContent = state.currentQuestion + 1;
    document.getElementById(`${level}-score`).textContent = state.score;
    const opts = document.getElementById(`${level}-options`);
    opts.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleAnswer(level, i));
        opts.appendChild(btn);
    });
    state.answered = false;
    document.getElementById(`${level}-feedback`).classList.remove('show', 'correct', 'incorrect');
    document.getElementById(`${level}-next-btn`).style.display = 'none';
    document.getElementById(`${level}-results`).style.display = 'none';
    document.querySelector(`#quiz-${level}-game .quiz-question-container`).style.display = 'block';
}

function handleAnswer(level, idx) {
    const state = quizState[level];
    if (state.answered) return;
    state.answered = true;
    const q = quizData[level][state.currentQuestion];
    const opts = document.querySelectorAll(`#${level}-options .quiz-option`);
    opts.forEach(o => o.classList.add('disabled'));
    opts[q.correct].classList.add('correct');
    const fb = document.getElementById(`${level}-feedback`);
    if (idx === q.correct) { state.score++; document.getElementById(`${level}-score`).textContent = state.score; fb.textContent = `✅ Saktë! ${q.explanation}`; fb.classList.add('correct'); }
    else { opts[idx].classList.add('incorrect'); fb.textContent = `❌ Gabim! ${q.explanation}`; fb.classList.add('incorrect'); }
    fb.classList.add('show');
    document.getElementById(`${level}-next-btn`).style.display = 'inline-block';
    updateProgress();
}

function showResults(level) {
    const state = quizState[level];
    const pct = Math.round((state.score / quizData[level].length) * 100);
    document.querySelector(`#quiz-${level}-game .quiz-question-container`).style.display = 'none';
    document.getElementById(`${level}-feedback`).classList.remove('show');
    document.getElementById(`${level}-next-btn`).style.display = 'none';
    document.getElementById(`${level}-results`).style.display = 'block';
    document.getElementById(`${level}-final-score`).textContent = pct;
    document.getElementById(`${level}-results-message`).textContent = pct >= 80 ? '🎉 Shkëlqyeshëm!' : pct >= 60 ? '👍 Mirë!' : pct >= 40 ? '📚 Praktiko!' : '💪 Mëso përsëri!';
    document.getElementById(`${level}-restart-btn`).style.display = 'inline-block';
}

function updateProgress() {
    ['a1', 'a2', 'b1'].forEach(level => {
        const bar = document.getElementById(`${level}-progress`);
        if (bar) bar.style.width = `${(quizState[level].currentQuestion / quizData[level].length) * 100}%`;
    });
}

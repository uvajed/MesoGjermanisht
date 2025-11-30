// Mëso Gjermanisht - Interactive Learning Platform
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeSectionNavigation();
    initializeQuizzes();
    initializeTopicCards();
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
    }
};

// Add remaining topics as empty placeholders
['essen-a2','korper-a2','wetter-a2','kleidung-a2','prapositionen-a2','nebensatze-a2','komparativ-a2','restaurant-a2','telefon-a2',
'meinung-b1','umwelt-b1','konnektoren-b1','arbeit-b1','medien-b1','redewendungen-b1','genitiv-b1','relativsatze-b1','indirekte-b1','plusquamperfekt-b1','diskussion-b1','beschwerde-b1','praesentation-b1'].forEach(id => {
    if (!topicContent[id]) {
        topicContent[id] = {
            breadcrumb: '<span class="breadcrumb-item current">Duke u zhvilluar...</span>',
            html: '<div class="modal-header"><span class="modal-header-icon">🚧</span><div class="modal-header-text"><h2>Duke u zhvilluar</h2><p>Kjo temë do të shtohet së shpejti!</p></div></div>'
        };
    }
});

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

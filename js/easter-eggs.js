/**
 * Easter Eggs für die Rosenrausch-Website
 * - Wechselnde lustige Sprüche auf Fehlerseiten (404, 500, etc.)
 * - Konami-Code Easter Egg
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fehlerseiten-Sprüche initialisieren
    initErrorPageQuotes();

    // Funktion zur Initialisierung der Fehlerseiten-Sprüche
    function initErrorPageQuotes() {
        // Prüfen ob wir uns auf einer Fehlerseite befinden
        const isErrorPage = document.querySelector('.error-container');
        if (!isErrorPage) return;

        // Den Fehlercode aus dem Titel oder URL extrahieren
        const errorCodeElement = document.querySelector('.error-code');
        let errorCode = '404'; // Standard-Fehlercode

        if (errorCodeElement) {
            errorCode = errorCodeElement.textContent.trim();
        } else if (window.location.pathname.includes('error')) {
            // Versuchen, den Fehlercode aus der URL zu extrahieren (z.B. 500.html oder error-500.html)
            const errorMatch = window.location.pathname.match(/(\d{3})/); 
            if (errorMatch) errorCode = errorMatch[1];
        }

        // Sprüche nach Fehlercode-Kategorien
        const errorQuotes = {
            // 404 - Seite nicht gefunden
            '404': [
                'Diese Seite scheint im digitalen Nirvana verschwunden zu sein.<br>Vielleicht hast du dich vertippt oder die Seite ist umgezogen?',
                'Die gute Nachricht: Du hast eine 404-Seite gefunden! Die schlechte: Es ist nicht die Seite, die du gesucht hast.',
                'Wenn diese Seite ein Minecraft-Block wäre, wäre sie unsichtbar.',
                'Diese Seite ist wie ein Ninja - sie war nie wirklich hier.',
                'Die von dir gesuchte Seite macht gerade Pause. Vermutlich am Strand mit einem kühlen Getränk.',
                'Willkommen im Club der verlorenen Seiten! Wir haben Kekse.',
                'Diese Seite hat Soziale Distanz sehr ernst genommen und ist komplett verschwunden.',
                'Error 404: Witz nicht gefunden. Genau wie diese Seite.',
                'Diese Seite wurde von Endermen entführt. Wir arbeiten an ihrer Rettung.',
                'Wenn du diese Seite siehst, hast du offiziell das Ende des Internets erreicht. Glückwunsch!',
                'Diese Seite existiert in einer Parallelwelt, in der alle Links funktionieren.',
                'Die gesuchte Seite wurde von Thanos weggeschnippt.',
                'Diese URL ist wie ein QR-Code zu einem Rätsel, das niemand lösen kann.',
                'Oops! Diese Seite ist wie ein perfekter Reim in einem Rosenrausch-Song - sie existiert noch nicht.'
            ],
            // 403 - Zugriff verweigert
            '403': [
                'Zugriff verweigert! Diese Seite hat einen VIP-Bereich und dein Name steht nicht auf der Liste.',
                'Diese Seite ist so exklusiv, dass selbst wir keinen Zugang haben.',
                'Du kommst hier nicht rein! Diese Seite hat bessere Security als ein Club am Samstagabend.',
                'Diese Seite hat dich gesehen und sich entschieden: Nö.',
                'Wir würden dich ja reinlassen, aber die Seite hat "Bitte nicht stören" an ihrer Tür hängen.'
            ],
            // 500 - Server-Fehler
            '500': [
                'Unser Server hatte gerade einen kleinen Nervenzusammenbruch. Wir bringen ihm jetzt einen Beruhigungstee.',
                'Der Server ist gerade in eine existenzielle Krise geraten. Bitte hab etwas Geduld.',
                'Fehler 500: Der Server versuchte zu denken, aber es tat weh.',
                'Unser Server ist gerade in Therapie. Er kommt bald wieder, versprochen!',
                'Der Server war kurz davor, einen Witz zu erzählen, aber dann hat er sich verschluckt.'
            ],
            // 418 - I'm a teapot (Spaß-Fehlercode)
            '418': [
                'Ich bin eine Teekanne. Ehrlich gesagt kann ich keine Webseiten ausgeben, nur Tee.',
                'Wenn du Kaffee wolltest, bist du hier falsch. Ich mache nur Tee.',
                'TEEKANNE-MODUS AKTIVIERT. Bitte füge heißes Wasser hinzu und warte 3-5 Minuten.',
                'Diese Seite identifiziert sich als Teekanne und weigert sich, deiner Bitte nachzukommen.',
                'Kurz und knapp: Tee > Kaffee > Webseiten'
            ],
            // 401 - Nicht autorisiert
            '401': [
                'Hey, wir kennen dich nicht! Hast du dein Passwort vergessen oder bist du vielleicht ein Spion?',
                'Entschuldigung, aber diese Seite ist nur für Superhelden. Hast du deinen Ausweis dabei?',
                'Wer bist du? Identifiziere dich! Diese Seite ist streng geheim.',
                'Ohne Berechtigung geht hier gar nichts. Versuch es mal mit "Bitte".'
            ],
            // Allgemeine Fehler für alle anderen Codes
            'default': [
                'Das Internet hatte einen Schluckauf. Bitte versuche es später noch einmal.',
                'Etwas ist schiefgelaufen, aber wir sind schon dabei, es zu reparieren.',
                'Houston, wir haben ein Problem. Aber keine Sorge, wir sind auf dem Fall.',
                'Fehler gefunden! Leider war es nicht der Fehler, den du gesucht hast.',
                'Die Seite macht gerade eine Pause. Sie ist gleich wieder da.'
            ]
        };

        // Wähle einen zufälligen Spruch basierend auf dem Fehlercode
        const quotes = errorQuotes[errorCode] || errorQuotes['default'];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        // Ersetze den Spruch in der .funny-text Klasse
        const funnyTextElement = document.querySelector('.funny-text');
        if (funnyTextElement && randomQuote) {
            funnyTextElement.innerHTML = randomQuote;
        }

        // Konami-Code Easter Egg
        if (errorCode === '404') {
            initKonamiCode(funnyTextElement);
        }
    }

    // Konami-Code Implementation
    function initKonamiCode(textElement) {
        if (!textElement) return;

        let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        let konamiIndex = 0;

        document.addEventListener('keydown', function(e) {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    // Konami-Code aktiviert - spezielle Nachricht anzeigen
                    textElement.innerHTML = 'Du hast den Konami-Code gefunden! Leider können wir dir trotzdem nicht helfen, diese Seite zu finden. 🎮';
                    textElement.style.color = '#ff69b4';
                    textElement.style.textShadow = '0 0 10px #ff69b4';
                    
                    // Kurzer Regenbogen-Effekt
                    document.body.style.background = 'linear-gradient(45deg, #ff3366, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd, #ff69b4) fixed';
                    document.body.style.backgroundSize = '400% 400%';
                    document.body.style.animation = 'rainbow 2s ease infinite';
                    
                    // CSS Animation für Regenbogen-Effekt hinzufügen
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes rainbow {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    setTimeout(() => {
                        // Zurück zum normalen Design nach 3 Sekunden
                        document.body.style.background = 'linear-gradient(135deg, #2D1B69 0%, #1A1033 100%) fixed';
                        document.body.style.animation = '';
                        textElement.style.color = '#C4B5FD';
                        textElement.style.textShadow = '';
                    }, 3000);
                    
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    // Zusätzliche Easter Eggs für verschiedene Tastenkombinationen
    initAdditionalEasterEggs();

    function initAdditionalEasterEggs() {
        let sequence = [];
        
        document.addEventListener('keydown', function(e) {
            sequence.push(e.key);
            
            // Behalte nur die letzten 10 Tasten
            if (sequence.length > 10) {
                sequence.shift();
            }
            
            // Prüfe auf verschiedene Sequenzen
            const sequenceString = sequence.join('').toLowerCase();
            
            if (sequenceString.includes('rosenrausch')) {
                showEasterEgg('🌹 Rosenrausch gefunden! Du kennst uns gut! 🎵');
                sequence = [];
            } else if (sequenceString.includes('minecraft')) {
                showEasterEgg('⛏️ Minecraft-Fan entdeckt! Komm auf unseren Server! 🎮');
                sequence = [];
            } else if (sequenceString.includes('help')) {
                showEasterEgg('🆘 Hilfe ist unterwegs! Versuche es mit der Startseite. 🏠');
                sequence = [];
            }
        });
    }

    function showEasterEgg(message) {
        const easterEggDiv = document.createElement('div');
        easterEggDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(168, 85, 247, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
            max-width: 300px;
            text-align: center;
            backdrop-filter: blur(10px);
        `;
        
        easterEggDiv.innerHTML = message;
        document.body.appendChild(easterEggDiv);
        
        // CSS Animation hinzufügen
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0%);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Nach 4 Sekunden entfernen
        setTimeout(() => {
            easterEggDiv.style.animation = 'slideOut 0.5s ease-in forwards';
            const slideOutStyle = document.createElement('style');
            slideOutStyle.textContent = `
                @keyframes slideOut {
                    from {
                        transform: translateX(0%);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(slideOutStyle);
            
            setTimeout(() => {
                if (easterEggDiv.parentNode) {
                    easterEggDiv.parentNode.removeChild(easterEggDiv);
                }
            }, 500);
        }, 4000);
    }
});

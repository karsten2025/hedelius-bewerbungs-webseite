// static/script.js

// Funktion zum Umschalten der Tabs (Zertifikate/Zeugnisse)
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

// Funktion für das Akkordeon
function initializeAccordion() {
    let acc = document.getElementsByClassName("accordion");
    for (let j = 0; j < acc.length; j++) {
        if (!acc[j].classList.contains('listener-added')) {
            acc[j].addEventListener("click", function() {
                this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
            acc[j].classList.add('listener-added');
        }
    }
}

initializeAccordion();

// ÜBERARBEITETE FUNKTION: Passwort sicher auf dem Server prüfen
function checkPassword() {
    const enteredPassword = document.getElementById("zeugnis-password").value;
    const errorElement = document.getElementById("password-error");
    errorElement.textContent = "Prüfe..."; // Feedback für den Nutzer

    // Sende das Passwort an den Server (unsere Flask-API)
    fetch('/verify-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: enteredPassword }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Passwort korrekt: Formular ausblenden, Inhalt einblenden
            document.getElementById("zeugnisse-prompt").style.display = "none";
            document.getElementById("zeugnisse-content").style.display = "block";
            errorElement.textContent = "";
            initializeAccordion(); // Akkordeon für den neuen Inhalt initialisieren
        } else {
            // Passwort falsch: Fehlermeldung anzeigen
            errorElement.textContent = "Falsches Passwort. Bitte versuchen Sie es erneut.";
        }
    })
    .catch(error => {
        // Fehler bei der Server-Kommunikation
        console.error('Error:', error);
        errorElement.textContent = "Ein Fehler ist aufgetreten. Bitte später erneut versuchen.";
    });
}

// Event Listener hinzufügen, um auf die "Enter"-Taste im Passwortfeld zu reagieren
document.getElementById("zeugnis-password").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".password-form .btn").click();
    }
});

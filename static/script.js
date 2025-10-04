// static/script.js

// ===== SPRACHUMSCHALTUNG =====
function switchLang(lang) {
  // Alle Sprach-Elemente ausblenden
  document.querySelectorAll(".lang").forEach((el) => {
    el.style.display = "none";
  });

  // Ausgewählte Sprache einblenden
  document.querySelectorAll(".lang-" + lang).forEach((el) => {
    // 'inline-block' für Buttons, 'inline' für Text
    if (el.tagName === "A" || el.tagName === "BUTTON") {
      el.style.display = "inline-block";
    } else {
      el.style.display = "inline";
    }
  });

  // Platzhalter für Passwortfeld anpassen
  const placeholderInput = document.querySelector(".lang-aware-placeholder");
  if (placeholderInput) {
    const placeholderText = placeholderInput.getAttribute(
      "data-" + lang + "-placeholder"
    );
    placeholderInput.placeholder = placeholderText;
  }

  // Aktiven Zustand im Umschalter setzen
  document.querySelectorAll(".lang-link").forEach((link) => {
    link.classList.remove("active");
  });
  document
    .querySelector(".lang-link[onclick=\"switchLang('" + lang + "')\"]")
    .classList.add("active");
}

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

// Setzt den Standard-Tab beim Laden der Seite
if (document.getElementById("defaultOpen")) {
  document.getElementById("defaultOpen").click();
}

// Funktion für das Akkordeon
function initializeAccordion() {
  let acc = document.getElementsByClassName("accordion");
  for (let j = 0; j < acc.length; j++) {
    if (!acc[j].classList.contains("listener-added")) {
      acc[j].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
      acc[j].classList.add("listener-added");
    }
  }
}

// Initialisiert alle sichtbaren Akkordeons beim ersten Laden der Seite
initializeAccordion();

// Funktion: Passwort auf dem Server prüfen
function checkPassword() {
  const enteredPassword = document.getElementById("zeugnis-password").value;
  const errorElement = document.getElementById("password-error");
  errorElement.textContent = "Prüfe...";

  fetch("/verify-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: enteredPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("zeugnisse-prompt").style.display = "none";
        document.getElementById("zeugnisse-content").style.display = "block";
        errorElement.textContent = "";
        initializeAccordion();
      } else {
        errorElement.textContent =
          "Falsches Passwort. Bitte versuchen Sie es erneut.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      errorElement.textContent =
        "Ein Fehler ist aufgetreten. Bitte später erneut versuchen.";
    });
}

// Event Listener für die "Enter"-Taste im Passwortfeld
const passwordField = document.getElementById("zeugnis-password");
if (passwordField) {
  passwordField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".password-form .btn").click();
    }
  });
}

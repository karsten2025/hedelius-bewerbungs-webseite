# app.py
# Hauptdatei für die Flask-Webanwendung.
# Definiert die Routen, rendert die HTML-Vorlage und prüft das Passwort.

import os
from flask import Flask, render_template, request, jsonify

# Initialisieren der Flask-App
app = Flask(__name__)

# Das korrekte Passwort wird sicher aus einer Umgebungsvariable gelesen.
# Das ist der entscheidende Sicherheitsvorteil.
# Als Fallback für die lokale Entwicklung setzen wir ein Standardpasswort.
CORRECT_PASSWORD = os.environ.get('ZEUGNIS_PASSWORT', 'Salzgitter2025')

# Definieren der Hauptroute für die Landingpage
@app.route('/')
def index():
    """
    Diese Funktion rendert die index.html-Datei aus dem 'templates'-Ordner.
    """
    return render_template('index.html')

# NEUE ROUTE: API-Endpunkt zur Passwortverifizierung
@app.route('/verify-password', methods=['POST'])
def verify_password():
    """
    Diese Funktion empfängt das vom Benutzer eingegebene Passwort.
    Sie vergleicht es sicher mit dem korrekten Passwort vom Server.
    """
    # Das gesendete Passwort aus der Anfrage auslesen
    data = request.get_json()
    entered_password = data.get('password')

    # Vergleichen und eine JSON-Antwort zurücksenden
    if entered_password == CORRECT_PASSWORD:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

# Starten der Anwendung, wenn das Skript direkt ausgeführt wird
if __name__ == '__main__':
    app.run(debug=True)

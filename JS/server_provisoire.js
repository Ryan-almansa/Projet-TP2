// server_provisoire.js

const express = require('express');
const app = express();
const port = 3000; // Le port que nous allons utiliser (vous devrez utiliser http://localhost:3000)

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Permettre à votre front-end (qui peut être sur un autre port/fichier) de faire des requêtes
app.use((req, res, next) => {
    // Permet à toutes les origines (*) de faire des requêtes
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// --- SIMULATION DE CONNEXION / ENREGISTREMENT ---
// Ceci simule l'endpoint que votre script.js (lignes 13-16) pourrait appeler.
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        // En l'absence de BDD, on simule toujours une réussite.
        console.log(`Tentative d'enregistrement: ${username}`);
        return res.status(201).json({ success: true, message: 'Inscription réussie (simulée) !' });
    } else {
        return res.status(400).json({ success: false, message: 'Nom d\'utilisateur et mot de passe requis.' });
    }
});

// --- SIMULATION DE RÉCUPÉRATION DES POSITIONS GPS ---
// Ceci simule la fonction de 'get_positions.php' pour votre carte.
// Ces coordonnées sont statiques pour le moment.
app.get('/api/gps_positions', (req, res) => {
    // Coordonnées décimales pour Paris (simulant un bateau)
    const staticPositions = [
        {
            nom: "Bateau_Alpha", 
            latitude: 48.858000, 
            longitude: 2.352200, 
            timestamp: new Date().toISOString()
        }
    ];

    console.log("Positions GPS demandees. Envoi de donnees statiques.");
    return res.status(200).json(staticPositions);
});


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur provisoire démarré sur http://localhost:${port}`);
});
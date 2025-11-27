// Assurez-vous que api.js est chargé avant map_logic.js!

let map;
let markers = {};

/**
 * Initialise la carte Leaflet et lance la boucle de mise à jour.
 */
function initMap() {
    // 1. Initialisation de la carte (Centrage et Zoom)
    // Coordonnées et zoom initial (ex: France)
    map = L.map('map').setView([47.0, 2.0], 6); 

    // 2. Ajout de la couche de tuiles OpenStreetMap (OSM)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 3. Lancer la boucle de mise à jour
    updatePositions();
    setInterval(updatePositions, 5000); // Mise à jour toutes les 5 secondes
}

/**
 * Récupère les données GPS via l'API et met à jour les marqueurs Leaflet.
 */
async function updatePositions() {
    try {
        // Appelle l'API GPS via la fonction générique de api.js
        const data = await getData('/gps_positions');

        data.forEach(bateau => {
            const lat = parseFloat(bateau.latitude);
            const lng = parseFloat(bateau.longitude);
            const latLng = [lat, lng];

            // Ignore les positions invalides
            if (isNaN(lat) || isNaN(lng)) return; 

            if (markers[bateau.nom]) {
                // Déplacer le marqueur existant
                markers[bateau.nom].setLatLng(latLng);
            } else {
                // Créer un nouveau marqueur (point rouge par défaut)
                markers[bateau.nom] = L.marker(latLng)
                    .addTo(map)
                    .bindPopup("Bateau: " + bateau.nom + '<br>Dernière position: ' + bateau.timestamp);
            }
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des positions. Le serveur est-il démarré ?', error);
    }
}

// IMPORTANT : Assurez-vous d'appeler initMap() dans votre HTML pour démarrer la carte!
// Exemple d'appel dans votre map_leaflet.html : <body onload="initMap()">
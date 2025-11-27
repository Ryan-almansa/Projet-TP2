// Configuration de l'URL de base de votre serveur provisoire
const BASE_URL = 'http://localhost:3000/api'; 

/**
 * Fonction générique pour effectuer une requête POST
 * @param {string} endpoint - L'endpoint de l'API (ex: '/register')
 * @param {object} data - Les données à envoyer (ex: { username, password })
 */
async function postData(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Gérer les erreurs HTTP (400, 401, 500, etc.)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Erreur d'API POST:", error);
        throw error;
    }
}

/**
 * Fonction générique pour effectuer une requête GET
 * @param {string} endpoint - L'endpoint de l'API (ex: '/gps_positions')
 */
async function getData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Erreur d'API GET:", error);
        throw error;
    }
}
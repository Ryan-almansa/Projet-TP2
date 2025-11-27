// Assurez-vous que api.js est chargé avant script.js dans votre HTML!

function handleMessage(message, isSuccess = true) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = isSuccess ? 'green' : 'red';
    }
}

/**
 * Logique pour la page d'inscription (register.html)
 */
async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        handleMessage("Veuillez remplir tous les champs.", false);
        return;
    }

    try {
        const data = await postData('/register', { username, password });
        handleMessage(data.message, true);
        
        // Redirection après inscription réussie (ex: vers la page de connexion)
        setTimeout(() => {
            window.location.href = 'home.html'; 
        }, 1500);

    } catch (error) {
        handleMessage(`Échec de l'inscription: ${error.message}`, false);
    }
}


/**
 * Logique pour la page de connexion (home.html)
 */
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        handleMessage("Veuillez entrer vos identifiants.", false);
        return;
    }

    try {
        const data = await postData('/login', { username, password });
        handleMessage(data.message, true);

        // Si connexion réussie, enregistrez le statut et redirigez vers la carte
        localStorage.setItem('isAuthenticated', 'true');
        setTimeout(() => {
            // Assurez-vous que c'est le nom de votre page de carte!
            window.location.href = 'index.html'; 
        }, 1000);

    } catch (error) {
        handleMessage(`Échec de la connexion: ${error.message}`, false);
    }
}

// Fonction de déconnexion (si vous en avez besoin)
function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'home.html';
}

// Pour s'assurer que l'utilisateur est connecté avant d'accéder à la carte
function checkAuthentication() {
    if (window.location.pathname.includes('index.html') || window.location.pathname.includes('map_leaflet.html')) {
        if (localStorage.getItem('isAuthenticated') !== 'true') {
            alert("Accès refusé. Veuillez vous connecter.");
            window.location.href = 'home.html';
        }
    }
}

// Appelez cette vérification au chargement des pages protégées
// checkAuthentication();
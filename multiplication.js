// Tables de multiplication
const tables = [3, 4, 5, 6, 7, 8, 9];

// Facteurs
const facteurs = [3, 4, 5, 6, 7, 8, 9];

// Temps
const secondesPourCalculer = 6;
const secondesVoirReponse = 3;

/**
 * Retourne au hasard une des valeurs de la liste
 * @param {*} liste
 */
const choisirDansListe = liste => {
  return liste[Math.floor(Math.random() * liste.length)];
};

/**
 * Attend # seconde(s) avant de passer à l'étape suivante
 * @param {*} nombreDeSecondes
 */
const attendre = nombreDeSecondes => {
  return new Promise(resoudre => {
    setTimeout(resoudre, nombreDeSecondes * 1000);
    // On arrête d'attendre si l'on clic, utilise le clavier ou touche l'écran
    document.addEventListener("mousedown", resoudre, true);
    document.addEventListener("keydown", resoudre, true);
    // document.addEventListener("touchstart", resoudre, true); semblerait que toucher l'écran déclanche un clic...
  });
};

/**
 * Création de l'opération
 */
const faireOperations = async () => {
  do {
    // On sélectionne une table au hasard
    const table = choisirDansListe(tables);
    // On sélectionne un facteur au hasard
    const facteur = choisirDansListe(facteurs);
    // On affiche l'opération
    document.querySelector("#calcul .table").innerHTML = table;
    document.querySelector("#calcul .facteur").innerHTML = facteur;
    document.querySelector("#calcul .resultat").innerHTML = table * facteur;
    // On attend # secondes
    await attendre(secondesPourCalculer);
    // On affiche le résultat
    document.body.classList.add("afficher-reponse");
    // On attend # secondes
    await attendre(secondesVoirReponse);
    // On cache le résultat avant de recommencer
    document.body.classList.remove("afficher-reponse");
  } while (true); // on recommence :)
};

// Demarrer quand le contenu de la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  faireOperations();
});

// On permet d'installer l'application
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./pwa-service-worker.js");
  });
}

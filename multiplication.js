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
function choisirDansListe(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

/**
 * Attend # seconde(s) avant de passer à l'étape suivante
 * @param {*} nombreDeSecondes
 */
function attendre(nombreDeSecondes) {
  return new Promise(function(res) {
    setTimeout(res, nombreDeSecondes * 1000);
  });
}

/**
 * Création de l'opération
 */
async function faireOperations() {
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
    document
      .querySelector("#calcul .calcul__resultat")
      .classList.add("montrer");
    // On attend # secondes
    await attendre(secondesVoirReponse);
    // On cache le résultat avant de recommencer
    document
      .querySelector("#calcul .calcul__resultat")
      .classList.remove("montrer");
  } while (true); // on recommence :)
}

// Demarrer quand le contenu de la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  faireOperations();
});

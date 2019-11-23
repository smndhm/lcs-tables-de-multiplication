var tables = [3, 4, 5, 6, 7, 8, 9];
var nombres = [3, 4, 5, 6, 7, 8, 9];

var tempsCalcul = 10;
var tempsReponse = 5;

function choisirDansListe(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

function calcul(operation) {
  return operation.table * operation.nombre;
}

function afficherOperation(operation) {
  var texteOperation = `${operation.table} x ${operation.nombre}`;
  console.log(texteOperation);
  document.querySelector("#operation").innerHTML = texteOperation;
}

function afficherResultat(resultat) {
  console.log(resultat);
  document.querySelector("#resultat").innerHTML = resultat;
}

function creerOperation() {
  var operation = {
    table: choisirDansListe(tables),
    nombre: choisirDansListe(nombres)
  };
  afficherOperation(operation);
  var resultat = calcul(operation);
  setTimeout(function() {
    afficherResultat(resultat);
    setTimeout(function() {
      creerOperation();
    }, tempsReponse * 1000);
  }, tempsCalcul * 1000);
}

creerOperation();

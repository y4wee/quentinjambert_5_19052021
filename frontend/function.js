
// stock le panier dans le local storage
function saveStorage() {
    localStorage.setItem("contenuPanier", JSON.stringify(contenuPanier));
}


// change l'indice nombre de produit dans le logo panier
function changePanierNb() {
    document.querySelector(".headerPanierNumber").innerHTML = `${contenuPanier.length}`;
}
// changement de la page panier si vide
function panierVide() {
    document.querySelector(".pageCommandeTotal").classList.add("displayOff");
    document.querySelector(".pageCommandeForm").classList.add("displayOff");
    document.querySelector(".pageCommandeVide").classList.remove("displayOff");
}
// jonction entre les deux fonctions
function panierState() {
    if (contenuPanier.length > 0) {
        changePanierNb();
    } else {
        panierVide();
    }
}
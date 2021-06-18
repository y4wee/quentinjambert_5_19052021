
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
    document.querySelector(".commandeForm").classList.add("displayOff");
    document.querySelector(".pageCommandeVide").classList.remove("displayOff");
}
// jonction entre les deux fonctions
function panierState() {
    changePanierNb();
    if (contenuPanier.length == 0) {
        panierVide();
    }
}

// suppression d'un produit du panier et du local storage
function removePdtPanier(button) {
    let confirmRemove = confirm("voulez vous vraiment enlever cet article de votre panier ?");
        if (confirmRemove) {
            let removeId = button.parentNode.id.replace("panier", "");
            contenuPanier = contenuPanier.filter( contenu => contenu._id != removeId);
            saveStorage();
            panierState();
            button.parentNode.remove();
        }
}

// prix totale du panier
function prixPanier() {
    let totalPrixPanier = 0;
    document.querySelectorAll(".detailPrix").forEach(prix => {
        let prixNb = prix.textContent.replace(" €", "");
        totalPrixPanier += parseInt(prixNb, 10);
    })
    document.querySelector(".pageCommandeTotalPrix").textContent = totalPrixPanier + " €";
}
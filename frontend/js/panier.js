// recuperation des données panier dans le locale storage
let contenuPanier = JSON.parse(localStorage.getItem("contenuPanier")); 
if (contenuPanier === null) {
    contenuPanier = [];
}
// affichage de la page en fonction du panier si vide ou pas
panierState();

// construction page panier
let addedPdts = [];
for (let produitPanier of contenuPanier) {
    // permet d'eviter les doublons de carte produit dans le panier
    if (addedPdts.indexOf(produitPanier.name) === -1) {
        addedPdts.push(produitPanier.name);
        document.querySelector(".pageCommandePanier").innerHTML += `<div class="pageCommandePanierProduit" id="panier${produitPanier._id}">
                                                                        <div class="pageCommandePanierProduitImage pdt${produitPanier._id}"></div>
                                                                        <div class="pageCommandePanierProduitDetail">
                                                                            <div class="detailNom">${produitPanier.name}</div>
                                                                            <div class="quantiteRemove">-</div>
                                                                            <div class="detailQuantite pdt${produitPanier._id}">1</div>
                                                                            <div class="quantiteAdd">+</div>
                                                                            <div class="detailPrix pdt${produitPanier._id}">${produitPanier.price/100} €</div>
                                                                        </div>
                                                                        <div class="pageCommandePanierProduitRemove">X</div>
                                                                     </div>
                                                                    `;
        // images des produits
        document.querySelector(`.pageCommandePanierProduitImage.pdt${produitPanier._id}`).style.backgroundImage = `url(${produitPanier.imageUrl})`;

    } else  {
        //gere la quantité et le prix en fonction du nombre de produit
        let detailQuantite = document.querySelector(`.detailQuantite.pdt${produitPanier._id}`);
        detailQuantite.textContent++;
        document.querySelector(`.detailPrix.pdt${produitPanier._id}`).textContent = produitPanier.price/100 * detailQuantite.textContent + " €";
    }
}
// total du prix du panier
prixPanier();

// boutons pour gerer les quantités
//enlever une quantité si supperieur a 1
document.querySelectorAll(".quantiteRemove").forEach(removing => {
    removing.addEventListener("click", (e) => {
        e.preventDefault;
        if (removing.nextElementSibling.textContent > 1) {
            quantiteRemove(removing);
            changePanierNb();
            saveStorage();
            prixPanier();
        }
    })
})
//ajouter une quantité
document.querySelectorAll(".quantiteAdd").forEach(adding => {
    adding.addEventListener("click", (e) => {
        e.preventDefault;
        quantiteAdd(adding);
        changePanierNb();
        saveStorage();
        prixPanier();
    })
})
// bouton pour enlever un pdt du panier grace au bouton remove
document.querySelectorAll(".pageCommandePanierProduitRemove").forEach(removingButton => {
    removingButton.addEventListener("click", (e) => {
        e.preventDefault;
        removePdtPanier(removingButton);
        prixPanier();
    });
})
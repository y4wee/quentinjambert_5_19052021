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
    // permet d'eviter les doublons de produit dans le panier
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
//enlever une quantité
document.querySelectorAll(".quantiteRemove").forEach(removing => {
    removing.addEventListener("click", (e) => {
        e.preventDefault;
        if (removing.nextElementSibling.textContent > 1) {
            e.preventDefault;
            let pdtQuantite = removing.nextElementSibling;
            let pdtId = removing.parentNode.parentNode.id.replace("panier", "");
            let produitRemove = contenuPanier.find(element => element._id == pdtId);
            let pdtIndex = contenuPanier.indexOf(produitRemove);

            pdtQuantite.textContent--;
            contenuPanier.splice(pdtIndex, 1);
            changePanierNb();
            saveStorage();
            document.querySelector(`.detailPrix.pdt${pdtId}`).textContent = produitRemove.price/100 * pdtQuantite.textContent + " €";
            prixPanier();
        }
    })
})
//ajouter une quantité
document.querySelectorAll(".quantiteAdd").forEach(adding => {
    adding.addEventListener("click", (e) => {
        e.preventDefault;
        let pdtQuantite = adding.previousElementSibling;
        let pdtId = adding.parentNode.parentNode.id.replace("panier", "");
        let produitAdd = contenuPanier.find(element => element._id == pdtId)

        pdtQuantite.textContent++;
        contenuPanier.splice(1, 0, produitAdd);
        changePanierNb();
        saveStorage();
        document.querySelector(`.detailPrix.pdt${pdtId}`).textContent = produitAdd.price/100 * pdtQuantite.textContent + " €";
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
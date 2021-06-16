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
// bouton pour enlever un pdt du panier
document.querySelectorAll(".pageCommandePanierProduitRemove").forEach(removingButton => {
    removingButton.addEventListener("click", (e) => {
        e.preventDefault;
        let confirmRemove = confirm("voulez vous vraiment enlever cet article de votre panier ?");
        if (confirmRemove) {
            let removeId = removingButton.parentNode.id.replace("panier", "");
            contenuPanier = contenuPanier.filter( contenu => contenu._id != removeId);
            saveStorage();
            panierState();
            removingButton.parentNode.remove();
        }
    })
})

/*document.querySelectorAll(".quantiteRemove").forEach(removing => {
    console.log(removing.nextElementSibling);
    removing.addEventListener("click", (e) => {
        e.preventDefault;
        removing.nextElementSibling.textContent--;
    })
})*/

// arrays pour les id produits dans le panier en fonction de la categorie
let teddiesProducts = [];
let camerasProducts = [];
let furnitureProducts = [];
console.log(teddiesProducts);
console.log(camerasProducts);
console.log(furnitureProducts);
// event pour afficher le formulaire et, stock les id des produits validés et le prix totale de la commande
document.querySelector(".pageCommandeValidation").addEventListener("click", (e) => {
    e.preventDefault;
    document.querySelector(".formOverlay").classList.remove("displayOff");
    // stockage du prix
    let prixCommande = document.querySelector(".pageCommandeTotalPrix").textContent;
    sessionStorage.setItem("prixCommande", JSON.stringify(prixCommande));
    //stockage des id produit
    for (let produitPanier of contenuPanier) {
        if (produitPanier.categorie == "teddies") {
            teddiesProducts.push(produitPanier._id);
            console.log(teddiesProducts);
        }
        else if (produitPanier.categorie == "cameras") {
            camerasProducts.push(produitPanier._id);
            console.log(camerasProducts);
        } else {
            furnitureProducts.push(produitPanier._id)
            console.log(furnitureProducts);
        }
    }
})
// ferme le formulaire
document.querySelector(".formOverlayClose").addEventListener("click", (e) => {
    e.preventDefault;
    document.querySelector(".formOverlay").classList.add("displayOff");
    teddiesProducts = [];
    camerasProducts = [];
    furnitureProducts = [];
})

// stock les données input du formulaire dans l'objet contact
let contact = {};
document.querySelectorAll(".commandeForm div input").forEach(input => {
    input.addEventListener("change", (e) => {
        Object.defineProperty(contact, `${input.id}`, {
            value: input.value,
            configurable: true,
            enumerable: true
        })
        console.log(contact);
    })
})

// envoi des données vers le backend par l'evenement submit
document.querySelector(".commandeForm").addEventListener("submit", (e) => {
    e.preventDefault;
    //formatage des données envoyées en fonction de la catégorie de produit
    let teddiesPost = {
        contact,
        products: teddiesProducts
    };
    let camerasPost = {
        contact,
        products: camerasProducts
    };
    let furniturePost = {
        contact,
        products: furnitureProducts
    };
    console.log(teddiesPost);
    console.log(camerasPost);
    console.log(furniturePost);
    // si des produits teddy sont present alors envoie une requete Post vers teddies/order
    if (teddiesPost.products.length > 0) {
        postRequest("teddies", teddiesPost);
    }
    // si des produits cameras sont present alors envoie une requete Post vers cameras/order
    if (camerasPost.products.length > 0) {
        postRequest("cameras", camerasPost);
    }
    // si des produits furniture sont present alors envoie une requete Post vers furniture/order
    if (furniturePost.products.length > 0) {
        postRequest("furniture", furniturePost);
    }
});

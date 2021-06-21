// array pour les id produits dans le panier
let products = [];
// event pour afficher le formulaire et stock les id des produits validés
document.querySelector(".pageCommandeValidation").addEventListener("click", (e) => {
    e.preventDefault;
    document.querySelector(".formOverlay").classList.remove("displayOff");
    let validId = [];
    for (let produitPanier of contenuPanier) {
        validId.push(produitPanier._id);
    }
    products = validId;
})
// ferme le formulaire
document.querySelector(".formOverlayClose").addEventListener("click", (e) => {
    e.preventDefault;
    document.querySelector(".formOverlay").classList.add("displayOff");
})
console.log(document.querySelectorAll(".commandeForm div input"))

// stock les données input du formulaire dans l'objet contact
let contact = {};
document.querySelectorAll(".commandeForm div input").forEach(input => {
    input.addEventListener("change", (e) => {
        Object.defineProperty(contact, `${input.id}`, {
            value: input.value,
            configurable: true,
        })
        console.log(contact, products)
    })
})


function postFormData() {
    try {
        fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact, products})
    })
    } catch(e) {
        console.log(e)
    }
    
}

document.querySelector(".commandeForm").addEventListener("submit", postFormData());

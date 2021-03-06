//  animation de la barre de navigation
document.querySelector(".navSlideClose").addEventListener("click", navControl);
document.querySelector(".overlayOpacity").addEventListener("click", navControl);
// systeme d'onglet dans la navigation
document.querySelectorAll(".navSlide a").forEach(onglet => {
    onglet.addEventListener("click", function(e) {
        e.preventDefault;
        let div = this.parentElement.nextElementSibling;
        let ongletActif = this.parentElement.querySelector('.ongletActive');
        let contenuActif = div.querySelector('.contenuActive');

        // gere les classe active des onglets
        if (this.classList.contains('ongletActive')) {
            return false;
        } 
        else if (ongletActif) {
            ongletActif.classList.remove('ongletActive');
        }
        this.classList.add('ongletActive')
        // gere les classe active des contenus
        if (contenuActif) {
            contenuActif.classList.remove('contenuActive');
        }
        div.querySelector(this.getAttribute('href')).classList.add('contenuActive');
        document.querySelector(".mainAccueilPresentation").classList.add('displayOff');
    })
})
// afichage lors du retour de la page produit 
let hrefProduit = JSON.parse(sessionStorage.getItem("hrefProduit"));
if (hrefProduit != null) {
    document.querySelector(`a[href="#${hrefProduit}"]`).classList.add("ongletActive");
    document.querySelector(`#${hrefProduit}`).classList.add("contenuActive");
    document.querySelector(".mainAccueilPresentation").classList.add('displayOff');
    sessionStorage.removeItem("hrefProduit");
}
// contenu des listes de produits
function contenuBuilding(categorie) {
    fetch("http://localhost:3000/api/" + categorie)
    .then(function(data) {
        if (data.ok) {
            return data.json();
        }
    })
    .then(function(produits) {
        for (let produit of produits) {
            document.querySelector("#ori" + categorie).innerHTML += `<a href= "./produit.html" class= "contenuArticleCarte ${categorie}">
                                                                        <div class= "contenuArticleCarteImage" id= "pdt${produit._id}">
                                                                            <div class= "contenuArticleCarteName">
                                                                                <h2>${produit.name}</h2>
                                                                            </div>
                                                                        </div>
                                                                     </a>
                                                                    `;
            document.querySelector("#pdt" + produit._id).style.backgroundImage = `url(${produit.imageUrl})`;
        }
        // recuperation des id  et categorie du produit lors du click sur le lien du produit en question, qui sont retourn??s dans le session storage
        document.querySelectorAll(".contenuArticleCarte").forEach(carte => {
            carte.addEventListener('click', () => {
                let carteId = carte.querySelector("div").id.replace("pdt", "");
                let carteCategorie = carte.classList.item(1);
                sessionStorage.setItem("produitChoisi", JSON.stringify(carteId));
                sessionStorage.setItem("produitCategorie", JSON.stringify(carteCategorie));
            })
        })
    })
}
contenuBuilding("teddies");
contenuBuilding("cameras");
contenuBuilding("furniture");
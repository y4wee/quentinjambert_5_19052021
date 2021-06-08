/*
création onglet
*/
let onglets = document.querySelectorAll(".onglet a");
for (let onglet of onglets) {
    onglet.addEventListener('click', function(e) {

        e.preventDefault();
        let div = this.parentNode.parentNode.parentNode;
        let li = this.parentNode;
        let ongletActif = div.querySelector('.onglet .ongletActive');
        let contenuActif = div.querySelector('.contenu .contenuActive');

        /** gere les classe active des onglets */
        if (li.classList.contains('ongletActive')) {
            return false;
        } else if (ongletActif) {
            ongletActif.classList.remove('ongletActive');
        }
        li.classList.add('ongletActive')

        /** gere les classe active des contenus */
        if (contenuActif) {
            contenuActif.classList.remove('contenuActive');
        }
        div.querySelector(this.getAttribute('href')).classList.add('contenuActive');
    })
};

/** contenu des listes de produits*/
function contenuBuilding(categorie) {
    fetch("http://localhost:3000/api/" + categorie)
    .then(function(data) {
        if (data.ok) {
            return data.json();
        }
    })
    .then(function(produits) {
        for (let produit of produits) {
            document.querySelector("#ori" + categorie).innerHTML += `<a href= "./produit.html" class= "contenuArticleCarte">
                                                                        <div class= "contenuArticleCarteImage" id= "pdt${produit._id}">
                                                                            <div class= "contenuArticleCarteName">
                                                                                <h2>${produit.name}</h2>
                                                                            </div>
                                                                        </div>
                                                                     </a>
                                                                    `;
            document.querySelector("#pdt" + produit._id).style.backgroundImage = `url(${produit.imageUrl})`;
        }
        // recuperation de l'id lors du click sur le lien du produit en question
        document.querySelectorAll(".contenuArticleCarte").forEach(carte => {
            carte.addEventListener('click', () => {
                let carteId = carte.querySelector("div").id;
                localStorage.setItem("pageProduit",JSON.stringify(carteId));
            })
        })
    })
}
contenuBuilding("teddies");
contenuBuilding("cameras");
contenuBuilding("furniture");
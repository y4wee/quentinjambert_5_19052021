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

/** contenu des arcticles */
"use strict";
fetch("http://localhost:3000/api/teddies")
    .then(function(data) {
        if (data.ok) {
            return data.json();
        }
    })
    .then(function(produits) {
        for (let produit of produits) {
            console.log('#' + produit._id)
            document.querySelector("#oriTeddy").innerHTML +=    `<div class= "contenuArticleCarte" id= "${produit._id}">
                                                                    <div class= "Name">
                                                                        <h2>${produit.name}</h2>
                                                                    </div>
                                                                 </div>
                                                                `;
            document.querySelector(`#${produit._id}`).style.backgroundImage = `url(${produit.imageUrl})`;
        }
    })
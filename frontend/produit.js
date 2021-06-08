// recuperation de l'id et de la categorie du produit par le  session storage
let produitCategorie = JSON.parse(sessionStorage.getItem("produitCategorie"));
let produitId = JSON.parse(sessionStorage.getItem("produitChoisi"));
console.log(produitId)
console.log(produitCategorie)

// requete get sur un seul objet produit par son id
fetch("http://localhost:3000/api/" + produitCategorie + "/" + produitId)
.then(function(data) {
    if (data.ok) {
        return data.json();
    }
})
.then(function(produit) {
    // changement du title de la page en fonction du produit
    document.title = "- " + produit.name + " -";

    // recuperation des informations de modification de produit
    let optionSort = Object.keys(produit)[0];
    let produitOptions = Object.values(produit)[0];
    
    // implementation html page produit
    document.querySelector("main").innerHTML =  `<article class="produitChoisi">
                                                     <section class="produitChoisiImage"></section>
                                                     <section class="produitChoisiDetail">
                                                         <h1>${produit.name}</h1>

                                                         <label for="optionsProduit">${optionSort}</label>
                                                         <select name="${optionSort}" id="optionsProduit" required></select>

                                                         <label for="quantite">quantité</label>
                                                         <input type="number" id="quantite" name="quantite" min="1" value="1">

                                                         <span>${produit.price/100} €</span>
                                                         <span class="produitChoisiDetailDescription">
                                                            ${produit.description}
                                                         </span>
                                                     </section>
                                                 </article>
                                                `;
    // mise en place des images 
    document.querySelector(".produitChoisiImage").style.backgroundImage = `url(${produit.imageUrl})`;
    
    // implementation des options de modifications en html
    for(let produitOption of produitOptions) {
        document.querySelector("#optionsProduit").innerHTML +=  `<option value= "${produitOption}">${produitOption}</option>`
        console.log();
    }
})

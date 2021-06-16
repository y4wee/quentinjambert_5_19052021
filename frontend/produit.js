// recuperation de l'id et de la categorie du produit par le  session storage
let produitCategorie = JSON.parse(sessionStorage.getItem("produitCategorie"));
let produitId = JSON.parse(sessionStorage.getItem("produitChoisi"));
// requete get sur un seul objet produit par son id
fetch("http://localhost:3000/api/" + produitCategorie + "/" + produitId)
.then(function(data) {
    if (data.ok) {
        return data.json();
    }
})
.then(function(produit) {
    // changement du title de la page en fonction du produit
    document.title = "- Ori" + produitCategorie + " - " + produit.name + " -";

    // recuperation des informations de modification de produit
    let optionSort = Object.keys(produit)[0];
    let produitOptions = Object.values(produit)[0];
    
    // implementation html page produit
    document.querySelector("main").innerHTML =  `<article class="produitChoisi">
                                                     <a class="produitChoisiBack" href="#pdt${produit._id}"><i class="fas fa-arrow-left"></i></a>
                                                     <section class="produitChoisiImage"></section>
                                                     <section class="produitChoisiDetail">
                                                         <h1>${produit.name}</h1>

                                                         <label for="optionsProduit">${optionSort}</label>
                                                         <select name="${optionSort}" id="optionsProduit" required></select>

                                                         <label for="quantiteProduit">quantité</label>
                                                         <input type="number" id="quantiteProduit" name="quantite" min="1" value="1">

                                                         <span class="produitChoisiDetailPrice">${produit.price/100} €</span>
                                                         <span class="produitChoisiDetailDescription">
                                                            ${produit.description}
                                                         </span>
                                                         <div class="addPanier">Ajouter au panier</div>
                                                      </section>
                                                </article>
                                                `;
    // mise en place des images 
    document.querySelector(".produitChoisiImage").style.backgroundImage = `url(${produit.imageUrl})`;
    
    // implementation des options de modifications en html
    for(let produitOption of produitOptions) {
        document.querySelector("#optionsProduit").innerHTML +=  `<option value= "${produitOption}">${produitOption}</option>`;
    }

    // event pour ajouter des produits au panier
    document.querySelector(".addPanier").addEventListener("click", function(e){
        e.preventDefault;
        let quantiteProduit = document.querySelector("#quantiteProduit").value;
        // ajoute l'objet produit x la quantité dans un array pour locale storage
        for(i = 0; i < quantiteProduit; i++) {
            contenuPanier.push(produit);
        }
        saveStorage();
        changePanierNb();
        
        return alert(`${produit.name} a été ajouté au panier`);
    })
})

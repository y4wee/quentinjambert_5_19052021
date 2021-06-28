// animation du bouton open/close de la nav barre
function animationSegment(segment, to) {
    if (segment.classList.contains(`close${to}`)) {
        segment.classList.remove(`close${to}`)
        segment.classList.add(`open${to}`)
    }
    else if (segment.classList.contains(`open${to}`)) {
        segment.classList.remove(`open${to}`)
        segment.classList.add(`close${to}`)
    } else {
        segment.classList.add(`open${to}`)
    }
}
// fonction pour ouvrir ou fermer la navigation
function navControl(e) {
    e.preventDefault;
    let overlayOpac = document.querySelector(".overlayOpacity");
    let navSlide = document.querySelector(".navSlide");
    let buttonSegmentUp = document.querySelector(".navSlideCloseUp");
    let buttonSegmentDown = document.querySelector(".navSlideCloseDown");
    // affichage fond opaque
    if (overlayOpac.classList.contains("displayOff")) {
        overlayOpac.classList.remove("displayOff");
    } else {
        overlayOpac.classList.add("displayOff");
    }
    // affichage barre navigation
    if (navSlide.classList.contains("animationSlide")) {
        navSlide.classList.remove("animationSlide");
        document.querySelector(".headerLogo h1").style.transform = "translateX(0)"
    } else {
        navSlide.classList.add("animationSlide");
        document.querySelector(".headerLogo h1").style.transform = "translateX(250px)"
    }
    //segment up
    animationSegment(buttonSegmentUp, "Up");
    //segment down
    animationSegment(buttonSegmentDown, "Down");
}
// stock le panier dans le local storage
function saveStorage() {
    localStorage.setItem("contenuPanier", JSON.stringify(contenuPanier));
}


// change l'indice nombre de produit dans le logo panier
function changePanierNb() {
    document.querySelector(".headerPanierNumber").innerHTML = `${contenuPanier.length}`;
}
// changement de la page panier si vide
function panierVide() {
    document.querySelector(".pageCommandeTotal").classList.add("displayOff");
    document.querySelector(".pageCommandeValidation").classList.add("displayOff");
    document.querySelector(".pageCommandeVide").classList.remove("displayOff");
}
// jonction entre les deux fonctions
function panierState() {
    changePanierNb();
    if (contenuPanier.length == 0) {
        panierVide();
    }
}

// suppression d'un produit du panier et du local storage
function removePdtPanier(button) {
    let confirmRemove = confirm("voulez vous vraiment enlever cet article de votre panier ?");
        if (confirmRemove) {
            let removeId = button.parentNode.id.replace("panier", "");
            contenuPanier = contenuPanier.filter( contenu => contenu._id != removeId);
            saveStorage();
            panierState();
            button.parentNode.remove();
        }
}

// prix totale du panier
function prixPanier() {
    let totalPrixPanier = 0;
    document.querySelectorAll(".detailPrix").forEach(prix => {
        let prixNb = prix.textContent.replace(" €", "");
        totalPrixPanier += parseInt(prixNb, 10);
    })
    document.querySelector(".pageCommandeTotalPrix").textContent = totalPrixPanier + " €";
}

// fonction pour les requetes vers le backend en fonction de la categorie produit, stock la reponse serveur et supprime le contenu du pannier 
function postRequest(categorie, categoriePost) {
    fetch(`http://localhost:3000/api/${categorie}/order`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoriePost)
    })
    .then(function(response) {
        if (response.ok) {
            console.log(response)
            return response.json();
        }
    })
    .then(function(data) {
        sessionStorage.setItem(`data${categorie}`, JSON.stringify(data));
        localStorage.removeItem("contenuPanier");
        window.location = "../html/confirmation.html";
    })
}
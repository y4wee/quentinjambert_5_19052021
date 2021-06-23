// fonction pour ouvrir ou fermer la navigation
function navControl(e) {
    e.preventDefault;
    let overlayOpac = document.querySelector(".overlayOpacity");
    let navSlide = document.querySelector(".navSlide");

    if (overlayOpac.classList.contains("displayOff")) {
        overlayOpac.classList.remove("displayOff");
    } else {
        overlayOpac.classList.add("displayOff");
    }

    if (navSlide.classList.contains("animationSlide")) {
        navSlide.classList.remove("animationSlide");
        document.querySelector(".headerLogo h1").style.transform = "translateX(0)"
    } else {
        navSlide.classList.add("animationSlide");
        document.querySelector(".headerLogo h1").style.transform = "translateX(250px)"
    }

    document.querySelectorAll(".navSlideClose span").forEach(segment => {
        if (segment.classList.contains("animation")) {
            segment.classList.remove("animation");
        } else {
            segment.classList.add("animation");
        }
    })
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
async function postRequest(categorie, categoriePost) {
    let response = await fetch(`http://localhost:3000/api/${categorie}/order`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoriePost)
    })
    if (response.ok) {
        let data = await response.json();
        sessionStorage.setItem(`data${categorie}`, JSON.stringify(data));
        localStorage.removeItem("contenuPanier");
        window.location.href = "./confirmation.html";
    } else {
        console.error('Retour du serveur : ', response.status);
    }
}
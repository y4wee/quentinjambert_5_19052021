// recuperation des données pannier dans le locale storage
let contenuPannier = JSON.parse(localStorage.getItem("contenuPannier")); 
if (contenuPannier === null) {
    contenuPannier = [];
}
if (contenuPannier.length > 0) {
    document.querySelector(".headerPannierNumber").innerHTML = `${contenuPannier.length}`
}
console.log(contenuPannier);

// construction page pannier


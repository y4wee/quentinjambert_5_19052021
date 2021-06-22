// recupere le prix totale de la commande
let prixCommande = JSON.parse(sessionStorage.getItem("prixCommande"));
console.log(prixCommande)
// recupere les données reçu par le serveur lors de l'achat 
let datasCommande = [
    JSON.parse(sessionStorage.getItem("datateddies")),
    JSON.parse(sessionStorage.getItem("datacameras")),
    JSON.parse(sessionStorage.getItem("datafurniture"))
]
console.log(datasCommande)
// enleve la fenetre des felicitation en cliquant n'importe ou 
window.addEventListener("click", (e) => {
    e.preventDefault;
    document.querySelector(".confirmationMessage").classList.add("displayOff")
})

//mise en forme de la page confirmation
let oneData = datasCommande.find(element => element != null)
console.log(oneData)
document.querySelector(".mainConfirmation").innerHTML += `<div class="mainConfirmationMerci">
                                                            <h2><span class="orange">Merci</span> ${oneData.contact.firstName}, votre commande a bien été enregistrée.</h2>
                                                            <p>Nous la traiterons dans les plus brefs delais, pour toute question concernant vos garanties et votre 
                                                            droit de rétractation, nous vous invitons à nous contacter.
                                                          </div>
                                                          <div class="mainConfirmationDetail">
                                                            <span>Détails de votre commande:</span>
                                                            <div class="mainConfirmationDetailOrder"> commande N°: ${oneData.orderId} </div>
                                                            <div class="mainConfirmationDetailPrix"> Total: ${prixCommande} </div>
                                                          </div>
                                                         `
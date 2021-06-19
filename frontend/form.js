document.querySelector(".pageCommandeValidation").addEventListener("click", (e) => {
    e.preventDefault;
    document.querySelector(".formOverlay").classList.remove("displayOff");
})
document.querySelector(".formOverlayClose").addEventListener("click", (e) => {
    e.preventDefault;
    document.querySelector(".formOverlay").classList.add("displayOff");
})
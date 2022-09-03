// Importation de la page panier
import {Objfetch, Panier} from "./module.js";

async function voirLesProduits(){

    //Récupération id
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Appel fetch et assigne le résultat à un objet
    let reponse = await Objfetch.recupConfig(id);

    // Appel pour la création de la structure
    reponse.structureProdPageProduct();

    // Gestionnaire d'évenement du bouton pour Ajouter au panier
    const buttonAddCard = document.querySelector('#addToCart');
  
    buttonAddCard.addEventListener('click', () => {
        
        Panier.add({
            id: id,
            color : colors.value,
            quantity :  quantity.value,
        });
    });

}

voirLesProduits();
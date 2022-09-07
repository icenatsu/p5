// Importation des classes
import {Obj, Panier} from "./module.js";


async function voirLesProduits(){

    //Récupération id du produit sélectionné
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Récupération de l'objet suite à l'appel de fetch
    let reponse = await Obj.configFetchGet(id);

    // Appel de la création de la structure
    reponse.structureProdPageProduct();

    // Gestionnaire d'évenement du bouton pour Ajouter au panier
    const buttonAddCard = document.querySelector('#addToCart');
    const color = document.querySelector('#colors');
    const quantity = document.querySelector('#quantity');

    // Ajoute le produit lors du click sur le bouton ajouter au panier
    // renvoie un objet avec les valeurs 
    // => de l'id du produit, la couleur, et la quantité sélectionné par l'utilisateur 
    buttonAddCard.addEventListener('click', () => {
        Panier.add({
            id: id,
            color : color.value,
            quantity : quantity.value,
        });
    });
}
voirLesProduits();




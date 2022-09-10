// Importation des classes
import {Obj, Panier} from "./module.js";


async function voirLesProduits(){

    // Récupération id du produit sélectionné
    // Nouvel objet Url de l'url de la page actuelle du navigateur
    // Utilisation de la propriété SearchParams qui va permettre d'utiliser des méthodes utilitaires
    // Utilisation de la méthode get qui va nous permettre d'extraire l'id (id=) de l'url
   
    const id = new URL(window.location).searchParams.get('id');

    // Récupération de l'objet suite à l'appel de fetch
    let reponse = await Obj.configFetchGet(id);
    
    // Appel de la création de la structure
    reponse.structureProdPageProduct();

    // Gestionnaire d'évenement du bouton pour Ajouter au panier
    const buttonAddCard = document.querySelector('#addToCart');
    const color = document.querySelector('#colors');
    const quantity = document.querySelector('#quantity');

    // Ajoute le produit lors du click sur le bouton ajouter au panier
    // Envoie un objet comportant les valeurs : 
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




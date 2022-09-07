// Importation des classes
import {Obj, Panier, ValidationFormulaire} from "./module.js";

// Récupération du panier
// Nouvelle instance Obj()
// Déclaration du sélecteur parent sur lequel va être rattaché la modale et son contenu 
//      => propriété css fixée en relative (modale en position absolute)
// Déclaration du sélecteur formulaire et du conteneur du prix et quantité totale
let panier = Panier.recupProd();
const obj = new Obj();
let containerpanier = document.querySelector('#cartAndFormContainer');
containerpanier.style.position = "relative";
let formulaire = document.querySelector('.cart__order__form');
let carteprice = document.querySelector('.cart__price');

// Si le panier est vide
// => Affichage de la modale avec son contenu
// => Retrait du formulaire et du conteneur du prix et de la quantité totale
if(panier == [] || panier == ''){
    obj.structuremodale(containerpanier, "60%", "100%");
    obj.structureinsidemodalepagepanier();
    formulaire.style.display = "none";
    carteprice.style.display = "none";
}

// Boucle sur la panier
// Récupération de l'objet suite à l'appel de fetch
// Ajout de la couleur et la quantité à cet l'objet
// Appel de la méthode pour la création de la structure 
for (const key in panier) {
   
    let reponse = await Obj.configFetchGet(panier[key].id);
    reponse.color = panier[key].color;
    reponse.quantity = panier[key].quantity;
    reponse.structureProdPageCart();
}

// Appel du Total du panier et nombre d'articles Total
Panier.prixTotalDuPanier();
Panier.nbreArticleDuPanier();


// Changement de la quantité des article
/***************************************/
// Sélection de la nodelist des input
// Boucle sur la nodelist 
// Evenement change sur chaque input
//  Appel de la méthode pour changer la quantité contenant plusieurs paramètres
//      => élément du dom correspondant à l'input 
//      => premier élément du dom parent de l'input portant la classe .cart__item pour recupérer ses valeurs data id et color. 
//  Appel des méthodes prixtotal et article du panier pour recalculer des valeurs.
let inputQuantity = document.querySelectorAll('.itemQuantity');
inputQuantity.forEach(element => {
    element.addEventListener('change', (e) =>{
        Panier.changeQuantite(e.target, e.target.value, e.target.closest(".cart__item").dataset.id,  e.target.closest(".cart__item").dataset.color);
        Panier.prixTotalDuPanier();
        Panier.nbreArticleDuPanier();
    });
});

// Suppression totale de l'article sélectionné
/*********************************************/
// Sélection de la nodelist des boutons supprimer
// Boucle sur la nodelist
// Evenement click sur chaque bouton supprimer
//  Appel de la méthode pour supprimer le produit contenant plusieurs paramètres 
//      => premier élément du dom parent du bouton suppression portant la classe .cart__item pour recupérer ses valeurs data id et color. 
//  Suppression du premier élement du dom parent du bouton suppression portant la classe .cart__item
//  Appel des méthodes prixtotal et article du panier pour recalculer des valeurs.
// Récupération du panier
// Si le panier est vide
// => Affichage de la modale avec son contenu
// => Retrait du formulaire et du conteneur du prix et de la quantité total

let buttondelete = document.querySelectorAll('.deleteItem');
buttondelete.forEach(element => {
    element.addEventListener('click', (e) =>{
        Panier.supprimeLeProduit(e.target.closest(".cart__item").dataset.id, e.target.closest(".cart__item").dataset.color); 
        e.target.closest(".cart__item").remove();
        Panier.prixTotalDuPanier();
        Panier.nbreArticleDuPanier();
        
        let panier = Panier.recupProd();
        
        if(panier == [] || panier == ''){
            obj.structuremodale(containerpanier, "60%", "100%");
            obj.structureinsidemodalepagepanier();
            formulaire.style.display = "none";
            carteprice.style.display = "none";
        }
    });
});


// FORMULAIRE /////////////////////////////////////////////////////////////

// Initialisation du produit à un tableau


// Sélection du bouton Commander et evenement au click
// Déclaration nouvelle instance retournant un objet avec les valeurs des champs input
// Attribution des valeurs saisies des inputs à l'objet contact
// appel de la méthode valid pour phase de tests sur les regex
// Si tous les tests regex des différents champs de saisie sont valides
//      => Boucle sur le panier pour récupérer les produits du localstorage  
//      => Création d'un objet order contenant un objet contact + objet produit
//      => Envoie de l'objet dans la fonction envoyer la commande
// Sinon message d'alerte
const buttoncommande = document.querySelector('#order');
buttoncommande.addEventListener('click', (e) =>{
    e.preventDefault();
    let contact = new ValidationFormulaire;
    let products = [];

        if(contact.valid()){

        for (let i = 0; i < panier.length; i++) {
            products.push((panier[i].id));
            console.log(products);
        
            let order = {
                contact: contact,
                products : products
            };
            console.log(order);
            envoyerLaCommande(order);
        }          
        }else{
            window.alert('Veuillez renseignez toutes vos coordonnées afin que nous puissions vous livrer votre commande.')
        }
});

// Récupération de l'objet order en paramètre
// Retourne l'objet suite à l'appel de fetch avec la méthode post
// Redirige sur la page de confirmation avec la valeur de l'objet orderId comme suffixe contenu dans l'objet de la commande 
async function envoyerLaCommande(order){

    let commande = await Obj.configFetchPost(order);
    window.location.assign("confirmation.html?id=" + commande.orderId)
} 









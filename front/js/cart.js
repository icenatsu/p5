import {Objfetch, Panier, ValidationFormulaire} from "./module.js";

// Récupétation du panier
let panier = Panier.recupProd();
// Boucle sur la panier
for (const key in panier) {
    // Appel fetch et assigne le résultat à un objet
    let reponse = await Objfetch.recupConfig(panier[key].id);
    
    // Ajout de la couleur et la quantité à l'objet
    reponse.color = panier[key].color;
    reponse.quantity = panier[key].quantity;
    // Création de la structure 
    reponse.structureProdPageCart();
}

// Appel du Total du panier et nombre d'articles
Panier.prixTotalDuPanier();
Panier.nbreArticleDuPanier();

// Gestionnaire d'évènements

// Changement de la quantité des article
let inputQuantity = document.querySelectorAll('.itemQuantity');
inputQuantity.forEach(element => {
    element.addEventListener('change', (e) =>{
        Panier.changeQuantite(e.target, e.target.value, e.target.closest(".cart__item").dataset.id,  e.target.closest(".cart__item").dataset.color);
        Panier.prixTotalDuPanier();
        Panier.nbreArticleDuPanier();
    });
});

// Suppression totale de l'article sélectionné
let buttondelete = document.querySelectorAll('.deleteItem');
buttondelete.forEach(element => {
    element.addEventListener('click', (e) =>{
        Panier.supprimeLeProduit(e.target.closest(".cart__item").dataset.id, e.target.closest(".cart__item").dataset.color); 
        e.target.closest(".cart__item").remove();
        Panier.prixTotalDuPanier();
        Panier.nbreArticleDuPanier();
    });
});


// FORMULAIRE /////////////////////////////////////////////////////////////

// instance de la classe validationFormulaire
let contact = new ValidationFormulaire;
let products = [];

const buttoncommande = document.getElementById('order');
buttoncommande.addEventListener('click', (e) =>{
    e.preventDefault();

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');
    
    contact.firstName = firstName.value;
    contact.lastName = lastName.value;
    contact.address = address.value;
    contact.city = city.value;
    contact.email = email.value;

    let panier = Panier.recupProd();

    if(panier == [] || panier == ''){
        alert('Votre panier est vide. Veuillez consulter notre catalogue en ligne pour effectuer vos achats.');
        firstName.value = "";
        lastName.value = "";
        address.value = "";
        city.value = "";
        email.value = "";
    }else{
        if(contact.valid()){

            window.alert('Votre commande à bien été prise en compte');
        
            for (let i = 0; i < panier.length; i++) {
                products.push((panier[i].id));
            };

            let order = {
                contact: contact,
                products : products
            };

            envoieCommande(order);
                    
        }else{
            window.alert('Veuillez renseignez toutes vos coordonnées afin que nous puissions vous livrer votre commande.')
        }
    }
});

function envoieCommande(order){

    fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        body: JSON.stringify(order),
        headers: { 
            'Content-Type': 'application/json' 
        },
    })
    .then((res) => res.json())
    .then((data) => {
        let orderId =  data.orderId;
        window.location.assign("confirmation.html?id=" + orderId)
    });
}







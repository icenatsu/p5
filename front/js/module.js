/////////////////////////////////////////////////////////////////////////////////
//////////////// Fetch / Object / Structure /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

export class Objfetch {

    // RETOURNE APPEL de fetch avec résolution de la réponse dans un objet

    static async recupConfig(data) {
        let fetchconfig = await fetch("http://localhost:3000/api/products/" + data)
        return Object.assign(new Objfetch(), await fetchconfig.json());
    }

    structureProdIndex(){

        const section = document.getElementById("items");
        
        for (const key in this) {
            
            // CREATION STRUCTURE DE LA PAGE INDEX

            // => attributs / Valeurs
            /////////////////////////
            // Lien canap
            const lienkanap = document.createElement('a');
            lienkanap.setAttribute('href', `./product.html?id=${this[key]._id}`);
            // Article
            const article = document.createElement('article');
            // image du canapé
            const imgkanap = document.createElement('img');
            imgkanap.setAttribute('src', this[key].imageUrl);
            // Nom du canapé
            const namekanap = document.createElement('h3');
            namekanap.setAttribute('class', 'productName');
            namekanap.textContent = this[key].name;
            // Description du canapé
            const description = document.createElement('p');
            description.textContent = this[key].description; 
    
            // NODE
            section.append(lienkanap);
            lienkanap.append(article);
            article.append(imgkanap, namekanap, description); 
        }

    }

    structureProdPageProduct(){
        
        //CREATION STRUCTURE PAGE PRODUIT

        // => Récupérations / Créations / Attributions
        //////////////////////////////////////////////
        // Conteneur de l'image
        const containerimg = document.querySelector('.item__img');
        //Image du canapé
        const imgkanap = document.createElement('img');
        imgkanap.setAttribute('src', this.imageUrl);
        imgkanap.setAttribute('alt', this.altTxt);
        // Nom du canapé
        const namekanap = document.querySelector('#title')
        namekanap.textContent = this.name;
        // Prix du canapé
        const price = document.querySelector('#price')
        price.textContent = this.price;
        // Description du canapé
        const description = document.querySelector('#description');
        description.textContent = this.description;
        // Couleur du canapé
        const color = document.querySelector('#colors');

        // => NODE
            containerimg.append(imgkanap);

        for (const element in this.colors) {
            const option = document.createElement('option')
            color.append(option);
            option.value = this.colors[element];
            option.textContent = this.colors[element];
        }    
    }

    structureProdPageCart(){
        
        // CREATION DE LA STRUCTURE PAGE CART

        // Récupération / Creations / Attributions des attributs et des valeurs
        ///////////////////////////////////////////////////////////////////////
        // Section 
        const cartekanap = document.getElementById('cart__items');
        // Article
        const article = document.createElement('article');   
        article.setAttribute("class", "cart__item")
        article.dataset.id = this._id;
        article.dataset.color = this.color; 
        // Conteneur image
        const containerimg = document.createElement('div');
        containerimg.setAttribute("class", "cart__item__img");
        // image du canapé
        const imgkanap = document.createElement('img');
        imgkanap.setAttribute('src', this.imageUrl);
        imgkanap.setAttribute('alt', this.altTxt);
        // Conteneur description et option
        const containercontent = document.createElement('div');
        containercontent.setAttribute("class", "cart__item__content");
        // Conteneur description
        const description = document.createElement('div');
        description.setAttribute("class", "cart__item__content__description");        
        // nom du canapé
        const nameKanap = document.createElement('h2');
        nameKanap.textContent =this.name;
        // prix du canapé
        const price = document.createElement('p');
        price.textContent = this.price + "€";
        // couleur du canapé
        const couleur = document.createElement('p');
        couleur.textContent =this.color;
        // Conteneur option
        const containersettings = document.createElement('div');
        containersettings.setAttribute("class", "cart__item__content__settings");
        // Sous conteneur option
        const souscontainersettings = document.createElement('div');
        souscontainersettings.setAttribute("class", "cart__item__content__settings__quantity");
        // Quantité 
        const quantity = document.createElement('p');
        quantity.textContent = 'Qté';
        // Input des quantités
        const input = document.createElement('input');
        input.setAttribute("class", "itemQuantity");
        input.setAttribute("type", "number");
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        input.value = this.quantity;
        // Conteneur suppression
        const containerdelete = document.createElement('div');
        containerdelete.setAttribute("class", "cart__item__content__settings__delete");
        // Bouton suppression
        const buttondelete = document.createElement('p');
        buttondelete.setAttribute("class", "deleteItem");
        buttondelete.textContent = "Supprimer";  
        
        // NODE
        cartekanap.append(article);  
        article.append(containerimg, containercontent);
        containerimg.append(imgkanap);
        containercontent.append(description, containersettings)   
        description.append(nameKanap, couleur, price);
        containersettings.append(souscontainersettings, containerdelete);
        souscontainersettings.append(quantity, input);
        containerdelete.append(buttondelete);
    }

    structureConfirmation(){

        // Selection de la div portant la classe content
        let content = document.querySelector('.item__content');
        content.style.position = "relative";

        // Conteneur la confirmation
        let containerconfirmation = document.createElement('div');
        containerconfirmation.setAttribute('id', 'containerconfirmation');
        containerconfirmation.style.justifyContent = 'center';
        containerconfirmation.style.display = 'flex';
        containerconfirmation.style.flexDirection = 'column';
        containerconfirmation.style.alignItems = 'center';
        containerconfirmation.style.width = '80%';
        containerconfirmation.style.height = '40%';
        containerconfirmation.style.border = "1px solid transparent"
        containerconfirmation.style.borderRadius = "30px"
        containerconfirmation.style.background = "rgba(255, 255, 255, 0.99)"
        containerconfirmation.style.position = "absolute";
        containerconfirmation.style.left = '50%';
        containerconfirmation.style.top = '50%'
        containerconfirmation.style.transform = 'translate(-50%, -50%)';
        containerconfirmation.style.color = 'black';
        containerconfirmation.style.textAlign = 'center';
        
        // Description de la validation
        let validation = document.createElement('p');
        validation.textContent = "Votre commande est bien prise en compte et a été ajoutée au panier. Veuillez continuer vos achats ou accéder au panier.";
        
        // Lien vers le panier
        let lien = document.createElement('a');
        lien.href = "http://127.0.0.1:58252/front/html/cart.html"
        lien.textContent = "Panier";
        lien.style.color = "blue";
        lien.style.fontWeight = "600";
        lien.style.textDecoration = "none";
        
        // Bouton fermer 
        let buttonfermer = document.createElement('button');
        buttonfermer.textContent = 'X';
        buttonfermer.style.position = 'absolute';
        buttonfermer.style.top = '15px';
        buttonfermer.style.right = '15px';
        buttonfermer.style.color = "red";
        buttonfermer.style.border = "2px solid red"
        buttonfermer.style.borderRadius = "50%";
        buttonfermer.style.fontSize = "15px";
        buttonfermer.style.height = "25px";
        
        // Gestionnaire d'évenements sur le bouton fermer
        buttonfermer.addEventListener('mouseover', () =>{
            buttonfermer.style.transform = "scale(1.1)";
        })
        
        buttonfermer.addEventListener('mouseleave', () =>{
            buttonfermer.style.color = "red";
            buttonfermer.style.transform = "scale(1)";
        })
        
        buttonfermer.addEventListener('click', () =>{
            containerconfirmation.remove();
        })
        
        // NODE
        content.appendChild(containerconfirmation)
        containerconfirmation.append(validation, lien, buttonfermer);
    }
}

/////////////////////////////////////////////////////////////////////////////////
//////////////// FONCTIONNALITE DU PANIER ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


const nomLS = 'Kanap';

export class Panier{

    // Recupération des produits du localstorage
    static recupProd(){
        let panier = localStorage.getItem(nomLS);
        return (panier != null) ? JSON.parse(panier) : [];
    }
    // Enregistrer le panier dans le localstorage
    static save(panier) {
        localStorage.setItem(nomLS, JSON.stringify(panier));
    }
    // Ajouter le produit au panier
    static add(produit){
        
        let panier = this.recupProd();
        // Conversion de la quantité saisie d'une string en nombre
        let quantiteval = Number(quantity.value);
        
        // Si quantité saisie supérieure à 0 et inférieure à 101 et que la couleur saisie est bien renseignée
        if((quantiteval > 0 && quantiteval < 101) && (colors.value != "")){

            if (panier.length <= 0){ // Si Panier vide

                // La quantité du produit est égale à la quantité saisie
                produit.quantity = quantiteval;
                // On pousse la quantité dans le panier et on sauvegarde
                panier.push(produit);
                this.save(panier);
                // Appel de la structure de confirmation
                new Objfetch().structureConfirmation();

            }else{ // Panier contenant déjà 1 ou plusieurs produits
                
                // On recherche si le produit existe déjà dans le panier
                let trouverProduit = panier.find(valeur => valeur.id == produit.id) && panier.find(valeur => valeur.color == produit.color);  
                // Si le produit existe dans le panier
                if(trouverProduit !== undefined){
                    // Si la quantité du produit existant + la quantité saisie n'excède pas les 100 unités
                    if (trouverProduit.quantity + quantiteval < 101){
                        // alors la quantité saisie s'ajoute au produit existant et on sauvegarde
                        trouverProduit.quantity += quantiteval;
                        this.save(panier);
                        // Appel de la structure de confirmation
                        new Objfetch().structureConfirmation();
           
                    }else{
                        alert("Votre panier ne peut contenir qu'un maximum de 100 unités par article");
                    }
                }else{
                    // Si le produit n'existe pas déjà dans le panier alors le produit voit sa quantité égale à la quantité saisie
                    produit.quantity = quantiteval;
                    // on pousse la valeur dans le panier et on le sauvegarde
                    panier.push(produit);
                    this.save(panier);
                    // Appel de la structure de 
                    new Objfetch().structureConfirmation();
                }          
            } 
        }else{
            alert(`Veuillez entrer une quantité comprise entre 1 et 100 ainsi qu'une couleur.`)
        } 
    }   

    // Prix total du panier
    static async prixTotalDuPanier(){
        let panier = this.recupProd();
        let prixtotal = 0;
     
        for (const key in panier) {
            let recupreponsefetch = await Objfetch.recupConfig(panier[key].id);
            prixtotal += panier[key].quantity*recupreponsefetch.price;
        }
        
        return document.querySelector('#totalPrice').textContent = prixtotal; 
    }
    // Nbre d'articles totaux du panier
    static nbreArticleDuPanier(){

        let panier = this.recupProd();
        let totalquantity = 0;
     
        for (const key in panier) {
            totalquantity += panier[key].quantity;
        }
    
        return document.querySelector('#totalQuantity').textContent = totalquantity; 
    }
    // Changer la quantité d'un produit
    static changeQuantite(element, quantity, id, color){
        let test = 0;
        let panier = this.recupProd();
        quantity = Number(quantity);

        if(quantity <= 0){
            alert('Vous ne pouvez pas entrer une valeur négative ou égale à 0. Pour supprimer le produit veuillez cliquer sur supprimer.');
        }else if(quantity > 100){
            let trouverProduit = panier.find(p => p.id == id) && panier.find(valeur => valeur.color == color);
            alert('Vous ne pouvez pas entrer une quantité supérieure à 100.');
            element.value = trouverProduit.quantity;
        }else{
            let trouverProduit = panier.find(p => p.id == id) && panier.find(valeur => valeur.color == color);
            if(trouverProduit != undefined){
                trouverProduit.quantity = quantity;
                this.save(panier);
            }
        }
    }
    // Supprime le produit du panier
    static supprimeLeProduit(id, color){
        let panier = this.recupProd();
        panier = panier.filter(valeur => valeur.id != id) && panier.filter(valeur => valeur.color != color);
        this.save(panier);
    }
    // vide ke panier
    static viderLePanier(){
        localStorage.clear(); 
    }
}

/////////////////////////////////////////////////////////////////////////////////
//////////////// VALIDATION FORMULAIRE //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

export class ValidationFormulaire{
    // Construction de l'objet du formulaire
    constructor(){

        this.firstName = "",
        this.lastName = "",
        this.address = "",
        this.city = "",
        this.email = ""

        return this;
    }

    // Phase de test des champs via les regex et affichages des messages d'erreurs en conséquence
    valid(){

        // regex  
        let regexFirstnameandLastname = /^([a-zA-Z àâäéèêëïîôöùûüç,.'-]{3,20}-{0,1})?([a-zA-Z àâäéèêëïîôöùûüç,.'-]{3,20})$/;
        let regexAddress = /^[a-zA-Z0-9 àâäéèêëïîôöùûüçs,'-]{5,50}$/;
        let regexCity = /^[a-zA-Z àâäéèêëïîôöùûüç,.'-]{1,40}$/;
        let regexemail = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/;
        // Test des différents champs input en fonction des regex
        let testfirstname = regexFirstnameandLastname.test(this.firstName);
        let testlastname = regexFirstnameandLastname.test(this.lastName);
        let testaddress = regexAddress.test(this.address);
        let testcity = regexCity.test(this.city);
        let testemail = regexemail.test(this.email);

        let contactvalid = true;

        if(!testfirstname){
            contactvalid = false;
            firstName.nextElementSibling.textContent = "Le prénom doit comporter 3 lettres minimum sans chiffres merci !!!";
            
        }else{
            firstName.nextElementSibling.textContent = "";
        }
        if(!testlastname){
            contactvalid = false;
            lastName.nextElementSibling.textContent = "Le nom doit comporter 3 lettres minimum sans chiffres merci !!!";
        }else{
            lastName.nextElementSibling.textContent = ""; 
        }
        if(!testaddress){
            contactvalid = false;
            address.nextElementSibling.textContent = "Merci de renseigner une adresse valide, max 50 caractères";
        }
        else{
            address.nextElementSibling.textContent = "";
        }
        if(!testcity){
            contactvalid = false;
            city.nextElementSibling.textContent = "Merci de renseigner votre lieu d'habitation";
        }else{
            city.nextElementSibling.textContent = "";
        }
        if(!testemail){
            contactvalid = false;
            email.nextElementSibling.textContent = "Email non valide";
        }else{
            email.nextElementSibling.textContent = "";
        }

        return contactvalid;
    }
}


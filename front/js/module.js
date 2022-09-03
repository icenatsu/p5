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
                // Confirme la commande et redirige sur la page cart
                alert(`Votre commande est bien prise en compte et à été ajoutée au panier`);
                window.location.assign("cart.html");

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
                        // Confirme la commande et redirige sur la page cart
                        alert(`Votre commande est bien prise en compte et à été ajoutée au panier`);
                        window.location.assign("cart.html");
                    }else{
                        alert("Votre panier ne peut contenir qu'un maximum de 100 unités par article");
                    }
                }else{
                    //si le produit n'existe pas déjà dans le panier alors le produit voit sa quantité égale à la quantité saisie
                    produit.quantity = quantiteval;
                    // on pousse la valeur dans le panier et on le sauvegarde
                    panier.push(produit);
                    this.save(panier);
                    // Confirme la commande et redirige sur la page cart
                    alert(`Votre commande est bien prise en compte et à été ajoutée au panier`);
                    window.location.assign("cart.html");
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
    static changeQuantite(quantity, id, color){

        let panier = this.recupProd();
        quantity = Number(quantity);

        if(quantity <= 0){
            alert('Vous ne pouvez pas entrer une valeur négative ou égale à 0. Pour supprimer le produit veuillez cliquer sur supprimer.');
        }else if(quantity > 100){
            alert('Vous ne pouvez pas entrer une quantité supérieure à 100.');
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
    constructor(firstName, lastName, address, city, email){

        this.firstName = "";
        this.lastName = "";
        this.address = "";
        this.city = "";
        this.email = "";

        return this;
    }

    // Phase de test des champs via les regex et affichages des messages d'erreurs en conséquence
    valid(element, regex, elementerror, id, type){
        
        let valid = false;
        let test = regex.test(element);
        
        elementerror = document.getElementById(id);

        if(test){
            elementerror.innerText = "";
            valid = true;
        }else{    

                if(type == 'firstName'){
                    elementerror.textContent = "Le prénom doit comporter 3 lettres minimum sans chiffres merci !!!";
                }
                if(type == 'name'){
                    elementerror.textContent = "Le nom doit comporter 3 lettres minimum sans chiffres merci !!!";
                }
                if(type == 'address'){
                    elementerror.textContent = "Merci de renseigner une adresse valide, max 50 caractères";
                }
                if(type == 'city'){
                    elementerror.textContent = "Merci de renseigner votre lieu d'habitation";
                }
                if(type == 'email'){
                    elementerror.textContent = "Email non valide";
                }   
                valid = false;
        }
        return valid;
    }
    
    ckeckInputError(nbreerror, element){ 
    
        if(element.valid(firstName.value, /^([a-zA-Z àâäéèêëïîôöùûüç,.'-]{3,20}-{0,1})?([a-zA-Z àâäéèêëïîôöùûüç,.'-]{3,20})$/, firstName.nextElementSibling, 'firstNameErrorMsg', 'firstName')){
            nbreerror--;
        }
        if(element.valid(lastName.value, /^([[a-zA-Z àâäéèêëïîôöùûüç,.'-]{3,20}-{0,1})?([[a-zA-Z àâäéèêëïîôöùûüç,.'-]{3,20})$/, lastName.nextElementSibling, 'lastNameErrorMsg', 'name')){
            nbreerror--;
        }
        if(element.valid(address.value, /^[a-zA-Z0-9 àâäéèêëïîôöùûüçs,'-]{5,50}$/, address.nextElementSibling, 'addressErrorMsg', 'address')){
            nbreerror--;
        }
        if(element.valid(city.value, /^[a-zA-Z àâäéèêëïîôöùûüç,.'-]{1,30}$/, city.nextElementSibling, 'cityErrorMsg', 'city')){
            nbreerror--;
        }
        if(element.valid(email.value, /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/, email.nextElementSibling, 'emailErrorMsg', 'email')){
            nbreerror--;
        }
        return nbreerror;
    }
}
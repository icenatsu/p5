/////////////////////////////////////////////////////////////////////////////////
//////////////// Fetch / Object / Structures ////////////////////////////////////
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

    structureinsidemodalepageproduit(){

        let modale = document.querySelector('#containerconfirmation');

        // Description de la validation
        const messagealert = document.createElement('p');
        messagealert.setAttribute('id', 'msgmodale');
        messagealert.textContent = "Votre commande est bien prise en compte et a été ajoutée au panier.";

        // Lien continuer vos achats
        const lienachat = document.createElement('div');
        lienachat.textContent = "Continuer vos achats";
        lienachat.style.color = "blue";
        lienachat.style.fontWeight = "600";
        lienachat.style.marginTop = '15px';

        // Lien vers le panier
        const lienpanier = document.createElement('a');
        lienpanier.href = "./cart.html"
        lienpanier.textContent = "Accéder au panier";
        lienpanier.style.color = "blue";
        lienpanier.style.fontWeight = "600";
        lienpanier.style.textDecoration = "none";
        lienpanier.style.marginTop = '15px';

        // Bouton fermer 
        const buttonfermer = document.createElement('button');
        buttonfermer.textContent = 'X';
        buttonfermer.style.cursor = 'pointer';
        buttonfermer.style.position = 'absolute';
        buttonfermer.style.top = '20px';
        buttonfermer.style.right = '20px';
        buttonfermer.style.color = "red";
        buttonfermer.style.border = "2px solid red"
        buttonfermer.style.borderRadius = "50%";
        buttonfermer.style.fontSize = "15px";
        buttonfermer.style.height = "25px";

        // Gestionnaire d'évenements sur le lien achat
        lienachat.addEventListener('click', () =>{
            modale.remove();
        })
        lienachat.addEventListener('mouseover', () =>{
            lienachat.style.cursor = "pointer";
        })

        // Gestionnaire d'évenements sur le bouton fermer
        buttonfermer.addEventListener('mouseover', () =>{
            buttonfermer.style.transform = "scale(1.1)";
        })

        buttonfermer.addEventListener('mouseleave', () =>{
            buttonfermer.style.color = "red";
            buttonfermer.style.transform = "scale(1)";
        })

        buttonfermer.addEventListener('click', () =>{
            modale.remove();
        })

        modale.append(messagealert, lienachat, lienpanier, buttonfermer); 

        // this.responsive();

    }

    structureinsidemodalepagepanier(){

        let modale = document.querySelector('#containerconfirmation');
    
        // Description de la validation
        const messagealert = document.createElement('p');
        messagealert.setAttribute('id', 'msgmodale');
        messagealert.textContent = "Votre panier est vide. Veuillez consulter notre catalogue en ligne pour effectuer vos achats.";

        // Lien continuer vos achats
        const lienindex = document.createElement('a');
        lienindex.href = "./index.html";
        lienindex.textContent = "Continuer vos achats";
        lienindex.style.color = "blue";
        lienindex.style.fontWeight = "600";
        lienindex.style.marginTop = '15px';
        lienindex.style.textDecoration = "none";

        modale.append(messagealert, lienindex); 
        this.responsive();
    }

    structuremodale(parent, largeur, hauteur){

        // Conteneur la confirmation
        const containermodale = document.createElement('div');
        containermodale.setAttribute('id', 'containerconfirmation');
        containermodale.style.textAlign = 'center';
        containermodale.style.justifyContent = 'center';
        containermodale.style.display = 'flex';
        containermodale.style.flexDirection = 'column';
        containermodale.style.alignItems = 'center';
        containermodale.style.width = largeur;
        containermodale.style.height = hauteur; 
        containermodale.style.boxShadow = "inset 0 0 20px midnightblue";
        containermodale.style.borderRadius = "30px"
        containermodale.style.background = "rgba(255, 255, 255, 0.99)"
        containermodale.style.position = "absolute";
        containermodale.style.left = '50%';
        containermodale.style.top = '53%';
        containermodale.style.transform = 'translate(-50%, -50%)';
        containermodale.style.color = 'black';
        containermodale.style.padding = "30px";
 
        // NODE
        parent.appendChild(containermodale)
    }

    responsive(){

        const media600plus = window.matchMedia("(min-width:600px)");
        const media600moins = window.matchMedia("(max-width:600px)");
        const message = document.querySelector('#msgmodale');

        window.addEventListener('load', function(){

            if(media600plus.matches){
                console.log('plus');
                message.style.fontSize = '18px';
            }
            else if(media600moins.matches){
                console.log('moins');
                message.style.fontSize = '16px';
            }
            window.addEventListener('resize', function(){        

                if(media600plus.matches){
                    console.log('plus');
                    message.style.fontSize = '18px';
                }
                else if(media600moins.matches){
                    console.log('moins');
                    message.style.fontSize = '16px';
                }
            });
        });  
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
        let quantiteval = Number(quantity.value);
        console.log(panier);
        
        let content = document.querySelector('.item__content');
        content.style.position = "relative";
        
        const modale = new Objfetch().structuremodale(content, "60%", "30%");
        const contenumodale = new Objfetch().structureinsidemodalepageproduit();
    
        
        if((quantiteval > 0 && quantiteval < 101) && (colors.value != "")){
            if (panier.length <= 0){ // Si Panier vide
    
                produit.quantity = quantiteval;
                panier.push(produit);
                this.save(panier);
                modale;
                contenumodale;
                
            }else{ // Panier contenant déjà 1 ou plusieurs produits
                let trouverProduit = panier.find(valeur => valeur.id == produit.id) && panier.find(valeur => valeur.color == produit.color);  
                
                if(trouverProduit !== undefined){
                   
                    if (trouverProduit.quantity + quantiteval < 101){
                        
                        trouverProduit.quantity += quantiteval;
                        this.save(panier);
                        modale;
                        contenumodale;
           
                    }else{
                        alert("Votre panier ne peut contenir qu'un maximum de 100 unités par article");
                    }
                }else{
                    
                    produit.quantity = quantiteval;
                    panier.push(produit);
                    this.save(panier);
                    
                    modale;
                    contenumodale;
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


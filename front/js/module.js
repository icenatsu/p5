//////////////// Object / Fetch / Structures //////////////////////////
export class Obj {

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Nouvelle instance de la classe Obj = objet                                                       //             
    // Appel à l'api = renvoie d'un flux de réponse de la méthode get (par défaut)                      //        
    // Si la réponse de l'api est vrai                                                                  //
    //  => reponse.json() : transformation du flux au format json => promesse                           //
    //  => promesse tenue => fulfilled                                                                  //
    //  => await reponse.json() : analyse de la promise pour retourner une variable javascript          //
    //  => Object.assign(objet, await reponse.json()) => {{reponse}{reponse}....}                       //
    //  => Retourne donc chacune des réponses dans un objet, elles mêmes contenues dans un objet global //
    // Si la réponse de l'api est fausse                                                                //
    // => reponse.json() : transformation du flux au format json => promesse                            //
    // => promesse non tenue => rejected                                                                //                                                               
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    static async configFetchGet(data) {
        let reponse = await fetch("http://localhost:3000/api/products/" + data)
        return Object.assign(new Obj(), await reponse.json());
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Nouvelle instance de la classe Obj = objet                                                       //             
    // Appel à l'api = renvoie d'un flux de réponse de la méthode POST dans laquelle :                  //
    //                      => on envoie un objet commande javascript convertit en JSON                 // 
    //                      => Information du type de données envoyées                                  //      
    // Si la réponse de l'api est vrai                                                                  //
    //  => reponse.json() : transformation du flux au format json => promesse                           //
    //  => promesse tenue => fulfilled                                                                  //
    //  => await reponse.json() : analyse de la promise pour retourner une variable javascript          //
    //  => Object.assign(objet, await reponse.json()) => {{reponse}{reponse}....}                       //
    //  => Retourne donc chacune des réponses dans un objet, elles mêmes contenues dans un objet global //
    // Si la réponse de l'api est fausse                                                                //
    // => reponse.json() : transformation du flux au format json => promesse                            //
    // => promesse non tenue => rejected                                                                //                                                               
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    static async configFetchPost(order){
        let reponse = await fetch ("http://localhost:3000/api/products/order",{
            method: "POST",
            body: JSON.stringify(order),
            headers: { 
                'Content-Type': 'application/json' 
            },
        })
        return Object.assign(new Obj(), await reponse.json())
    }

    // Structure de l'affichage des produits de la page index.html
    /**************************************************************/
    structureProdIndex(){
        
        //////////////////////////////////////////////////////////////////////
        // Sélection du parent principal de la structure                    //
        // Boucle sur l'objet global des réponses de fetch                  // 
        // Elements permettant de créer la structure :                      //
        //    => Créations des sélecteurs + attribut                        //
        //    => Assignations des valeurs de l'objet                        //
        //    => Rattachement des sélecteurs enfants aux sélecteurs parents //        
        //////////////////////////////////////////////////////////////////////

        const section = document.getElementById("items");

        for (const key in this) {
            
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

    // Structure de l'affichage du produit sélectionné de la page product.html
    /***************************************************************************/
    structureProdPageProduct(){

        //////////////////////////////////////////////////////////////////////
        // Elements permettant de créer la structure :                      //
        //    => Sélections et Créations des sélecteurs + attributs         //
        //    => Assignations des valeurs de l'objet appelé sur la méthode  // 
        //    => Rattachement des sélecteurs enfants aux sélecteurs parents // 
        //////////////////////////////////////////////////////////////////////

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
        for (const element in this.colors) {
            const option = document.createElement('option')
            color.append(option);
            option.value = this.colors[element];
            option.textContent = this.colors[element];
        }    
        // => NODE
        containerimg.append(imgkanap);
    }

    // Structure des produits de la page panier : cart.html
    /******************************************************/
    structureProdPageCart(){

        ////////////////////////////////////////////////////////////////////////
        // Elements permettant de créer la structure :                        //
        //    => Sélection et Créations des sélecteurs + attributs            //
        //    => Assignations des valeurs de l'objet appelé sur cette méthode //                                                      
        //    => Rattachement des sélecteurs enfants aux sélecteurs parents   //
        ////////////////////////////////////////////////////////////////////////
       
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


    // Structure de la modale générale => Utilisation sur la page product.html et cart.html
    /**************************************************************************************/
    structuremodale(parent, largeur, hauteur){

        //////////////////////////////////////////////////////////////////////////////
        // Elements permettant de créer la structure :                              // 
        //    => Création du sélecteur + attribut                                   //         
        //    => Assignations des valeurs aux propriétés de style css pour réaliser //
        //       le design de la modale                                             //
        //    => Rattachement de la modale à son parent déclaré en paramètre        //
        //////////////////////////////////////////////////////////////////////////////

        const modale = document.createElement('div');
        modale.setAttribute('id', 'containerconfirmation');
        modale.style.textAlign = 'center';
        modale.style.justifyContent = 'center';
        modale.style.display = 'flex';
        modale.style.flexDirection = 'column';
        modale.style.alignItems = 'center';
        modale.style.width = largeur;
        modale.style.height = hauteur; 
        modale.style.boxShadow = "inset 0 0 20px midnightblue";
        modale.style.borderRadius = "30px"
        modale.style.background = "rgba(255, 255, 255, 0.99)"
        modale.style.position = "absolute";
        modale.style.left = '50%';
        modale.style.top = '53%';
        modale.style.transform = 'translate(-50%, -50%)';
        modale.style.color = 'black';
        modale.style.padding = "30px";
 
        // NODE
        parent.appendChild(modale);
    }

    // Structure du contenu de la modale de la page product.html
    /***********************************************************/
    structureinsidemodalepageproduit(){

        //////////////////////////////////////////////////////////////////////////////
        // Elements permettant de créer la structure :                              // 
        //    => Création des sélecteurs + attributs                                //         
        //    => Assignations des valeurs pour créer le design du contenu de la     //
        //       modale                                                             //
        //    => Rattachement du contenu de la modale à la modale                   //
        //    => Appel de la méthode responsive                                     //
        //////////////////////////////////////////////////////////////////////////////

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

        this.responsive();
    }

    // Structure du contenu de la modale de la page cart.html
    /********************************************************/
    structureinsidemodalepagepanier(){

        //////////////////////////////////////////////////////////////////////////////
        // Elements permettant de créer la structure :                              // 
        //    => Sélection / Créations des sélecteurs + attributs                   //         
        //    => Assignations des valeurs pour créer le design du contenu de la     //
        //       modale                                                             //
        //    => Rattachement du contenu de la modale à la modale                   //
        //    => Appel de la méthode responsive                                     //
        //////////////////////////////////////////////////////////////////////////////

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

    // Gestion du responsive avec les mediamatch
    /*******************************************/
    responsive(){

        ////////////////////////////////////////////////////////////////
        // Déclarations des medias                                    // 
        //    => largeur minimale de 600px                            //
        //    => largeur maximale de 600px                            //
        //    => Gestion du responsive des élements                   //
        //       en fonction de la taille et du redimentionnement     //
        //       de la taille de la fenêtre du navigateur             //       
        ////////////////////////////////////////////////////////////////

        const media600plus = window.matchMedia("(min-width:600px)");
        const media600moins = window.matchMedia("(max-width:600px)");
        const message = document.querySelector('#msgmodale');


            if(media600plus.matches){
                message.style.fontSize = '18px';
            }
            else if(media600moins.matches){
                message.style.fontSize = '16px';
            }

            window.addEventListener('resize', function(){        

                if(media600plus.matches){
                    message.style.fontSize = '18px';
                }
                else if(media600moins.matches){
                    message.style.fontSize = '16px';
                }
            });
    }
}

/////////////////////////////////////////////////////////////////////////////////
//////////////// FONCTIONNALITE DU PANIER ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const nomLS = 'Kanap';

export class Panier{

    // Recupération des produits du localstorage
    /*******************************************/
    static recupProd(){
        // Renvoie un tableau si le panier est vide
        // sinon
        // Retourne la construction de l'objet javascript du format JSON 

        let panier = localStorage.getItem(nomLS);
        return (panier != null) ? JSON.parse(panier) : [];
    }

    // Enregistrer le panier dans le localstorage
    /*******************************************/
    static save(panier) {
        // Envoie de l'objet javascript au localstorage au format JSON (chaine de caractères)
        localStorage.setItem(nomLS, JSON.stringify(panier));
    }

    // Ajouter le produit au panier
    /******************************/
    static add(produit){

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Déclarations :                                                                                                           //  
        // => Récupération de l'objet du produit en paramètre                                                                       //    
        // => Récupération des produits du localstorage                                                                             //    
        // => Récupération de la quantité saisie par l'utilisateur et conversion en nombre                                          //
        // => Parent du dom de la modale                                                                                            //        
        // => Nouvelle instance la classe Obj();                                                                                    //
        // Vérification de la quantité saisie et de la couleur :                                                                    //    
        // => obligation de saisir une comprise entre 1 et 100 unités ainsi qu'une couleur sélectionnée                             //
        // => sinon message d'alerte                                                                                                //
        // Si Panier vide  *********************************************************************************************************//
        // => La quantité du produit prend la valeur saisie                                                                         //        
        // => Sauvegarde du produit dans le panier et appel de la structure de la modale de confirmation                            //
        // Panier non vide *********************************************************************************************************//
        // Le produit sélectionné existe déjà dans le panier ou non? Recherche grâce à son id et sa couleur                         //
        //      => Si le produit existe et que sa quantité additionnée à la quantité saisie n'exèdent pas les 100 unités            //
        //              => Sauvegarde de la quantité du produit dans le panier et appel de la structure de la modale de confirmation//
        //              => Sinon message d'alerte                                                                                   //
        //      => Si le produit n'existe pas déjà alors le nouveau produit prend la valeur de la quantité saisie                   //                
        //              => Sauvegarde dans le panier et appel de la structure de la modale de confirmation                          //        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let panier = this.recupProd();
        let quantiteval = Number(quantity.value);
        let content = document.querySelector('.item__content');
        content.style.position = "relative";
        let obj = new Obj();
        
        if((quantiteval > 0 && quantiteval < 101) && (colors.value != "")){
            
            if (panier.length <= 0){ 
                produit.quantity = quantiteval;
                panier.push(produit);
                this.save(panier);
                obj.structuremodale(content, "60%", "30%");
                obj.structureinsidemodalepageproduit();
            }else{ 
                let trouverProduit = panier.find(valeur => valeur.id == produit.id) && panier.find(valeur => valeur.color == produit.color);  
                if(trouverProduit !== undefined){
                    if (trouverProduit.quantity + quantiteval < 101){
                        trouverProduit.quantity += quantiteval;
                        this.save(panier);
                        obj.structuremodale(content, "60%", "30%");
                        obj.structureinsidemodalepageproduit();
                    }else{alert("Votre panier ne peut contenir qu'un maximum de 100 unités par article");}
                }else{
                    produit.quantity = quantiteval;
                    panier.push(produit);
                    this.save(panier);
                    obj.structuremodale(content, "60%", "30%");
                    obj.structureinsidemodalepageproduit();
                }          
            } 
        }else{alert(`Veuillez entrer une quantité comprise entre 1 et 100 ainsi qu'une couleur.`)} 
    }   

    // Prix total du panier
    /**********************/
    static async prixTotalDuPanier(){

        // Récupération des produit du localstorage
        // Initialitation du prix total à 0
        // Boucle sur la panier
        // => Récupération de l'objet suite à l'appel de fetch
        // => Calcul du prix total en fonction des quantités du localstorage et des prix de l'objet
        // Affichage du prix total dans le dom

        let panier = this.recupProd();
        let prixtotal = 0;
     
        for (const key in panier) {
            let recupreponsefetch = await Obj.configFetchGet(panier[key].id);
            prixtotal += panier[key].quantity*recupreponsefetch.price;
        }
        
        return document.querySelector('#totalPrice').textContent = prixtotal; 
    }

    // Nbre d'articles totaux du panier
    /**********************************/
    static nbreArticleDuPanier(){
        
        // Récupération des produit du localstorage
        // Initialitation de la quantité totale à 0
        // Boucle sur la panier
        // => Calcul de la quantité totale en fonction des quantités des produits récupérées dans le localstorage
        // Affichage de la quantité totale dans le dom
        
        let panier = this.recupProd();
        let totalquantity = 0;
     
        for (const key in panier) {
            totalquantity += panier[key].quantity;
        }
        return document.querySelector('#totalQuantity').textContent = totalquantity; 
    }

    // Changer la quantité d'un produit
    /**********************************/ 
    static changeQuantite(input, quantity, id, color){
        
        // Paramètres (dom input / valeur de l'input / id et color dom dataset)  
        // Récupère les produits du localstorage
        // Conversion de la quantité saisie dans l'input en nombre
        // si la quantité saisie est inférieure ou égale à 0
        //  => message d'alerte
        // sinon si la quantité saisie est supérieure à 100
        //  => message d'alerte
        //  => Recherche la quantité actuelle du produit du panier et la retourne
        // sinon recherche du produit dans le panier et retourne la quantité saisie
        
        let panier = this.recupProd();
        quantity = Number(quantity);

        if(quantity <= 0){
            alert('Vous ne pouvez pas entrer une valeur négative ou égale à 0. Pour supprimer le produit veuillez cliquer sur supprimer.');
        }else if(quantity > 100){
            let trouverProduit = panier.find(p => p.id == id) && panier.find(valeur => valeur.color == color);
            alert('Vous ne pouvez pas entrer une quantité supérieure à 100.');
            input.value = trouverProduit.quantity;
        }else{
            let trouverProduit = panier.find(p => p.id == id) && panier.find(valeur => valeur.color == color);
            if(trouverProduit != undefined){
                trouverProduit.quantity = quantity;
                this.save(panier);
            }
        }
    }

    // Supprime le produit du panier
    /*******************************/
    static supprimeLeProduit(id, color){

        // Paramètres (id et color dom dataset)
        // Récupération des produits du panier
        // Récupération de tous les produits du paniers ne correspondant pas 
        // => aux données dataset id et couleur du parent du dom portant la classe .cart__item
        // Sauvegarde du panier

        let panier = this.recupProd();
        panier = panier.filter(valeur => valeur.id != id) && panier.filter(valeur => valeur.color != color);
        this.save(panier);
    }

    // vide le panier
    /***************/
    static viderLePanier(){
        localStorage.clear(); 
    }
}

/////////////////////////////////////////////////////////////////////////////////
//////////////// VALIDATION FORMULAIRE //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

export class ValidationFormulaire{
    // Construction de l'objet du formulaire comprenant les valeurs des input (sélectionnable directement par leurs ids)
    constructor(){

        this.firstName = firstName.value,
        this.lastName = lastName.value,
        this.address = address.value,
        this.city = city.value,
        this.email = email.value

        return this;
    }

    // Phase de test des champs input du formulaire
    /**********************************************/
    valid(){

        // Déclaration des regex
        // Test des différents champs input en fonction des regex
        // Initialisation de contactvalid à true
        // Pour chaque saisie des inputs 
        // si le test de la regex associée à la saisie de l'input est faux 
        //    => Message d'erreur dans les éléments du dom prévu à cet effet
        // sinon si le test est vrai
        //    => valeur vide renvoyée dans les éléments du dom prévu à cet effet
        // Retourne contactvalid qui ne sera vrai que si toutes les conditions sont vraies. 

        let regexFirstnameandLastname = /^([a-zA-Z àâäéèêëïîôöùûüç,.'-]{1,20}-{0,1})?([a-zA-Z àâäéèêëïîôöùûüç,.'-]{3,20})$/;
        let regexAddress = /^[a-zA-Z0-9 àâäéèêëïîôöùûüçs,'-]{5,50}$/;
        let regexCity = /^[a-zA-Z àâäéèêëïîôöùûüç,.'-]{1,40}$/;
        let regexemail = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/;
        
        let testfirstname = regexFirstnameandLastname.test(this.firstName);
        let testlastname = regexFirstnameandLastname.test(this.lastName);
        let testaddress = regexAddress.test(this.address);
        let testcity = regexCity.test(this.city);
        let testemail = regexemail.test(this.email);

        let contactvalid = true;

        if(!testfirstname){
            contactvalid = false;
            firstName.nextElementSibling.textContent = "Le prénom doit comporter 1 lettre minimum sans chiffres merci !!!";
            
        }else{
            firstName.nextElementSibling.textContent = "";
        }
        if(!testlastname){
            contactvalid = false;
            lastName.nextElementSibling.textContent = "Le nom doit comporter 1 lettre minimum sans chiffres merci !!!";
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


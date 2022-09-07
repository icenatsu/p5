// Importation de la classe
import {Obj} from './module.js';

afficherLesProduits();

async function afficherLesProduits(){
   // Récupération de l'objet suite à l'appel de fetch
   let reponse = await Obj.configFetchGet('');

   // Appel de la création de structure 
   reponse.structureProdIndex();
}


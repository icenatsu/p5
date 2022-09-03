import {Objfetch} from './module.js';

afficherLesProduits();
// Appel fetch
async function afficherLesProduits(){
   // Appel fetch et assignation à un objet
   let config = await Objfetch.recupConfig('');

   // Création de la structure
   config.structureProdIndex();
}

import {Objfetch} from './module.js';

afficherLesProduits();
// Appel fetch
async function afficherLesProduits(){
   // Appel fetch et assigne le résultat à un objet
   let reponse = await Objfetch.recupConfig('');

   // Création de la structure
   reponse.structureProdIndex();
}

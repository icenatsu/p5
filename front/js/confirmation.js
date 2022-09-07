// Importation de la classe
import { Panier } from "./module.js";

// Effacement du panier
Panier.viderLePanier();

// Récupération ID
let idOrder = new URL(window.location.href).searchParams.get("id");

// Affichage du numéro de commande dans le dom
let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;
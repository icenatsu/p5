import { Panier } from "./module.js";

// Effacement du panier
Panier.viderLePanier();

// Récupération ID
let idOrder = new URL(window.location.href).searchParams.get("id");

let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;
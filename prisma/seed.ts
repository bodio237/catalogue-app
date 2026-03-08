import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Casque audio", category: "Électronique", price: 89, stock: 12 },
      { name: "Sac à dos", category: "Accessoires", price: 59, stock: 4 },
      { name: "Lampe LED", category: "Maison", price: 35, stock: 7 },
      { name: "Montre connectée", category: "Électronique", price: 129, stock: 9 },
      { name: "Clavier mécanique", category: "Informatique", price: 99, stock: 6 },
      { name: "Souris gaming", category: "Informatique", price: 49, stock: 15 },
      { name: "Chaise de bureau", category: "Mobilier", price: 189, stock: 3 },
      { name: "Support ordinateur", category: "Accessoires", price: 29, stock: 11 },
      { name: "Webcam HD", category: "Informatique", price: 79, stock: 8 },
      { name: "Bouteille isotherme", category: "Maison", price: 25, stock: 20 },
    ],
  });

  console.log("Produits ajoutés dans la base");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
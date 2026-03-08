"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  async function fetchProducts() {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDeleteProduct(id: number) {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchProducts();
    }
  }

  const categories = ["Toutes", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "Toutes") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (search.trim() !== "") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, search, sortOrder]);

  const totalProducts = filteredProducts.length;
  const lowStockProducts = filteredProducts.filter((product) => product.stock < 5).length;
  const averagePrice =
    filteredProducts.length > 0
      ? filteredProducts.reduce((sum, product) => sum + product.price, 0) /
        filteredProducts.length
      : 0;

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Catalogue Produits</h1>
            <p className="mt-3 text-gray-600">
              Application web pour gérer un catalogue de produits.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin"
              className="inline-block rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Filtrer par catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Rechercher un produit
            </label>
            <input
              type="text"
              placeholder="Ex : Lampe, Casque..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Trier par prix
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm"
            >
              <option value="default">Par défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-sm text-gray-500">Nombre de produits</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">{totalProducts}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-sm text-gray-500">Stock faible</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">{lowStockProducts}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-sm text-gray-500">Prix moyen</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {averagePrice.toFixed(2)} €
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>

                {product.stock < 5 && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Stock faible
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p>Prix : {product.price} €</p>
                <p>Stock : {product.stock}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/product/${product.id}`}
                  className="inline-block rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
                >
                  Voir le produit
                </Link>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
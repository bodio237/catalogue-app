import { products } from "../../products";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Produit introuvable
        </h1>

        <Link href="/" className="mt-4 block text-blue-600 underline">
          Retour au catalogue
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-3xl rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

        <p className="mb-6 text-gray-500">{product.category}</p>

        <div className="space-y-3 text-lg">
          <p>
            <strong>Prix :</strong> {product.price} €
          </p>

          <p>
            <strong>Stock :</strong> {product.stock}
          </p>

          <p>
            <strong>ID produit :</strong> {product.id}
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Retour au catalogue
        </Link>
      </div>
    </main>
  );
}
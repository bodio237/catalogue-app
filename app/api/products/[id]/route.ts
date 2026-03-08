import { products } from "../../../products";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = Number(id);

  const index = products.findIndex((product) => product.id === productId);

  if (index === -1) {
    return Response.json({ message: "Produit introuvable" }, { status: 404 });
  }

  const deletedProduct = products[index];
  products.splice(index, 1);

  return Response.json(
    { message: "Produit supprimé", product: deletedProduct },
    { status: 200 }
  );
}
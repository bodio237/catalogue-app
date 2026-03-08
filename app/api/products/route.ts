import { products } from "../../products";

export async function GET() {
  return Response.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newProduct = {
    id: products.length + 1,
    name: body.name,
    category: body.category,
    price: Number(body.price),
    stock: Number(body.stock),
  };

  products.push(newProduct);

  return Response.json(newProduct, { status: 201 });
}
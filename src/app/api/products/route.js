import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/product";

// Obtener todos los productos (opcionalmente filtrando por storeId)
export async function GET(request) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const storeId = url.searchParams.get("storeId");

    const query = storeId ? { storeId } : {};
    const products = await Product.find(query);

    return Response.json({ ok: true, products });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}

// Crear un nuevo producto
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    const product = await Product.create(data);
    return Response.json({ ok: true, product });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}

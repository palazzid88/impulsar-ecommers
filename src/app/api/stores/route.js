import { dbConnect } from "@/lib/mongodb";
import Store from "@/models/store";

// Obtener todas las tiendas
export async function GET() {
  try {
    await dbConnect();
    const stores = await Store.find();
    return Response.json({ ok: true, stores });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}

// Crear una nueva tienda
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const store = await Store.create(data);
    return Response.json({ ok: true, store });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}

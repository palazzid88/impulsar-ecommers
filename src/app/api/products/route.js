import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";

// 📦 GET → Listar todos los productos
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}

// 🆕 POST → Crear nuevo producto
export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newProduct = await Product.create(body);
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}

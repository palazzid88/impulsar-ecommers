import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";

// 🔍 GET → Obtener producto por ID
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const product = await Product.findById(params.id);
    if (!product) return new Response("Producto no encontrado", { status: 404 });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}

// ✏️ PUT → Actualizar producto
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) return new Response("Producto no encontrado", { status: 404 });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}

// ❌ DELETE → Eliminar producto
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const deleted = await Product.findByIdAndDelete(params.id);
    if (!deleted) return new Response("Producto no encontrado", { status: 404 });
    return new Response("Producto eliminado correctamente", { status: 200 });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}

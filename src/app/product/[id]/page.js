import { notFound } from "next/navigation";
import Link from "next/link";

async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Imagen del producto */}
        <div className="flex justify-center items-center">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full max-h-96 object-cover rounded-2xl shadow-sm"
          />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            ${product.price.toLocaleString("es-AR")}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Stock disponible: {product.stock}
          </p>

          {/* Botón de compra */}
          <Link
            href={`/checkout?productId=${product._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-center font-semibold transition"
          >
            Comprar ahora
          </Link>

          {/* Volver al listado */}
          <Link
            href="/"
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline text-center"
          >
            ← Volver al listado
          </Link>
        </div>
      </div>
    </main>
  );
}

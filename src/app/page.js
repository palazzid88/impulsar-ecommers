import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Error al obtener productos");
    return [];
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

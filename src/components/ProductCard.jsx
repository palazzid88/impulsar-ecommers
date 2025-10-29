import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <Link href={`/product/${product._id}`}>
        <div>
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600 line-clamp-2 mb-2">{product.description}</p>
          <p className="text-xl font-bold text-blue-600">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}

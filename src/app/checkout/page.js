"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Obtener datos del producto
  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      setProduct(data);
      setTotal(data.price);
    }
    fetchProduct();
  }, [productId]);

  // 🔹 Actualizar formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

// dentro del useEffect para calcular envío
useEffect(() => {
  async function calculateShipping() {
    if (!form.postalCode) return;

    try {
      const res = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postalCode: form.postalCode }),
      });
      const data = await res.json();
      setShippingCost(data.shipping);
      setTotal(product ? product.price + data.shipping : 0);
    } catch (err) {
      console.error("Error calculando envío:", err);
    }
  }

  calculateShipping();
}, [form.postalCode, product]);


  // 🔹 Enviar datos y generar link de pago
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          buyer: form,
        }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("❌ Error al generar el pago");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ No se pudo iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  if (!product)
    return (
      <div className="text-center py-20 text-gray-600">
        Cargando información del producto...
      </div>
    );

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Finalizar compra</h1>

      {/* Detalle del producto */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <div className="flex items-center gap-4">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {product.description?.slice(0, 80)}...
            </p>
            <p className="text-xl font-bold text-blue-600 mt-2">
              ${product.price.toLocaleString("es-AR")}
            </p>
          </div>
        </div>
      </div>

      {/* Formulario del comprador */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Dirección de envío
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Código Postal</label>
          <input
            type="text"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Mostrar envío y total */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700">Costo de envío: ${shippingCost}</p>
          <p className="text-xl font-bold mt-1">Total: ${total}</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-4 rounded-xl text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Generando pago..." : "Pagar con Mercado Pago"}
        </button>
      </form>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ¡Pago exitoso! 🎉
      </h1>
      <p className="text-gray-700 mb-8">
        Tu compra fue procesada correctamente.  
        En breve recibirás un correo con los detalles del pedido.
      </p>
      <a
        href="/"
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition"
      >
        Volver al inicio
      </a>
    </main>
  );
}

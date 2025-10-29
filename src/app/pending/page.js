export default function PendingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">
        Pago pendiente ⏳
      </h1>
      <p className="text-gray-700 mb-8">
        Tu pago está siendo procesado o verificado por Mercado Pago.  
        Recibirás un correo cuando se confirme el resultado.
      </p>
      <a
        href="/"
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-xl font-semibold transition"
      >
        Volver al inicio
      </a>
    </main>
  );
}

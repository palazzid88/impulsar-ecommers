export default function FailurePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Pago rechazado ❌
      </h1>
      <p className="text-gray-700 mb-8">
        Hubo un problema con el pago.  
        Podés intentar nuevamente o elegir otro medio de pago.
      </p>
      <div className="flex gap-4">
        <a
          href="/"
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold transition"
        >
          Volver al inicio
        </a>
        <a
          href="/checkout"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition"
        >
          Reintentar pago
        </a>
      </div>
    </main>
  );
}

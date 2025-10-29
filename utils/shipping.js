// utils/shipping.js
export async function getShippingCost(fromCP, toCP) {
  // 1️⃣ Convertir CP a coordenadas usando Nominatim (OpenStreetMap)
  const fromRes = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${fromCP}&country=Argentina&format=json`
  );
  const fromData = await fromRes.json();

  const toRes = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${toCP}&country=Argentina&format=json`
  );
  const toData = await toRes.json();

  if (!fromData[0] || !toData[0]) return 0; // fallback

  const lat1 = parseFloat(fromData[0].lat);
  const lon1 = parseFloat(fromData[0].lon);
  const lat2 = parseFloat(toData[0].lat);
  const lon2 = parseFloat(toData[0].lon);

  // 2️⃣ Calcular distancia en km usando fórmula Haversine
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // 3️⃣ Asignar costo por rango de distancia
  if (distance <= 50) return 500;
  if (distance <= 200) return 1000;
  if (distance <= 500) return 2000;
  return 3000;
}

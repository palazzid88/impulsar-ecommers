import { getShippingCost } from "@/utils/shipping";

export async function POST(req) {
  try {
    const { postalCode } = await req.json();

    if (!postalCode) {
      return new Response(
        JSON.stringify({ error: "Debe proporcionar un código postal" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const DEPOT_CP = "2900"; // tu depósito
    const shipping = await getShippingCost(DEPOT_CP, postalCode);

    return new Response(JSON.stringify({ shipping }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calculando envío:", error);
    return new Response(
      JSON.stringify({ error: "Error calculando envío" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

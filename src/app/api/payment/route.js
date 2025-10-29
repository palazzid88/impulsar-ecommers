import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { product, buyer } = body;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const preference = {
      items: [
        {
          title: product.name,
          quantity: 1,
          currency_id: "ARS",
          unit_price: Number(product.price),
        },
      ],
      payer: {
        name: buyer.name,
        email: buyer.email,
      },
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    return NextResponse.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    return NextResponse.json({ error: "Error al crear el pago" }, { status: 500 });
  }
}

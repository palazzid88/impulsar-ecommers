import { dbConnect } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();
    const dbName = mongoose.connection.name;
    return Response.json({ ok: true, message: `Conectado a la base de datos: ${dbName}` });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}

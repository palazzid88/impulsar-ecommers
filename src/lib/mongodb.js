// 📁 lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Faltó definir MONGODB_URI en el archivo .env.local");
}

// Reutilizar conexión en desarrollo (Next.js recarga módulos constantemente)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // evita que mongoose guarde operaciones mientras se conecta
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB conectado correctamente");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

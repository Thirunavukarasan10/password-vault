// MongoDB connection helper used by API routes
// It reuses a single connection across hot-reloads in development
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not set. Add it to .env.local");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    // You can tweak options here if needed
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectToDatabase() {
  const client = await clientPromise;
  // If the database is specified in the URI, MongoClient will use it.
  // Otherwise Mongo defaults to "test". Override to a sensible default here.
  const db = client.db();
  return { client, db };
}

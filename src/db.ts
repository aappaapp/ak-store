import { MongoClient } from "mongodb";
import type { Product } from "./types";

export const client = new MongoClient(import.meta.env.MONGODB_URL);

await client.connect();

const db = client.db("db");

const configCollection = db.collection<{ name: string }>("config");
const productsCollection = db.collection<Product>("products");
const usersCollection = db.collection("users");

export async function getConfig() {
  return configCollection.findOne();
}

export async function getProducts() {
  return productsCollection.find().toArray();
}

export async function getProduct(id: string) {
  return productsCollection.findOne({ id });
}

export async function getIsAdmin(userId: string) {
  const user = await usersCollection.findOne({ id: userId });
  if (user === null) return false;
  if (typeof user.isAdmin === "boolean") return user.isAdmin;
  return false;
}

export async function addCart(user: string, productId: string) {
  await usersCollection.updateOne(
    { id: user },
    { $push: { cart: { id: productId, attributes: {} } } },
  );
}

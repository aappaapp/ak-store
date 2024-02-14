import { MongoClient, ObjectId } from "mongodb";
import type { CartItem, Product, User } from "./types";

export const client = new MongoClient(import.meta.env.MONGODB_URL);

await client.connect();

const db = client.db("db");

const configCollection = db.collection<{ name: string }>("config");
const productsCollection = db.collection<Product>("products");
const usersCollection = db.collection<User>("users");

export async function getConfig() {
  return configCollection.findOne();
}

export async function getProducts() {
  return productsCollection.find().toArray();
}

export async function getProduct(id: string) {
  return productsCollection.findOne({ id });
}

export async function getProductByObjectId(id: ObjectId) {
  return productsCollection.findOne({ _id: id });
}

export async function removeCartItem(user: string, index: number) {
  const userDoc = await usersCollection.findOne({ id: user });
  if (userDoc === null) return;
  userDoc.cart.splice(index, 1);
  await usersCollection.updateOne(
    { id: user },
    { $set: { cart: userDoc.cart } },
  );
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

export async function listCartItems(user: string): Promise<CartItem[]> {
  const userDoc = await usersCollection.findOne({ id: user });
  if (userDoc === null) return [];
  return userDoc.cart;
}

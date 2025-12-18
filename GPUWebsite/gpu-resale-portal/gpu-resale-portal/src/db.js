import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

export async function initDB() {
  db = await open({
    filename: "orders.db",
    driver: sqlite3.Database
  });
}

export async function saveOrder(obj) {
  if (!db) {
    await initDB();
  }
  const id = obj.id;
  const amount = obj.amount || 0;
  const currency = obj.currency || "usd";
  const status = obj.status || "succeeded";

  await db.run(
    "INSERT OR REPLACE INTO orders (id, amount, currency, status) VALUES (?, ?, ?, ?)",
    [id, amount, currency, status]
  );
}


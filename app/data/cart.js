import fs from "fs/promises";

export async function getStoredCart() {
  const rawFileContent = await fs.readFile("cart.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  const storedCart = data.products ?? [];
  return storedCart;
}

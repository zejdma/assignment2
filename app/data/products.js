import fs from "fs/promises";

export async function getStoredProducts() {
  const rawFileContent = await fs.readFile("products.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  const storedProducts = data.products ?? [];
  return storedProducts;
}

import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStoredProducts } from "~/data/products.js";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  console.log("In index");
  console.log(useLoaderData());
  const products: [Product] = useLoaderData();

  return (
    <>
      <h1>{products.length}</h1>
      <div>
        {products?.map((product) => (
          <li key={product.name}>
            {product.details?.description || "No description"}
          </li>
        ))}
      </div>
    </>
  );
}

export async function loader() {
  const products = await getStoredProducts();
  return products;
}

type Product = {
  name: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  bestseller: boolean;
  featured: boolean;
  details: {
    dimmentions: { width: number; height: number };
    size: number;
    description: string;
    recommendations: [
      { src: string; alt: string },
      { src: string; alt: string },
      { src: string; alt: string }
    ];
  };
};

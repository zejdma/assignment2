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
  const products: [Product] = useLoaderData();
  const featuredProduct: Product | undefined = products.find(
    (product) => product.featured === true
  );

  return (
    <>
      <h1>{featuredProduct?.name || ""}</h1>
      {typeof featuredProduct != "undefined"
        ? FeaturedImage(featuredProduct)
        : null}
      <h1>{products.length}</h1>
      <div>
        {products?.map((product) => (
          <li key={product.name}>
            {product.details?.description || "No description"}
          </li>
        ))}
      </div>
      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Default checkbox
        </label>
      </div>
    </>
  );
}

function FeaturedImage(featuredProduct: Product | undefined) {
  if (typeof featuredProduct != "undefined") {
    if (typeof featuredProduct.image === "string") {
      return (
        <img
          src={featuredProduct.image}
          alt={featuredProduct.name + " image"}
        ></img>
      );
    } else {
      return (
        <img
          src={featuredProduct.image.src}
          alt={featuredProduct.image.alt}
        ></img>
      );
    }
  }
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
  image: string | { src: string; alt: string };
  bestseller: boolean;
  featured: boolean;
  details?: {
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

import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import FeaturedProduct from "~/components/FeaturedProduct";
import ProductList from "~/components/ProductList";
import { getStoredProducts } from "~/data/products";
import { Product } from "~/types/product";
import { ProductFilter } from "~/types/ProductFilter";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const products = useLoaderData<Product[]>();
  const productsCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  const featuredProduct = products.find((product) => product.featured === true);
  const [filter, setFilter] = useState({ categories: [], priceRanges: [] });

  return (
    <div className="my-8 space-y-8 ">
      {getFeaturedProduct(featuredProduct)}

      <div className="divide-y-4 divide-separator">
        <div></div>
        <div></div>
      </div>

      <ProductList
        products={products}
        productsCategories={productsCategories}
        filter={filter}
      />
    </div>
  );
}

function getFeaturedProduct(featuredProduct?: Product) {
  if (featuredProduct !== undefined) {
    return <FeaturedProduct featuredProduct={featuredProduct} />;
  }
}

export async function loader() {
  const products = await getStoredProducts();
  return products;
}

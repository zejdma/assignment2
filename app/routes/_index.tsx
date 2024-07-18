import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import FeaturedProduct from "~/components/FeaturedProduct";
import ProductList from "~/components/ProductList";
import { getStoredProducts } from "~/data/products";
import { SortOptions } from "~/enums/sortOptions";
import { Product } from "~/types/product";
import { FilterCategory, ProductFilter } from "~/types/productFilter";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const products = useLoaderData<Product[]>();
  const featuredProduct = products.find((product) => product.featured === true);

  return (
    <div className="my-8 space-y-8 ">
      {getFeaturedProduct(featuredProduct)}

      <div className="divide-y-4 divide-separator">
        <div></div>
        <div></div>
      </div>

      <ProductList products={products} />
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

function getFilterCategories(categories: string[]) {
  var filterCategories: FilterCategory[] = [];
  categories.forEach((category) => {
    filterCategories.push({ category: category, selected: false });
  });
  return filterCategories;
}

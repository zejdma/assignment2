import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import FeaturedProduct from "~/components/FeaturedProduct";
import ProductList from "~/components/ProductList";
import { getStoredCart, storeCart } from "~/data/cart";
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
  // const { filteredProducts, products } = useLoaderData<{
  //   filteredProducts: Product[];
  //   products: Product[];
  // }>();

  const products = useLoaderData<Product[]>();

  const featuredProduct = products.find((product) => product.featured === true);

  return (
    <div className="my-8 space-y-8 ">
      {getFeaturedProduct(featuredProduct)}

      <div className="divide-y-4 divide-separator">
        <div></div>
        <div></div>
      </div>

      <ProductList filteredProducts={products} products={products} />
    </div>
  );
}

function getFeaturedProduct(featuredProduct?: Product) {
  if (featuredProduct !== undefined) {
    return <FeaturedProduct featuredProduct={featuredProduct} />;
  }
}

// Loader

export async function loader({ request }: { request: Request }) {
  const products = await getStoredProducts();

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const filterCategories = searchParams.getAll("categories");

  let filteredProducts: Product[] = products;

  if (filterCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filterCategories.some((category) => product.category === category)
    );
  }

  // return [filteredProducts, products];
  return filteredProducts;
}

function getFilterCategories(categories: string[]) {
  var filterCategories: FilterCategory[] = [];
  categories.forEach((category) => {
    filterCategories.push({ category: category, selected: false });
  });
  return filterCategories;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.json();
  const newProduct = Object.fromEntries(formData);

  const existingCart = await getStoredCart();
  const updatedCart = existingCart.concat(newProduct);
  await storeCart(updatedCart);
}

import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import FeaturedProduct from "~/components/FeaturedProduct";
import ProductList from "~/components/ProductList";
import { getStoredProducts } from "~/data/products";
import { SortOptions } from "~/enums/sortOptions";
import { Product } from "~/types/product";
import { ProductFilter } from "~/types/productFilter";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const products = useLoaderData<Product[]>();
  const featuredProduct = products.find((product) => product.featured === true);
  const filterOptions: ProductFilter = {
    categories: [...new Set(products.map((product) => product.category))],
    priceRanges: [
      {
        from: 0,
        to: 20,
      },
      {
        from: 20,
        to: 100,
      },
      {
        from: 100,
        to: 200,
      },
      {
        from: 200,
        to: null,
      },
    ],
  };

  const emptyFilter: ProductFilter = {
    categories: [],
    priceRanges: [],
  };

  const [activeFilter, setActiveFilter] = useState(emptyFilter);

  const [sortSetting, setSortSetting] = useState({
    sortOption: SortOptions.name,
    asc: true,
  });

  return (
    <div className="my-8 space-y-8 ">
      {getFeaturedProduct(featuredProduct)}

      <div className="divide-y-4 divide-separator">
        <div></div>
        <div></div>
      </div>

      <ProductList
        products={products}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        sortSetting={sortSetting}
        setSortSetting={setSortSetting}
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

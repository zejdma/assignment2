import { Product } from "~/types/product";
import ProductListItem from "./ProductListItem";
import { useState } from "react";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { ProductFilter } from "~/types/ProductFilter";
import FilterDrawer from "./FilterDrawer";

export default function ProductList({
  products,
  productsCategories,
  filter,
}: {
  products: Product[];
  productsCategories: string[];
  filter: ProductFilter;
}) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="space-y-8">
      <div
        className="flex justify-between 
                items-center"
      >
        <div className="flex gap-1">
          <p className="text-lg font-normal">Photography</p>
          <p className="text-lg font-normal">/</p>
          <p className="text-lg font-bold">Premium Photos</p>
        </div>

        <button onClick={() => setShowFilter(!showFilter)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </button>
      </div>

      {getFilter(showFilter, setShowFilter, filter, productsCategories)}

      {products.map((product) => (
        <ProductListItem key={product.name} product={product} />
      ))}

      <div
        className="w-full flex justify-center 
                items-center gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-separator size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>

        <p className="text-base font-semibold text-fontPrimary">1</p>
        <p className="text-base font-normal text-fontSecondary">2</p>
        <p className="text-base font-normal text-fontSecondary">3</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}

function getFilter(
  showFilter: boolean,
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>,
  filter: ProductFilter,
  productsCategories: string[]
) {
  if (showFilter) {
    return (
      <FilterDrawer
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        filter={filter}
        productsCategories={productsCategories}
      />
    );
  }
}

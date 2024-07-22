import { Product } from "~/types/product";
import ProductListItem from "./ProductListItem";
import { useState } from "react";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import FilterDrawer from "./FilterDrawer";
import { SortOptions } from "~/enums/sortOptions";

export default function ProductList({
  filteredProducts,
  products,
  onFilterChange,
}: {
  filteredProducts: Product[];
  products: Product[];
  onFilterChange: (filters: FilterOptions) => void;
}) {
  const [showFilter, setShowFilter] = useState(false);

  const allCategories = [
    ...new Set(
      products
        .sort((a, b) => a.category.localeCompare(b.category))

        .map((product) => product.category)
    ),
  ];

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
          <img width={24} src="/icons/funnel.svg" />
        </button>
      </div>

      {showFilter && (
        <FilterDrawer
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          allCategories={allCategories}
          onFilterChange={onFilterChange}
        />
      )}

      {filteredProducts.map((product) => (
        <ProductListItem key={product.name} product={product} />
      ))}

      <div
        className="w-full flex justify-center 
                items-center gap-4"
      >
        <img width={16} src="/icons/chevronLeft.svg" />

        <p className="text-base font-semibold text-fontPrimary">1</p>
        <p className="text-base font-normal text-fontSecondary">2</p>
        <p className="text-base font-normal text-fontSecondary">3</p>

        <img width={16} src="/icons/chevronRight.svg" />
      </div>
    </div>
  );
}

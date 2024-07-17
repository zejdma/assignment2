import { Product } from "~/types/product";
import ProductListItem from "./ProductListItem";
import { useState } from "react";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { ProductFilter, SortSetting } from "~/types/productFilter";
import FilterDrawer from "./FilterDrawer";

export default function ProductList({
  products,
  filterOptions,
  activeFilter,
  setActiveFilter,
  sortSetting,
  setSortSetting,
}: {
  products: Product[];
  filterOptions: ProductFilter;
  activeFilter: ProductFilter;
  setActiveFilter: React.Dispatch<React.SetStateAction<ProductFilter>>;
  sortSetting: SortSetting;
  setSortSetting: React.Dispatch<React.SetStateAction<SortSetting>>;
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
          <img width={24} src="/icons/funnel.svg" />
        </button>
      </div>

      {getFilter(
        showFilter,
        setShowFilter,
        filterOptions,
        activeFilter,
        setActiveFilter,
        sortSetting,
        setSortSetting
      )}

      {products.map((product) => (
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

function getFilter(
  showFilter: boolean,
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>,
  filterOptions: ProductFilter,
  activeFilter: ProductFilter,
  setActiveFilter: React.Dispatch<React.SetStateAction<ProductFilter>>,
  sortSetting: SortSetting,
  setSortSetting: React.Dispatch<React.SetStateAction<SortSetting>>
) {
  if (showFilter) {
    return (
      <FilterDrawer
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        sortSetting={sortSetting}
        setSortSetting={setSortSetting}
      />
    );
  }
}

import { Product } from "~/types/product";
import ProductListItem from "./ProductListItem";
import { useState } from "react";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { ProductFilter, SortSetting } from "~/types/productFilter";
import FilterDrawer from "./FilterDrawer";
import { SortOptions } from "~/enums/sortOptions";

export default function ProductList({
  filteredProducts,
  products,
}: {
  filteredProducts: Product[];
  products: Product[];
}) {
  const [showFilter, setShowFilter] = useState(false);

  const [sortSetting, setSortSetting] = useState({
    sortOption: SortOptions.name,
    asc: true,
  });

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState<PriceRange | null>(
    null
  );

  const allCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // const filteredProducts = products.filter((product) => {
  //   const categoryMatch =
  //     categoryFilter.length === 0 || categoryFilter.includes(product.category);
  //   const priceMatch =
  //     !priceRangeFilter ||
  //     (product.price >= priceRangeFilter.min &&
  //       product.price <= priceRangeFilter.max);
  //   return categoryMatch && priceMatch;
  // });

  const getSortedProducts = () => {
    return filteredProducts.sort((a, b) => {
      switch (sortSetting.sortOption) {
        case SortOptions.name:
          return sortSetting.asc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case SortOptions.name:
          return sortSetting.asc ? a.price - b.price : b.price - a.price;
        default:
        case SortOptions.name:
          return sortSetting.asc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
      }
    });
  };

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
          sortSetting={sortSetting}
          setSortSetting={setSortSetting}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priceRangeFilter={priceRangeFilter}
          setPriceRangeFilter={setPriceRangeFilter}
        />
      )}

      {getSortedProducts().map((product) => (
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

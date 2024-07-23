import { Product } from "~/types/product";
import ProductListItem from "./ProductListItem";
import { useState } from "react";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import FilterDrawer from "./FilterDrawer";
import { SortOptions } from "~/enums/sortOptions";
import SortDropdown from "./SortDropdown";
import { priceRanges } from "~/constants/priceRanges";
import { useNavigate, useSearchParams } from "@remix-run/react";
import FilterCategory from "./FilterCategory";
import FilterPriceRange from "./FilterPriceRange";

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
  const navigate = useNavigate();
  const allCategories = [
    ...new Set(
      products
        .sort((a, b) => a.category.localeCompare(b.category))
        .map((product) => product.category)
    ),
  ];
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter Properties

  const [sortOption, setSortOption] = useState<SortOptions>(
    getSortOption(searchParams.get("sortOption") ?? "")
  );
  const [sortASC, setSortASC] = useState<boolean>(
    getSortASC(searchParams.get("sortASC") ?? "")
  );
  const [categories, setCategories] = useState<string[]>(
    searchParams.getAll("categories") ?? []
  );
  const [selectedPriceRangeId, setSelectedPriceRangeId] = useState<string>(
    searchParams.get("selectedPriceRangeId") ?? ""
  );

  // Getters

  function getSortOption(sortOption: string): SortOptions {
    if (sortOption === "name") {
      return SortOptions.name;
    }
    if (sortOption === "price") {
      return SortOptions.price;
    }
    return SortOptions.name;
  }

  function getSortASC(sortASC: string): boolean {
    if (sortASC === "true") {
      return true;
    }
    if (sortASC === "false") {
      return false;
    }
    return true;
  }

  // Handlers

  const handleFilterSave = (): void => {
    const filters: FilterOptions = {
      sortOption,
      sortASC,
      categories,
      selectedPriceRangeId,
    };
    onFilterChange(filters);
  };

  const handleFilterCategoriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value]
    );
  };

  const handleClear = () => {
    setSortOption(getSortOption(""));
    setSortASC(getSortASC(searchParams.get("sortASC") ?? ""));
    setCategories(searchParams.getAll("categories") ?? []);
    setSelectedPriceRangeId(searchParams.get("selectedPriceRangeId") ?? "");
    navigate(`/`);
  };

  // Layout

  return (
    <div className="container mx-auto space-y-8">
      <div
        className="flex justify-between 
                items-center"
      >
        <div className="flex gap-1">
          <p className="text-lg font-normal">Photography</p>
          <p className="text-lg font-normal">/</p>
          <p className="text-lg font-bold">Premium Photos</p>
        </div>
        <div className="block md:hidden">
          <button onClick={() => setShowFilter(!showFilter)}>
            <img width={24} src="/icons/funnel.svg" />
          </button>
        </div>
      </div>

      <div className="md:hidden">
        {showFilter && (
          <FilterDrawer
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            allCategories={allCategories}
            onFilterChange={onFilterChange}
          />
        )}
      </div>

      <div className=" mx-auto block md:flex md:justify-between md:items-start mb-8 md:space-x-16">
        <div className="hidden md:block md:w-1/4 space-y-4">
          <SortDropdown
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortASC={sortASC}
            setSortASC={setSortASC}
          />

          <FilterCategory
            allCategories={allCategories}
            categories={categories}
            handleFilterCategoriesChange={handleFilterCategoriesChange}
          />

          <FilterPriceRange
            selectedPriceRangeId={selectedPriceRangeId}
            setSelectedPriceRangeId={setSelectedPriceRangeId}
          />

          <div className="space-y-2">
            <Button
              variant={ButtonVariant.secondary}
              title="CLEAR"
              onClick={() => handleClear()}
            />

            <Button
              variant={ButtonVariant.primary}
              title="SAVE"
              onClick={handleFilterSave}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductListItem key={product.name} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

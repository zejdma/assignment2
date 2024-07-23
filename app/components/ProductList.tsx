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

      {showFilter && (
        <FilterDrawer
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          allCategories={allCategories}
          onFilterChange={onFilterChange}
        />
      )}
      <div className=" mx-auto block md:flex md:justify-between md:items-start mb-8 md:space-x-16">
        <div className="hidden md:block md:w-1/4 space-y-4">
          {/* Sort section */}

          <div className="space-y-2">
            <p className="text-fontPrimary font-bold text-xl">Sort by</p>
            <div className=" ">
              {/* {sortDropdown(sortSetting, setSortSetting)} */}
              <SortDropdown
                sortOption={sortOption}
                setSortOption={setSortOption}
                sortASC={sortASC}
                setSortASC={setSortASC}
              />
            </div>
          </div>

          {/* Filter category section */}

          <div className="space-y-2">
            <p className="text-fontPrimary font-bold text-xl">Category</p>
            <div className="">
              {allCategories.map((category) => (
                <div key={category} className="flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="check"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      value={category}
                      onChange={handleFilterCategoriesChange}
                      checked={categories.includes(category)}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <img width={16} src="/icons/check.svg" />
                    </span>
                  </label>
                  <label
                    className="mt-px font-light text-gray-700 cursor-pointer select-none"
                    htmlFor="check"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Filter price range section */}

          <div className="space-y-2">
            <p className="text-fontPrimary font-bold text-xl">Price Range</p>
            <div className="">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center">
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.label}
                      onChange={() => setSelectedPriceRangeId(range.id)}
                      checked={selectedPriceRangeId === range.id}
                    />

                    <p className="pl-2 mt-px font-normal text-fontPrimary">
                      {range.label}
                    </p>
                  </label>
                </div>
              ))}
            </div>
          </div>
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

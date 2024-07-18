import { Product } from "~/types/product";
import CartItem from "./CartItem";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { useState } from "react";
import { SortOptions } from "~/enums/sortOptions";
import { ProductFilter, SortSetting } from "~/types/productFilter";
import SortDropdown from "./SortDropdown";

interface PriceRange {
  id: number;
  label: string;
  min: number;
  max: number;
}

export default function FilterDrawer({
  showFilter,
  setShowFilter,
  filterOptions,
  activeFilter,
  setActiveFilter,
  sortSetting,
  setSortSetting,
}: {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filterOptions: ProductFilter;
  activeFilter: ProductFilter;
  setActiveFilter: React.Dispatch<React.SetStateAction<ProductFilter>>;
  sortSetting: SortSetting;
  setSortSetting: React.Dispatch<React.SetStateAction<SortSetting>>;
}) {
  const categories: string[] = ["1", "2", "3", "4", "5"];
  const priceRanges = [
    { id: 1, label: "0 - 20", min: 0, max: 20 },
    { id: 2, label: "21 - 100", min: 21, max: 100 },
    { id: 3, label: "101 - 200", min: 101, max: 200 },
    { id: 4, label: "200 +", min: 201, max: Infinity },
  ];

  // Properties

  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRange | null>(null);

  // Handlers

  const handleCategoryChange = (category: string) => {
    setCategoryFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };

  const handlePriceRangeChange = (range: PriceRange) => {
    setSelectedPriceRange(range);
  };

  const handleClear = () => {
    setSelectedPriceRange(null);
    setCategoryFilters([]);
    setSortSetting({
      sortOption: SortOptions.name,
      asc: true,
    });
  };

  // Return

  return (
    <div>
      <div className="space-y-6 space-x-2 z-20 fixed top-14 left-0 h-screen w-screen bg-background shadow-2xl">
        {/* Title bar with close */}

        <div className="p-4 pb-2 flex justify-between items-center">
          <p className="text-fontPrimary font-bold text-3xl">Filter</p>

          <button
            className="text-fontPrimary"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            <img width={24} src="/icons/xMark.svg" />
          </button>
        </div>

        {/* Sort section */}

        <div className="px-4 space-y-2">
          <p className="text-fontPrimary font-bold text-xl">Sort by</p>
          <div className="px-2 ">
            {/* {sortDropdown(sortSetting, setSortSetting)} */}
            <SortDropdown
              sortSetting={sortSetting}
              setSortSetting={setSortSetting}
            />
          </div>
        </div>

        {/* Filter category section */}

        <div className="px-4 space-y-2">
          <p className="text-fontPrimary font-bold text-xl">Category</p>
          <div className="px-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="check"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    value={category}
                    onChange={() => handleCategoryChange(category)}
                    checked={categoryFilters.includes(category)}
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <img width={16} src="/public/icons/check.svg" />
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

        <div className="px-4 space-y-2">
          <p className="text-fontPrimary font-bold text-xl">Price Range</p>
          <div className="px-2">
            {priceRanges.map((range) => (
              <div className="flex items-center">
                <label
                  key={range.id}
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.label}
                    onChange={() => handlePriceRangeChange(range)}
                    checked={selectedPriceRange?.id === range.id}
                  />

                  <p className="pl-2 mt-px font-normal text-fontPrimary">
                    {range.label}
                  </p>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Buttom bar with clear and save buttons */}

        <div className=" border-t-2 border-separator fixed bottom-0 w-screen flex justify-between gap-4 p-3">
          <Button
            variant={ButtonVariant.secondary}
            title="CLEAR"
            onClick={() => handleClear()}
          />

          <Button
            variant={ButtonVariant.primary}
            title="SAVE"
            onClick={() => setShowFilter(false)}
          />
        </div>
      </div>

      {/* Background page dark shadow */}
      <div className="z-10 fixed top-0 left-0 h-screen w-screen bg-fontSecondary bg-opacity-50"></div>
    </div>
  );
}

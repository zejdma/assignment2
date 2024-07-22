import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { useState } from "react";
import { SortOptions } from "~/enums/sortOptions";
import { ProductFilter, SortSetting } from "~/types/productFilter";
import SortDropdown from "./SortDropdown";
import { redirect, useNavigate } from "@remix-run/react";

interface PriceRange {
  id: number;
  label: string;
  min: number;
  max: number;
}

export default function FilterDrawer({
  showFilter,
  setShowFilter,
  allCategories,
  sortSetting,
  setSortSetting,
  categoryFilter,
  setCategoryFilter,
  priceRangeFilter,
  setPriceRangeFilter,
}: {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  allCategories: string[];
  sortSetting: SortSetting;
  setSortSetting: React.Dispatch<React.SetStateAction<SortSetting>>;
  categoryFilter: string[];
  setCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;
  priceRangeFilter: PriceRange | null;
  setPriceRangeFilter: React.Dispatch<React.SetStateAction<PriceRange | null>>;
}) {
  const navigate = useNavigate();

  const priceRanges = [
    { id: 1, label: "0 - 20", min: 0, max: 20 },
    { id: 2, label: "21 - 100", min: 21, max: 100 },
    { id: 3, label: "101 - 200", min: 101, max: 200 },
    { id: 4, label: "200 +", min: 201, max: Infinity },
  ];
  interface FiltersProps {
    onFilterChange: (filters: { categories: string[] }) => void;
  }

  // Properties
  const [categories, setCategories] = useState<string[]>([]);

  // Handlers

  const handleFilterChange = async () => {
    const params = new URLSearchParams();
    categories.forEach((category) => {
      params.set("categories", category);
    });

    const response = await fetch(`/?${params.toString()}`);
    const data = await response.json();
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
  const handleFilterSave = async () => {
    () => setShowFilter(false);

    console.log("Save clicked");
    const params = new URLSearchParams();
    categories.forEach((category) => {
      params.set("categories", category);
    });

    console.log(`/?${params.toString()}`);
    await fetch(`/?${params.toString()}`);

    navigate(`/?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };

  const handlePriceRangeChange = (range: PriceRange) => {
    setPriceRangeFilter(range);
  };

  const handleClear = () => {
    setSortSetting({
      sortOption: SortOptions.name,
      asc: true,
    });
    setCategoryFilter([]);
    setPriceRangeFilter(null);
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
              <div key={range.id} className="flex items-center">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.label}
                    onChange={() => handlePriceRangeChange(range)}
                    checked={priceRangeFilter?.id === range.id}
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
            onClick={handleFilterSave}
          />
        </div>
      </div>

      {/* Background page dark shadow */}
      <div className="z-10 fixed top-0 left-0 h-screen w-screen bg-fontSecondary bg-opacity-50"></div>
    </div>
  );
}

import { Product } from "~/types/product";
import CartItem from "./CartItem";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { PriceRange, ProductFilter, SortSetting } from "~/types/productFilter";
import { useState } from "react";
import { SortOptions } from "~/enums/sortOptions";

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
  return (
    <div>
      <div className="space-y-6 space-x-2 z-20 fixed top-14 left-0 h-screen w-screen bg-background shadow-2xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <p className="text-fontPrimary font-bold text-3xl">Filter</p>

          <button
            className="text-fontPrimary"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            <img width={24} src="/public/icons/xMark.svg" />
          </button>
        </div>

        <div className="px-4 space-y-2">
          <p className="text-fontPrimary font-bold text-xl">Sort by</p>
          <div className="px-2 ">
            {sortDropdown(sortSetting, setSortSetting)}
          </div>
        </div>

        <div className="px-4 space-y-2">
          <p className="text-fontPrimary font-bold text-xl">Category</p>
          <div className="px-2 ">
            {filterOptions.categories.map((category) =>
              categoryCheckbox(category)
            )}
          </div>
        </div>

        <div className="px-4 space-y-2">
          <p className="text-fontPrimary font-bold text-xl">Price Range</p>
          <div className="px-2">
            {filterOptions.priceRanges.map((priceRage) =>
              priceRangeCheckbox(priceRage)
            )}
          </div>
        </div>
        <div className=" border-t-2 border-separator fixed bottom-0 w-screen flex justify-between gap-4 p-3">
          <Button
            variant={ButtonVariant.secondary}
            title="CLEAR"
            onClick={() => console.log("Filter clear")}
          />

          <Button
            variant={ButtonVariant.primary}
            title="SAVE"
            onClick={() => setShowFilter(false)}
          />
        </div>
      </div>
      <div className="z-10 fixed top-0 left-0 h-screen w-screen bg-fontSecondary bg-opacity-50"></div>
    </div>
  );
}

function categoryCheckbox(category: string) {
  return (
    <div key={category} className="flex items-center">
      <label
        className="relative flex items-center p-3 rounded-full cursor-pointer"
        htmlFor="check"
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
          id="check"
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
  );
}

function priceRangeCheckbox(priceRange: PriceRange) {
  return (
    <div key={priceRange.from} className="flex items-center">
      <label
        className="relative flex items-center p-3 rounded-full cursor-pointer"
        htmlFor="check"
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
          id="check"
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <img width={16} src="/public/icons/check.svg" />
        </span>
      </label>
      <label
        className="mt-px font-light text-gray-700 cursor-pointer select-none"
        htmlFor="check"
      >
        {priceRange.from + " - " + priceRange.to}
      </label>
    </div>
  );
}

function sortDropdown(
  sortSetting: SortSetting,
  setSortSetting: React.Dispatch<React.SetStateAction<SortSetting>>
) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="relative" id="dropdownButton">
      <div
        className="px-5 py-2 cursor-pointer flex justify-between"
        onClick={toggle}
      >
        {sortSetting.sortOption}

        <img width={16} src="/public/icons/chevronDown.svg" />
      </div>

      {isOpen && (
        <div
          id="dropdown"
          className="rounded border-solid border-2 border-separator bg-background  px-4 w-full z-30 absolute"
        >
          {Object.values(SortOptions).map((option) => (
            <div
              key={option}
              onClick={() => {
                setSortSetting({
                  sortOption: option,
                  asc: sortSetting.asc,
                });

                setIsOpen(false);
              }}
              className="cursor-pointer p-4"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

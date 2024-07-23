import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { useState } from "react";
import { SortOptions } from "~/enums/sortOptions";
import SortDropdown from "./SortDropdown";
import { redirect, useNavigate, useSearchParams } from "@remix-run/react";
import { priceRanges } from "~/constants/priceRanges";
import FilterCategory from "./FilterCategory";
import FilterPriceRange from "./FilterPriceRange";

interface FiltersProps {
  onFilterChange: (filters: {
    kategorie: string[];
    cenaKategorie: string;
    sortField: string;
    sortOrder: string;
  }) => void;
}

export default function FilterDrawer({
  showFilter,
  setShowFilter,
  allCategories,
  onFilterChange,
}: {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  allCategories: string[];
  onFilterChange: (filters: FilterOptions) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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

  // Return

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
            <img width={24} src="/icons/xMark.svg" />
          </button>
        </div>

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

import { SortOptions } from "~/enums/sortOptions";

export type ProductFilter = {
  filterCategories: FilterCategory[];
  priceRanges: PriceRange[];
  selectedPriceRange: PriceRange | null;
};

export type FilterCategory = {
  category: string;
  selected: boolean;
};

export type PriceRange = {
  from: number | null;
  to: number | null;
};

export type SortSetting = {
  sortOption: SortOptions;
  asc: boolean;
};

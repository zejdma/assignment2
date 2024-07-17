import { SortOptions } from "~/enums/sortOptions";

export type ProductFilter = {
  categories: string[];
  priceRanges: PriceRange[];
};

export type PriceRange = {
  from: number | null;
  to: number | null;
};

export type SortSetting = {
  sortOption: SortOptions;
  asc: boolean;
};

export type ProductFilter = {
  categories: string[];
  priceRanges: priceRange[];
};

export type priceRange = {
  from?: number;
  to?: number;
};

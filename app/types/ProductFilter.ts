export type ProductFilter = {
  categories: string[];
  priceRanges: PriceRange[];
};

export type PriceRange = {
  from: number | null;
  to: number | null;
};

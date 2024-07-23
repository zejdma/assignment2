import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import FeaturedProduct from "~/components/FeaturedProduct";
import Pagination from "~/components/Pagination";
import ProductList from "~/components/ProductList";
import { priceRanges } from "~/constants/priceRanges";
import { getStoredCart, storeCart } from "~/data/cart";
import { getStoredProducts } from "~/data/products";
import { SortOptions } from "~/enums/sortOptions";
import { Product } from "~/types/product";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  const { filteredProducts, products, totalPages, currentPage } =
    useLoaderData<{
      filteredProducts: Product[];
      products: Product[];
      totalPages: number;
      currentPage: number;
    }>();

  const featuredProduct = products.find((product) => product.featured === true);

  function getFeaturedProduct(featuredProduct?: Product) {
    if (featuredProduct !== undefined) {
      return <FeaturedProduct featuredProduct={featuredProduct} />;
    }
  }

  const [productFilter, setProductFilter] = useState<FilterOptions>({
    sortOption: "name",
    sortASC: true,
    categories: [],
    selectedPriceRangeId: "",
  });

  const handleFilterChange = async (filters: FilterOptions) => {
    const params = new URLSearchParams();
    filters.categories.forEach((category) =>
      params.append("categories", category)
    );
    if (filters.selectedPriceRangeId)
      params.set("selectedPriceRangeId", filters.selectedPriceRangeId);
    params.set("sortOption", filters.sortOption);
    params.set("sortASC", String(filters.sortASC));

    setProductFilter(filters);

    await fetch(`/?${params.toString()}`);
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="my-8 space-y-8 ">
      {getFeaturedProduct(featuredProduct)}

      <div className="divide-y-4 divide-separator">
        <div></div>
        <div></div>
      </div>

      <ProductList
        filteredProducts={filteredProducts}
        products={products}
        onFilterChange={handleFilterChange}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

// MARK: - LOADER

export async function loader({ request }: { request: Request }) {
  // Params
  const products = await getStoredProducts();

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const sortOption = searchParams.get("sortOption") ?? "name";
  const sortASC = searchParams.get("sortASC") ?? "true";
  const filterCategories = searchParams.getAll("categories");
  const selectedPriceRangeId = searchParams.get("selectedPriceRangeId");

  const itemsPerPage = 6;

  const paramPage: string = searchParams.get("page") || "1";
  const currentPage: number = paramPage === "NaN" ? 1 : parseInt(paramPage);

  let filteredProducts: Product[] = products;

  // Filtering by category
  if (filterCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filterCategories.some((category) => product.category === category)
    );
  }

  // Filtering by price range
  const priceRange = priceRanges.find(
    (priceRange) => priceRange.id === selectedPriceRangeId
  );

  if (priceRange !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange.min && product.price < priceRange.max
    );
  }

  // Sorting
  filteredProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case SortOptions.name:
        return sortASC == "true"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case SortOptions.price:
        if (sortASC == "true") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      default:
        return sortASC == "true"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
    }
  });

  // Pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  filteredProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return { filteredProducts, products, totalPages, currentPage };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.json();
  const newProduct = Object.fromEntries(formData);

  const existingCart = await getStoredCart();
  const updatedCart = existingCart.concat(newProduct);
  await storeCart(updatedCart);
}

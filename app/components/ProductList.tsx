import { Product } from "~/types/product";
import ProductListItem from "./ProductListItem";
import { useState } from "react";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";

export default function ProductList({ products }: { products: Product[] }) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="space-y-8">
      <div
        className="flex justify-between 
                items-center"
      >
        <div className="flex gap-1">
          <p className="text-lg font-normal">Photography</p>
          <p className="text-lg font-normal">/</p>
          <p className="text-lg font-bold">Premium Photos</p>
        </div>

        <button onClick={() => setShowFilter(!showFilter)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </button>
      </div>

      {getFilter(showFilter, setShowFilter)}

      {products.map((product) => (
        <ProductListItem key={product.name} product={product} />
      ))}

      <div
        className="w-full flex justify-center 
                items-center gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-separator size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>

        <p className="text-base font-semibold text-fontPrimary">1</p>
        <p className="text-base font-normal text-fontSecondary">2</p>
        <p className="text-base font-normal text-fontSecondary">3</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}

function getFilter(
  showFilter: boolean,
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (showFilter) {
    return (
      <>
        <div className="md:hidden h-screen flex items-end justify-end px-4 pb-6">
          <div className="z-20 fixed top-14 left-0 h-screen w-screen bg-background shadow-2xl">
            <div className="p-4 pb-2 flex justify-between items-center">
              <p className="text-fontPrimary font-bold text-3xl">Filter</p>

              <button
                className="text-fontPrimary"
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className=" border-t-2 border-separator fixed bottom-0 w-screen flex justify-between gap-4 p-3">
              <Button
                variant={ButtonVariant.secondary}
                title="CLEAR"
                onClick={() => console.log("Filter Clear")}
              />

              <Button
                variant={ButtonVariant.primary}
                title="SAVE"
                onClick={() => console.log("Filter Save")}
              />
            </div>
          </div>

          <div className="z-10 fixed top-0 left-0 h-screen w-screen bg-fontSecondary bg-opacity-50"></div>
        </div>
      </>
    );
  }
}

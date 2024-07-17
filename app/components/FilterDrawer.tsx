import { Product } from "~/types/product";
import CartItem from "./CartItem";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { ProductFilter } from "~/types/ProductFilter";

export default function FilterDrawer({
  showFilter,
  setShowFilter,
  filter,
  productsCategories,
}: {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filter: ProductFilter;
  productsCategories: string[];
}) {
  return (
    <div>
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

        <div className="p-4 pb-2">
          {productsCategories.map((category) => categoryCheckbox(category))}
        </div>

        <div className="p-4 pb-2">
          {productsCategories.map((category) => categoryCheckbox(category))}
        </div>

        <div className=" border-t-2 border-separator fixed bottom-0 w-screen flex justify-between gap-4 p-3">
          <Button
            variant={ButtonVariant.secondary}
            title="CLEAR"
            onClick={() => console.log(productsCategories)}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
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

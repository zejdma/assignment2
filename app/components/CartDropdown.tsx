import { Product } from "~/types/product";
import CartItem from "./CartItem";

export default function CartDropdown({ cart }: { cart: Product[] }) {
  return (
    <>
      <div className="z-10 absolute left-0 right-0 bottom-0 top-14 bg-background py-4 px-4 md:border-solid md:border-4 md:border-separator">
        <div
          className="flex justify-between 
                items-center"
        >
          <p className="text-fontPrimary font-bold text-3xl">Cart</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        {cart.map((cartItem) => (
          <CartItem key={cartItem.name} cartItem={cartItem} />
        ))}
      </div>
    </>
  );
}

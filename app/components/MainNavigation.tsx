import { useState } from "react";
import CartDropdown from "./CartDrawer";
import { Product } from "~/types/product";
import CartDrawer from "./CartDrawer";

export default function MainNavigation({ cart }: { cart: Product[] }) {
  const [showCart, setShowCart] = useState(false);
  return (
    <div className="divide-y-4 divide-separator">
      <div
        className="mx-4 flex space-x-4flex justify-between 
                items-center"
      >
        <img
          className="max-h-4 md:max-h-6 my-4 md:my-8"
          src="./public/Logo.png"
          alt="logo"
        ></img>

        <div className="static md:relative">
          <button onClick={() => setShowCart(!showCart)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 md:size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>

          <div className="">{getCart(showCart, setShowCart, cart)}</div>
        </div>
      </div>
      <hr />
    </div>
  );
}

function getCart(
  showCart: boolean,
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
  cart: Product[]
) {
  if (showCart) {
    return (
      <CartDrawer showCart={showCart} setShowCart={setShowCart} cart={cart} />
    );
  }
}

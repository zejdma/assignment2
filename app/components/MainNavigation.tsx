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
            <img width={32} src="/public/icons/shoppingCart.svg" />
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

import { useState } from "react";
import CartDropdown from "./CartDrawer";
import { Product } from "~/types/product";
import CartDrawer from "./CartDrawer";
import { Form } from "@remix-run/react";

export default function MainNavigation({ cart }: { cart: Product[] }) {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = async () => {
    setShowCart(!showCart);

    const formData = new FormData();
    formData.append("_action", "loadCart");

    await fetch("/", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="divide-y-4 divide-separator">
      <div
        className="mx-4 flex space-x-4flex justify-between 
                items-center"
      >
        <img
          className="max-h-4 md:max-h-6 my-4 md:my-8"
          src="/logo.png"
          alt="logo"
        ></img>

        <div className="static md:relative">
          <Form>
            <button onClick={handleShowCart}>
              <img width={32} src="/icons/shoppingCart.svg" />
            </button>
          </Form>

          <div className="">
            {showCart && (
              <CartDrawer
                showCart={showCart}
                setShowCart={setShowCart}
                cart={cart}
              />
            )}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

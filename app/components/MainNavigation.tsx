import { useState, useRef, useEffect } from "react";
import CartDropdown from "./CartDrawer";
import { Product } from "~/types/product";
import CartDrawer from "./CartDrawer";
import { Form } from "@remix-run/react";
import CartItem from "./CartItem";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";

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
  const handleClearCart = async () => {
    const formData = new FormData();
    formData.append("_action", "clearCart");

    await fetch("/", {
      method: "POST",
      body: formData,
    });
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowCart(!setShowCart);
  };

  const closeDropdown = () => {
    setShowCart(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

          <div className="sm:hidden">
            {showCart && (
              <CartDrawer
                showCart={showCart}
                setShowCart={setShowCart}
                cart={cart}
              />
            )}
          </div>

          <div className="hidden sm:flex" ref={dropdownRef}>
            {showCart && (
              <div>
                <div className="z-20 absolute top-16 right-[-24px] w-[500px] border-4 border-separator bg-background shadow-xl">
                  <div className="p-4 pb-2 flex justify-between items-center">
                    <p className="text-fontPrimary font-bold text-md">Cart</p>

                    <button
                      className="text-fontPrimary"
                      onClick={() => {
                        setShowCart(!showCart);
                      }}
                    >
                      <img width={16} src="/icons/xMark.svg" />
                    </button>
                  </div>

                  <div className="px-4 space-y-2 divide-y-2 divide-separator">
                    <div className="pb-4 space-y-2">
                      {cart.map((cartItem) => (
                        <CartItem key={cartItem.name} cartItem={cartItem} />
                      ))}
                    </div>

                    <Form className="pb-4 w-full">
                      <Button
                        variant={ButtonVariant.secondary}
                        title="CLEAR"
                        onClick={handleClearCart}
                      />
                    </Form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

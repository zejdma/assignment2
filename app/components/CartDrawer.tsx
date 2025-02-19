import { Product } from "~/types/product";
import CartItem from "./CartItem";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";
import { Form } from "@remix-run/react";

export default function CartDrawer({
  showCart,
  setShowCart,
  cart,
}: {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cart: Product[];
}) {
  const handleClearCart = async () => {
    const formData = new FormData();
    formData.append("_action", "clearCart");

    await fetch("/", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <div className="z-20 fixed top-14 left-0 h-screen w-screen bg-background shadow-2xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <p className="text-fontPrimary font-bold text-3xl">Cart</p>

          <button
            className="text-fontPrimary"
            onClick={() => {
              setShowCart(!showCart);
            }}
          >
            <img width={24} src="/icons/xMark.svg" />
          </button>
        </div>

        <div className="p-4 pb-2 space-y-4">
          {cart.map((cartItem) => (
            <CartItem key={cartItem.name} cartItem={cartItem} />
          ))}
        </div>

        <div className=" border-t-2 border-separator fixed bottom-0 w-screen flex justify-between gap-4 p-3">
          <Form className="w-full">
            <Button
              variant={ButtonVariant.secondary}
              title="CLEAR"
              onClick={handleClearCart}
            />
          </Form>
        </div>
      </div>
      <div className="z-10 fixed top-0 left-0 h-screen w-screen bg-fontSecondary bg-opacity-50"></div>
    </div>
  );
}

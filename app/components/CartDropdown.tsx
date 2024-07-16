import { Product } from "~/types/product";
import CartItem from "./CartItem";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";

export default function CartDropdown({
  showCart,
  setShowCart,
  cart,
}: {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cart: Product[];
}) {
  return (
    <>
      <div className="z-10 absolute left-0 right-0 bottom-0 top-16 bg-background py-4 px-4 md:border-solid md:border-4 md:border-separator space-y-8">
        <div
          className="flex justify-between 
                items-center"
        >
          <p className="text-fontPrimary font-bold text-3xl">Cart</p>

          <button
            className="text-fontPrimary"
            onClick={() => {
              setShowCart(!showCart);
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

        {cart.map((cartItem) => (
          <CartItem key={cartItem.name} cartItem={cartItem} />
        ))}

        <div>
          <div className="divide-y-2 divide-separator">
            <div></div>
            <div></div>
          </div>
          <Button
            variant={ButtonVariant.secondary}
            title="CLEAR"
            onClick={() => console.log("CLEAR")}
          />
        </div>
      </div>
    </>
  );
}

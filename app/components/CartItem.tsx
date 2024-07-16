import { Product } from "~/types/product";

export default function CartItem({ cartItem }: { cartItem: Product }) {
  return (
    <div
      className="flex justify-between 
                items-center gap-4"
    >
      <div>
        <p className="text-fontPrimary font-bold text-xl">{cartItem.name}</p>

        <p className="text-fontSecondary font-normal text-3xl">
          {cartItem.price + " " + cartItem.currency}
        </p>
      </div>
      <div className="w-1/3">{cartItemImage(cartItem)}</div>
    </div>
  );
}

function cartItemImage(cartItem: Product) {
  if (typeof cartItem.image === "string") {
    return <img src={cartItem.image} alt={cartItem.name + " image"}></img>;
  } else {
    return <img src={cartItem.image.src} alt={cartItem.image.alt}></img>;
  }
}

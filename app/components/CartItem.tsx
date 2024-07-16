import { Product } from "~/types/product";

export default function CartItem({ cartItem }: { cartItem: Product }) {
  return (
    <div>
      <p>{cartItem.name}</p>

      <p>{cartItem.price + " " + cartItem.currency}</p>

      {cartItemImage(cartItem)}
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

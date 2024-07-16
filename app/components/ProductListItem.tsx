import { Product } from "~/types/product";

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <div className="space-y-2">
      {productImage(product)}

      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-fontPrimary">{product.name}</p>
          <p className="text-xl font-normal text-fontSecondary">
            {product.price + " " + product.currency}
          </p>
        </div>

        <p className="text-sm font-normal text-fontSecondary">
          {product.category}
        </p>
      </div>
    </div>
  );
}

function productImage(product: Product) {
  if (typeof product.image === "string") {
    return (
      <img
        className="object-cover h-[500px]"
        src={product.image}
        alt={product.name + " image"}
      ></img>
    );
  } else {
    return (
      <img
        className="object-cover h-[500px]"
        src={product.image.src}
        alt={product.image.alt}
      ></img>
    );
  }
}

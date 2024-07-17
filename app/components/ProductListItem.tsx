import { Product } from "~/types/product";
import Button from "./Button";
import { ButtonVariant } from "~/enums/buttonVariant";

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <div className="space-y-2">
      <div className="relative">
        {productImage(product)}

        {bestSellerBadge(product.bestseller)}

        <div className="absolute bottom-0 w-full">
          <Button
            variant={ButtonVariant.primary}
            title="ADD TO CART"
            onClick={() => console.log("Click on add to cart")}
          />
        </div>
      </div>
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

function bestSellerBadge(isBestSeller: boolean) {
  if (isBestSeller) {
    return (
      <p className="absolute top-0 left-0 text-fontPrimary text-sm md:text-sm font-bold py-2 px-4 bg-background">
        Best Seller
      </p>
    );
  }
}

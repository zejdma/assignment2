import { ButtonVariant } from "~/enums/buttonVariant";
import Button from "./Button";
import { Product } from "~/types/product";

export default function FeaturedProduct({
  featuredProduct,
}: {
  featuredProduct: Product;
}) {
  const featuredAbout: string = "About" + featuredProduct?.name || "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("_action", "addProduct");
    formData.append("product", JSON.stringify(featuredProduct));

    await fetch("/", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="container mx-auto space-y-8">
      <p className="text-fontPrimary font-bold text-3xl">
        {featuredProduct?.name || ""}
      </p>

      <div className="relative">
        {typeof featuredProduct != "undefined"
          ? FeaturedImage(featuredProduct)
          : null}
        <p className="absolute bottom-0 left-0 text-fontPrimary text-sm md:text-xl font-bold py-4 px-8 bg-background">
          Photo of the day
        </p>
      </div>

      <Button
        variant={ButtonVariant.primary}
        title="ADD TO CART"
        onClick={handleSubmit}
      />

      <div className="block md:flex md:justify-between md:items-start mb-8 md:space-x-8">
        <div className="space-y-2">
          <p className="text-fontPrimary text-xl font-bold">{featuredAbout}</p>
          <p className="text-fontSecondary text-lg font-normal">
            {featuredProduct?.details?.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-fontPrimary text-xl font-bold">
              People also buy
            </p>
            <div className="grid grid-cols-3 gap-6 content-end">
              {featuredProduct?.details?.recommendations.map(
                (recommendation) => (
                  <img
                    className="object-cover h-32"
                    key={recommendation.src}
                    src={recommendation.src}
                    alt={recommendation.alt}
                  ></img>
                )
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-fontPrimary text-xl font-bold">Details</p>
            <div className="space-y-0">
              <p className="text-fontSecondary text-lg font-normal">
                {"Price: " +
                  featuredProduct?.price +
                  " " +
                  featuredProduct?.currency}
              </p>
              <p className="text-fontSecondary text-lg font-normal">
                {"Resolution: " +
                  featuredProduct?.details?.dimmentions.width +
                  " x " +
                  featuredProduct?.details?.dimmentions.height}
              </p>
              <p className="text-fontSecondary text-lg font-normal">
                {"Size: " + (featuredProduct?.details?.size ?? 0) / 1000 + "MB"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedImage(featuredProduct: Product | undefined) {
  if (typeof featuredProduct != "undefined") {
    if (typeof featuredProduct.image === "string") {
      return (
        <img
          src={featuredProduct.image}
          alt={featuredProduct.name + " image"}
        ></img>
      );
    } else {
      return (
        <img
          src={featuredProduct.image.src}
          alt={featuredProduct.image.alt}
        ></img>
      );
    }
  }
}

import { priceRanges } from "~/constants/priceRanges";

export default function FilterPriceRange({
  selectedPriceRangeId,
  setSelectedPriceRangeId,
}: {
  selectedPriceRangeId: string;
  setSelectedPriceRangeId: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="space-y-2">
      <p className="text-fontPrimary font-bold text-xl">Price Range</p>
      <div className="">
        {priceRanges.map((range) => (
          <div key={range.id} className="flex items-center">
            <label className="relative flex items-center p-3 rounded-full cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value={range.label}
                onChange={() => setSelectedPriceRangeId(range.id)}
                checked={selectedPriceRangeId === range.id}
              />

              <p className="pl-2 mt-px font-normal text-fontPrimary">
                {range.label}
              </p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

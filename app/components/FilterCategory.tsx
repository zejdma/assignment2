export default function FilterCategory({
  allCategories,
  categories,
  handleFilterCategoriesChange,
}: {
  allCategories: string[];
  categories: string[];
  handleFilterCategoriesChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div className="px-4 space-y-2">
      <p className="text-fontPrimary font-bold text-xl">Category</p>
      <div className="px-2">
        {allCategories.map((category) => (
          <div key={category} className="flex items-center">
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="check"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                value={category}
                onChange={handleFilterCategoriesChange}
                checked={categories.includes(category)}
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <img width={16} src="/icons/check.svg" />
              </span>
            </label>
            <label
              className="mt-px font-light text-gray-700 cursor-pointer select-none"
              htmlFor="check"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

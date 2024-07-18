import { useState } from "react";
import { SortOptions } from "~/enums/sortOptions";
import { SortSetting } from "~/types/productFilter";

export default function SortDropdown({
  sortSetting,
  setSortSetting,
}: {
  sortSetting: SortSetting;
  setSortSetting: React.Dispatch<React.SetStateAction<SortSetting>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="relative" id="dropdownButton">
      <div className=" cursor-pointer flex justify-between items-center">
        <div className="px-2 py-2 cursor-pointer flex gap-2" onClick={toggle}>
          {sortSetting.sortOption}

          <img width={16} src="/icons/chevronDown.svg" />
        </div>
        <div
          onClick={() => {
            setSortSetting({
              sortOption: sortSetting.sortOption,
              asc: !sortSetting.asc,
            });
          }}
        >
          {sortSetting.asc ? (
            <img width={24} src="/icons/barsArrowDown.svg" />
          ) : (
            <img width={24} src="/icons/barsArrowUp.svg" />
          )}
        </div>
      </div>
      {isOpen && (
        <div
          id="dropdown"
          className="rounded border-solid border-2 border-separator bg-background  px-4 w-full z-30 absolute"
        >
          {Object.values(SortOptions).map((option) => (
            <div
              key={option}
              onClick={() => {
                setSortSetting({
                  sortOption: option,
                  asc: sortSetting.asc,
                });

                setIsOpen(false);
              }}
              className="cursor-pointer p-4"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

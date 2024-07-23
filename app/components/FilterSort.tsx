import { SortOptions } from "~/enums/sortOptions";
import SortDropdown from "./SortDropdown";

export default function FilterSort({
  sortOption,
  setSortOption,
  sortASC,
  setSortASC,
}: {
  sortOption: SortOptions;
  setSortOption: React.Dispatch<React.SetStateAction<SortOptions>>;
  sortASC: boolean;
  setSortASC: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="space-y-2">
      <p className="text-fontPrimary font-bold text-xl">Sort by</p>
      <div className=" ">
        {/* {sortDropdown(sortSetting, setSortSetting)} */}
        <SortDropdown
          sortOption={sortOption}
          setSortOption={setSortOption}
          sortASC={sortASC}
          setSortASC={setSortASC}
        />
      </div>
    </div>
  );
}

import { useSearchParams } from "@remix-run/react";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        className={`py-2 mr-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img width={16} src="/icons/chevronLeft.svg" />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`py-2 ${
            currentPage === pageNumber
              ? " text-fontPrimary cursor-not-allowed"
              : "text-fontSecondary"
          }`}
          onClick={
            currentPage === pageNumber
              ? undefined
              : () => handlePageChange(pageNumber)
          }
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={`py-2 ml-2 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <div
          className="w-full flex justify-center 
                items-center gap-4"
        >
          <img width={16} src="/icons/chevronRight.svg" />
        </div>
      </button>
    </div>
  );
}

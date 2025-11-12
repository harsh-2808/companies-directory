import { TEXTS } from "../constants/text";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-8 gap-4 text-white">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`px-4 py-2 rounded-md ${
          page === 1
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {TEXTS.PREVIOUS}
      </button>
      <span className="text-gray-300">
        {TEXTS.PAGE} {page} {TEXTS.OF} {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-4 py-2 rounded-md ${
          page === totalPages
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {TEXTS.NEXT}
      </button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}) => (
  <div className="mt-4 flex items-center justify-between">
    <div className="text-sm text-gray-500 dark:text-gray-400">
      Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
      {totalItems} entries
    </div>
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(i + 1)}
            className={`w-8 h-8 ${
              currentPage === i + 1
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default Pagination;
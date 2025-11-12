import { TEXTS } from "../constants/text";

export interface Company {
  id: number | string;
  name: string;
  location: string;
  industry: string;
}

interface CompanyProps {
  company: Company;
  onClick?: (company: Company) => void;
}
export function CompanyCard({ company, onClick }: CompanyProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick && onClick(company)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onClick && onClick(company)
      }
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col gap-3 border border-gray-100 dark:border-gray-700 cursor-pointer"
    >
      <header className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {company.name}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {company.industry}
        </span>
      </header>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        {company.location}
      </p>

      <footer className="mt-auto flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Open profile for ${company.name}`);
          }}
          className="text-xs py-1 px-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {TEXTS.VIEW}
        </button>
      </footer>
    </article>
  );
}

import { useEffect, useState } from "react";
import { CompanyCard, type Company } from "../components/CompanyCard";
import Loader from "../components/Loader";
import { fetchCompanies } from "../services/api";
import ErrorHandler from "../components/ErrorHandler";
import { SearchBar } from "../components/SearchBar";
import { DropdownFilter } from "../components/DropdownFilter";
import { TEXTS } from "../constants/text";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const getCompanies = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { data, totalPages } = await fetchCompanies(page, pageSize);
      setCompanies(data);
      setFilteredCompanies(data);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError(TEXTS.ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    let result = companies.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    if (industryFilter)
      result = result.filter((c) => c.industry === industryFilter);
    if (locationFilter)
      result = result.filter((c) => c.location === locationFilter);

    setFilteredCompanies(result);
  }, [search, industryFilter, locationFilter, companies]);

  if (loading)
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader message={TEXTS.LOADING} />
      </div>
    );

  if (error)
    return (
      <ErrorHandler message={error} onRetry={() => getCompanies(currentPage)} />
    );

  return (
    <main className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen w-full">
      <section className="w-full">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-100">
            {TEXTS.PAGE_TITLE}
          </h1>

          <div className="flex flex-wrap gap-3">
            <SearchBar
              placeholder={TEXTS.SEARCH_PLACEHOLDER}
              value={search}
              onChange={setSearch}
            />
            <DropdownFilter
              label={TEXTS.FILTER_INDUSTRY}
              options={[...new Set(companies.map((c) => c.industry))]}
              value={industryFilter}
              onChange={setIndustryFilter}
            />
            <DropdownFilter
              label={TEXTS.FILTER_LOCATION}
              options={[...new Set(companies.map((c) => c.location))]}
              value={locationFilter}
              onChange={setLocationFilter}
            />
          </div>
        </div>

        {filteredCompanies.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            {TEXTS.NO_COMPANIES}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.map((c) => (
                <CompanyCard
                  key={c.id}
                  company={c}
                  onClick={() => console.log("clicked", c)}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => {
                  setSearch("");
                  setIndustryFilter("");
                  setLocationFilter("");
                  getCompanies(currentPage - 1);
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
              >
                {TEXTS.PREVIOUS}
              </button>

              <span className="text-gray-200">
                {TEXTS.PAGE} {currentPage} {TEXTS.OF} {totalPages}
              </span>

              <button
                onClick={() => {
                  setSearch("");
                  setIndustryFilter("");
                  setLocationFilter("");
                  getCompanies(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
              >
                {TEXTS.NEXT}
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

import { MOCK_COMPANIES } from "./companyData";

export async function fetchCompanies(page = 1, limit = 6) {

    await new Promise((r) => setTimeout(r, 600));

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = MOCK_COMPANIES.slice(start, end);

    return {
        data: paginated,
        total: MOCK_COMPANIES.length,
        page,
        totalPages: Math.ceil(MOCK_COMPANIES.length / limit),
    };

}

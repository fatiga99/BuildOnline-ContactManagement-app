export const parsePaginationParams = (query: any) => {
    const search = query.search ? query.search.toString() : '';
    const page = Math.max(1, parseInt(query.page as string, 10) || 1); 
    const limit = Math.max(1, parseInt(query.limit as string, 10) || 10); 
    const offset = (page - 1) * limit;

    return { search, page, limit, offset };
};

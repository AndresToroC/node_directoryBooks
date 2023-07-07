export const Paginate = (currentPage, totalrows, limit) => {
    const lastPage = Math.ceil(totalrows / limit)
    const previousPage = (currentPage > 1) ? currentPage - 1 : 1;
    const nextPage = (currentPage >= lastPage) ? lastPage : currentPage + 1;

    return {
        currentPage,
        totalrows,
        nextPage,
        previousPage, 
        firstPage: 1,
        lastPage
    }
}
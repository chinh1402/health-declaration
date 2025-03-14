// pagination.active = 1
//  pagination.totalPage = item.length / itemPerPage
//  pagination.itemPerPage = 2

import { SearchQueryResult } from "./SearchQueryResult";

export const PaginationConfig = (itemPerPage: number = 2, searchQuery: string = "", active:number = 1) => {
  const allFormData = localStorage.getItem("allFormData");
  return {
    active,
    totalPage: allFormData
      ? Math.ceil(SearchQueryResult(searchQuery, JSON.parse(allFormData)).length / itemPerPage)
      : 0,
    itemPerPage,
  };
};

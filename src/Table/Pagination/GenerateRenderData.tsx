import { SearchQueryResult } from "./SearchQueryResult";

export const GenerateRenderData = (
  pagination: any,
  searchQuery: string = ""
) => {
  const allFormData = localStorage.getItem("allFormData");

  let allFormDataParsed = allFormData
    ? SearchQueryResult(searchQuery, JSON.parse(allFormData))
    : [];

  let start = (pagination.active - 1) * pagination.itemPerPage;
  let end = start + pagination.itemPerPage;

  let renderData = allFormDataParsed.slice(start, end);
  return renderData;
};

export function SearchQueryResult(searchQuery: string, items: any) {
  const fieldsToMatch = ["id", "fullName", "object", "dateOfBirth", "gender"];
  const regex = new RegExp(searchQuery, "i");
  return items.filter((item: any) =>
    fieldsToMatch.some((field) => regex.test(item[field]))
  );
}
